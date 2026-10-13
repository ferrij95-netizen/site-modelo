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
