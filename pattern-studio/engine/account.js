
/* ═══ PATTERN STUDIO — accounts, cloud projects, plan gating, billing (appended by patch-engine) ═══ */
var PS_SB = null; PS_ACCOUNT = (typeof PS_ACCOUNT==='object' && PS_ACCOUNT) ? PS_ACCOUNT : { user: null, profile: null, ready: false };
var PS_PLAN_PRICE = '$35 / month';
(function(){
  try {
    if (window.supabase && PS.supabaseUrl && PS.supabaseAnonKey) {
      PS_SB = window.supabase.createClient(PS.supabaseUrl, PS.supabaseAnonKey, { db: { schema: 'studio' }, auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    }
  } catch (e) { console.warn('supabase init failed', e); }
})();
function psIsPro(){ if (typeof PS_ACCOUNT!=='object'||!PS_ACCOUNT) return false; var p = PS_ACCOUNT.profile; if (!p) return false; if (p.plan === 'admin') return true; return p.plan === 'pro' && (['active','trialing'].indexOf(p.subscription_status) >= 0 || (p.current_period_end && new Date(p.current_period_end) > new Date())); }
function psIsAdmin(){ if (typeof PS_ACCOUNT!=='object'||!PS_ACCOUNT) return false; var p = PS_ACCOUNT.profile; return !!(p && (p.plan === 'admin' || (PS_ACCOUNT.user && PS_ACCOUNT.user.email === 'siamakk2@gmail.com'))); }
function psApplyTier(){
  if (typeof PS_ACCOUNT!=='object'||!PS_ACCOUNT) window.PS_ACCOUNT = { user:null, profile:null, ready:false };
  // free tier: draft, nest, croquis, PNG, 3 renders, local projects. pro: everything.
  GATES.free = { gens: Infinity, dxf:false, svg:false, nest:true, grade:false, look:true, projects:3 };
  GATES.pro  = { gens: Infinity, dxf:true,  svg:true,  nest:true, grade:true,  look:true, projects:Infinity };
  if (psIsPro()) { BMF_TIER = 'pro'; BMF_USER = { email: PS_ACCOUNT.user.email, tags: 'ps-pro' }; }
  else { BMF_TIER = 'free'; BMF_USER = null; }
  BMF_GENS_USED = 0; BMF_TIER_READY = true; if (BMF_TIER_RESOLVE) BMF_TIER_RESOLVE(BMF_TIER);
  psRenderAccountUI();
}
/* ── account UI in the top bar ── */
function psRenderAccountUI(){
  var bar = document.querySelector('.ps-actions'); if (!bar) return;
  var el = document.getElementById('psAcct'); if (!el) { el = document.createElement('div'); el.id = 'psAcct'; bar.insertBefore(el, bar.firstChild); }
  if (!PS_SB) { el.innerHTML = ''; return; }
  if (!PS_ACCOUNT) return;
  if (!PS_ACCOUNT.user) {
    el.innerHTML = '<button type="button" class="project-badge ps-signin" onclick="psOpenSignIn()">Sign in</button><button type="button" class="ps-pro-btn" onclick="psShowPricing()">Go Pro · $35/mo</button>';
  } else {
    var pro = psIsPro(), p = PS_ACCOUNT.profile || {}, left = Math.max(0, (p.renders_free_limit||3) - (p.renders_used||0));
    el.innerHTML = '<div class="ps-user"><button type="button" class="project-badge" onclick="psToggleMenu()"><span class="ps-avatar">'+(PS_ACCOUNT.user.email||'?').slice(0,1).toUpperCase()+'</span><span class="ps-plan '+(pro?'pro':'free')+'">'+(pro?(psIsAdmin()?'ADMIN':'PRO'):'FREE · '+left+' render'+(left===1?'':'s')+' left')+'</span></button>'
      + '<div class="ps-menu" id="psMenu"><div class="ps-menu-mail">'+PS_ACCOUNT.user.email+'</div>'
      + (pro ? '<button onclick="psPortal()">Manage billing</button>' : '<button class="hot" onclick="psShowPricing()">Upgrade to Pro — $35/mo</button>')
      + '<button onclick="nxt(\'pgU\');psToggleMenu(false)">My projects</button>'
      + (psIsAdmin() ? '<a href="/admin">Admin dashboard</a>' : '')
      + '<button onclick="psSignOut()">Sign out</button></div></div>';
  }
}
function psToggleMenu(force){ var m = document.getElementById('psMenu'); if (!m) return; var on = typeof force==='boolean' ? force : !m.classList.contains('open'); m.classList.toggle('open', on); }
document.addEventListener('click', function(e){ if (!e.target.closest || !e.target.closest('.ps-user')) psToggleMenu(false); });

/* ── sign in (magic link) ── */
function psOpenSignIn(msg){
  if (!PS_SB) { toast_('Accounts are not configured yet'); return; }
  var old = document.getElementById('psSignIn'); if (old) old.remove();
  var ov = document.createElement('div'); ov.id = 'psSignIn'; ov.className = 'ps-modal';
  ov.innerHTML = '<div class="ps-modal-box"><button class="ps-modal-x" onclick="document.getElementById(\'psSignIn\').remove()">×</button>'
    + '<div class="ps-modal-eyebrow">Pattern Studio</div><h3>Sign in or create your account</h3>'
    + '<p>'+(msg||'Free account: 3 photoreal renders, saved patterns on this device. No password — we email you a one-tap link.')+'</p>'
    + '<form onsubmit="return psSendLink(event)"><input type="email" id="psEmail" class="mi" placeholder="you@studio.com" required autocomplete="email"><button type="submit" class="btn-next" id="psSendBtn">Email me a sign-in link →</button></form>'
    + '<div id="psSignInNote" class="ps-note"></div></div>';
  document.body.appendChild(ov); setTimeout(function(){ var i=document.getElementById('psEmail'); if(i) i.focus(); }, 50);
}
async function psSendLink(e){
  e.preventDefault(); var email = (document.getElementById('psEmail').value||'').trim(); var btn = document.getElementById('psSendBtn'), note = document.getElementById('psSignInNote');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    var r = await PS_SB.auth.signInWithOtp({ email: email, options: { emailRedirectTo: location.origin + '/?signedin=1#pgU' } });
    if (r.error) throw r.error;
    note.innerHTML = '<b>Check your inbox.</b> We sent a sign-in link to <b>'+email+'</b>. Open it on this device to come straight back here.';
    btn.textContent = 'Link sent ✓';
  } catch (err) { note.innerHTML = '<span style="color:var(--danger)">'+(err.message||'Could not send the link')+'</span>'; btn.disabled = false; btn.textContent = 'Email me a sign-in link →'; }
  return false;
}
async function psSignOut(){ try { await PS_SB.auth.signOut(); } catch(e){} PS_ACCOUNT.user = null; PS_ACCOUNT.profile = null; psApplyTier(); toast_('Signed out'); }
async function psLoadProfile(){
  try { var r = await PS_SB.rpc('ensure_profile'); if (!r.error && r.data) PS_ACCOUNT.profile = Array.isArray(r.data) ? r.data[0] : r.data; } catch(e){}
  psApplyTier();
}
async function psBoot(){
  if (!PS_SB) { psApplyTier(); return; }
  try { var s = await PS_SB.auth.getSession(); PS_ACCOUNT.user = s.data.session ? s.data.session.user : null; } catch(e){}
  if (PS_ACCOUNT.user) { await psLoadProfile(); psSyncProjects(); } else psApplyTier();
  PS_SB.auth.onAuthStateChange(function(ev, session){
    var was = PS_ACCOUNT.user && PS_ACCOUNT.user.id;
    PS_ACCOUNT.user = session ? session.user : null;
    if (PS_ACCOUNT.user && PS_ACCOUNT.user.id !== was) { psLoadProfile().then(function(){ psSyncProjects(); var m=document.getElementById('psSignIn'); if(m) m.remove(); toast_('Signed in as '+PS_ACCOUNT.user.email); try{ if(/signedin=1/.test(location.search)) { history.replaceState(null,'',location.pathname+location.hash); } }catch(e){} }); }
    else if (!PS_ACCOUNT.user) { PS_ACCOUNT.profile = null; psApplyTier(); }
  });
  PS_ACCOUNT.ready = true;
}

/* ── pricing / upgrade ── */
function psShowPricing(feature){
  var old = document.getElementById('psPricing'); if (old) old.remove();
  var why = { dxf:'DXF export for cutters', svg:'SVG vector export', grade:'Size runs XS–3XL', look:'More photoreal renders', projects:'Unlimited cloud projects', render:'More photoreal renders' }[feature];
  var ov = document.createElement('div'); ov.id = 'psPricing'; ov.className = 'ps-modal';
  ov.innerHTML = '<div class="ps-modal-box ps-pricing"><button class="ps-modal-x" onclick="document.getElementById(\'psPricing\').remove()">×</button>'
    + '<div class="ps-modal-eyebrow">'+(why ? why+' is a Pro feature' : 'Pattern Studio Pro')+'</div><h3>Everything, for <em>'+PS_PLAN_PRICE+'</em></h3>'
    + '<ul class="ps-perks"><li><b>Unlimited photoreal renders</b> — women’s and men’s models, real fabric</li><li><b>DXF &amp; SVG export</b> — send straight to cutters and factories</li><li><b>Size runs</b> — grade XS–3XL with yardage per size</li><li><b>Cloud projects</b> — unlimited, on every device</li><li><b>All 24 garments, 90 styles</b>, drafting, nesting, yardage</li></ul>'
    + '<button class="btn-next ps-cta" onclick="psCheckout()">Start Pro — '+PS_PLAN_PRICE+' →</button>'
    + '<div class="ps-note">Cancel anytime from Manage billing. Free plan keeps drafting, croquis, PNG and 3 renders.</div></div>';
  document.body.appendChild(ov);
}
window.showUpgrade = function(feature){ psShowPricing(feature); };
async function psCheckout(){
  if (!PS_ACCOUNT.user) { var m=document.getElementById('psPricing'); if(m) m.remove(); psOpenSignIn('Sign in first so your Pro plan is attached to your account.'); return; }
  try {
    var s = await PS_SB.auth.getSession(); var token = s.data.session && s.data.session.access_token;
    var r = await fetch('/api/checkout', { method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+token }, body: JSON.stringify({ returnTo: location.origin + '/?upgraded=1' }) });
    var j = await r.json(); if (!r.ok || !j.url) throw new Error(j.error || 'Checkout unavailable');
    location.href = j.url;
  } catch (e) { toast_(e.message || 'Checkout failed'); }
}
async function psPortal(){
  try { var s = await PS_SB.auth.getSession(); var token = s.data.session && s.data.session.access_token;
    var r = await fetch('/api/portal', { method:'POST', headers:{ 'Authorization':'Bearer '+token } }); var j = await r.json(); if (!r.ok || !j.url) throw new Error(j.error||'Portal unavailable'); location.href = j.url;
  } catch (e) { toast_(e.message); }
}

