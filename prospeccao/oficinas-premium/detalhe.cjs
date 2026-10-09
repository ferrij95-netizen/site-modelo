// Para cada candidata (fatia SHARD de N): abre a ficha no Maps (texto da ficha, botão de agendar, avaliações mais
// recentes com o texto, para ver marcas atendidas e reclamações de orçamento/prazo) e, se tiver site próprio,
// abre o site no tamanho de celular e anota erros de verdade.
const { chromium } = require('playwright');
const fs = require('fs');
// No PC (sem Actions): ALVOS=arquivo com ids separados por vírgula, PAUSA=segundos entre fichas, MINUTOS=limite.
// Retoma de onde parou: pula os ids que já estão em saida/detalhe-<SHARD>.json.
const SHARD = Number(process.env.SHARD || 0), N = Number(process.env.N || 1);
const PAUSA = Number(process.env.PAUSA || 0) * 1000;
const todos = JSON.parse(fs.readFileSync('saida/candidatos.json', 'utf8'));
const alvos = process.env.ALVOS ? new Set(fs.readFileSync(process.env.ALVOS, 'utf8').split(',').map(Number)) : null;
const arq = `saida/detalhe-${SHARD}.json`;
const feitos = fs.existsSync(arq) ? JSON.parse(fs.readFileSync(arq, 'utf8')) : [];
const ja = new Set(feitos.map(r => r.id));
const meus = todos.filter((c, i) => i % N === SHARD && (!alvos || alvos.has(c.id)) && !ja.has(c.id));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const LIMITE = Date.now() + Number(process.env.MINUTOS || 80) * 60 * 1000;   // para antes do tempo do job e salva o que tiver
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 }, userAgent: UA });
  const cel = await b.newContext({ locale: 'pt-BR', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
  const out = feitos;
  console.log('faltam', meus.length, 'já feitos', feitos.length);
  const salva = () => fs.writeFileSync(arq, JSON.stringify(out));
  for (const c of meus) {
    if (Date.now() > LIMITE) break;
    const r = { id: c.id };
    let pg = await ctx.newPage();
    try {
      await pg.goto(c.maps, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await pg.waitForTimeout(3000);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(2500); } }
      r.ficha = (await pg.evaluate(() => (document.querySelector('div[role="main"]') || document.body).innerText)).slice(0, 2500);
      r.agendar_maps = await pg.evaluate(() => [...document.querySelectorAll('a,button')].some(x => /^(Agendar|Reservar|Marcar)/i.test((x.getAttribute('aria-label') || x.innerText || '').trim())));
      const aba = pg.getByRole('tab', { name: /Avaliações|Reviews/ });
      if (await aba.count()) {
        await aba.first().click(); await pg.waitForTimeout(2200);
        const ord = pg.locator('button[aria-label*="Ordenar"], button[aria-label*="Sort"]');
        if (await ord.count()) {
          await ord.first().click(); await pg.waitForTimeout(1000);
          const mr = pg.getByRole('menuitemradio', { name: /Mais recentes|Newest/ });
          if (await mr.count()) { await mr.first().click(); await pg.waitForTimeout(2200); }
        }
        const lista = pg.locator('div.m6QErb.DxyBCb');
        for (let i = 0; i < 3; i++) { await lista.last().evaluate(e => e.scrollBy(0, 4000)).catch(() => {}); await pg.waitForTimeout(1200); }
      }
      r.datas = await pg.evaluate(() => [...document.querySelectorAll('span.rsqaWe')].slice(0, 20).map(x => x.innerText));
      r.reviews = await pg.evaluate(() => [...document.querySelectorAll('span.wiI7pd')].slice(0, 20).map(x => x.innerText.slice(0, 400)));
      if (!r.datas.length) {
        const t = await pg.evaluate(() => document.body.innerText);
        r.datas = (t.match(/(?:há|editad[oa] há)\s+(?:um|uma|\d+)\s+(?:minutos?|horas?|dias?|semanas?|m[eê]s|meses|anos?)/gi) || []).slice(0, 20);
      }
    } catch (e) { r.erro_maps = e.message.slice(0, 100); }
    await pg.close();
    if (c.tipo_site === 'site próprio') {
      pg = await cel.newPage();
      const erros = [], falhas = new Set();
      pg.on('pageerror', e => erros.push(String(e.message).slice(0, 120)));
      pg.on('console', m => { if (m.type() === 'error') erros.push(m.text().slice(0, 120)); });
      pg.on('response', x => { if (x.status() >= 400) falhas.add(x.status() + ' ' + x.url().slice(0, 100)); });
      pg.on('requestfailed', x => falhas.add('falhou ' + x.url().slice(0, 100)));
      try {
        const t0 = Date.now();
        const resp = await pg.goto(c.site, { waitUntil: 'load', timeout: 35000 });
        r.carga_s = Math.round((Date.now() - t0) / 100) / 10;
        r.status_cel = resp ? resp.status() : 0;
        await pg.waitForTimeout(2000);
        Object.assign(r, await pg.evaluate(() => ({ larg: document.documentElement.scrollWidth, tela: window.innerWidth })));
      } catch (e) { r.erro_site = e.message.slice(0, 100); }
      r.erros_js = [...new Set(erros)].slice(0, 6);
      r.n_falhas = falhas.size;
      await pg.close();
    }
    out.push(r);
    if (out.length % 20 === 0) salva();
    console.log(c.id, c.nome, (r.datas || [])[0], (r.reviews || []).length);
    if (PAUSA) await new Promise(ok => setTimeout(ok, PAUSA * (0.7 + Math.random() * 0.6)));
  }
  salva();
  await b.close();
})();
