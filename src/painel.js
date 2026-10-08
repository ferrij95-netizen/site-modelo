// HTML do painel de notícias (/admin). Uma página só, sem dependências; fala com /admin/api/*.
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function painelHtml(cfg) {
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Notícias · ${esc(cfg.nome)}</title>
<style>
:root{--cor:${esc(cfg.cor)};--tinta:#1d2321;--suave:#5f6b67;--linha:#e2e6e4;--fundo:#f4f6f5;--ok:#1f7a4d;--erro:#b3261e}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--tinta);background:var(--fundo)}
button,input,textarea{font:inherit;color:inherit}a{color:var(--cor)}
.topo{background:var(--cor);color:#fff;padding:14px 20px;display:flex;align-items:center;gap:16px}
.topo b{font-size:16px}.topo span{opacity:.75;font-size:13px}.topo .dir{margin-left:auto;display:flex;gap:8px}
.topo button,.topo a{background:rgba(255,255,255,.14);border:0;color:#fff;padding:7px 12px;border-radius:6px;cursor:pointer;text-decoration:none;font-size:13px}
main{max-width:920px;margin:0 auto;padding:24px 16px 80px}
.cartao{background:#fff;border:1px solid var(--linha);border-radius:10px;padding:20px}
h1{font-size:22px;margin:0 0 4px}.sub{color:var(--suave);margin:0 0 20px}
.btn{background:var(--cor);color:#fff;border:0;border-radius:7px;padding:10px 16px;font-weight:600;cursor:pointer}
.btn.claro{background:#fff;color:var(--tinta);border:1px solid var(--linha)}.btn.perigo{background:#fff;color:var(--erro);border:1px solid #efc9c6}
.btn:disabled{opacity:.6;cursor:wait}
.lista{display:grid;gap:10px}
.item{display:grid;grid-template-columns:72px 1fr auto;gap:14px;align-items:center;background:#fff;border:1px solid var(--linha);border-radius:10px;padding:10px}
.item img,.item .ph{width:72px;height:54px;object-fit:cover;border-radius:6px;background:var(--fundo)}
.item h3{margin:0;font-size:15px}.item small{color:var(--suave)}
.tag{display:inline-block;font-size:11px;font-weight:700;padding:2px 7px;border-radius:99px;margin-left:6px;vertical-align:1px}
.tag.pub{background:#e3f3ea;color:var(--ok)}.tag.ras{background:#f1eee6;color:#7a6420}
.acoes{display:flex;gap:6px}.acoes button,.acoes a{font-size:13px;padding:6px 10px}
.vazio{text-align:center;color:var(--suave);padding:40px 10px}
label{display:block;font-weight:600;font-size:13px;margin:16px 0 6px}label small{font-weight:400;color:var(--suave)}
input[type=text],input[type=password],input[type=date],textarea{width:100%;border:1px solid var(--linha);border-radius:7px;padding:10px 12px;background:#fff}
input:focus,textarea:focus{outline:2px solid var(--cor);outline-offset:-1px;border-color:transparent}
textarea{min-height:320px;resize:vertical;line-height:1.6}
.linha2{display:grid;grid-template-columns:1fr 180px;gap:14px}
.ferr{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px}.ferr button{background:#fff;border:1px solid var(--linha);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:13px}
.img-area{border:2px dashed var(--linha);border-radius:10px;padding:14px;display:flex;gap:14px;align-items:center;background:#fafbfa}
.img-area img{width:180px;height:120px;object-fit:cover;border-radius:6px}
.chave{display:flex;align-items:center;gap:10px;margin-top:18px;font-weight:600}
.chave input{width:20px;height:20px;accent-color:var(--cor)}
.rodape{display:flex;gap:10px;margin-top:24px;align-items:center;flex-wrap:wrap}.rodape .esp{flex:1}
.prev img{max-width:100%;border-radius:6px}.prev{border:1px solid var(--linha);border-radius:7px;padding:4px 16px;min-height:320px;background:#fff}.prev h2{font-size:18px}
.aviso{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--tinta);color:#fff;padding:10px 18px;border-radius:8px;opacity:0;transition:.2s;pointer-events:none}
.aviso.on{opacity:1}.aviso.erro{background:var(--erro)}
.login{max-width:380px;margin:12vh auto}.login .btn{width:100%;margin-top:16px}
.dica{font-size:12px;color:var(--suave);margin-top:6px}
@media (max-width:640px){.item{grid-template-columns:56px 1fr}.item img,.item .ph{width:56px;height:42px}.acoes{grid-column:1/-1}.linha2{grid-template-columns:1fr}.img-area{flex-direction:column;align-items:flex-start}.topo span{display:none}}
</style></head><body>
<div id="app"></div><div id="aviso" class="aviso"></div>
<script>
const NOME=${JSON.stringify(cfg.nome)};
const $=s=>document.querySelector(s);const app=$('#app');
const e=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function aviso(t,erro){const a=$('#aviso');a.textContent=t;a.className='aviso on'+(erro?' erro':'');clearTimeout(a._t);a._t=setTimeout(()=>a.className='aviso',2800)}
async function api(u,o={}){const r=await fetch('/admin/api/'+u,{...o,headers:{'x-painel':'1',...(o.body&&!(o.body instanceof Blob)?{'content-type':'application/json'}:{}),...(o.headers||{})},body:o.body&&!(o.body instanceof Blob)?JSON.stringify(o.body):o.body});
  const d=await r.json().catch(()=>({erro:'Erro de conexão'}));if(r.status===401&&u!=='entrar'){login();throw new Error(d.erro)}if(!r.ok)throw new Error(d.erro||'Erro');return d}
const hoje=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const dataBr=d=>d.split('-').reverse().join('/');
function topo(){return '<div class="topo"><b>'+e(NOME)+'</b><span>Painel de notícias</span><div class="dir"><a href="/" target="_blank">Ver site</a><button onclick="senha()">Senha</button><button onclick="sair()">Sair</button></div></div>'}

function login(){app.innerHTML='<div class="login cartao"><h1>'+e(NOME)+'</h1><p class="sub">Painel de notícias</p><form id="f"><label for="s">Senha</label><input id="s" type="password" autocomplete="current-password" required autofocus><button class="btn">Entrar</button></form></div>';
  $('#f').onsubmit=async ev=>{ev.preventDefault();const b=ev.target.querySelector('button');b.disabled=true;try{await api('entrar',{method:'POST',body:{senha:$('#s').value}});lista()}catch(x){aviso(x.message,1);b.disabled=false}}}
async function sair(){await api('sair',{method:'POST'}).catch(()=>{});login()}

async function lista(){const d=await api('noticias');
  app.innerHTML=topo()+'<main><div style="display:flex;align-items:end;gap:12px;margin-bottom:18px"><div style="flex:1"><h1>Notícias</h1><p class="sub" style="margin:0">'+(d.noticias.length?d.noticias.length+' no total. Só as publicadas aparecem no site.':'Nenhuma notícia ainda.')+'</p></div><button class="btn" onclick="editar()">+ Nova notícia</button></div><div class="lista">'+
  (d.noticias.length?d.noticias.map(n=>'<div class="item">'+(n.imagem?'<img src="'+e(n.imagem)+'" alt="">':'<div class="ph"></div>')+'<div><h3>'+e(n.titulo)+'<span class="tag '+(n.publicada?'pub">Publicada':'ras">Rascunho')+'</span></h3><small>'+dataBr(n.data)+'</small></div><div class="acoes">'+(n.publicada?'<a class="btn claro" target="_blank" href="'+d.base+n.slug+'">Ver</a>':'')+'<button class="btn claro" onclick="editar('+n.id+')">Editar</button><button class="btn perigo" onclick="apagar('+n.id+')">Apagar</button></div></div>').join(''):'<div class="vazio cartao">Clique em <b>+ Nova notícia</b> para publicar a primeira.</div>')+'</div></main>'}

async function apagar(id){if(!confirm('Apagar esta notícia? Ela sai do site na hora e não dá para desfazer.'))return;await api('noticias/'+id,{method:'DELETE'});aviso('Notícia apagada');lista()}

let img=null;
async function editar(id){const n=id?(await api('noticias/'+id)).noticia:{titulo:'',resumo:'',corpo:'',data:hoje(),publicada:1,imagem:null};img=n.imagem;
  app.innerHTML=topo()+'<main><p><a href="#" onclick="lista();return false">← Todas as notícias</a></p><div class="cartao"><h1>'+(id?'Editar notícia':'Nova notícia')+'</h1>'+
  '<label for="t">Título</label><input id="t" type="text" maxlength="200" value="'+e(n.titulo)+'" required>'+
  '<div class="linha2"><div><label for="r">Resumo <small>(aparece na lista e no Google; 1 ou 2 frases)</small></label><input id="r" type="text" maxlength="400" value="'+e(n.resumo)+'"></div><div><label for="d">Data</label><input id="d" type="date" value="'+e(n.data)+'"></div></div>'+
  '<label>Foto de capa <small>(opcional)</small></label><div class="img-area"><div id="iv"></div><div><input id="if" type="file" accept="image/*" hidden><button class="btn claro" type="button" onclick="$(\\'#if\\').click()">Escolher foto</button> <button class="btn claro" type="button" id="ir" onclick="tirar()">Remover</button><div class="dica">A foto é reduzida automaticamente antes de enviar.</div></div></div>'+
  '<label for="c">Texto</label><div class="ferr"><button type="button" onclick="marca(\\'## \\',\\'\\',1)">Subtítulo</button><button type="button" onclick="marca(\\'**\\',\\'**\\')"><b>Negrito</b></button><button type="button" onclick="marca(\\'- \\',\\'\\',1)">Lista</button><button type="button" onclick="link()">Link</button><button type="button" onclick="imagemNoTexto()">Imagem</button><button type="button" id="pv" onclick="previa()">Pré-visualizar</button></div><textarea id="c" placeholder="Escreva a notícia. Deixe uma linha em branco entre os parágrafos.">'+e(n.corpo)+'</textarea><div id="p" class="prev" hidden></div>'+
  '<label class="chave"><input id="pub" type="checkbox" '+(n.publicada?'checked':'')+'> Publicada no site</label><div class="dica">Desmarque para guardar como rascunho.</div>'+
  '<div class="rodape"><button class="btn" id="sv" onclick="salvar('+(id||0)+')">Salvar</button><button class="btn claro" onclick="lista()">Cancelar</button></div></div></main>';
  mostraImg();$('#if').onchange=enviaImg}
function mostraImg(){$('#iv').innerHTML=img?'<img src="'+e(img)+'" alt="">':'<div class="dica" style="width:180px">Sem foto</div>';$('#ir').hidden=!img}
function tirar(){img=null;mostraImg()}
// Reduz a foto no navegador (até 1600 px, JPEG) e envia; devolve o endereço da imagem.
async function sobe(f){const bm=await createImageBitmap(f);const k=Math.min(1,1600/bm.width);const c=document.createElement('canvas');c.width=Math.round(bm.width*k);c.height=Math.round(bm.height*k);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(bm,0,0,c.width,c.height);
  const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',.82));const d=await api('imagens',{method:'POST',body:blob,headers:{'content-type':'image/jpeg'}});return '/noticias/img/'+d.id}
async function enviaImg(ev){const f=ev.target.files[0];if(!f)return;$('#iv').innerHTML='<div class="dica" style="width:180px">Enviando...</div>';
  try{img=await sobe(f);mostraImg()}catch(x){aviso(x.message||'Não foi possível usar esta imagem',1);mostraImg()}ev.target.value=''}
function imagemNoTexto(){const i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=async()=>{const f=i.files[0];if(!f)return;aviso('Enviando imagem...');
  try{const src=await sobe(f);const t=$('#c');const p=t.selectionEnd;t.setRangeText('\\n\\n![]('+src+')\\n\\n',p,p,'end');t.focus();aviso('Imagem inserida no texto')}catch(x){aviso(x.message||'Não foi possível usar esta imagem',1)}};i.click()}
function marca(a,b,linha){const t=$('#c');let s=t.selectionStart,f=t.selectionEnd;if(linha){s=t.value.lastIndexOf('\\n',s-1)+1}const sel=t.value.slice(s,f);const novo=linha?sel.split('\\n').map(l=>a+l.replace(/^(## |- )/,'')).join('\\n'):a+(sel||'texto')+b;t.setRangeText(novo,s,f,'select');t.focus()}
function link(){const u=prompt('Endereço do link (https://...)');if(!u)return;const t=$('#c');const sel=t.value.slice(t.selectionStart,t.selectionEnd)||'texto do link';t.setRangeText('['+sel+']('+u+')',t.selectionStart,t.selectionEnd,'end');t.focus()}
function html(txt){const il=s=>e(s).replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>').replace(/\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/g,'<a href="$2">$1</a>');
  return txt.replace(/\\r/g,'').split(/\\n{2,}/).map(b=>b.trim()).filter(Boolean).map(b=>{if(b.startsWith('## '))return'<h2>'+il(b.slice(3))+'</h2>';const im=b.match(/^!\\[([^\\]]*)\\]\\(([^)\\s]+)\\)$/);if(im&&/^\\/(noticias\\/img\\/\\d+|img\\/[\\w.\\/-]+)$/.test(im[2]))return'<figure><img src="'+e(im[2])+'" alt="" style="max-width:100%"></figure>';const L=b.split('\\n');if(L.every(l=>/^\\s*[-•]\\s+/.test(l)))return'<ul>'+L.map(l=>'<li>'+il(l.replace(/^\\s*[-•]\\s+/,''))+'</li>').join('')+'</ul>';return'<p>'+L.map(il).join('<br>')+'</p>'}).join('')}
function previa(){const p=$('#p'),c=$('#c');const on=p.hidden;p.hidden=!on;c.hidden=on;if(on)p.innerHTML=html(c.value)||'<p class="dica">Nada escrito ainda.</p>';$('#pv').textContent=on?'Voltar a editar':'Pré-visualizar'}
async function salvar(id){const b=$('#sv');b.disabled=true;try{const d=await api('noticias'+(id?'/'+id:''),{method:id?'PUT':'POST',body:{titulo:$('#t').value,resumo:$('#r').value,data:$('#d').value,corpo:$('#c').value,imagem:img,publicada:$('#pub').checked}});aviso($('#pub').checked?'Salva e publicada no site':'Rascunho salvo');lista()}catch(x){aviso(x.message,1);b.disabled=false}}
async function senha(){const a=prompt('Senha atual');if(!a)return;const n=prompt('Nova senha (mínimo 8 caracteres)');if(!n)return;try{await api('senha',{method:'POST',body:{atual:a,nova:n}});aviso('Senha trocada')}catch(x){aviso(x.message,1)}}
api('sessao').then(lista).catch(()=>login());
</script></body></html>`;
}
