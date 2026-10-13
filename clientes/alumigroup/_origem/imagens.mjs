// Converte as imagens baixadas do site atual (img/) em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/alumigroup/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]. As fotos do site atual têm no máximo 800 px.
const lista = [
  ['sede', 'sobre-nos-689c96377f38e.jpg', 1000],
  ['sede-antiga', 'materia-685a9ba8e3a9c.jpg', 1000],
  ['chapas-pilha', 'metais-689c9cc8b83a3.jpg', 1000],
  ['chapas-galpao', 'b916f1f044e93a1372f6b4870cba8ec2-b82fc3c9-8198-4873-b2a8-6b25417cac37-png.jpg', 1000],
  ['chapas', '2d2a682116cf054a19f1680ca4abde1c-57-png.jpg', 900],
  ['chapa-xadrez', '675c1e3c271a205e2c47f474c07ec18b-25-png.jpg', 900],
  ['tarugo', '98fbe196747fdd042c3feebcc8f9f583-5-png.jpg', 900],
  ['disco', '8d86dab42b28d4170b450d667d4a212d-41-png.jpg', 900],
  ['molde-plano-1', '751c4a00e8479cbbc75873a50c60ac27-p3-jpg.jpg', 1000],
  ['molde-plano-2', 'c3b3e445f444fdde57af80f3e043f0ad-img-8140-jpg.jpg', 1000],
  ['molde-plano-3', 'c3b3e445f444fdde57af80f3e043f0ad-img-8163-jpg.jpg', 1000],
  ['molde-plano-4', 'moldes-planos-689c9bbfc3dab.jpg', 1000],
  ['molde-circular-recorte', 'moldes-circulares-689c97217338e.png', 700],
  ['molde-circular-1', '0aede8b1dc1599e207bc5b921ebb6889-img-20250723-153906-jpg.jpg', 1000],
  ['molde-circular-2', 'ec9b72ca1a9d191060e6f45f2f84b942-img-20250721-wa0022-002-jpg.jpg', 1000],
  ['molde-circular-3', '593e0fbc762a47453b1ec284eb3c8b94-3-png.jpg', 900],
  ['molde-circular-4', 'e1ef3c633e7b52d38de4b37d43c5bc04-img-20250723-153326-jpg.jpg', 1000],
  ['molde-circular-5', '1d08a0d7548789dad0dc91c6909a0a6c-img-20250723-153052-jpg.jpg', 1000],
  ['sinterizados', 'sinterizados-692da61964860.jpg', 1000],
];

// Estas duas têm borda branca no arquivo original: corta a borda antes.
const aparar = ['chapas-pilha', 'sinterizados'];
for (const [nome, arq, larg] of lista) {
  let s = sharp(path.join(ori, arq));
  if (aparar.includes(nome)) {
    const { data, info } = await s.trim({ background: '#ffffff', threshold: 30 }).toBuffer({ resolveWithObject: true });
    s = sharp(data).extract({ left: 3, top: 3, width: info.width - 6, height: info.height - 6 });
  }
  await s.resize({ width: larg, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(dest, nome + '.webp'));
}

console.log('alumigroup: imagens prontas');
