// Peças visuais comuns às duas versões: marca, desenhos técnicos do sensor, sinais ao vivo e painel da ala.

export const marca = (cls = '') => `<span class="marca ${cls}"><svg viewBox="0 0 28 24" aria-hidden="true"><path d="M1 14h6V3h6v18h6V9h8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="miter"/></svg><span>DHT</span></span>`;

// Vista de topo do sensor, em linguagem de documentação técnica.
export function desenhoTopo({ cotas = true, chamadas = true } = {}) {
  const ch = chamadas ? `
    <g class="chamada"><path d="M455 430 L640 300 H760"/><circle cx="455" cy="430" r="5"/><text x="760" y="290" text-anchor="end">Janela óptica PPG</text></g>
    <g class="chamada"><path d="M400 668 L640 760 H760"/><circle cx="400" cy="668" r="5"/><text x="760" y="750" text-anchor="end">LED de estado</text></g>
    <g class="chamada"><path d="M572 560 L660 560 H760"/><circle cx="572" cy="560" r="5"/><text x="760" y="550" text-anchor="end">Botão de evento</text></g>
    <g class="chamada"><path d="M310 880 L120 940 H40"/><circle cx="310" cy="880" r="5"/><text x="40" y="930">Pulseira têxtil</text></g>` : '';
  const ct = cotas ? `
    <g class="cota"><path d="M235 248 H565 M235 236 V260 M565 236 V260"/><text x="400" y="232" text-anchor="middle">42 mm</text></g>
    <g class="cota"><path d="M180 290 V710 M168 290 H192 M168 710 H192"/><text x="160" y="500" text-anchor="middle" transform="rotate(-90 160 500)">54 mm</text></g>` : '';
  return `<svg class="desenho" viewBox="0 0 800 1000" role="img" aria-label="Desenho técnico do sensor DHT visto de cima">
  <defs><pattern id="trama" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 5h10M5 0v10" stroke="currentColor" stroke-width=".6" opacity=".35"/></pattern></defs>
  <g class="linha">
    <rect x="285" y="0" width="230" height="1000" fill="url(#trama)"/>
    <path d="M285 0 V1000 M515 0 V1000"/>
    <rect x="235" y="290" width="330" height="420" rx="104" class="corpo"/>
    <rect x="252" y="307" width="296" height="386" rx="90" class="fino"/>
    <ellipse cx="400" cy="480" rx="96" ry="150" class="visor"/>
    <ellipse cx="400" cy="480" rx="70" ry="122" class="fino"/>
    <circle cx="400" cy="668" r="7"/>
    <rect x="563" y="535" width="10" height="50" rx="4"/>
    <path class="eixo" d="M400 270 V730 M215 500 H585"/>
  </g>${ct}${ch}
</svg>`;
}

// Vista lateral, para o trilho de especificações.
export function desenhoLado() {
  return `<svg class="desenho" viewBox="0 0 800 420" role="img" aria-label="Desenho técnico do sensor DHT visto de lado">
  <g class="linha">
    <path d="M0 262 H800 M0 280 H800" />
    <path d="M190 262 Q190 170 290 170 H510 Q610 170 610 262 Z" class="corpo"/>
    <path d="M300 170 Q300 148 330 148 H470 Q500 148 500 170" class="visor"/>
    <path d="M205 225 H595" class="fino"/>
    <path class="eixo" d="M400 120 V300"/>
  </g>
  <g class="cota"><path d="M660 148 V262 M648 148 H672 M648 262 H672"/><text x="690" y="212">11 mm</text></g>
  <g class="cota"><path d="M190 330 H610 M190 318 V342 M610 318 V342"/><text x="400" y="372" text-anchor="middle">54 mm</text></g>
  <g class="chamada"><path d="M400 148 L400 70 H120"/><circle cx="400" cy="148" r="5"/><text x="120" y="58">Visor em vidro temperado</text></g>
  <g class="chamada"><path d="M260 268 L160 360 H40"/><circle cx="260" cy="268" r="5"/><text x="40" y="350">Sensor de temperatura de contato</text></g>
</svg>`;
}

// Sinais ao vivo: o JS desenha as curvas no canvas; sem JS fica a legenda.
export const sinais = [
  ['ecg', 'FC', '72', 'bpm'],
  ['pleth', 'SpO₂', '98', '%'],
  ['resp', 'FR', '16', 'irpm'],
  ['temp', 'TEMP', '36,7', '°C'],
];
export function monitor(cls = '') {
  return `<div class="monitor ${cls}" aria-label="Sinais vitais de um paciente em tempo real">
  ${sinais.map(([t, n, v, u]) => `<div class="canal"><div class="leitura"><span class="nome">${n}</span><span class="valor" data-v="${v}" data-t="${t}">${v}</span><span class="unid">${u}</span></div><canvas data-onda="${t}"></canvas></div>`).join('\n  ')}
</div>`;
}

// Painel da ala (interface da plataforma), em HTML para ficar nítido em qualquer tela.
const leitos = [
  ['01', 'A. M. S.', 76, 97, 15, '36,5', 0], ['02', 'J. P. R.', 88, 95, 18, '37,1', 1], ['03', 'L. C. F.', 64, 98, 14, '36,4', 0],
  ['04', 'R. T. O.', 112, 91, 24, '38,2', 6], ['05', 'M. E. B.', 70, 99, 16, '36,6', 0], ['06', 'C. A. L.', 95, 94, 20, '37,4', 3],
  ['07', 'F. G. N.', 68, 97, 15, '36,8', 0], ['08', 'S. R. D.', 81, 96, 17, '36,9', 1],
];
const spark = seed => {
  let y = 20, d = 'M0 20';
  for (let x = 4; x <= 120; x += 4) { y = Math.max(4, Math.min(36, y + Math.sin(x * 0.37 + seed) * 4 + Math.cos(x * 0.11 * seed) * 2)); d += ` L${x} ${y.toFixed(1)}`; }
  return `<svg viewBox="0 0 120 40" preserveAspectRatio="none"><path d="${d}"/></svg>`;
};
export function painel(cls = '') {
  return `<div class="painel ${cls}" role="img" aria-label="Painel da plataforma DHT com oito leitos, um deles em alerta">
  <div class="painel-topo"><span>ALA 3B · CLÍNICA MÉDICA</span><span>8 LEITOS · 1 ALERTA</span><span class="hora" data-relogio>22:14</span></div>
  <div class="painel-grade">
  ${leitos.map(([l, p, fc, sp, fr, t, news], i) => `<div class="leito${news >= 5 ? ' alerta' : ''}">
    <div class="leito-cab"><span>LEITO ${l}</span><span>NEWS2 ${news}</span></div>
    <div class="leito-pac">${p}</div>
    ${spark(i + 1.3)}
    <dl><div><dt>FC</dt><dd>${fc}</dd></div><div><dt>SpO₂</dt><dd>${sp}</dd></div><div><dt>FR</dt><dd>${fr}</dd></div><div><dt>T</dt><dd>${t}</dd></div></dl>
  </div>`).join('\n  ')}
  </div>
</div>`;
}
