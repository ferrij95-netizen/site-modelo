// Menu do celular.
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
}

// Topo da versão B: fica sólido ao rolar.
const topo = document.querySelector('.topo-sobre');
if (topo) {
  const f = () => topo.classList.toggle('solido', scrollY > 40);
  addEventListener('scroll', f, { passive: true }); f();
}

// Acesso restrito: ainda não ligado ao sistema da empresa.
document.querySelectorAll('[data-acesso]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('.acesso-aviso').hidden = false;
}));

// Vídeos do YouTube: só carregam ao clicar.
document.querySelectorAll('[data-yt]').forEach(b => b.addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
  f.allow = 'autoplay; encrypted-media; picture-in-picture';
  f.allowFullscreen = true;
  f.title = b.getAttribute('aria-label') || 'Vídeo';
  f.className = 'video-frame';
  b.replaceWith(f);
}));

// Depoimentos em giro (home A).
document.querySelectorAll('[data-giro]').forEach(g => {
  const itens = [...g.querySelectorAll('.giro-item')];
  const n = g.querySelector('[data-giro-n]');
  let i = 0;
  const vai = d => { itens[i].hidden = true; i = (i + d + itens.length) % itens.length; itens[i].hidden = false; n.textContent = `${i + 1} / ${itens.length}`; };
  g.querySelector('[data-giro-ant]').addEventListener('click', () => vai(-1));
  g.querySelector('[data-giro-prox]').addEventListener('click', () => vai(1));
});

// Formulários: abrem o e-mail já endereçado à filial escolhida.
const enviar = (id, assunto, campos) => {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const corpo = campos.map(([k, r]) => `${r}: ${d.get(k) || '-'}`).join('\n');
    location.href = `mailto:${d.get('filial')}?subject=${encodeURIComponent(assunto(d))}&body=${encodeURIComponent(corpo)}`;
  });
};
enviar('form-contato', d => `${d.get('assunto')} · site Três Américas`, [['nome', 'Nome'], ['email', 'E-mail'], ['telefone', 'Telefone'], ['departamento', 'Departamento'], ['mensagem', 'Mensagem']]);
enviar('form-vaga', d => `Trabalhe conosco: ${d.get('area')} · ${d.get('nome')}`, [['nome', 'Nome'], ['email', 'E-mail'], ['telefone', 'Telefone'], ['nascimento', 'Nascimento'], ['cidade', 'Cidade'], ['uf', 'UF'], ['categoria', 'Categoria'], ['area', 'Área'], ['apresentacao', 'Apresentação']]);
