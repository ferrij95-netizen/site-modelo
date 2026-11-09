// Régua de bitolas: o círculo do arame cresce em proporção à maior bitola (32,00 mm).
(() => {
  document.querySelectorAll('[data-regua]').forEach(r => {
    const inp = r.querySelector('input'), fio = r.querySelector('.rg-fio'), val = r.querySelector('.rg-val span');
    const at = () => {
      const d = Number(inp.value);
      fio.setAttribute('r', (96 * d / 32).toFixed(2));
      val.textContent = d.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      inp.style.setProperty('--p', `${((d - 1.8) / (32 - 1.8) * 100).toFixed(1)}%`);
      inp.setAttribute('aria-valuetext', `${val.textContent} milímetros`);
    };
    inp.addEventListener('input', at); at();
  });
})();
