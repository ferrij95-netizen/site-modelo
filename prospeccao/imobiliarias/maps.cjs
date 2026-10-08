// Busca imobiliárias no Google Maps bairro a bairro (cauda longa). Também roda a busca genérica da cidade
// ("imobiliária <cidade>") só para marcar quem aparece no topo, que é o que os scrapers comuns pegam.
const { chromium } = require('playwright');
const fs = require('fs');
const CHAVE = process.env.CHAVE;              // ex.: "São Paulo SP|1"
const CIDADE = CHAVE.split('|')[0];
const BAIRROS = JSON.parse(fs.readFileSync('cidades.json', 'utf8'))[CHAVE];
const buscas = [
  { q: `imobiliária ${CIDADE}`, tipo: 'topo' },
  { q: `imobiliárias em ${CIDADE}`, tipo: 'topo' },
  ...BAIRROS.flatMap(b => [{ q: `imobiliária ${b} ${CIDADE}`, tipo: 'bairro', bairro: b },
                           { q: `imóveis venda e aluguel ${b} ${CIDADE}`, tipo: 'bairro', bairro: b }]),
];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  const out = [];
  for (const s of buscas) {
    const pg = await ctx.newPage();
    const url = 'https://www.google.com/maps/search/' + encodeURIComponent(s.q) + '?hl=pt-BR&gl=br';
    try {
      await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await pg.waitForTimeout(4000);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(3000); } }
      const feed = pg.locator('div[role="feed"]');
      // topo: só a primeira tela; bairro: rola até o fim da lista
      const rolar = s.tipo === 'topo' ? 1 : 12;
      if (await feed.count()) {
        for (let i = 0; i < rolar; i++) { await feed.evaluate(e => e.scrollBy(0, 3000)).catch(() => {}); await pg.waitForTimeout(1500); }
      }
      let itens = await pg.evaluate(() => [...document.querySelectorAll('div[role="feed"] a.hfpxzc')].map(a => {
        const card = a.parentElement;
        return { nome: a.getAttribute('aria-label'), maps: a.href, texto: card.innerText,
          arias: [...card.querySelectorAll('[aria-label]')].map(x => x.getAttribute('aria-label')),
          links: [...card.querySelectorAll('a')].map(x => ({ href: x.href, label: x.getAttribute('aria-label') || x.innerText })) };
      }));
      if (s.tipo === 'topo') itens = itens.slice(0, 20);
      console.log(s.q, '->', itens.length);
      itens.forEach((it, i) => out.push({ cidade: CIDADE, busca: s.q, tipo: s.tipo, bairro: s.bairro || '', pos: i + 1, ...it }));
    } catch (e) { console.log('erro', s.q, e.message); }
    await pg.close();
  }
  fs.mkdirSync('saida', { recursive: true });
  fs.writeFileSync(`saida/maps-${CHAVE.replace(/\W+/g, '_')}.json`, JSON.stringify(out, null, 1));
  await b.close();
})();
