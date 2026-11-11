// Para cada candidata (fatia SHARD de N): abre a ficha no Maps, conta as fotos (obras) e lê as avaliações mais
// recentes (sinal de movimento), tenta o Reclame Aqui e abre o site no tamanho de celular anotando erros de verdade.
const { chromium } = require('playwright');
const fs = require('fs');
const SHARD = Number(process.env.SHARD), N = Number(process.env.N);
const todos = JSON.parse(fs.readFileSync('saida/candidatos.json', 'utf8'));
const meus = todos.filter((_, i) => i % N === SHARD);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 }, userAgent: UA });
  const cel = await b.newContext({ locale: 'pt-BR', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
  const out = [];
  let raBloq = 0;
  for (const c of meus) {
    const r = { id: c.id };
    // 0) fotos da ficha (galeria do Google: todas e as do proprietário)
    let pf = await ctx.newPage();
    try {
      await pf.goto(c.maps, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await pf.waitForTimeout(3500);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pf.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pf.waitForTimeout(2500); } }
      const hero = pf.locator('button[aria-label^="Foto"], button[aria-label*="fotos"], button[jsaction*="heroHeaderImage"]');
      if (await hero.count()) {
        await hero.first().click().catch(() => {}); await pf.waitForTimeout(3500);
        for (let i = 0; i < 4; i++) { await pf.mouse.wheel(0, 3000).catch(() => {}); await pf.waitForTimeout(900); }
        r.fotos = await pf.evaluate(() => document.querySelectorAll('a[data-photo-index]').length);
        r.abas_fotos = await pf.evaluate(() => [...document.querySelectorAll('[role="tab"]')].map(x => (x.getAttribute('aria-label') || x.innerText || '').trim()).filter(Boolean).slice(0, 12));
        const dono = pf.getByRole('tab', { name: /propriet|owner/i });
        if (await dono.count()) {
          await dono.first().click().catch(() => {}); await pf.waitForTimeout(2500);
          for (let i = 0; i < 3; i++) { await pf.mouse.wheel(0, 3000).catch(() => {}); await pf.waitForTimeout(800); }
          r.fotos_dono = await pf.evaluate(() => document.querySelectorAll('a[data-photo-index]').length);
        }
      }
    } catch (e) { r.erro_fotos = e.message.slice(0, 100); }
    await pf.close();
    // 0b) Reclame Aqui (desiste se as primeiras tentativas forem bloqueadas)
    if (raBloq < 3) {
      const pr = await ctx.newPage();
      try {
        await pr.goto('https://www.reclameaqui.com.br/busca/?q=' + encodeURIComponent(c.nome), { waitUntil: 'domcontentloaded', timeout: 30000 });
        await pr.waitForTimeout(5000);
        const tit = await pr.title();
        if (/just a moment|attention required|access denied/i.test(tit)) { raBloq++; r.ra = 'bloqueado'; }
        else { raBloq = -99; r.ra = (await pr.evaluate(() => document.body.innerText)).slice(0, 1500); }
      } catch (e) { raBloq++; r.ra = 'erro ' + e.message.slice(0, 60); }
      await pr.close();
    }
    // 1) avaliações recentes no Maps
    let pg = await ctx.newPage();
    try {
      await pg.goto(c.maps, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await pg.waitForTimeout(3500);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(2500); } }
      const aba = pg.getByRole('tab', { name: /Avaliações|Reviews/ });
      if (await aba.count()) {
        await aba.first().click(); await pg.waitForTimeout(2500);
        const ord = pg.locator('button[aria-label*="Ordenar"], button[aria-label*="Sort"]');
        if (await ord.count()) {
          await ord.first().click(); await pg.waitForTimeout(1200);
          const mr = pg.getByRole('menuitemradio', { name: /Mais recentes|Newest/ });
          if (await mr.count()) { await mr.first().click(); await pg.waitForTimeout(2500); }
        }
      }
      r.datas = await pg.evaluate(() => [...document.querySelectorAll('span.rsqaWe')].slice(0, 5).map(x => x.innerText));
      if (!r.datas.length) {
        const t = await pg.evaluate(() => document.body.innerText);
        r.datas = (t.match(/(?:há|editad[oa] há)\s+(?:um|uma|\d+)\s+(?:minutos?|horas?|dias?|semanas?|m[eê]s|meses|anos?)/gi) || []).slice(0, 5);
      }
      r.ficha = (await pg.evaluate(() => document.body.innerText)).slice(0, 1500);
    } catch (e) { r.erro_maps = e.message.slice(0, 100); }
    await pg.close();
    // 2) site no celular: erros de JavaScript, recursos quebrados, página mais larga que a tela
    if (c.site) {
      pg = await cel.newPage();
      const erros = [], falhas = new Set();
      pg.on('pageerror', e => erros.push(String(e.message).slice(0, 120)));
      pg.on('console', m => { if (m.type() === 'error') erros.push(m.text().slice(0, 120)); });
      pg.on('response', x => { if (x.status() >= 400) falhas.add(x.status() + ' ' + x.url().slice(0, 100)); });
      pg.on('requestfailed', x => falhas.add('falhou ' + x.url().slice(0, 100)));
      try {
        const t0 = Date.now();
        const resp = await pg.goto(c.site, { waitUntil: 'load', timeout: 40000 });
        r.carga_s = Math.round((Date.now() - t0) / 100) / 10;
        r.status_cel = resp ? resp.status() : 0;
        await pg.waitForTimeout(2500);
        const m = await pg.evaluate(() => ({ larg: document.documentElement.scrollWidth, tela: window.innerWidth,
          fonte: parseFloat(getComputedStyle(document.body).fontSize) || 0, alt: document.documentElement.scrollHeight }));
        Object.assign(r, m);
      } catch (e) { r.erro_site = e.message.slice(0, 100); }
      r.erros_js = [...new Set(erros)].slice(0, 6);
      r.falhas = [...falhas].slice(0, 8);
      r.n_falhas = falhas.size;
      await pg.close();
    }
    out.push(r);
    console.log(c.id, c.nome, r.datas && r.datas[0], (r.erros_js || []).length, r.n_falhas);
  }
  fs.writeFileSync(`saida/detalhe-${SHARD}.json`, JSON.stringify(out, null, 1));
  await b.close();
})();
