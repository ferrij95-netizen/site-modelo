// Página "Para ligar" do hub (hub.overtus.com.br/ligar/): as empresas que a linha de produção deixou prontas.
// Para cada uma: telefone, WhatsApp, links das duas versões e do site atual, problemas do site atual e o script adaptado.
// Os dados vêm de clientes/<cliente>/ligacao.json (escrito por linha/etapas/publicar.mjs).

const tel = t => { const d = String(t).replace(/\D/g, ''); return d.length >= 12 ? '+' + d : '+55' + d; };
const zap = t => { const d = String(t).replace(/.*phone=/, '').replace(/.*wa\.me\//, '').replace(/\D/g, ''); return d.length <= 11 ? '55' + d : d; };

export function paginaLigar(clientes, esc) {
  const ordem = [...clientes].sort((a, b) => (b.ligacao.nota_visual ?? 0) - (a.ligacao.nota_visual ?? 0));
  const item = c => {
    const l = c.ligacao;
    return `<a class="item" href="#${esc(c.slug)}" data-id="${esc(c.slug)}"><b>${esc(l.empresa)}</b><span>${esc([l.cidade, l.uf].filter(Boolean).join('/'))} · ${esc(l.segmento || '')}</span><em>${esc(l.telefones[0] || 'sem telefone')}</em></a>`;
  };
  const bloco = (titulo, texto) => texto ? `<section><h3>${titulo}</h3><p>${esc(texto).replace(/\n/g, '<br>')}</p></section>` : '';
  const detalhe = c => {
    const l = c.ligacao, s = l.script;
    return `<article class="ficha" id="${esc(c.slug)}">
  <header>
    <div><h2>${esc(l.empresa)}</h2><p>${esc([l.cidade, l.uf].filter(Boolean).join('/'))} · ${esc(l.segmento || '')}${l.nota_visual != null ? ` · site atual nota ${l.nota_visual}/10` : ''}</p></div>
    <div class="acoes">
      ${l.telefones.map(t => `<a class="ligar" href="tel:${tel(t)}">Ligar ${esc(t)}</a>`).join('')}
      ${l.whatsapp ? `<a href="https://wa.me/${zap(l.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
      ${l.email ? `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>` : ''}
    </div>
  </header>
  <div class="links"><a href="${esc(l.preview.a)}" target="_blank" rel="noopener">Versão A</a><a href="${esc(l.preview.b)}" target="_blank" rel="noopener">Versão B</a><a href="${esc(l.preview.escolha)}" target="_blank" rel="noopener">Página de escolha</a><a href="${esc(l.site_atual)}" target="_blank" rel="noopener">Site atual</a></div>
  ${l.alertas?.length ? `<section class="alerta"><h3>Conferir antes de ligar (revisão automática)</h3><ul>${l.alertas.map(p => `<li>${esc(p)}</li>`).join('')}</ul></section>` : ''}
  ${l.problemas?.length ? `<section class="prob"><h3>Problemas do site atual (para citar)</h3><ul>${l.problemas.map(p => `<li>${esc(p)}</li>`).join('')}</ul></section>` : ''}
  ${l.melhor_horario ? `<p class="hora">Melhor horário: ${esc(l.melhor_horario)}</p>` : ''}
  ${bloco('1. Recepção', s.recepcao)}
  ${bloco('2. Decisor', s.decisor)}
  ${bloco('Pitch', s.pitch)}
  ${bloco('Pedido', s.pedido)}
  ${s.objecoes?.length ? `<section><h3>Objeções</h3>${s.objecoes.map(o => `<details><summary>${esc(o.objecao)}</summary><p>${esc(o.resposta)}</p></details>`).join('')}</section>` : ''}
  <section><h3>Mensagem de WhatsApp com os links</h3><p class="msg">${esc(s.whatsapp).replace(/\n/g, '<br>')}</p><button data-copiar="${esc(s.whatsapp)}">Copiar mensagem</button></section>
  ${bloco('Follow-up no dia seguinte', s.followup)}
</article>`;
  };

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Overtus · Para ligar</title>
<link rel="manifest" href="/app/manifest.json">
<link rel="icon" href="/app/favicon-48.png">
<style>
  /* Cabe na janela: lista à esquerda e ficha à direita, cada uma rola por dentro. */
  :root { --navy:#182644; --areia:#f7f3f0; --laranja:#ed9454; --ink:#16181b; --muted:#6b7079; --line:#e6e1dc; }
  * { box-sizing:border-box; }
  html, body { height:100%; margin:0; }
  body { font:15px/1.55 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color:var(--ink); background:var(--areia); display:grid; grid-template-rows:auto 1fr; height:100dvh; }
  .topo { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px clamp(12px, 2vw, 24px); background:var(--navy); color:#fff; }
  .topo h1 { margin:0; font-size:18px; }
  .topo a { color:#fff; opacity:.8; font-size:14px; }
  .corpo { display:grid; grid-template-columns:minmax(260px, 340px) 1fr; min-height:0; }
  .lista { overflow:auto; border-right:1px solid var(--line); background:#fff; }
  .item { display:grid; gap:1px; padding:12px 16px; border-bottom:1px solid var(--line); text-decoration:none; color:inherit; }
  .item span, .item em { color:var(--muted); font-size:13px; font-style:normal; }
  .item em { color:var(--navy); font-weight:600; }
  .item.ativo { background:var(--areia); box-shadow:inset 4px 0 0 var(--laranja); }
  .fichas { overflow:auto; padding:clamp(14px, 2.4vw, 32px); }
  .ficha { display:none; max-width:900px; }
  .ficha.ativa { display:block; }
  .ficha header { display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px; align-items:flex-start; }
  .ficha h2 { margin:0; font-size:24px; color:var(--navy); }
  .ficha header p { margin:2px 0 0; color:var(--muted); }
  .acoes, .links { display:flex; flex-wrap:wrap; gap:8px; }
  .acoes a, .links a, button { padding:8px 14px; border-radius:8px; border:1px solid var(--line); background:#fff; color:var(--ink); text-decoration:none; font:600 14px/1.2 inherit; cursor:pointer; }
  .acoes a.ligar { background:var(--laranja); border-color:var(--laranja); color:#fff; }
  .links { margin:14px 0 6px; }
  .links a { background:var(--navy); border-color:var(--navy); color:#fff; }
  section { background:#fff; border:1px solid var(--line); border-radius:10px; padding:14px 18px; margin-top:12px; }
  section h3 { margin:0 0 6px; font-size:13px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); }
  section p { margin:0; }
  .prob { border-color:var(--laranja); }
  .alerta { border-color:#c0392b; background:#fdf0ee; }
  .prob ul { margin:0; padding-left:18px; }
  .hora { margin:12px 0 0; font-weight:600; color:var(--navy); }
  details { border-top:1px solid var(--line); padding:8px 0; }
  details:first-of-type { border-top:0; }
  summary { cursor:pointer; font-weight:600; }
  details p { margin-top:6px; }
  .msg { white-space:normal; background:var(--areia); padding:10px 12px; border-radius:8px; margin-bottom:8px !important; }
  .vazio { color:var(--muted); padding:40px; }
  @media (max-width:760px) {
    body { height:auto; display:block; }
    .corpo { display:block; }
    .lista { max-height:40vh; border-right:0; border-bottom:1px solid var(--line); }
  }
</style>
</head>
<body>
<div class="topo"><h1>Para ligar · ${ordem.length} ${ordem.length === 1 ? 'empresa' : 'empresas'}</h1><a href="/">Voltar ao hub</a></div>
<div class="corpo">
  <nav class="lista">${ordem.map(item).join('') || '<p class="vazio">Nenhuma empresa pronta ainda.</p>'}</nav>
  <main class="fichas">${ordem.map(detalhe).join('\n')}</main>
</div>
<script>
  // Mostra a ficha do endereço (#cliente) ou a primeira; botão copia a mensagem de WhatsApp.
  function mostra() {
    const id = decodeURIComponent(location.hash.slice(1)) || document.querySelector('.item')?.dataset.id;
    document.querySelectorAll('.ficha').forEach(f => f.classList.toggle('ativa', f.id === id));
    document.querySelectorAll('.item').forEach(i => i.classList.toggle('ativo', i.dataset.id === id));
    document.querySelector('.fichas').scrollTop = 0;
  }
  addEventListener('hashchange', mostra); mostra();
  document.querySelectorAll('[data-copiar]').forEach(b => b.addEventListener('click', async () => {
    await navigator.clipboard.writeText(b.dataset.copiar); b.textContent = 'Copiada';
    setTimeout(() => (b.textContent = 'Copiar mensagem'), 1500);
  }));
</script>
</body>
</html>
`;
}
