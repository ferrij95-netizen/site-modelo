// Tela da área do cliente das oficinas (src/oficina.js). Uma página só, feita para o celular primeiro.
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function painelOficinaHtml(cfg, rotulos) {
  const dados = JSON.stringify({ nome: cfg.nome, curto: cfg.curto, whatsapp: cfg.whatsapp, endereco: cfg.endereco, avaliacao: cfg.avaliacao, servicos: cfg.servicos, rotulos }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#0A0A0B">
<title>Área do cliente · ${esc(cfg.nome)}</title>
<link rel="manifest" href="/admin/app.webmanifest">
<link rel="icon" href="/admin/icone.svg">
<link rel="apple-touch-icon" href="/admin/icone.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<style>
:root{--preto:#0A0A0B;--noite:#111113;--g1:#18181B;--g2:#222227;--g3:#2C2C32;--prata:#C9CCD1;--claro:#ECEDEF;--suave:#9A9DA4;--linha:rgba(201,204,209,.16);
--cromo:linear-gradient(180deg,#FFFFFF 0%,#D9DCE1 45%,#A4A9B1 52%,#E9EBEE 100%);--ok:#5CC28A;--wa:#25D366;--alerta:#E8B04B;--erro:#EF6B6B;
--ser:'Cormorant Garamond',Georgia,serif;--txt:'Inter',system-ui,Arial,sans-serif;--r:14px}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{font-variant-numeric:lining-nums;background:var(--preto);color:#DADCE0;font:400 15px/1.5 var(--txt);min-height:100dvh;-webkit-font-smoothing:antialiased}
button,input,select,textarea{font:inherit;color:inherit}
button{cursor:pointer;border:0;background:none}
a{color:inherit}
h1,h2,h3{font-family:var(--ser);font-weight:600;color:var(--claro);letter-spacing:.01em}
.olho{font:600 11px/1 var(--txt);letter-spacing:.28em;text-transform:uppercase;color:var(--suave)}
[hidden]{display:none!important}

/* Login */
.login{min-height:100dvh;display:grid;place-items:center;padding:28px 20px;background:radial-gradient(120% 80% at 50% 0%,#1d1d22 0%,var(--preto) 60%)}
.login form{width:100%;max-width:380px;text-align:center}
.selo{width:92px;height:92px;margin:0 auto 22px;border-radius:50%;border:1.5px solid var(--prata);display:grid;place-items:center;font:600 30px/1 var(--ser);letter-spacing:.12em;color:var(--claro);box-shadow:0 0 0 8px rgba(201,204,209,.05)}
.login h1{font-size:34px;line-height:1.1;margin:10px 0 6px}
.login p.sub{color:var(--suave);margin-bottom:28px}
.campo{display:block;text-align:left;margin-bottom:14px}
.campo span{display:block;font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--prata);margin-bottom:6px}
input,select,textarea{width:100%;background:var(--g1);border:1px solid var(--linha);border-radius:10px;padding:12px 14px;font-size:16px;color:var(--claro)}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--prata);box-shadow:0 0 0 3px rgba(201,204,209,.12)}
textarea{resize:vertical;min-height:90px;line-height:1.5}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;transition:transform .1s,filter .2s}
.btn:active{transform:scale(.98)}
.btn-cromo{background:var(--cromo);color:#0A0A0B}
.btn-wa{background:var(--wa);color:#04210f}
.btn-linha{border:1px solid var(--linha);color:var(--claro);background:var(--g1)}
.btn-perigo{color:var(--erro);border:1px solid rgba(239,107,107,.35)}
.btn.cheio{width:100%}
.btn.mini{min-height:38px;padding:0 12px;font-size:13px;border-radius:10px}
.erro{color:var(--erro);font-size:14px;min-height:20px;margin-top:10px}
.assinatura{margin-top:34px;font-size:12px;color:#6d7077}

/* App */
.app{max-width:1080px;margin:0 auto;padding:0 16px calc(96px + env(safe-area-inset-bottom))}
.topo{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:14px 16px;margin:0 -16px;background:rgba(10,10,11,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--linha)}
.topo .selo{width:40px;height:40px;margin:0;font-size:13px;box-shadow:none}
.topo b{display:block;font:600 18px/1.1 var(--ser);letter-spacing:.08em;text-transform:uppercase;color:var(--claro)}
.topo small{display:block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--suave)}
.topo .ver{margin-left:auto}
nav.abas{position:fixed;left:0;right:0;bottom:0;z-index:30;display:grid;grid-template-columns:repeat(4,1fr);background:rgba(17,17,19,.96);backdrop-filter:blur(12px);border-top:1px solid var(--linha);padding-bottom:env(safe-area-inset-bottom)}
nav.abas button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px 9px;font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--suave)}
nav.abas button svg{width:22px;height:22px}
nav.abas button[aria-current]{color:var(--claro)}
nav.abas button[aria-current] svg{color:#fff}
@media(min-width:900px){
 nav.abas{position:sticky;top:69px;bottom:auto;left:auto;right:auto;display:flex;gap:6px;background:none;border:0;padding:16px 0 0;backdrop-filter:none}
 nav.abas button{flex-direction:row;gap:8px;font-size:14px;padding:10px 16px;border-radius:999px}
 nav.abas button[aria-current]{background:var(--g2)}
 .app{padding-bottom:60px}
}
section.tela{padding-top:22px}
.tit{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:16px}
.tit h2{font-size:30px;line-height:1.05}
.tit p{color:var(--suave);font-size:14px;margin-top:4px}

/* Início */
.saudacao{padding:26px 22px;border-radius:20px;background:linear-gradient(135deg,#202026 0%,#121215 60%);border:1px solid var(--linha);position:relative;overflow:hidden}
.saudacao::after{content:"";position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;border:1px solid rgba(201,204,209,.18);box-shadow:0 0 0 26px rgba(201,204,209,.03)}
.saudacao h2{font-size:32px;line-height:1.05;margin:8px 0 6px}
.saudacao p{color:var(--suave);max-width:46ch}
.numeros{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px}
@media(min-width:700px){.numeros{grid-template-columns:repeat(4,1fr)}}
.num{padding:16px;border-radius:var(--r);background:var(--g1);border:1px solid var(--linha)}
.num b{display:block;font:600 30px/1 var(--txt);letter-spacing:-.02em;color:var(--claro)}
.num span{display:block;margin-top:6px;font-size:12.5px;color:var(--suave)}
.bloco{margin-top:22px}
.bloco h3{font-size:22px;margin-bottom:10px;display:flex;align-items:center;gap:10px}
.bloco h3 .cont{font:600 12px/1 var(--txt);background:var(--g3);color:var(--claro);padding:5px 9px;border-radius:99px}
.funil{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.funil button{flex:1 0 auto;min-width:104px;text-align:left;padding:12px 14px;border-radius:12px;background:var(--g1);border:1px solid var(--linha)}
.funil b{display:block;font:600 22px/1 var(--txt);color:var(--claro)}
.funil span{display:block;margin-top:4px;font-size:12px;color:var(--suave);white-space:nowrap}
.vazio{padding:26px 18px;text-align:center;color:var(--suave);border:1px dashed var(--linha);border-radius:var(--r)}

/* Lista de clientes */
.filtros{display:flex;gap:8px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:none}
.chip{flex:0 0 auto;padding:8px 13px;border-radius:99px;border:1px solid var(--linha);font-size:13px;font-weight:500;color:#C7CACF;background:var(--g1);white-space:nowrap}
.chip[aria-pressed=true]{background:var(--claro);color:#0A0A0B;border-color:var(--claro)}
.chip i{font-style:normal;opacity:.6;margin-left:4px}
.busca{position:relative;margin-bottom:10px}
.busca input{padding-left:40px}
.busca svg{position:absolute;left:13px;top:50%;width:18px;height:18px;transform:translateY(-50%);color:var(--suave)}
.lista{display:grid;gap:10px}
@media(min-width:760px){.lista{grid-template-columns:1fr 1fr}}
.ctt{display:grid;grid-template-columns:1fr auto;gap:10px;padding:15px 16px;border-radius:var(--r);background:var(--g1);border:1px solid var(--linha);border-left:3px solid var(--cst,var(--prata))}
.ctt .nm{font-weight:600;color:var(--claro);font-size:16px}
.ctt .car{color:#C7CACF;font-size:14px;margin-top:2px}
.ctt .meta{display:flex;flex-wrap:wrap;gap:6px 10px;margin-top:8px;font-size:12.5px;color:var(--suave)}
.pill{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:3px 9px;border-radius:99px;background:rgba(255,255,255,.06);color:var(--claro)}
.pill::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--cst,var(--prata))}
.atraso{color:var(--alerta)}
.ctt .acoes{display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.redondo{width:44px;height:44px;border-radius:50%;display:grid;place-items:center}
.redondo svg{width:22px;height:22px}
.redondo.wa{background:var(--wa);color:#04210f}
.redondo.ed{background:var(--g3);color:var(--claro)}
.mais{position:fixed;right:18px;bottom:calc(80px + env(safe-area-inset-bottom));z-index:25;box-shadow:0 10px 30px rgba(0,0,0,.5)}
@media(min-width:900px){.mais{position:static;box-shadow:none}}

/* Folha (modal) */
.folha{position:fixed;inset:0;z-index:50;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.6)}
.folha>div{width:100%;max-width:640px;max-height:94dvh;overflow:auto;background:var(--noite);border:1px solid var(--linha);border-radius:22px 22px 0 0;padding:8px 18px calc(22px + env(safe-area-inset-bottom))}
@media(min-width:700px){.folha{align-items:center}.folha>div{border-radius:22px}}
.puxador{width:44px;height:5px;border-radius:9px;background:var(--g3);margin:6px auto 12px}
.folha header{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}
.folha header h3{font-size:26px}
.x{width:40px;height:40px;border-radius:50%;background:var(--g2);display:grid;place-items:center}
.dupla{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tripla{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px}
.sep{height:1px;background:var(--linha);margin:20px 0}
.status-grade{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.status-grade button{padding:8px 12px;border-radius:99px;border:1px solid var(--linha);font-size:13px;background:var(--g1);display:inline-flex;align-items:center;gap:6px}
.status-grade button::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--cst)}
.status-grade button[aria-pressed=true]{background:var(--claro);color:#0A0A0B;border-color:var(--claro)}
.modelos{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none}
.hist{list-style:none;display:grid;gap:0;margin-top:10px}
.hist li{position:relative;padding:0 0 14px 20px;font-size:14px;color:#C7CACF}
.hist li::before{content:"";position:absolute;left:4px;top:7px;width:7px;height:7px;border-radius:50%;background:var(--prata)}
.hist li::after{content:"";position:absolute;left:7px;top:16px;bottom:0;width:1px;background:var(--linha)}
.hist li:last-child::after{display:none}
.hist time{display:block;font-size:11.5px;color:var(--suave)}
.linha-acoes{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.linha-acoes .btn{flex:1}

/* Fotos */
.envio{display:block;padding:24px 18px;border-radius:18px;border:1.5px dashed rgba(201,204,209,.35);background:linear-gradient(180deg,#17171b,#111113);text-align:center;cursor:pointer}
.envio svg{width:34px;height:34px;color:var(--claro)}
.envio b{display:block;font:600 22px/1.2 var(--ser);color:var(--claro);margin-top:8px}
.envio span{display:block;color:var(--suave);font-size:13.5px;margin-top:4px}
.envio input{display:none}
.fila{display:grid;gap:10px;margin-top:12px}
.fila-item{display:grid;grid-template-columns:76px 1fr;gap:12px;align-items:center;padding:10px;border-radius:12px;background:var(--g1);border:1px solid var(--linha)}
.fila-item img{width:76px;height:76px;object-fit:cover;border-radius:8px}
.fotos{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(min-width:700px){.fotos{grid-template-columns:repeat(3,1fr)}}
.foto{border-radius:var(--r);overflow:hidden;background:var(--g1);border:1px solid var(--linha);display:flex;flex-direction:column}
.foto .img{position:relative;aspect-ratio:4/3;background:#000}
.foto img{width:100%;height:100%;object-fit:cover;display:block}
.foto.oculta img{opacity:.35}
.foto .marca{position:absolute;left:8px;top:8px;font-size:11px;font-weight:600;padding:3px 8px;border-radius:99px;background:rgba(0,0,0,.65);color:var(--claro)}
.foto .corpo{padding:10px;display:grid;gap:8px}
.foto select,.foto input{font-size:14px;padding:9px 10px}
.foto .bts{display:flex;gap:6px}
.foto .bts button{flex:1;min-height:36px;border-radius:9px;background:var(--g2);font-size:12.5px;display:grid;place-items:center}
.foto .bts button svg{width:18px;height:18px}
.dica{font-size:13px;color:var(--suave);margin:10px 0 0}

.conta{display:grid;gap:14px;max-width:520px}
.cartao{padding:18px;border-radius:var(--r);background:var(--g1);border:1px solid var(--linha)}
.cartao h3{font-size:22px;margin-bottom:8px}

.aviso{position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:60;background:var(--claro);color:#0A0A0B;font-weight:600;font-size:14px;padding:12px 18px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.5);max-width:calc(100% - 32px)}
.carregando{opacity:.6;pointer-events:none}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
 <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.8.83-3-.2-.31a8.2 8.2 0 1 1 6.97 3.84Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z"/></symbol>
 <symbol id="i-casa" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></symbol>
 <symbol id="i-gente" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.8a3.4 3.4 0 0 1 0 6.4M18.5 14.8c1.6.8 2.6 2.6 3 5.2"/></g></symbol>
 <symbol id="i-foto" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></g></symbol>
 <symbol id="i-conta" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></g></symbol>
 <symbol id="i-lapis" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="m4 20 1-4L16 5l3 3L8 19zM14 7l3 3"/></symbol>
 <symbol id="i-busca" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></g></symbol>
 <symbol id="i-x" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></symbol>
 <symbol id="i-sobe" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m6 14 6-6 6 6"/></symbol>
 <symbol id="i-desce" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m6 10 6 6 6-6"/></symbol>
 <symbol id="i-olho" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></g></symbol>
 <symbol id="i-lixo" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></symbol>
 <symbol id="i-mais" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M12 5v14M5 12h14"/></symbol>
</svg>

<main class="login" id="telaLogin" hidden>
 <form id="fLogin" autocomplete="on">
  <div class="selo">ISA</div>
  <p class="olho">Área do cliente</p>
  <h1>${esc(cfg.nome)}</h1>
  <p class="sub">Seus clientes, suas fotos e seu site em um só lugar.</p>
  <label class="campo"><span>Usuário</span><input name="usuario" autocomplete="username" autocapitalize="none" required></label>
  <label class="campo"><span>Senha</span><input name="senha" type="password" autocomplete="current-password" required></label>
  <button class="btn btn-cromo cheio" type="submit">Entrar</button>
  <p class="erro" id="loginErro" role="alert"></p>
  <p class="assinatura">Feito pela Overtus</p>
 </form>
</main>

<div class="app" id="app" hidden>
 <header class="topo">
  <div class="selo">ISA</div>
  <div><b>Auto Serviços ISA</b><small>Área do cliente</small></div>
  <a class="btn btn-linha mini ver" href="/" target="_blank" rel="noopener">Ver site</a>
 </header>
 <nav class="abas" aria-label="Seções">
  <button data-aba="inicio"><svg><use href="#i-casa"/></svg>Início</button>
  <button data-aba="clientes"><svg><use href="#i-gente"/></svg>Clientes</button>
  <button data-aba="fotos"><svg><use href="#i-foto"/></svg>Fotos</button>
  <button data-aba="conta"><svg><use href="#i-conta"/></svg>Conta</button>
 </nav>

 <section class="tela" data-tela="inicio">
  <div class="saudacao"><p class="olho" id="hojeTxt"></p><h2 id="ola">Olá</h2><p id="olaSub">Veja quem precisa de retorno hoje e como anda a oficina.</p></div>
  <div class="numeros" id="numeros"></div>
  <div class="bloco"><h3>Retornos para hoje <span class="cont" id="nRet">0</span></h3><div class="lista" id="listaRet"></div></div>
  <div class="bloco"><h3>Andamento</h3><div class="funil" id="funil"></div></div>
 </section>

 <section class="tela" data-tela="clientes" hidden>
  <div class="tit"><div><h2>Clientes</h2><p>Quem chamou no WhatsApp, o carro e em que pé está.</p></div><button class="btn btn-cromo mais" id="novo"><svg width="18" height="18"><use href="#i-mais"/></svg>Novo cliente</button></div>
  <label class="busca"><svg><use href="#i-busca"/></svg><input id="q" type="search" placeholder="Buscar por nome, carro, placa ou telefone"></label>
  <div class="filtros" id="filtros"></div>
  <div class="lista" id="lista"></div>
  <p class="dica"><button class="btn btn-linha mini" id="csv">Baixar planilha (CSV)</button></p>
 </section>

 <section class="tela" data-tela="fotos" hidden>
  <div class="tit"><div><h2>Fotos dos serviços</h2><p>As fotos aparecem no site, na seção Serviços, na ordem abaixo.</p></div></div>
  <label class="envio" id="envio"><svg><use href="#i-foto"/></svg><b>Adicionar fotos</b><span>Tire na hora ou escolha da galeria. Elas são ajustadas e convertidas sozinhas.</span><input id="arquivos" type="file" accept="image/*" multiple></label>
  <div class="fila" id="fila"></div>
  <div class="bloco"><h3>No site <span class="cont" id="nFotos">0</span></h3><div class="fotos" id="fotos"></div></div>
 </section>

 <section class="tela" data-tela="conta" hidden>
  <div class="tit"><div><h2>Conta</h2></div></div>
  <div class="conta">
   <div class="cartao"><h3>Trocar senha</h3>
    <form id="fSenha"><label class="campo"><span>Senha atual</span><input type="password" name="atual" autocomplete="current-password" required></label>
    <label class="campo"><span>Nova senha (mínimo 8 caracteres)</span><input type="password" name="nova" autocomplete="new-password" minlength="8" required></label>
    <button class="btn btn-cromo">Salvar nova senha</button></form></div>
   <div class="cartao"><h3>Instalar no celular</h3><p class="dica" style="margin:0">No navegador do celular, toque em Compartilhar ou no menu ⋮ e escolha <b>Adicionar à tela de início</b>. O painel abre como um aplicativo.</p></div>
   <button class="btn btn-linha" id="sair">Sair</button>
   <p class="dica">Área do cliente feita pela Overtus.</p>
  </div>
 </section>
</div>

<div class="folha" id="folha" hidden><div role="dialog" aria-modal="true" aria-labelledby="fTit">
 <div class="puxador"></div>
 <header><h3 id="fTit">Cliente</h3><button class="x" data-fechar aria-label="Fechar"><svg width="18" height="18"><use href="#i-x"/></svg></button></header>
 <div id="fCorpo"></div>
</div></div>

<div class="aviso" id="aviso" hidden></div>

<script>
const D = ${dados};
const COR = { novo:'#7FB2FF', orcamento:'#E8B04B', agendado:'#B48CFF', oficina:'#5FD0E0', pronto:'#5CC28A', entregue:'#9A9DA4', perdido:'#EF6B6B' };
const ST = Object.keys(D.rotulos);
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let contatos = [], fotos = [], filtro = 'ativos', resumo = null;

async function api(caminho, opt = {}) {
  const o = { ...opt, headers: { 'x-painel': '1', ...(opt.headers || {}) } };
  if (opt.json) { o.body = JSON.stringify(opt.json); o.headers['content-type'] = 'application/json'; o.method ||= 'POST'; }
  const r = await fetch('/admin/api/' + caminho, o);
  const d = await r.json().catch(() => ({}));
  if (r.status === 401 && caminho !== 'entrar') { mostrarLogin(); throw new Error(d.erro || 'Entre de novo.'); }
  if (!r.ok) throw new Error(d.erro || 'Algo deu errado. Tente de novo.');
  return d;
}
function aviso(t) { const a = $('#aviso'); a.textContent = t; a.hidden = false; clearTimeout(aviso.t); aviso.t = setTimeout(() => a.hidden = true, 2600); }
const hojeISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
const br = d => d ? d.split('-').reverse().join('/') : '';
const quando = s => { const d = new Date(s.replace(' ', 'T') + 'Z'); return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) + ' · ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); };
const reais = v => v == null ? '' : Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const foneBR = f => { const d = String(f || '').replace(/^55/, ''); return d.length >= 10 ? '(' + d.slice(0, 2) + ') ' + d.slice(2, -4) + '-' + d.slice(-4) : f; };
const primeiro = n => String(n || '').trim().split(/\\s+/)[0] || '';
const carroTxt = c => [c.carro, c.ano].filter(Boolean).join(' ');

// ---------- Login ----------
function mostrarLogin() { $('#app').hidden = true; $('#folha').hidden = true; $('#telaLogin').hidden = false; }
$('#fLogin').onsubmit = async e => {
  e.preventDefault(); const f = new FormData(e.target); $('#loginErro').textContent = '';
  try { await api('entrar', { json: { usuario: f.get('usuario'), senha: f.get('senha') } }); iniciar(); }
  catch (err) { $('#loginErro').textContent = err.message; }
};
$('#sair').onclick = async () => { await api('sair', { method: 'POST' }).catch(() => {}); mostrarLogin(); };
$('#fSenha').onsubmit = async e => {
  e.preventDefault(); const f = new FormData(e.target);
  try { await api('senha', { json: { atual: f.get('atual'), nova: f.get('nova') } }); e.target.reset(); aviso('Senha trocada.'); }
  catch (err) { aviso(err.message); }
};

// ---------- Abas ----------
function aba(nome) {
  document.querySelectorAll('[data-tela]').forEach(s => s.hidden = s.dataset.tela !== nome);
  document.querySelectorAll('[data-aba]').forEach(b => b.dataset.aba === nome ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'));
  if (location.hash !== '#' + nome) history.replaceState(null, '', '#' + nome);
  scrollTo(0, 0);
  if (nome === 'inicio') carregarInicio();
  if (nome === 'clientes') carregarContatos();
  if (nome === 'fotos') carregarFotos();
}
document.querySelectorAll('[data-aba]').forEach(b => b.onclick = () => aba(b.dataset.aba));

async function iniciar() {
  try { await api('sessao'); } catch { return mostrarLogin(); }
  $('#telaLogin').hidden = true; $('#app').hidden = false;
  const h = new Date().getHours();
  $('#ola').textContent = (h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite') + ', ISA';
  $('#hojeTxt').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  aba((location.hash || '#inicio').slice(1).replace(/[^a-z]/g, '') || 'inicio');
}

// ---------- Início ----------
async function carregarInicio() {
  const [r, c] = await Promise.all([api('resumo'), api('contatos')]);
  resumo = r; contatos = c.contatos;
  const ativos = contatos.filter(x => !['entregue', 'perdido'].includes(x.status)).length;
  const wa = r.cliques.whatsapp || { d7: 0, d30: 0 };
  $('#numeros').innerHTML = [
    [wa.d7 || 0, 'cliques no WhatsApp do site em 7 dias'],
    [ativos, 'clientes em andamento'],
    [r.mes.n || 0, 'carros entregues neste mês'],
    [r.fotos.v || 0, 'fotos de serviços no site'],
  ].map(([n, t]) => '<div class="num"><b>' + n + '</b><span>' + t + '</span></div>').join('');
  const hoje = hojeISO();
  const ret = contatos.filter(x => x.retorno && x.retorno <= hoje && x.status !== 'perdido').sort((a, b) => a.retorno.localeCompare(b.retorno));
  $('#nRet').textContent = ret.length;
  $('#listaRet').innerHTML = ret.length ? ret.map(cartao).join('') : '<div class="vazio">Nenhum retorno para hoje. Ao cadastrar um cliente, marque a data de retorno para ele aparecer aqui.</div>';
  $('#funil').innerHTML = ST.map(s => '<button data-st="' + s + '" style="--cst:' + COR[s] + '"><b>' + (r.status[s] || 0) + '</b><span><span class="pill" style="--cst:' + COR[s] + ';background:none;padding:0">' + D.rotulos[s] + '</span></span></button>').join('');
  $('#funil').querySelectorAll('button').forEach(b => b.onclick = () => { filtro = b.dataset.st; aba('clientes'); });
  ligarCartoes($('#listaRet'));
}

// ---------- Clientes ----------
async function carregarContatos() { const c = await api('contatos'); contatos = c.contatos; desenharLista(); }
function cartao(c) {
  const hoje = hojeISO();
  const ret = c.retorno ? '<span class="' + (c.retorno < hoje ? 'atraso' : '') + '">Retorno ' + (c.retorno === hoje ? 'hoje' : br(c.retorno)) + '</span>' : '';
  return '<article class="ctt" style="--cst:' + COR[c.status] + '"><div>'
    + '<div class="nm">' + esc(c.nome) + '</div>'
    + '<div class="car">' + esc(carroTxt(c) || 'Carro não informado') + (c.placa ? ' · ' + esc(c.placa) : '') + '</div>'
    + '<div class="meta"><span class="pill" style="--cst:' + COR[c.status] + '">' + D.rotulos[c.status] + '</span>'
    + (c.servico ? '<span>' + esc(c.servico) + '</span>' : '') + (c.valor != null ? '<span>' + reais(c.valor) + '</span>' : '') + ret + '</div>'
    + (c.ultimo ? '<div class="meta" style="margin-top:6px">' + esc(c.ultimo) + '</div>' : '')
    + '</div><div class="acoes">'
    + (c.telefone ? '<button class="redondo wa" data-wa="' + c.id + '" aria-label="Mandar WhatsApp para ' + esc(c.nome) + '"><svg><use href="#i-wa"/></svg></button>' : '')
    + '<button class="redondo ed" data-ed="' + c.id + '" aria-label="Abrir ' + esc(c.nome) + '"><svg><use href="#i-lapis"/></svg></button></div></article>';
}
function ligarCartoes(el) {
  el.querySelectorAll('[data-wa]').forEach(b => b.onclick = () => abrirContato(+b.dataset.wa, true));
  el.querySelectorAll('[data-ed]').forEach(b => b.onclick = () => abrirContato(+b.dataset.ed));
}
function desenharLista() {
  const conta = s => contatos.filter(x => s === 'todos' ? true : s === 'ativos' ? !['entregue', 'perdido'].includes(x.status) : x.status === s).length;
  $('#filtros').innerHTML = ['ativos', 'todos', ...ST].map(s => '<button class="chip" data-f="' + s + '" aria-pressed="' + (filtro === s) + '">' + (s === 'ativos' ? 'Em andamento' : s === 'todos' ? 'Todos' : D.rotulos[s]) + '<i>' + conta(s) + '</i></button>').join('');
  $('#filtros').querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filtro = b.dataset.f; desenharLista(); });
  const q = $('#q').value.trim().toLowerCase();
  const qd = q.replace(/\\D/g, '');
  const l = contatos.filter(x => (filtro === 'todos' || (filtro === 'ativos' ? !['entregue', 'perdido'].includes(x.status) : x.status === filtro))
    && (!q || [x.nome, x.carro, x.ano, x.placa, x.servico].join(' ').toLowerCase().includes(q) || (qd.length > 3 && x.telefone.includes(qd))));
  $('#lista').innerHTML = l.length ? l.map(cartao).join('') : '<div class="vazio">' + (contatos.length ? 'Ninguém aqui com esse filtro.' : 'Nenhum cliente ainda. Toque em <b>Novo cliente</b> quando alguém chamar no WhatsApp.') + '</div>';
  ligarCartoes($('#lista'));
}
$('#q').oninput = desenharLista;
$('#novo').onclick = () => abrirContato(null);
$('#csv').onclick = () => {
  const cab = ['Nome', 'Telefone', 'Carro', 'Ano', 'Placa', 'Serviço', 'Status', 'Valor', 'Retorno', 'Origem', 'Observações', 'Cadastrado em'];
  const lin = contatos.map(c => [c.nome, foneBR(c.telefone), c.carro, c.ano, c.placa, c.servico, D.rotulos[c.status], c.valor ?? '', br(c.retorno), c.origem, c.notas, c.criado]);
  const csv = '\\ufeff' + [cab, ...lin].map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(';')).join('\\r\\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'clientes-auto-isa.csv'; a.click();
};

function modelos(c) {
  const n = primeiro(c.nome), car = carroTxt(c) || 'seu Mercedes';
  return [
    ['Primeiro contato', 'Olá ' + n + '! Aqui é da Auto Serviços ISA. Recebemos seu contato sobre o ' + car + '. Como podemos ajudar?'],
    ['Orçamento', 'Olá ' + n + '! Segue o orçamento do ' + car + (c.servico ? ' (' + c.servico + ')' : '') + (c.valor != null ? ': ' + reais(c.valor) : '') + '. Podemos agendar?'],
    ['Confirmar horário', 'Olá ' + n + '! Confirmando o seu horário na Auto Serviços ISA para o ' + car + (c.retorno ? ' no dia ' + br(c.retorno) : '') + '. Endereço: ' + D.endereco + '.'],
    ['Carro pronto', 'Olá ' + n + '! O seu ' + car + ' está pronto para retirada. Pode vir quando quiser, estamos te esperando.'],
    ['Lembrete de revisão', 'Olá ' + n + ', tudo bem? Já está na hora da revisão do ' + car + '. Revisão não é gasto, é prevenção. Quer agendar um horário?'],
    ['Pedir avaliação', 'Olá ' + n + '! Obrigado pela confiança na Auto Serviços ISA. Se puder, deixe sua avaliação no Google, ajuda muito: ' + D.avaliacao],
  ];
}

let atual = null;
async function abrirContato(id, focarWa) {
  const c = id ? contatos.find(x => x.id === id) : { nome: '', telefone: '', carro: '', ano: '', placa: '', servico: '', status: 'novo', valor: null, origem: 'WhatsApp', retorno: '', notas: '' };
  atual = c;
  $('#fTit').textContent = id ? c.nome : 'Novo cliente';
  const ms = id && c.telefone ? modelos(c) : [];
  $('#fCorpo').innerHTML = (ms.length ? '<div id="blocoWa"><p class="olho" style="margin-bottom:10px">Mandar mensagem</p><div class="modelos">'
      + ms.map((m, i) => '<button class="chip" data-m="' + i + '" aria-pressed="' + (i === sugerido(c)) + '">' + m[0] + '</button>').join('') + '</div>'
      + '<textarea id="msg" rows="4"></textarea><button class="btn btn-wa cheio" id="enviarWa" style="margin-top:10px"><svg width="20" height="20"><use href="#i-wa"/></svg>Abrir no WhatsApp</button><div class="sep"></div></div>' : '')
    + '<form id="fCtt"><p class="olho" style="margin-bottom:10px">Status</p><div class="status-grade">'
    + ST.map(s => '<button type="button" data-s="' + s + '" style="--cst:' + COR[s] + '" aria-pressed="' + (c.status === s) + '">' + D.rotulos[s] + '</button>').join('') + '</div>'
    + '<label class="campo"><span>Nome</span><input name="nome" value="' + esc(c.nome) + '" required autocomplete="off"></label>'
    + '<label class="campo"><span>WhatsApp</span><input name="telefone" type="tel" inputmode="tel" placeholder="(21) 99999-9999" value="' + esc(c.telefone ? foneBR(c.telefone) : '') + '"></label>'
    + '<div class="tripla"><label class="campo"><span>Carro</span><input name="carro" placeholder="Ex.: SL 280 Pagoda" value="' + esc(c.carro) + '" list="modelosMB"></label>'
    + '<label class="campo"><span>Ano</span><input name="ano" inputmode="numeric" value="' + esc(c.ano) + '"></label>'
    + '<label class="campo"><span>Placa</span><input name="placa" value="' + esc(c.placa) + '" autocapitalize="characters"></label></div>'
    + '<label class="campo"><span>Serviço</span><input name="servico" value="' + esc(c.servico) + '" list="listaServ" placeholder="Escolha ou escreva"></label>'
    + '<div class="dupla"><label class="campo"><span>Valor (R$)</span><input name="valor" inputmode="decimal" value="' + (c.valor != null ? String(c.valor).replace('.', ',') : '') + '"></label>'
    + '<label class="campo"><span>Data de retorno</span><input name="retorno" type="date" value="' + esc(c.retorno || '') + '"></label></div>'
    + '<label class="campo"><span>Como chegou</span><select name="origem">' + ['WhatsApp', 'Site', 'Instagram', 'Google', 'Indicação', 'Passou na porta', 'Cliente antigo'].map(o => '<option' + (o === c.origem ? ' selected' : '') + '>' + o + '</option>').join('') + '</select></label>'
    + '<label class="campo"><span>Observações</span><textarea name="notas" rows="3">' + esc(c.notas) + '</textarea></label>'
    + '<datalist id="listaServ">' + D.servicos.map(s => '<option value="' + esc(s) + '">').join('') + '</datalist>'
    + '<datalist id="modelosMB">' + ['SL 280 Pagoda', '280 SE', '300 SL', 'W123', 'W124', '190 E', 'C 180', 'C 200', 'C 300', 'E 250', 'E 350', 'GLA 200', 'GLC 300', 'ML 350', 'S 500', 'SLK 200', 'CLA 200', 'A 200'].map(s => '<option value="' + s + '">').join('') + '</datalist>'
    + '<div class="linha-acoes"><button class="btn btn-cromo">Salvar</button>' + (id ? '<button type="button" class="btn btn-perigo" id="apagar">Apagar</button>' : '') + '</div></form>'
    + (id ? '<div class="sep"></div><p class="olho">Histórico</p><form id="fNota" style="display:flex;gap:8px;margin-top:10px"><input name="texto" placeholder="Anotar (ex.: ligou pedindo prazo)" autocomplete="off"><button class="btn btn-linha mini" style="min-height:48px">Anotar</button></form><ul class="hist" id="hist"></ul>' : '');
  $('#folha').hidden = false; document.body.style.overflow = 'hidden';
  let status = c.status;
  $('#fCorpo').querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
    status = b.dataset.s;
    $('#fCorpo').querySelectorAll('[data-s]').forEach(x => x.setAttribute('aria-pressed', x === b));
    const f = $('#fCtt');
    if (status === 'entregue' && !f.retorno.value) { const d = new Date(); d.setMonth(d.getMonth() + 6); f.retorno.value = d.toISOString().slice(0, 10); aviso('Retorno marcado para daqui a 6 meses (revisão).'); }
  });
  if (ms.length) {
    const msg = $('#msg'), escolhe = i => { msg.value = ms[i][1]; msg.dataset.m = i; $('#fCorpo').querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', +x.dataset.m === i)); };
    escolhe(sugerido(c));
    $('#fCorpo').querySelectorAll('[data-m]').forEach(b => b.onclick = () => escolhe(+b.dataset.m));
    $('#enviarWa').onclick = () => {
      window.open('https://wa.me/' + c.telefone + '?text=' + encodeURIComponent(msg.value), '_blank', 'noopener');
      api('contatos/' + c.id + '/registros', { json: { texto: 'WhatsApp enviado: ' + ms[+msg.dataset.m][0] } }).then(() => carregarHist(c.id)).catch(() => {});
    };
  }
  $('#fCtt').onsubmit = async e => {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)); f.status = status;
    e.target.classList.add('carregando');
    try { await api('contatos' + (id ? '/' + id : ''), { method: id ? 'PUT' : 'POST', json: f }); fechar(); aviso(id ? 'Cliente atualizado.' : 'Cliente cadastrado.'); recarregar(); }
    catch (err) { aviso(err.message); } finally { e.target.classList.remove('carregando'); }
  };
  if (id) {
    $('#apagar').onclick = async () => { if (!confirm('Apagar ' + c.nome + ' e o histórico?')) return; await api('contatos/' + id, { method: 'DELETE' }); fechar(); aviso('Cliente apagado.'); recarregar(); };
    $('#fNota').onsubmit = async e => { e.preventDefault(); const t = e.target.texto.value.trim(); if (!t) return; await api('contatos/' + id + '/registros', { json: { texto: t } }); e.target.reset(); carregarHist(id); };
    carregarHist(id);
  } else setTimeout(() => $('#fCtt').nome.focus({ preventScroll: true }), 50);
  $('#folha').firstElementChild.scrollTop = 0;
}
const sugerido = c => ({ novo: 0, orcamento: 1, agendado: 2, oficina: 3, pronto: 3, entregue: c.retorno && c.retorno <= hojeISO() ? 4 : 5, perdido: 4 }[c.status] ?? 0);
async function carregarHist(id) {
  const r = await api('contatos/' + id + '/registros');
  $('#hist').innerHTML = r.registros.map(x => '<li><time>' + quando(x.criado) + '</time>' + esc(x.texto) + '</li>').join('');
}
function fechar() { $('#folha').hidden = true; document.body.style.overflow = ''; }
function recarregar() { const t = document.querySelector('[data-tela]:not([hidden])')?.dataset.tela; if (t === 'inicio') carregarInicio(); else carregarContatos(); }
$('#folha').onclick = e => { if (e.target.id === 'folha' || e.target.closest('[data-fechar]')) fechar(); };
addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#folha').hidden) fechar(); });

// ---------- Fotos ----------
async function carregarFotos() {
  const r = await api('fotos'); fotos = r.fotos;
  $('#nFotos').textContent = fotos.filter(f => f.visivel).length;
  $('#fotos').innerHTML = fotos.length ? fotos.map((f, i) => '<div class="foto' + (f.visivel ? '' : ' oculta') + '" data-id="' + f.id + '"><div class="img"><img src="/fotos/' + f.thumb_id + '.webp" alt="" loading="lazy">'
    + (f.visivel ? '' : '<span class="marca">Escondida do site</span>') + '</div><div class="corpo">'
    + '<select data-k="servico"><option value="">Serviço…</option>' + D.servicos.map(s => '<option' + (s === f.servico ? ' selected' : '') + '>' + esc(s) + '</option>').join('') + '</select>'
    + '<input data-k="legenda" placeholder="Legenda (ex.: Pagoda 1968)" value="' + esc(f.legenda) + '" maxlength="140">'
    + '<div class="bts"><button data-a="subir" aria-label="Mover para frente"' + (i === 0 ? ' disabled style="opacity:.35"' : '') + '><svg><use href="#i-sobe"/></svg></button>'
    + '<button data-a="descer" aria-label="Mover para trás"' + (i === fotos.length - 1 ? ' disabled style="opacity:.35"' : '') + '><svg><use href="#i-desce"/></svg></button>'
    + '<button data-a="ver" aria-label="' + (f.visivel ? 'Esconder do site' : 'Mostrar no site') + '"><svg><use href="#i-olho"/></svg></button>'
    + '<button data-a="apagar" aria-label="Apagar foto" style="color:var(--erro)"><svg><use href="#i-lixo"/></svg></button></div></div></div>').join('')
    : '<div class="vazio" style="grid-column:1/-1">Nenhuma foto ainda. As fotos que você enviar aparecem no site, na seção Serviços.</div>';
  $('#fotos').querySelectorAll('.foto').forEach(el => {
    const id = +el.dataset.id, f = fotos.find(x => x.id === id);
    const salvar = async (extra = {}) => { const s = el.querySelector('[data-k=servico]').value, l = el.querySelector('[data-k=legenda]').value; await api('fotos/' + id, { method: 'PUT', json: { servico: s, legenda: l, visivel: f.visivel, ...extra } }); };
    el.querySelectorAll('[data-k]').forEach(i => i.onchange = () => salvar().then(() => aviso('Salvo.')).catch(e => aviso(e.message)));
    el.querySelectorAll('[data-a]').forEach(b => b.onclick = async () => {
      const a = b.dataset.a;
      if (a === 'apagar') { if (!confirm('Apagar esta foto do site?')) return; await api('fotos/' + id, { method: 'DELETE' }); aviso('Foto apagada.'); }
      else if (a === 'ver') { await salvar({ visivel: !f.visivel }); aviso(f.visivel ? 'Foto escondida do site.' : 'Foto de volta no site.'); }
      else await api('fotos/' + id + '/' + a, { method: 'POST' });
      carregarFotos();
    });
  });
}

// Converte no próprio celular: redimensiona e salva em WEBP (foto grande e miniatura).
function carregarImg(arq) {
  return new Promise((ok, erro) => { const u = URL.createObjectURL(arq), i = new Image(); i.onload = () => ok(i); i.onerror = () => erro(new Error('Não deu para abrir esta imagem.')); i.src = u; });
}
function webp(img, max, q) {
  const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return new Promise((ok, erro) => c.toBlob(b => b && b.type === 'image/webp' ? ok(b) : erro(new Error('Este navegador não converte para WEBP. Use o Chrome ou atualize o celular.')), 'image/webp', q));
}
$('#arquivos').onchange = e => {
  const arqs = [...e.target.files]; e.target.value = '';
  arqs.forEach(arq => {
    const item = document.createElement('div'); item.className = 'fila-item';
    item.innerHTML = '<img alt=""><div><select data-k="servico"><option value="">Qual serviço?</option>' + D.servicos.map(s => '<option>' + esc(s) + '</option>').join('') + '</select>'
      + '<input data-k="legenda" placeholder="Legenda (opcional)" maxlength="140" style="margin-top:8px"><div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-cromo mini" data-ok style="flex:1">Publicar no site</button><button class="btn btn-linha mini" data-tira>Cancelar</button></div><p class="dica" data-st></p></div>';
    item.querySelector('img').src = URL.createObjectURL(arq);
    $('#fila').prepend(item);
    item.querySelector('[data-tira]').onclick = () => item.remove();
    item.querySelector('[data-ok]').onclick = async () => {
      const st = item.querySelector('[data-st]'); item.classList.add('carregando'); st.textContent = 'Convertendo para WEBP…';
      try {
        const img = await carregarImg(arq);
        let foto = await webp(img, 1800, .82); if (foto.size > 1.4e6) foto = await webp(img, 1400, .72);
        const mini = await webp(img, 720, .74);
        st.textContent = 'Enviando…';
        const fd = new FormData(); fd.append('foto', foto, 'foto.webp'); fd.append('mini', mini, 'mini.webp');
        fd.append('servico', item.querySelector('[data-k=servico]').value); fd.append('legenda', item.querySelector('[data-k=legenda]').value);
        await api('fotos', { method: 'POST', body: fd });
        item.remove(); aviso('Foto publicada no site.'); carregarFotos();
      } catch (err) { st.textContent = err.message; item.classList.remove('carregando'); }
    };
  });
};

iniciar();
</script>
</body>
</html>`;
}
