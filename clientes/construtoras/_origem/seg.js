// Demonstração da tabela de disponibilidade: escolher uma unidade mostra os detalhes; "Reservar" muda o status só nesta tela.
(() => {
  const NOME = { disponivel: 'Disponível', reservado: 'Reservado', vendido: 'Vendido' };
  document.querySelectorAll('[data-espelho]').forEach(esp => {
    const botoes = [...esp.querySelectorAll('.esp-u')];
    const campo = n => esp.querySelector(`[data-campo="${n}"]`);
    const reservar = esp.querySelector('[data-reservar]');
    const msg = esp.querySelector('[data-msg]');
    let atual = null;

    const contar = () => ['disponivel', 'reservado', 'vendido'].forEach(s => {
      esp.querySelector(`[data-conta="${s}"]`).textContent = botoes.filter(b => b.dataset.s === s).length;
    });
    const mostrar = b => {
      if (atual) atual.setAttribute('aria-pressed', 'false');
      atual = b;
      b.setAttribute('aria-pressed', 'true');
      const n = b.dataset.n;
      campo('n').textContent = n;
      campo('s').textContent = NOME[b.dataset.s];
      campo('s').dataset.s = b.dataset.s;
      campo('t').textContent = b.dataset.t;
      campo('m').textContent = b.dataset.m;
      campo('p').textContent = `Final 0${n.slice(-1)}, ${n.slice(0, -2)}º andar`;
      reservar.disabled = b.dataset.s !== 'disponivel';
      reservar.textContent = b.dataset.s === 'disponivel' ? 'Reservar unidade' : b.dataset.s === 'reservado' ? 'Unidade já reservada' : 'Unidade vendida';
      msg.textContent = '';
    };
    botoes.forEach(b => b.addEventListener('click', () => mostrar(b)));
    reservar.addEventListener('click', () => {
      if (!atual || atual.dataset.s !== 'disponivel') return;
      atual.dataset.s = 'reservado';
      atual.className = 'esp-u u-reservado';
      atual.setAttribute('aria-label', `Unidade ${atual.dataset.n}, Reservado`);
      contar();
      mostrar(atual);
      msg.textContent = 'Reserva registrada nesta demonstração. No sistema real, equipe, parceiros e diretoria veem a mudança na hora.';
    });
    // Começa com a primeira unidade disponível de um andar intermediário.
    mostrar(botoes.find(b => b.dataset.s === 'disponivel' && +b.dataset.n.slice(0, -2) <= 8) || botoes[0]);
  });
})();

// Catálogo com lista de cotação (indústrias): busca, filtro por linha, quantidades, anexo e envio só nesta tela.
(() => {
  document.querySelectorAll('[data-cotacao]').forEach(box => {
    const tx = box.dataset;
    const itens = [...box.querySelectorAll('.cot-lista li')];
    const busca = box.querySelector('[data-busca]');
    const filtros = [...box.querySelectorAll('[data-linha]')];
    const lista = box.querySelector('[data-itens]');
    const vazio = box.querySelector('[data-vazio]');
    const total = box.querySelector('[data-total]');
    const enviar = box.querySelector('[data-enviar]');
    const msg = box.querySelector('[data-msg]');
    const anexo = box.querySelector('[data-anexo]');
    const arquivos = box.querySelector('[data-arquivos]');
    const nada = box.querySelector('[data-nada]');
    const escolhidos = new Map();
    let linha = '';

    const filtrar = () => {
      const q = busca.value.trim().toLowerCase();
      let visiveis = 0;
      itens.forEach(li => {
        const ok = (!linha || li.dataset.l === linha) && (!q || li.dataset.txt.includes(q));
        li.hidden = !ok;
        if (ok) visiveis++;
      });
      nada.hidden = visiveis > 0;
    };
    const desenhar = () => {
      lista.innerHTML = '';
      escolhidos.forEach((qtd, cod) => {
        const li = itens.find(i => i.dataset.cod === cod);
        const item = document.createElement('li');
        item.innerHTML = `<span><code></code><b></b></span><input type="number" min="1" step="1" inputmode="numeric"><button type="button">×</button>`;
        item.querySelector('code').textContent = cod;
        item.querySelector('b').textContent = li.dataset.nome;
        const inp = item.querySelector('input');
        inp.value = qtd;
        inp.setAttribute('aria-label', `${tx.txQtd}: ${li.dataset.nome}`);
        inp.addEventListener('change', () => { escolhidos.set(cod, Math.max(1, parseInt(inp.value, 10) || 1)); inp.value = escolhidos.get(cod); });
        const rem = item.querySelector('button');
        rem.setAttribute('aria-label', `${tx.txRemover}: ${li.dataset.nome}`);
        rem.addEventListener('click', () => alternar(li));
        lista.appendChild(item);
      });
      total.textContent = escolhidos.size;
      vazio.hidden = escolhidos.size > 0;
      enviar.disabled = escolhidos.size === 0;
    };
    const alternar = li => {
      const cod = li.dataset.cod;
      const botao = li.querySelector('[data-add]');
      if (escolhidos.has(cod)) { escolhidos.delete(cod); li.classList.remove('na-lista'); botao.textContent = tx.txAdd; }
      else { escolhidos.set(cod, 1); li.classList.add('na-lista'); botao.textContent = tx.txNaLista; }
      msg.textContent = '';
      desenhar();
    };

    itens.forEach(li => li.querySelector('[data-add]').addEventListener('click', () => alternar(li)));
    busca.addEventListener('input', filtrar);
    filtros.forEach(b => b.addEventListener('click', () => {
      linha = b.dataset.linha;
      filtros.forEach(f => f.setAttribute('aria-pressed', f === b));
      filtrar();
    }));
    anexo.addEventListener('change', () => {
      const n = anexo.files.length;
      if (n) arquivos.textContent = n === 1 ? anexo.files[0].name : `${n} ${tx.txArquivos}`;
    });
    enviar.addEventListener('click', () => { msg.textContent = tx.txEnviado; });
    // Começa com dois itens na lista, para mostrar como fica.
    itens.slice(0, 1).concat(itens.slice(4, 5)).forEach(alternar);
    msg.textContent = '';
  });
})();

// O site por dentro: abas acessíveis (clique e setas do teclado).
(() => {
  document.querySelectorAll('[data-anatomia]').forEach(box => {
    const abas = [...box.querySelectorAll('[role="tab"]')];
    const mostrar = (aba, foco) => {
      abas.forEach(a => {
        const sel = a === aba;
        a.setAttribute('aria-selected', sel);
        a.tabIndex = sel ? 0 : -1;
        document.getElementById(a.getAttribute('aria-controls')).hidden = !sel;
      });
      if (foco) aba.focus();
    };
    abas.forEach((a, i) => {
      a.addEventListener('click', () => mostrar(a));
      a.addEventListener('keydown', e => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        mostrar(abas[(i + d + abas.length) % abas.length], true);
      });
    });
  });
})();
