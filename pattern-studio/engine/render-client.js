
/* ═══ PATTERN STUDIO — photoreal render client (appended by patch-engine) ═══ */
function psRenderContext(extra){
  var cfg = (typeof DESIGNS!=='undefined' && S.g) ? DESIGNS[S.g] : null;
  var st  = cfg && cfg.styles ? cfg.styles.find(function(s){return s.id===S.design;}) : null;
  var f   = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : null;
  var chips=[]; try{ document.querySelectorAll('#schips .chip.on').forEach(function(c){chips.push(c.textContent.trim());}); }catch(e){}
  var m = {}; try{ m = (typeof readM==='function') ? readM() : (S.m||{}); }catch(e){ m=S.m||{}; }
  var ctx = {
    garment: cfg ? cfg.label : S.g, style: st ? st.name : S.design, styleSub: st ? (st.sub||'') : '',
    chips: chips,
    fabric: f ? { name:f.name, hex:f.hex||f.color, pattern:f.pattern, category:f.category, desc:(f.desc||'').slice(0,160), img:f.img||'' } : null,
    body: { bust:m.bust, waist:m.waist, hips:m.hips },
    fit: { ease: S.fit ? S.fit.ease : 0 },
    gender: (typeof sketchGenderFor==='function') ? sketchGenderFor(S.g) : 'female',
    model: 'woman_25_diverse', setting: 'Clean studio', mode: 'photo'
  };
  for (var k in (extra||{})) ctx[k]=extra[k];
  return ctx;
}
async function psRender(ctx, aspect){
  var r = await fetch((PS.renderApi||'/api/render'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ context: ctx, aspect: aspect||'3:4' }) });
  var j = await r.json().catch(function(){return {};});
  if (!r.ok || !j.image) throw new Error((j && (j.error + (j.detail? ': '+[].concat(j.detail).join(' | '):''))) || ('HTTP '+r.status));
  return j;
}
/* Fabric-step panel: "Render on model" */
function psEnsureRenderPanel(){
  var panel = document.getElementById('sketchPanel'); if (!panel) return null;
  var box = document.getElementById('psRenderBox');
  if (box) return box;
  box = document.createElement('div'); box.id='psRenderBox';
  box.innerHTML =
    '<div class="ps-render-head">'
    + '<div><div class="ps-render-title">&#10022; Render on model</div><div class="ps-render-sub">Photoreal look built from your garment, style, construction details, measurements and the exact fabric</div></div>'
    + '<div class="ps-render-ctl">'
    + '<select id="psRenderModel" class="mi"><option value="woman_25_diverse">Woman · 25</option><option value="woman_30_athletic">Woman · athletic</option><option value="woman_40_curvy">Woman · curvy</option><option value="woman_20_petite">Woman · petite</option><option value="man_28_athletic">Man · athletic</option></select>'
    + '<select id="psRenderSetting" class="mi"><option value="Clean studio">Studio</option><option value="runway">Runway</option><option value="beach">Beach</option><option value="street">Street</option><option value="cosplay">Cosplay booth</option></select>'
    + '<button type="button" id="psRenderBtn" class="btn-next" onclick="psRenderOnModel()">Render &#8594;</button>'
    + '</div></div>'
    + '<div id="psRenderStage" class="ps-render-stage"><div class="ps-render-empty">Pick a fabric, then press <b>Render</b>. About 20&ndash;40 seconds.</div></div>';
  panel.appendChild(box);
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
(function(){ var _rs = window.renderSketch; if (typeof _rs==='function') window.renderSketch = function(){ _rs.apply(this, arguments); try{ psEnsureRenderPanel(); }catch(e){} }; })();
