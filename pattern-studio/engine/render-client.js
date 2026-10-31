
/* ═══ PATTERN STUDIO — photoreal render client (appended by patch-engine) ═══ */
var PS_ACCOUNT = { user: null, profile: null, ready: false };
function psRenderContext(extra){
  var cfg = (typeof DESIGNS!=='undefined' && S.g) ? DESIGNS[S.g] : null;
  var st  = cfg && cfg.styles ? cfg.styles.find(function(s){return s.id===S.design;}) : null;
  var f   = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : null;
  var chips=[]; try{ document.querySelectorAll('#schips .chip.on').forEach(function(c){chips.push(c.textContent.trim());}); }catch(e){}
  var m = {}; try{ m = (typeof readM==='function') ? readM() : (S.m||{}); }catch(e){ m=S.m||{}; }
  var ctx = {
    garmentId: S.g, garment: cfg ? cfg.label : S.g, style: st ? st.name : S.design, styleSub: st ? (st.sub||'') : '',
    chips: chips,
    fabric: f ? { name:f.name, hex:f.hex||f.color, pattern:f.pattern, category:f.category, desc:(f.desc||'').slice(0,160), img:f.img||'' } : null,
    body: { bust:m.bust, waist:m.waist, hips:m.hips },
    fit: { ease: S.fit ? S.fit.ease : 0 },
    gender: psGender(),
    model: psDefaultModel(), setting: 'Clean studio', mode: 'photo'
  };
  for (var k in (extra||{})) ctx[k]=extra[k];
  return ctx;
}
/* rasterise the technical croquis (garment paths only; the CDN figure is dropped) so the model wears the drafted design */
function psSketchPNG(){
  return new Promise(function(res){
    try {
      var svg = document.querySelector('#sketchSvgHost svg'); if (!svg) return res(null);
      var cl = svg.cloneNode(true); cl.querySelectorAll('image').forEach(function(i){ i.remove(); });
      var vb = (cl.getAttribute('viewBox')||'0 0 300 760').split(/\s+/).map(Number); var w = vb[2]||300, h = vb[3]||760;
      cl.setAttribute('width', w); cl.setAttribute('height', h); cl.setAttribute('xmlns','http://www.w3.org/2000/svg');
      var bg = document.createElementNS('http://www.w3.org/2000/svg','rect'); bg.setAttribute('width','100%'); bg.setAttribute('height','100%'); bg.setAttribute('fill','#ffffff'); cl.insertBefore(bg, cl.firstChild);
      var blob = new Blob([new XMLSerializer().serializeToString(cl)], {type:'image/svg+xml;charset=utf-8'}); var url = URL.createObjectURL(blob);
      var img = new Image(); img.onload = function(){ try { var cv=document.createElement('canvas'); var sc=Math.min(2, 900/h); cv.width=w*sc; cv.height=h*sc; var x=cv.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,cv.width,cv.height); x.drawImage(img,0,0,cv.width,cv.height); res(cv.toDataURL('image/jpeg', 0.85)); } catch(e){ res(null); } URL.revokeObjectURL(url); };
      img.onerror = function(){ URL.revokeObjectURL(url); res(null); }; img.src = url;
    } catch(e) { res(null); }
  });
}
async function psRender(ctx, aspect){
  if (!ctx.sketch) { try { ctx.sketch = await psSketchPNG(); } catch(e) {} }
  var r = await fetch((PS.renderApi||'/api/render'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ context: ctx, aspect: aspect||'3:4' }) });
  var j = await r.json().catch(function(){return {};});
  if (!r.ok || !j.image) throw new Error((j && (j.error + (j.detail? ': '+[].concat(j.detail).join(' | '):''))) || ('HTTP '+r.status));
  return j;
}
/* ── model gender: 'f' | 'm' — shared by croquis, render panel and Look tab ── */
var PS_MODELS = {
  f: [['woman_25_diverse','Woman · 25'],['woman_30_athletic','Woman · athletic'],['woman_40_curvy','Woman · curvy'],['woman_20_petite','Woman · petite'],['woman_50_elegant','Woman · 50+']],
  m: [['man_28_athletic','Man · athletic'],['man_25_slim','Man · slim'],['man_32_muscular','Man · muscular'],['man_40_plus','Man · plus-size'],['man_50_distinguished','Man · 50+']]
};
function psGenderAllowed(){ return !(typeof SKETCH_FEMALE_ONLY!=='undefined' && S.g && SKETCH_FEMALE_ONLY[S.g]); }
function psGender(){ var g = (typeof sketchGenderFor==='function' && S.g) ? sketchGenderFor(S.g) : 'f'; return g==='m' ? 'm' : 'f'; }
function psDefaultModel(){ return PS_MODELS[psGender()][0][0]; }
function psSetGender(g){
  if (g==='m' && !psGenderAllowed()) { toast_('This garment is drafted on a women\'s block'); g='f'; }
  if (typeof setSketchGender==='function') setSketchGender(g);   // re-draws the croquis on the matching figure
  psSyncGenderUI();
}
function psSyncGenderUI(){
  var g = psGender(), allowed = psGenderAllowed();
  document.querySelectorAll('.ps-gender').forEach(function(w){
    w.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.dataset.g===g); b.disabled = (b.dataset.g==='m' && !allowed); });
    w.title = allowed ? '' : 'Drafted on a women\'s block';
  });
  ['psRenderModel','look-model-sel'].forEach(function(id){
    var sel=document.getElementById(id); if(!sel) return;
    var cur=sel.value; sel.innerHTML='';
    PS_MODELS[g].forEach(function(o){ var op=document.createElement('option'); op.value=o[0]; op.textContent=o[1]; sel.appendChild(op); });
    if ([].some.call(sel.options,function(o){return o.value===cur;})) sel.value=cur;
  });
}
function psGenderToggleHTML(){ return '<div class="ps-gender" role="group" aria-label="Model"><button type="button" data-g="f" onclick="psSetGender(\'f\')">Woman</button><button type="button" data-g="m" onclick="psSetGender(\'m\')">Man</button></div>'; }
/* Look tab: put the toggle above its form and swap the model list */
function psMountLookGender(){
  var sel=document.getElementById('look-model-sel'); if(!sel || document.getElementById('psLookGender')) return;
  var holder=document.createElement('div'); holder.id='psLookGender'; holder.style.marginBottom='10px'; holder.innerHTML=psGenderToggleHTML();
  var card=sel.closest('[style*="border-radius"]') || sel.parentElement.parentElement; card.insertBefore(holder, card.firstChild);
}
/* Fabric-step panel: "Render on model" */
function psEnsureRenderPanel(){
  var panel = document.getElementById('sketchPanel'); if (!panel) return null;
  var box = document.getElementById('psRenderBox');
  if (box) return box;
  box = document.createElement('div'); box.id='psRenderBox';
  box.innerHTML =
    '<div class="ps-render-head">'
    + '<div><div class="ps-render-title">&#10022; See it on a model</div><div class="ps-render-sub">Photoreal look built from your garment, style, construction details, measurements and the exact fabric you picked</div></div>'
    + '<div class="ps-render-ctl">'
    + psGenderToggleHTML()
    + '<select id="psRenderModel" class="mi"></select>'
    + '<select id="psRenderSetting" class="mi"><option value="Clean studio">Studio</option><option value="runway">Runway</option><option value="beach">Beach</option><option value="street">Street</option><option value="cosplay">Cosplay booth</option></select>'
    + '<button type="button" id="psRenderBtn" class="btn-next" onclick="psRenderOnModel()">Render &#8594;</button>'
    + '</div></div>'
    + '<div id="psRenderStage" class="ps-render-stage"><div class="ps-render-empty"><div class="ps-render-cta"><button type="button" class="btn-next" onclick="psRenderOnModel()">&#10022; Render on model</button></div>Uses the fabric you selected above. About 20&ndash;40 seconds.</div></div>';
  // the photoreal render leads; the technical croquis folds underneath
  var det = document.createElement('details'); det.className='ps-croquis';
  det.innerHTML = '<summary><span>&#9998; Technical croquis &amp; spec sheet</span><i>flat sketch for the cutter</i></summary>';
  var keep = Array.prototype.slice.call(panel.childNodes); keep.forEach(function(n){ det.appendChild(n); });
  panel.appendChild(box); panel.appendChild(det);
  psSyncGenderUI();
  return box;
}
async function psRenderOnModel(){
  if (!S.g || !S.design) { toast_('Choose a garment and a design style first'); return; }
  var box = psEnsureRenderPanel(); if (!box) return;
  var stage = document.getElementById('psRenderStage'), btn = document.getElementById('psRenderBtn');
  var model = (document.getElementById('psRenderModel')||{}).value, setting=(document.getElementById('psRenderSetting')||{}).value;
  btn.disabled = true; btn.textContent = 'Rendering…';
  stage.innerHTML = '<div class="ps-render-loading"><div class="ai-spin"></div><div>Dressing the model in <b>'+(selectedFabric?selectedFabric.name:'your fabric')+'</b>…</div></div>';
  try {
    var ctx = psRenderContext({ model: model, setting: setting, mode: 'photo' });
    var out = await psRender(ctx, '3:4');
    window.__psLastRender = out.image;
    stage.innerHTML = '<img class="ps-render-img" src="'+out.image+'" alt="Rendered look">'
      + '<div class="ps-render-meta"><span>'+ctx.garment+' · '+ctx.style+(ctx.fabric?' · '+ctx.fabric.name:'')+(out.usedFabricPhoto?' · real fabric photo used':'')+'</span>'
      + '<span><button type="button" class="btn-back" onclick="psDownloadRender()">Download</button> <button type="button" class="btn-back" onclick="psRenderOnModel()">Re-render</button></span></div>';
    toast_('Look rendered ✓');
  } catch (e) {
    stage.innerHTML = '<div class="ps-render-empty" style="color:var(--danger)">Render failed — '+(e.message||'try again')+'</div>';
  }
  btn.disabled = false; btn.textContent = 'Render →';
}
function psDownloadRender(){ if(!window.__psLastRender)return; var a=document.createElement('a'); a.href=window.__psLastRender; a.download='pattern-studio-look.png'; document.body.appendChild(a); a.click(); a.remove(); }
/* keep the panel alive whenever the sketch re-renders */
(function(){ var _rs = window.renderSketch; if (typeof _rs==='function') window.renderSketch = function(){ _rs.apply(this, arguments); try{ psEnsureRenderPanel(); psSyncGenderUI(); }catch(e){} }; })();
(function(){ var _rl = window.refreshLook; if (typeof _rl==='function') window.refreshLook = function(){ _rl.apply(this, arguments); try{ psMountLookGender(); psSyncGenderUI(); }catch(e){} }; })();
