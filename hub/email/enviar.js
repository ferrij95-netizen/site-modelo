// Envio pelo e-mail da Overtus (joaovitor@overtus.com.br) a partir de outras telas do hub, como o follow-up da página inicial.
// window.HubEmail.enviar({para, assunto, corpo, empresaId}) -> Promise. Sempre pergunta antes de enviar; se o João
// cancelar, a Promise falha com "Envio cancelado" e nada sai. Usa a mesma /api/email/enviar da aba E-mail (src/email.js).
(() => {
  window.HubEmail = {
    async enviar({ para, assunto, corpo } = {}) {
      para = String(para || '').trim();
      if (!/@/.test(para)) throw new Error('Falta o e-mail do contato');
      const ok = confirm(`Enviar este e-mail agora pela caixa joaovitor@overtus.com.br?\n\nPara: ${para}\nAssunto: ${assunto || '(sem assunto)'}\n\nDepois de enviado não dá para desfazer.`);
      if (!ok) throw new Error('Envio cancelado');
      const r = await fetch('/api/email/enviar', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ para, assunto: assunto || '', texto: corpo || '' }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 401) throw new Error('Sessão expirada, entre de novo no hub');
      if (d.code === 'sem_token') throw new Error('O e-mail ainda não está ligado ao hub');
      if (!r.ok) throw new Error(d.erro || 'Erro ' + r.status);
      return d;
    },
  };
})();
