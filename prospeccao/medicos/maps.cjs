// Procura cada candidato no Google Maps e guarda categoria, site, avaliações e telefone (lote em LOTE/LOTES).
const { chromium } = require('playwright');
const fs = require('fs');
const LOTE = +process.env.LOTE, LOTES = +process.env.LOTES;
const todos = JSON.parse(fs.readFileSync('saida/candidatos.json', 'utf8'));
const meus = todos.filter((_, i) => i % LOTES === LOTE);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function detalhe(pg) {
  return pg.evaluate(() => {
    const t = s => document.querySelector(s)?.innerText?.trim() || null;
    const site = document.querySelector('a[data-item-id="authority"]')?.href || null;
    const tel = document.querySelector('button[data-item-id^="phone:tel:"]')?.getAttribute('data-item-id')?.replace('phone:tel:', '') || null;
    const nota = t('div.F7nice');
    return { nome: t('h1'), categoria: t('button[jsaction*="category"]'), site, telefone: tel, nota,
      endereco: document.querySelector('button[data-item-id="address"]')?.innerText?.trim() || null };
  });
}
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  const pg = await ctx.newPage();
  const out = []; let falhas = 0;
  for (const c of meus) {
    const q = `${c.medico} ${c.endereco} ${c.cidade}`;
    const r = { cnes: c.cnes, busca: q };
    try {
      await pg.goto('https://www.google.com/maps/search/' + encodeURIComponent(q) + '?hl=pt-BR&gl=br', { waitUntil: 'domcontentloaded', timeout: 45000 });
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await sleep(2500); } }
      await Promise.race([pg.waitForSelector('h1', { timeout: 9000 }), pg.waitForSelector('div[role="feed"]', { timeout: 9000 })]).catch(() => {});
      await sleep(1500);
      if (await pg.locator('div[role="feed"]').count()) {
        r.lista = await pg.evaluate(() => [...document.querySelectorAll('div[role="feed"] a.hfpxzc')].slice(0, 3).map(a => ({ nome: a.getAttribute('aria-label'), texto: a.parentElement.innerText.slice(0, 300) })));
        const first = pg.locator('div[role="feed"] a.hfpxzc').first();
        if (await first.count()) { await first.click(); await pg.waitForSelector('h1', { timeout: 8000 }).catch(() => {}); await sleep(1500); }
      }
      Object.assign(r, await detalhe(pg));
      if (!r.nome && !r.lista) { r.vazio = true; falhas++; if (falhas === 3) await pg.screenshot({ path: `debug-${LOTE}.png` }); }
    } catch (e) { r.erro = e.message.slice(0, 200); }
    out.push(r);
    if (out.length % 25 === 0) { console.log(LOTE, out.length, '/', meus.length, 'vazios', falhas); fs.writeFileSync(`saida/maps-${LOTE}.json`, JSON.stringify(out)); }
    await sleep(800 + Math.random() * 1200);
  }
  fs.mkdirSync('saida', { recursive: true });
  fs.writeFileSync(`saida/maps-${LOTE}.json`, JSON.stringify(out));
  await b.close();
})();
