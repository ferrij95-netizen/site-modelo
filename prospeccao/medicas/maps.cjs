// Busca indústrias médico-hospitalares no Google Maps (cidade em CIDADE, índice em IDX para variar as buscas).
const { chromium } = require('playwright');
const fs = require('fs');
const CIDADE = process.env.CIDADE;
const IDX = Number(process.env.IDX || 0);
const TODAS = [
  'fabricante de produtos médico hospitalares', 'indústria de equipamentos médicos', 'fábrica de materiais cirúrgicos',
  'indústria de implantes ortopédicos', 'fabricante de instrumentais cirúrgicos', 'fabricante de móveis hospitalares',
  'indústria de descartáveis hospitalares', 'fabricante de órteses e próteses', 'indústria de dispositivos médicos',
  'fabricante de equipamentos hospitalares', 'indústria de produtos para saúde', 'fabricante de cateteres e sondas',
  'fabricante de equipamentos de fisioterapia', 'indústria de luvas e máscaras cirúrgicas', 'fabricante de produtos de silicone médico',
  'indústria de curativos e produtos para feridas', 'fabricante de equipamentos de esterilização autoclave',
  'fabricante de monitores e aparelhos médicos', 'indústria de material hospitalar', 'fabricante de cadeiras de rodas e produtos de reabilitação',
];
const REFS = ['Marlex dispositivos médicos', 'Medicone Cachoeirinha', 'Sulmedical produtos médicos'];
// 8 buscas por cidade, girando a lista; o job "REFS" busca só as três empresas de referência
const BUSCAS = CIDADE === 'REFS' ? REFS : Array.from({ length: 8 }, (_, i) => TODAS[(IDX * 7 + i * 3) % TODAS.length]);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  const out = [];
  for (const q of [...new Set(BUSCAS)]) {
    const pg = await ctx.newPage();
    const url = 'https://www.google.com/maps/search/' + encodeURIComponent(CIDADE === 'REFS' ? q : q + ' ' + CIDADE) + '?hl=pt-BR&gl=br';
    try {
      await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await pg.waitForTimeout(4000);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(3000); } }
      const feed = pg.locator('div[role="feed"]');
      if (await feed.count()) {
        for (let i = 0; i < 10; i++) { await feed.evaluate(e => e.scrollBy(0, 3000)).catch(() => {}); await pg.waitForTimeout(1500); }
      }
      const itens = await pg.evaluate(() => [...document.querySelectorAll('div[role="feed"] a.hfpxzc')].map(a => {
        const card = a.parentElement;
        return { nome: a.getAttribute('aria-label'), maps: a.href, texto: card.innerText,
          arias: [...card.querySelectorAll('[aria-label]')].map(x => x.getAttribute('aria-label')),
          links: [...card.querySelectorAll('a')].map(x => ({ href: x.href, label: x.getAttribute('aria-label') || x.innerText })) };
      }));
      console.log(CIDADE, '|', q, '->', itens.length);
      if (!itens.length) { await pg.screenshot({ path: `debug-${CIDADE.replace(/\W+/g, '_')}.png` }); }
      for (const it of itens) out.push({ cidade: CIDADE, busca: q, ...it });
    } catch (e) { console.log('erro', q, e.message); }
    await pg.close();
  }
  fs.mkdirSync('saida', { recursive: true });
  fs.writeFileSync(`saida/maps-${CIDADE.replace(/\W+/g, '_')}.json`, JSON.stringify(out, null, 1));
  await b.close();
})();
