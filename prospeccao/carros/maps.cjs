// Busca no Google Maps e salva o texto e os links de cada resultado (cidade passada em CIDADE).
const { chromium } = require('playwright');
const fs = require('fs');
const CIDADE = process.env.CIDADE;
const BUSCAS = [
  'oficina especializada BMW Audi Mercedes',
  'oficina mecânica carros importados',
  'centro automotivo premium',
  'estética automotiva vitrificação',
  'loja de carros seminovos premium',
  'funilaria e pintura carros importados',
  'oficina especializada Volvo Land Rover',
];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  const out = [];
  for (const q of BUSCAS) {
    const pg = await ctx.newPage();
    const url = 'https://www.google.com/maps/search/' + encodeURIComponent(q + ' ' + CIDADE) + '?hl=pt-BR&gl=br';
    try {
      await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await pg.waitForTimeout(4000);
      // aceita consentimento se aparecer
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(3000); } }
      const feed = pg.locator('div[role="feed"]');
      if (await feed.count()) {
        for (let i = 0; i < 12; i++) { await feed.evaluate(e => e.scrollBy(0, 3000)).catch(() => {}); await pg.waitForTimeout(1500); }
      }
      const itens = await pg.evaluate(() => [...document.querySelectorAll('div[role="feed"] a.hfpxzc')].map(a => {
        const card = a.parentElement;
        return { nome: a.getAttribute('aria-label'), maps: a.href, texto: card.innerText,
          links: [...card.querySelectorAll('a')].map(x => ({ href: x.href, label: x.getAttribute('aria-label') || x.innerText })) };
      }));
      console.log(CIDADE, '|', q, '->', itens.length);
      if (!itens.length) { await pg.screenshot({ path: `debug-${CIDADE.replace(/\W+/g, '_')}.png` }); console.log((await pg.content()).slice(0, 1500)); }
      for (const it of itens) out.push({ cidade: CIDADE, busca: q, ...it });
    } catch (e) { console.log('erro', q, e.message); }
    await pg.close();
  }
  fs.mkdirSync('saida', { recursive: true });
  fs.writeFileSync(`saida/maps-${CIDADE.replace(/\W+/g, '_')}.json`, JSON.stringify(out, null, 1));
  await b.close();
})();