/* ── render quota (server-enforced for signed-in users) ── */
(function(){
  var _render = window.psRender;
  window.psRender = async function(ctx, aspect){
    if (PS_SB && PS_ACCOUNT.user) {
      var q = await PS_SB.rpc('consume_render'); var d = q.data || {};
      if (q.error) console.warn(q.error);
      else if (!d.ok) { psShowPricing('render'); throw new Error('You’ve used your 3 free renders — Pro is unlimited.'); }
      var out = await _render(ctx, aspect);
      psLoadProfile();
      try { PS_SB.from('renders').insert({ user_id: PS_ACCOUNT.user.id, garment: ctx.garment, style: ctx.style, fabric: ctx.fabric && ctx.fabric.name, model: ctx.model, setting: ctx.setting, image_url: await psThumb(out.image, 360), prompt: (out.prompt||'').slice(0, 2000), qa: out.qa || null, model_used: out.model }).then(function(){}); } catch(e){}
      return out;
    }
    // anonymous: one render, then ask for a free account
    var used = parseInt(localStorage.getItem('ps_anon_renders')||'0', 10);
    if (used >= 1) { psOpenSignIn('You’ve seen one render. Create a free account for 3 more — Pro is unlimited.'); throw new Error('Sign in to keep rendering'); }
    var out2 = await _render(ctx, aspect); localStorage.setItem('ps_anon_renders', String(used+1)); return out2;
  };
})();
function psThumb(dataUrl, w){ return new Promise(function(res){ try { var img=new Image(); img.onload=function(){ var c=document.createElement('canvas'); var h=Math.round(w*img.height/img.width); c.width=w; c.height=h; c.getContext('2d').drawImage(img,0,0,w,h); res(c.toDataURL('image/jpeg',.8)); }; img.onerror=function(){res(null)}; img.src=dataUrl; } catch(e){ res(null); } }); }

