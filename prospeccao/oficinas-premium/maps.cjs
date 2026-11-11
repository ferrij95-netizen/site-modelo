// Busca oficinas independentes de carros premium no Google Maps, marca por marca, na cidade e nos bairros.
// Entrada: CHAVE (ex.: "São Paulo SP|1") e cidades.json. Saída: saida/maps-<chave>.json com um cartão por resultado.
const { chromium } = require('playwright');
const fs = require('fs');
const CHAVE = process.env.CHAVE;
const CIDADE = CHAVE.split('|')[0];
const PARTE = CHAVE.split('|')[1];
const LOCAIS = JSON.parse(fs.readFileSync('cidades.json', 'utf8'))[CHAVE];
const MARCAS = ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Land Rover', 'Jaguar', 'Volvo', 'carros importados', 'carros alemães'];
const cidadeInteira = c => MARCAS.flatMap(m => [`oficina ${m} ${c}`, `oficina especializada ${m} ${c}`, `mecânica ${m} ${c}`]
  .map(q => ({ q, marca: m, cidade: c, bairro: '', rolar: 8 })));
const buscas = [];
// a primeira parte de cada cidade faz a busca da cidade inteira; as outras só os bairros
if (PARTE === '1') buscas.push(...cidadeInteira(CIDADE));
for (const l of LOCAIS) {
  if (/ [A-Z]{2}$/.test(l)) buscas.push(...cidadeInteira(l));          // cidade vizinha (termina com UF)
  else buscas.push(...MARCAS.slice(0, 8).map(m => ({ q: `oficina ${m} ${l} ${CIDADE}`, marca: m, cidade: CIDADE, bairro: l, rolar: 5 })));
}
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
      await pg.waitForTimeout(3500);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(3000); } }
      const feed = pg.locator('div[role="feed"]');
      if (await feed.count()) {
        for (let i = 0; i < s.rolar; i++) { await feed.evaluate(e => e.scrollBy(0, 3000)).catch(() => {}); await pg.waitForTimeout(1400); }
      }
      const itens = await pg.evaluate(() => [...document.querySelectorAll('div[role="feed"] a.hfpxzc')].map(a => {
        const card = a.parentElement;
        return { nome: a.getAttribute('aria-label'), maps: a.href, texto: card.innerText,
          arias: [...card.querySelectorAll('[aria-label]')].map(x => x.getAttribute('aria-label')),
          links: [...card.querySelectorAll('a')].map(x => ({ href: x.href, label: x.getAttribute('aria-label') || x.innerText })) };
      }));
      console.log(s.q, '->', itens.length);
      itens.forEach((it, i) => out.push({ cidade: s.cidade, bairro: s.bairro, busca: s.q, marca_busca: s.marca, pos: i + 1, ...it }));
    } catch (e) { console.log('erro', s.q, e.message); }
    await pg.close();
  }
  fs.mkdirSync('saida', { recursive: true });
  fs.writeFileSync(`saida/maps-${CHAVE.replace(/\W+/g, '_')}.json`, JSON.stringify(out));
  await b.close();
})();
