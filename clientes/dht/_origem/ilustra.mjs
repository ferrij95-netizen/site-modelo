// Ilustrações de produto em SVG (a DHT ainda não tem fotos): traço de aço escovado, mesma luz e escala em todas.
const A = 'stroke="url(#aco)" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const B = 'stroke="#5b6773" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const brilho = 'stroke="#fff" stroke-opacity=".7" fill="none" stroke-linecap="round"';
const aneis = (y = 92) => `<circle cx="44" cy="${y}" r="10" ${A} stroke-width="5"/><circle cx="76" cy="${y}" r="10" ${A} stroke-width="5"/>`;
const tesoura = (abertura, ponta, compr) => `${aneis()}
  <path d="M50 84 L${60 + abertura} ${ponta}" ${A} stroke-width="${compr}"/><path d="M70 84 L${60 - abertura} ${ponta}" ${A} stroke-width="${compr}"/>
  <circle cx="60" cy="62" r="3.2" fill="#5b6773"/>`;

const desenhos = {
  pinca: `<path d="M60 10 C56 40 50 80 47 110" ${A} stroke-width="6"/><path d="M60 10 C64 40 70 80 73 110" ${A} stroke-width="6"/>
    <path d="M52 60 l-4 1 M51 66 l-4 1 M50 72 l-4 1 M68 60 l4 1 M69 66 l4 1 M70 72 l4 1" ${B} stroke-width="1.5"/><path d="M58 16 C55 40 51 70 48 100" ${brilho} stroke-width="1"/>`,
  hemostatica: `${tesoura(3, 12, 6)}<path d="M52 82 l3 -4 l3 4 l3 -4 l3 4 l3 -4" ${B} stroke-width="1.5"/>`,
  tesoura: `${tesoura(8, 8, 5)}<path d="M62 60 L67 12" ${brilho} stroke-width="1"/>`,
  portaagulha: `${tesoura(2, 20, 7)}<path d="M57 28 h6 M57 34 h6" ${B} stroke-width="1.5"/>`,
  bisturi: `<rect x="53" y="44" width="14" height="68" rx="3" ${A} stroke-width="5"/><path d="M56 60 h8 M56 66 h8 M56 72 h8 M56 78 h8" ${B} stroke-width="1.5"/>
    <path d="M60 44 V36 C60 24 66 14 72 8 C70 22 66 32 64 40" fill="#dfe4e9" stroke="#5b6773" stroke-width="1.8" stroke-linejoin="round"/>`,
  cuba: `<path d="M16 68 C10 40 46 26 64 40 C74 47 82 36 96 40 C112 46 110 86 84 90 C62 94 22 96 16 68Z" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/>
    <path d="M26 67 C22 46 50 36 64 48 C74 55 82 46 93 49 C104 54 102 80 82 82 C64 85 30 86 26 67Z" fill="#eef1f4" stroke="#8a96a2" stroke-width="1.5"/><path d="M32 58 C36 48 46 45 54 48" ${brilho} stroke-width="2"/>`,
  cupula: `<ellipse cx="60" cy="50" rx="40" ry="12" fill="#eef1f4" stroke="#5b6773" stroke-width="2"/><path d="M20 50 C22 84 98 84 100 50" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/><ellipse cx="60" cy="50" rx="34" ry="9" fill="#dfe4e9" stroke="#8a96a2" stroke-width="1"/>`,
  bandeja: `<path d="M14 54 L44 32 H106 L76 54Z" fill="#eef1f4" stroke="#5b6773" stroke-width="2"/><path d="M24 51 L46 36 H96 L74 51Z" fill="#cdd5dc" stroke="#8a96a2" stroke-width="1.2"/><path d="M14 54 V70 L76 70 V54 M76 70 L106 48 V32" fill="url(#acoF)" stroke="#5b6773" stroke-width="2" stroke-linejoin="round"/><path d="M14 54 V70 H76 V54Z" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/><path d="M26 50 L48 36" ${brilho} stroke-width="2"/>`,
  caixa: `<path d="M14 48 L40 34 H106 L80 48Z" fill="#eef1f4" stroke="#5b6773" stroke-width="2"/><path d="M14 48 H80 V90 H14Z" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/><path d="M80 48 L106 34 V76 L80 90" fill="#c3cbd3" stroke="#5b6773" stroke-width="2" stroke-linejoin="round"/>
    ${[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5].map(c => `<circle cx="${22 + c * 10.5}" cy="${58 + r * 11}" r="2.2" fill="#5b6773"/>`).join('')).join('')}`,
  tambor: `<path d="M28 40 V92 C28 100 92 100 92 92 V40" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/><ellipse cx="60" cy="40" rx="32" ry="9" fill="#eef1f4" stroke="#5b6773" stroke-width="2"/><path d="M50 30 h20 v6 h-20z" fill="#c3cbd3" stroke="#5b6773" stroke-width="1.6"/>
    ${[0, 1, 2, 3, 4].map(c => `<rect x="${33 + c * 11}" y="64" width="6" height="12" rx="2" fill="#5b6773"/>`).join('')}<path d="M28 58 C40 62 80 62 92 58" stroke="#5b6773" stroke-width="1.5" fill="none"/>`,
  bacia: `<ellipse cx="60" cy="48" rx="48" ry="14" fill="#eef1f4" stroke="#5b6773" stroke-width="2"/><path d="M12 48 C16 92 104 92 108 48" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/><ellipse cx="60" cy="48" rx="40" ry="10" fill="#dfe4e9" stroke="#8a96a2" stroke-width="1"/><path d="M26 58 C30 70 40 76 52 78" ${brilho} stroke-width="2"/>`,
  seringa: `<rect x="50" y="30" width="20" height="62" rx="2" fill="#f4f8fb" stroke="#5b6773" stroke-width="2"/><rect x="51.5" y="62" width="17" height="28.5" fill="#d6e7f3"/>
    <path d="M44 92 H76 M60 92 V108 M50 108 H70 M57 30 V20 H63 V30" stroke="#5b6773" stroke-width="2.4" fill="none" stroke-linecap="round"/><rect x="52" y="60" width="16" height="4" fill="#5b6773"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M50 ${36 + i * 9} h${i % 2 ? 5 : 8}" stroke="#5b6773" stroke-width="1.2"/>`).join('')}`,
  agulha: `<path d="M60 8 V66" stroke="url(#aco)" stroke-width="2.6" stroke-linecap="round"/><path d="M52 66 H68 L66 96 H54Z" fill="#7fb3d5" stroke="#3f6f91" stroke-width="2" stroke-linejoin="round"/><path d="M50 96 H70 V104 H50Z" fill="#7fb3d5" stroke="#3f6f91" stroke-width="2"/><path d="M58 70 V92" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`,
  luva: `<path d="M40 110 V70 C40 64 34 58 32 52 C30 46 34 42 38 46 L46 56 V22 C46 16 54 16 54 22 V48 V14 C54 8 62 8 62 14 V48 V18 C62 12 70 12 70 18 V50 V28 C70 22 78 22 78 28 V74 C78 86 74 94 74 110Z" fill="#9cc4e4" stroke="#3f6f91" stroke-width="2" stroke-linejoin="round"/><path d="M40 100 H74" stroke="#3f6f91" stroke-width="1.5"/>`,
  gaze: `<rect x="22" y="30" width="76" height="60" rx="3" fill="#fafafa" stroke="#5b6773" stroke-width="2"/>
    ${[1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${22 + i * 9.5} 30 V90" stroke="#c9d0d6" stroke-width="1"/>`).join('')}${[1, 2, 3, 4, 5].map(i => `<path d="M22 ${30 + i * 10} H98" stroke="#c9d0d6" stroke-width="1"/>`).join('')}
    <path d="M30 38 l60 0 l0 44 l-60 0z" fill="none" stroke="#5b6773" stroke-width="1" stroke-dasharray="3 3"/>`,
  mascara: `<path d="M22 46 C40 38 80 38 98 46 V74 C80 90 40 90 22 74Z" fill="#cfe3f2" stroke="#3f6f91" stroke-width="2" stroke-linejoin="round"/><path d="M24 56 C42 50 78 50 96 56 M24 66 C42 60 78 60 96 66" stroke="#3f6f91" stroke-width="1.3" fill="none"/>
    <path d="M22 50 C8 50 8 70 22 70 M98 50 C112 50 112 70 98 70" stroke="#5b6773" stroke-width="1.8" fill="none"/>`,
  avental: `<path d="M44 14 H76 L80 30 L100 40 L94 64 L84 60 V108 H36 V60 L26 64 L20 40 L40 30Z" fill="#cfe3f2" stroke="#3f6f91" stroke-width="2" stroke-linejoin="round"/><path d="M50 14 C52 24 68 24 70 14 M36 72 H84" stroke="#3f6f91" stroke-width="1.5" fill="none"/>`,
  espelho: `<path d="M60 112 V44" ${A} stroke-width="7"/><path d="M57 104 h6 M57 98 h6 M57 92 h6 M57 86 h6" ${B} stroke-width="1.4"/><circle cx="60" cy="26" r="15" fill="#e8f1f8" stroke="#5b6773" stroke-width="3"/><path d="M60 41 V44" stroke="#5b6773" stroke-width="3"/><path d="M52 20 C54 16 58 15 61 15" ${brilho} stroke-width="2"/>`,
  sonda: `<path d="M60 112 V30" ${A} stroke-width="7"/><path d="M57 100 h6 M57 94 h6 M57 88 h6" ${B} stroke-width="1.4"/><path d="M60 30 C60 16 70 10 76 16" stroke="url(#aco)" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  pincaodonto: `<path d="M44 112 L52 46 L68 20" ${A} stroke-width="5"/><path d="M56 112 L60 46 L72 24" ${A} stroke-width="5"/><path d="M46 96 l6 0 M47 88 l6 0 M48 80 l6 0" ${B} stroke-width="1.4"/>`,
  estante: `<path d="M14 54 H106 M14 84 H106 M18 54 V100 M102 54 V100" stroke="url(#aco)" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${26 + i * 13}" y="${24 + (i % 3) * 6}" width="8" height="${66 - (i % 3) * 6}" rx="4" fill="${i % 2 ? '#e8f1f8' : '#f6f8fa'}" stroke="#5b6773" stroke-width="1.6"/><rect x="${27 + i * 13}" y="${66}" width="6" height="${22}" rx="3" fill="${['#9cc4e4', '#d9a3a3', '#b5d3b0'][i % 3]}"/>`).join('')}`,
  cadinho: `<path d="M48 112 L58 40 L50 12 M72 112 L62 40 L70 12" ${A} stroke-width="5"/><circle cx="60" cy="40" r="3" fill="#5b6773"/><path d="M44 12 C46 4 54 4 56 12 M64 12 C66 4 74 4 76 12" stroke="#5b6773" stroke-width="2.4" fill="none"/>`,
  espatula: `<path d="M60 112 V44" ${A} stroke-width="5"/><path d="M52 44 C52 20 54 10 60 8 C66 10 68 20 68 44Z" fill="url(#acoF)" stroke="#5b6773" stroke-width="2"/><path d="M57 18 C56 26 56 34 57 40" ${brilho} stroke-width="1.5"/>`,
};

const defs = `<defs><linearGradient id="aco" gradientUnits="userSpaceOnUse" x1="30" y1="0" x2="90" y2="120"><stop offset="0" stop-color="#b9c3cc"/><stop offset=".45" stop-color="#6f7c88"/><stop offset=".55" stop-color="#9aa6b1"/><stop offset="1" stop-color="#4f5b66"/></linearGradient>
<linearGradient id="acoF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e8ec"/><stop offset=".6" stop-color="#b7c1ca"/><stop offset="1" stop-color="#94a0ab"/></linearGradient></defs>`;

export const ilustra = (nome, rotulo = '') => `<svg class="ilu" viewBox="0 0 120 120" role="img" aria-label="${rotulo}">${defs}${desenhos[nome]}</svg>`;