/* ── unified projects: local mirror + cloud when signed in ── */
function psLocalProjects(){ try { return JSON.parse(localStorage.getItem('bmf_projects')||'[]'); } catch(e){ return []; } }
function psSetLocalProjects(list){ try { localStorage.setItem('bmf_projects', JSON.stringify(list.slice(0, 50))); } catch(e){} }
function psSnapshotProject(existing){
  var cfg = DESIGNS[S.g]; var st = cfg && cfg.styles.find(function(s){return s.id===S.design;});
  var chips=[]; try{ document.querySelectorAll('#schips .chip.on').forEach(function(c){chips.push(c.textContent.trim());}); }catch(e){}
  var f = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : null;
  return {
    id: (existing && existing.id) || ('p_'+Date.now()),
    name: (existing && existing.name) || ((cfg?cfg.label:S.g)+' — '+(st?st.name:S.design)+(f?' · '+f.name:'')),
    garment: S.g, design: S.design, m: JSON.parse(JSON.stringify(S.m||{})), fit: JSON.parse(JSON.stringify(S.fit||{})),
    fab: S.fab, grain: S.grain, sa: S.sa, fw: S.fw, fabricId: f ? f.id : '', chips: chips, gender: (typeof psGender==='function')?psGender():'f',
    savedAt: new Date().toISOString(), pieceCount: (S.ps||[]).length, thumb: window.__psLastRenderThumb || null
  };
}
window.saveProject = async function(){
  if(!S.g||!S.design){ toast_('Pick a garment and style first'); return; }
  var list = psLocalProjects();
  if (!psIsPro() && list.length >= GATES.free.projects && !list.some(function(p){return p.garment===S.g&&p.design===S.design;})) { psShowPricing('projects'); return; }
  var proj = psSnapshotProject(null);
  if (!proj.thumb && window.__psLastRender) { try { proj.thumb = await psThumb(window.__psLastRender, 160); } catch(e){} }
  list.unshift(proj); psSetLocalProjects(list);
  toast_('Saved: '+proj.name);
  if (PS_SB && PS_ACCOUNT.user) {
    var cfg = DESIGNS[S.g]; var st = cfg && cfg.styles.find(function(s){return s.id===S.design;});
    var r = await PS_SB.from('projects').upsert({ user_id: PS_ACCOUNT.user.id, local_id: proj.id, name: proj.name, garment: cfg?cfg.label:S.g, style: st?st.name:S.design, fabric: proj.fabricId, data: proj, thumb: proj.thumb }, { onConflict: 'user_id,local_id' });
    if (r.error) console.warn('cloud save failed', r.error); else toast_('Synced to your cloud projects ✓');
  }
  renderProjectsList();
};
window.loadProject = function(id){
  var proj = psLocalProjects().find(function(p){return p.id===id;}); if(!proj){ toast_('Project not found'); return; }
  S.g = proj.garment; S.design = proj.design; S.m = proj.m||{}; S.fit = proj.fit||S.fit; S.fab = proj.fab||'stretch'; S.grain = proj.grain||'vertical'; S.sa = proj.sa||.5; S.fw = proj.fw||60;
  try {
    if (typeof renderM==='function') renderM(proj.garment); if (typeof renderChips==='function') renderChips(proj.garment); if (typeof buildDesignGrid==='function') buildDesignGrid(proj.garment);
    var d = document.getElementById('dcard_'+proj.design); if (d && typeof pickDesign==='function') pickDesign(d, proj.design, proj.garment);
    document.querySelectorAll('.gc').forEach(function(b){ b.classList.toggle('on', (b.getAttribute('onclick')||'').indexOf("'"+proj.garment+"'")>=0); });
    Object.keys(proj.m||{}).forEach(function(k){ var el=document.getElementById('m_'+k); if(el) el.value=proj.m[k]; });
    (proj.chips||[]).forEach(function(t){ document.querySelectorAll('#schips .chip').forEach(function(c){ if(c.textContent.trim()===t) c.classList.add('on'); }); });
    if (proj.fabricId && typeof pickFabric==='function') { try { pickFabric(proj.fabricId); } catch(e){} }
    if (proj.gender && typeof setSketchGender==='function') setSketchGender(proj.gender);
  } catch(e){ console.warn(e); }
  toast_('Opened: '+proj.name);
  setTimeout(function(){ try { generate(); nxt('pg5'); } catch(e){ nxt('pg2'); } }, 250);
};
window.deleteProject = async function(id, e){
  if (e && e.stopPropagation) e.stopPropagation();
  psSetLocalProjects(psLocalProjects().filter(function(p){return p.id!==id;}));
  if (PS_SB && PS_ACCOUNT.user) { try { await PS_SB.from('projects').delete().match({ user_id: PS_ACCOUNT.user.id, local_id: id }); } catch(e){} }
  renderProjectsList(); toast_('Project deleted');
};
async function psSyncProjects(){
  if (!PS_SB || !PS_ACCOUNT.user) return;
  try {
    var r = await PS_SB.from('projects').select('local_id,name,data,updated_at').order('updated_at', { ascending:false }); if (r.error) return;
    var local = psLocalProjects(); var byId = {}; local.forEach(function(p){ byId[p.id]=p; });
    (r.data||[]).forEach(function(row){ var p = row.data || {}; p.id = row.local_id || p.id; p.name = row.name || p.name; if (!byId[p.id]) { local.push(p); byId[p.id]=p; } });
    local.sort(function(a,b){ return (b.savedAt||'').localeCompare(a.savedAt||''); }); psSetLocalProjects(local);
    // push local-only projects up (pro only)
    if (psIsPro()) { var cloudIds = {}; (r.data||[]).forEach(function(x){ cloudIds[x.local_id]=1; });
      var missing = local.filter(function(p){ return !cloudIds[p.id]; }).slice(0, 20);
      for (var i=0;i<missing.length;i++){ var p=missing[i]; var cfg=DESIGNS[p.garment]; await PS_SB.from('projects').upsert({ user_id: PS_ACCOUNT.user.id, local_id: p.id, name: p.name, garment: cfg?cfg.label:p.garment, style: p.design, fabric: p.fabricId||'', data: p, thumb: p.thumb||null }, { onConflict:'user_id,local_id' }); } }
    renderProjectsList();
  } catch(e){ console.warn('sync', e); }
}
window.renderProjectsList = function(){
  var el = document.getElementById('projectsList'); if (!el) return;
  var projects = psLocalProjects(); var pro = psIsPro(); var signed = !!PS_ACCOUNT.user;
  var html = '<div class="ps-proj-head"><div>'+(pro ? '<b>Cloud projects</b> · unlimited · synced to your account' : signed ? '<b>Projects on this device</b> · '+projects.length+' of '+GATES.free.projects+' · <a href="#" onclick="psShowPricing(\'projects\');return false">Go Pro for cloud sync</a>' : '<b>Projects on this device</b> · '+projects.length+' of '+GATES.free.projects+' · <a href="#" onclick="psOpenSignIn();return false">Sign in</a> to keep them')+'</div>'
    + '<button class="btn-next" onclick="saveProject()">+ Save current pattern</button></div>';
  if (!projects.length) html += '<div class="ps-proj-empty"><div class="ps-proj-empty-ico">&#9998;</div><b>No saved projects yet</b><p>Generate a pattern, then save it here. Pro members get every project on every device.</p><button class="btn-back" onclick="nxt(\'pg1\')">Start a new pattern →</button></div>';
  else html += '<div class="ps-proj-grid">' + projects.map(function(p){ var cfg=DESIGNS[p.garment]; var d=new Date(p.savedAt||Date.now()).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      return '<div class="ps-proj" onclick="loadProject(\''+p.id+'\')">'+(p.thumb?'<img src="'+p.thumb+'" alt="">':'<div class="ps-proj-ph">'+(cfg&&typeof ICONS!=='undefined'&&ICONS[p.garment]?ICONS[p.garment]:'&#9998;')+'</div>')
        + '<div class="ps-proj-body"><div class="ps-proj-name">'+(p.name||'Untitled')+'</div><div class="ps-proj-meta">'+d+' · '+(p.pieceCount||0)+' pieces</div></div>'
        + '<button class="ps-proj-del" title="Delete" onclick="deleteProject(\''+p.id+'\',event)">&times;</button></div>'; }).join('') + '</div>';
  el.innerHTML = html;
};
(function(){ var _r = window.psRenderOnModel; })();
// remember last render thumb for project cards
(function(){ var _d = Object.getOwnPropertyDescriptor(window, '__psLastRender'); var val = window.__psLastRender; Object.defineProperty(window, '__psLastRender', { get: function(){ return val; }, set: function(v){ val = v; if (v) psThumb(v, 160).then(function(t){ window.__psLastRenderThumb = t; }); }, configurable: true }); })();
// boot after the engine mounted
setTimeout(psBoot, 0);
