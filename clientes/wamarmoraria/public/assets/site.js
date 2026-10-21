// W&A: menu do celular, mostruário de pedras, pedra escolhida no orçamento e envio dos formulários por e-mail.
(() => {
  const EMAIL = 'contato@wamarmoraria.com.br';
  const bt = document.querySelector('.menu-bt'), menu = document.getElementById('menu');
  if (bt && menu) bt.addEventListener('click', () => {
    const aberto = bt.getAttribute('aria-expanded') === 'true';
    bt.setAttribute('aria-expanded', String(!aberto)); menu.classList.toggle('aberto', !aberto); document.body.classList.toggle('menu-aberto', !aberto);
  });

  document.querySelectorAll('[data-most]').forEach(box => {
    const bts = box.querySelectorAll('[data-most-bt]');
    bts.forEach(b => b.addEventListener('click', () => {
      const i = b.dataset.mostBt;
      bts.forEach(x => x.setAttribute('aria-selected', String(x === b)));
      box.querySelectorAll('[data-most-img]').forEach(el => { el.hidden = el.dataset.mostImg !== i; });
      box.querySelectorAll('[data-most-info]').forEach(el => { el.hidden = el.dataset.mostInfo !== i; });
    }));
  });

  const pedra = new URLSearchParams(location.search).get('pedra');
  const sel = document.querySelector('[data-pedra-sel]');
  if (pedra && sel) for (const o of sel.options) if (o.text.startsWith(pedra)) { sel.value = o.value; break; }

  document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const linhas = [...new FormData(f)].filter(([, v]) => String(v).trim()).map(([k, v]) => `${k}: ${v}`);
    const nome = f.querySelector('[name=Nome]')?.value || '';
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${f.dataset.form} pelo site · ${nome}`)}&body=${encodeURIComponent(linhas.join('\n'))}`;
    if (!f.querySelector('.form-ok')) f.insertAdjacentHTML('beforeend', `<p class="form-ok" role="status">Abrimos o seu e-mail com a mensagem pronta. Se nada abriu, escreva para <a href="mailto:${EMAIL}">${EMAIL}</a> ou ligue (19) 3254-3851.</p>`);
  }));
})();
