// DHT: menu do celular, lista de cotação (fica salva no navegador), filtros do catálogo, abas e envio da cotação.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const corpo = document.body;
  const base = '/' + location.pathname.split('/')[1] + '/';

  // Menu
  const botao = $('[data-menu]');
  if (botao) botao.addEventListener('click', () => {
    const aberto = corpo.classList.toggle('menu-aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // Lista de cotação
  const CHAVE = 'dht-cotacao';
  const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch (e) { return []; } };
  const salvar = l => { try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch (e) {} atualizar(); };
  let lista = ler();

  let aviso;
  const avisar = txt => {
    if (!aviso) { aviso = document.createElement('div'); aviso.className = 'aviso'; aviso.setAttribute('role', 'status'); corpo.appendChild(aviso); }
    aviso.innerHTML = `<span>${txt}</span><a href="${base}contato/">Ver cotação →</a>`;
    aviso.classList.add('ver'); clearTimeout(aviso.t); aviso.t = setTimeout(() => aviso.classList.remove('ver'), 3200);
  };

  function atualizar() {
    lista = ler();
    $$('[data-contador]').forEach(c => c.textContent = lista.length);
    $$('.add-cot').forEach(b => {
      const tem = lista.some(i => i.cod === b.dataset.cod);
      b.classList.toggle('na-lista', tem);
      const t = $('.add-txt', b); if (t) t.textContent = tem ? 'Na cotação' : 'Adicionar à cotação';
      $('.add-mais', b).textContent = tem ? '✓' : '+';
    });
    const caixa = $('[data-lista]');
    if (caixa) {
      if (!lista.length) caixa.innerHTML = caixa.dataset.vazio || caixa.innerHTML;
      else caixa.innerHTML = `<h3>Sua lista (${lista.length} ${lista.length > 1 ? 'itens' : 'item'})</h3><ul>${lista.map(i => `<li><b>${i.cod}</b><span>${i.nome}</span><input aria-label="Quantidade de ${i.nome}" inputmode="numeric" value="${i.qtd || ''}" placeholder="Qtd." data-qtd="${i.cod}"><button type="button" aria-label="Tirar ${i.nome} da lista" data-tirar="${i.cod}">×</button></li>`).join('')}</ul>`;
    }
  }
  const caixa = $('[data-lista]'); if (caixa) caixa.dataset.vazio = caixa.innerHTML;

  document.addEventListener('click', e => {
    const b = e.target.closest('.add-cot');
    if (b) {
      const l = ler(), i = l.findIndex(x => x.cod === b.dataset.cod);
      if (i >= 0) l.splice(i, 1); else { l.push({ cod: b.dataset.cod, nome: b.dataset.nome }); avisar(`${b.dataset.nome} adicionado à cotação.`); }
      salvar(l); return;
    }
    const t = e.target.closest('[data-tirar]');
    if (t) salvar(ler().filter(x => x.cod !== t.dataset.tirar));
  });
  document.addEventListener('input', e => {
    const q = e.target.closest('[data-qtd]'); if (!q) return;
    const l = ler(); const it = l.find(x => x.cod === q.dataset.qtd); if (it) { it.qtd = q.value; try { localStorage.setItem(CHAVE, JSON.stringify(l)); } catch (er) {} }
  });
  atualizar();

  // Envio da cotação: monta a mensagem e abre o WhatsApp ou o e-mail
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const via = (e.submitter && e.submitter.dataset.via) || 'zap';
    const d = Object.fromEntries(new FormData(f));
    const itens = ler().map(i => `• ${i.cod} ${i.nome}${i.qtd ? ' — ' + i.qtd + ' un.' : ''}`).join('\n');
    const txt = `Cotação pelo site\n\nNome: ${d.nome}\nEmpresa: ${d.empresa}${d.cnpj ? '\nCNPJ: ' + d.cnpj : ''}${d.cidade ? '\nCidade: ' + d.cidade : ''}\nE-mail: ${d.email}${d.telefone ? '\nTelefone: ' + d.telefone : ''}${itens ? '\n\nProdutos:\n' + itens : ''}${d.mensagem ? '\n\nObservações:\n' + d.mensagem : ''}`;
    if (via === 'email') location.href = `mailto:${corpo.dataset.email}?subject=${encodeURIComponent('Cotação pelo site · ' + d.empresa)}&body=${encodeURIComponent(txt)}`;
    else window.open(`https://wa.me/${corpo.dataset.zap}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
  }));

  // Versão A: filtros por linha e busca no catálogo
  const catalogo = $('[data-catalogo]');
  const resultado = $('[data-resultado]');
  const sem = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  if (catalogo) {
    const q = new URLSearchParams(location.search).get('q') || '';
    const campo = $('#q'); if (campo) campo.value = q;
    let linhaAtiva = '';
    const filtrar = () => {
      const termo = sem(campo ? campo.value : q);
      let n = 0;
      $$('.produto', catalogo).forEach(p => {
        const ok = (!linhaAtiva || p.dataset.linha === linhaAtiva) && (!termo || sem(p.dataset.busca).includes(termo));
        p.hidden = !ok; if (ok) n++;
      });
      resultado.textContent = termo || linhaAtiva ? `${n} ${n === 1 ? 'produto encontrado' : 'produtos encontrados'}` : '';
    };
    $$('[data-filtro]').forEach(b => b.addEventListener('click', () => {
      linhaAtiva = b.dataset.filtro; $$('[data-filtro]').forEach(x => x.classList.toggle('ativo', x === b)); filtrar();
    }));
    if (campo) { campo.addEventListener('input', filtrar); campo.form && campo.form.addEventListener('submit', e => { e.preventDefault(); filtrar(); }); }
    filtrar();
  }

  // Versão B: busca na tabela e abas
  const buscaTab = $('[data-busca-tabela]');
  if (buscaTab) {
    const filtrar = () => {
      const termo = sem(buscaTab.value); let n = 0;
      $$('tr[data-busca]').forEach(tr => { const ok = !termo || sem(tr.dataset.busca).includes(termo); tr.hidden = !ok; if (ok) n++; });
      $$('[data-grupo]').forEach(g => g.hidden = !$$('tr[data-busca]', g).some(tr => !tr.hidden));
      resultado.textContent = termo ? `${n} ${n === 1 ? 'produto encontrado' : 'produtos encontrados'}` : '';
    };
    buscaTab.addEventListener('input', filtrar);
  }
  $$('[data-aba]').forEach(a => a.addEventListener('click', () => {
    $$('[data-aba]').forEach(x => { x.classList.toggle('ativa', x === a); x.setAttribute('aria-selected', x === a); });
    $$('[data-painel]').forEach(p => p.hidden = p.dataset.painel !== a.dataset.aba);
  }));
})();
