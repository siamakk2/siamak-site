#!/usr/bin/env python3
"""Redesigns /ask, the AI Advisor landing page, in place (Oct 2026).

The page is a standalone, installable landing page (its own manifest and
minimal nav), so this keeps its head, consent, analytics and the widget
loader, and replaces only: the page CSS, the <main> content, and the
animation. The voice-ring animation that hero3d.js used to draw in the empty
right-hand side now surrounds the orb itself, and reacts when the advisor is
open. Idempotent: re-running rebuilds from the same markers.

    python3 scripts/build-ask.py
"""
import os, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
P = os.path.join(ROOT, "ask", "index.html")
s = open(P, encoding="utf-8").read()

CSS = r"""<style id="ask-css">
*{margin:0;padding:0;box-sizing:border-box}
:root{--void:#000;--panel:#06080c;--surface:#0f1522;--line:#263041;--line-b:#36414f;--cyan:#2dd4ff;--violet:#a06bff;--amber:#ffb454;--text:#f9fbfe;--muted:#ccd6e2;--dim:#8b96a8;--glow:linear-gradient(135deg,#2dd4ff,#a06bff);--display:'Space Grotesk',sans-serif;--body:'Inter',sans-serif;--mono:'JetBrains Mono',monospace}
body{background:var(--void);color:var(--text);font-family:var(--body);line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100vh;overflow-x:hidden}
a{text-decoration:none;color:inherit}
.nav{position:sticky;top:0;z-index:100;background:rgba(0,0,0,.72);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
.nav-in{max-width:1120px;margin:0 auto;padding:0 24px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{font-family:var(--mono);font-size:14px;font-weight:700}.brand span{color:var(--cyan);font-weight:500}
.nav-r{display:flex;gap:18px;align-items:center;font-family:var(--mono);font-size:13px;color:var(--muted)}
.nav-r a:hover{color:var(--cyan)}
.nav-r .book{border:1px solid var(--line-b);border-radius:999px;padding:8px 14px;color:var(--text)}
.ambient{position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(900px 600px at 50% -10%,rgba(160,107,255,.16),transparent 60%),radial-gradient(700px 500px at 50% 40%,rgba(45,212,255,.08),transparent 60%)}
main,footer{position:relative;z-index:1}
/* hero */
.hero{max-width:980px;margin:0 auto;padding:34px 24px 30px;text-align:center}
.eyebrow{display:inline-flex;gap:10px;align-items:center;font-family:var(--mono);font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--amber);border:1px solid rgba(255,180,84,.35);background:rgba(255,180,84,.06);padding:7px 15px;border-radius:999px}
.eyebrow i{width:8px;height:8px;border-radius:50%;background:#5ef0a8;box-shadow:0 0 10px #5ef0a8;animation:blink 2s ease-in-out infinite}
@keyframes blink{50%{opacity:.35}}
.stage{position:relative;width:min(560px,92vw);aspect-ratio:1;margin:8px auto -26px}
.stage canvas{position:absolute;inset:0;width:100%;height:100%}
.orb{position:absolute;left:50%;top:50%;width:31%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fe6ff 0%,#2dd4ff 30%,#7a7dff 68%,#a06bff 100%);box-shadow:0 0 70px rgba(45,212,255,.55),inset 0 -14px 40px rgba(60,20,140,.45);cursor:pointer;-webkit-tap-highlight-color:transparent;animation:breathe 3.4s ease-in-out infinite;display:flex;align-items:center;justify-content:center;border:none}
.orb:hover{box-shadow:0 0 110px rgba(45,212,255,.75),inset 0 -14px 40px rgba(60,20,140,.45)}
.orb.active{box-shadow:0 0 140px rgba(160,107,255,.9),inset 0 -14px 40px rgba(60,20,140,.45)}
.orb{flex-direction:column;gap:4%}.orb svg{width:30%;height:30%;opacity:.92}.orb .ol{font-family:var(--mono);font-size:clamp(9px,1.6vw,12px);letter-spacing:.14em;color:#04060a;font-weight:700;text-transform:uppercase}
@keyframes breathe{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.05)}}
h1{font-family:var(--display);font-size:clamp(38px,6.4vw,64px);font-weight:700;line-height:1.04;letter-spacing:-.03em;margin:0 auto 18px;max-width:820px}
.grad{background:linear-gradient(90deg,#ffb454,#ff8a7a);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-family:'Fraunces',serif;font-style:italic;font-weight:600;padding-right:4px}
.sub{font-size:19px;color:var(--muted);max-width:620px;margin:0 auto 28px}
.cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.btn{display:inline-flex;align-items:center;gap:10px;border-radius:999px;padding:15px 26px;font-family:var(--mono);font-size:15.5px;font-weight:600;cursor:pointer;border:none}
.btn svg{width:18px;height:18px;flex:0 0 18px}
.btn-pri{background:var(--glow);color:#04060a;box-shadow:0 10px 40px rgba(45,212,255,.35)}
.btn-pri:hover{box-shadow:0 10px 50px rgba(45,212,255,.55)}
.btn-ghost{background:transparent;color:var(--text);border:1px solid var(--line-b)}
.btn-ghost:hover{border-color:var(--cyan)}
.trust{display:flex;flex-wrap:wrap;gap:10px 22px;justify-content:center;margin:26px auto 0;font-family:var(--mono);font-size:13px;color:var(--dim)}
.trust b{color:var(--text);font-weight:600}
/* sections */
.sec{max-width:1040px;margin:84px auto 0;padding:0 24px}
.kicker{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);text-align:center}
.sec h2{font-family:var(--display);font-size:clamp(28px,3.8vw,40px);font-weight:700;letter-spacing:-.02em;text-align:center;margin:10px auto 12px;max-width:760px;line-height:1.12}
.sec .lead{text-align:center;color:var(--muted);font-size:17px;max-width:640px;margin:0 auto 34px}
.qs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.q{text-align:left;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:20px 20px 18px;cursor:pointer;color:var(--text);font:inherit;transition:border-color .2s,transform .2s}
.q:hover{border-color:var(--cyan);transform:translateY(-2px)}
.q small{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);margin-bottom:8px}
.q span{display:block;font-family:var(--display);font-size:18px;font-weight:600;line-height:1.3}
.q em{display:block;font-style:normal;font-family:var(--mono);font-size:12px;color:var(--cyan);margin-top:12px}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.step{background:linear-gradient(180deg,var(--surface),var(--panel));border:1px solid var(--line);border-radius:18px;padding:26px}
.step b{display:inline-flex;width:40px;height:40px;border-radius:12px;align-items:center;justify-content:center;background:var(--glow);color:#04060a;font-family:var(--mono);font-size:17px;margin-bottom:14px}
.step h3{font-family:var(--display);font-size:20px;margin-bottom:6px}
.step p{color:var(--muted);font-size:15px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:24px}
.card h3{font-family:var(--display);font-size:18px;font-weight:600;color:var(--cyan);margin-bottom:8px}
.card p{font-size:15px;color:var(--muted)}
.band{display:grid;grid-template-columns:1.2fr .8fr;gap:28px;align-items:center;background:radial-gradient(circle at 90% 10%,rgba(160,107,255,.22),transparent 55%),radial-gradient(circle at 0% 100%,rgba(45,212,255,.14),transparent 55%),var(--panel);border:1px solid var(--line-b);border-radius:24px;padding:40px}
.band h2{text-align:left;margin:8px 0 12px}
.band .kicker{text-align:left}
.band p{color:var(--muted);font-size:16.5px;margin-bottom:22px}
.band ul{list-style:none;display:grid;gap:10px}
.band li{background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:12px;padding:12px 14px;font-size:15px}
.band li b{color:var(--cyan);font-family:var(--mono);font-size:12px;letter-spacing:.08em;margin-right:8px}
.app-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.app{display:block;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px;text-align:center;transition:all .2s}
.app:hover{transform:translateY(-3px);border-color:var(--line-b)}
.app .emoji{font-size:30px}
.app h3{font-family:var(--display);font-size:16px;margin:8px 0 4px}
.app p{font-size:13px;color:var(--muted)}
.faq{max-width:820px;margin:0 auto;display:grid;gap:12px}
.faq .card h3{color:var(--text)}
.final{text-align:center;margin:90px auto 0;max-width:760px;padding:0 24px}
.final h2{font-family:var(--display);font-size:clamp(30px,4.4vw,46px);line-height:1.1;margin-bottom:14px}
.final p{color:var(--muted);font-size:17px;margin-bottom:26px}
.footer{border-top:1px solid var(--line);margin-top:80px;padding:36px 24px 110px;text-align:center}
.footer p{font-family:var(--mono);font-size:12.5px;color:#7a8597}
.footer a{color:var(--muted)}.footer a:hover{color:var(--cyan)}
elevenlabs-convai{z-index:2147483000!important;}
@media(max-width:860px){.qs,.steps,.grid,.app-grid{grid-template-columns:1fr}.band{grid-template-columns:1fr;padding:28px}.nav-r .hide-m{display:none}.sub{font-size:17px}}
@media(prefers-reduced-motion:reduce){.orb,.eyebrow i{animation:none}}
:focus-visible{outline:2px solid #2dd4ff;outline-offset:2px;border-radius:3px}.skip-link{position:absolute;left:-9999px;top:0;z-index:999;background:#000;color:#fff;padding:10px 16px;font:600 14px/1.2 system-ui,sans-serif;text-decoration:none}.skip-link:focus{left:8px;top:8px}
</style>"""

MIC = ('<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="#04060a"/>'
       '<path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" stroke="#04060a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>')

QUESTIONS = [
    ("AI visibility", "Why doesn't ChatGPT mention my business?"),
    ("LLMO", "What is LLMO, and do I need it?"),
    ("Growth", "How can AI help me get more customers?"),
    ("Marketing", "Should I hire a consultant or an agency?"),
    ("Automation", "What should my business automate first?"),
    ("Any language", "¿Puedes ayudarme en español?"),
]
FAQ = [
    ("What is Siamak Kalhor's AI Advisor?", "It is a free voice AI assistant available at siamakconsulting.com/ask, trained on Siamak Kalhor's 40+ years of marketing and AI expertise. You talk to it out loud and it answers questions about AI marketing, LLMO (Large Language Model Optimization), and business growth."),
    ("What can I ask the AI Advisor?", "Ask anything about making your brand visible to AI assistants like ChatGPT and Gemini, LLMO and SEO, marketing strategy, positioning, and how to use AI to grow a business. Example questions: 'What is LLMO?', 'How do I get cited by ChatGPT?', 'How can AI grow my business?'"),
    ("Is the AI Advisor free?", "Yes. The AI Advisor is completely free to use, available 24/7, with no sign-up required. Just visit siamakconsulting.com/ask and tap to start talking."),
    ("What languages does the AI Advisor speak?", "The AI Advisor understands and responds in about 20 languages, so you can ask your questions in your own language."),
    ("Who created the AI Advisor?", "It was created by Siamak Kalhor, an AI marketing consultant and LLMO strategist in Los Angeles with 40+ years of experience and creator of the AI products Orchamind, AisleBird, and ResBizAI."),
]

qs = "".join('<button class="q" type="button" data-talk><small>%s</small><span>%s</span><em>Ask it &rarr;</em></button>' % (k, q) for k, q in QUESTIONS)
faq = "".join('<div class="card"><h3>%s</h3><p>%s</p></div>' % (q, a) for q, a in FAQ)

MAIN = """<main id="main">
<section class="hero">
  <span class="eyebrow"><i></i>Free &middot; Voice AI &middot; Online now</span>
  <div class="stage" id="stage">
    <canvas id="ring" aria-hidden="true"></canvas>
    <button class="orb" id="orb" type="button" aria-label="Start talking to the AI Advisor">%(mic)s<span class="ol" id="orbLabel">Tap to talk</span></button>
  </div>
  <h1>Ask my <span class="grad">AI Advisor</span> anything</h1>
  <p class="sub">Forty years of marketing strategy, available in seconds. Talk or type, in your own language, and get a straight answer about AI visibility, growth and running a smarter business.</p>
  <div class="cta-row">
    <button class="btn btn-pri" type="button" data-talk>%(mic)s Start talking, it's free</button>
    <a class="btn btn-ghost" href="/online-consulting">Talk to the real Siamak</a>
  </div>
  <div class="trust"><span><b>Free</b>, no sign-up</span><span><b>24/7</b></span><span><b>~20</b> languages</span><span>Trained on <b>40 years</b> of strategy</span></div>
</section>

<section class="sec">
  <div class="kicker">Not sure what to ask?</div>
  <h2>Tap a question and ask it out loud</h2>
  <p class="lead">These are the questions business owners ask most. Tap one, the advisor opens, and you ask it in your own words.</p>
  <div class="qs">%(qs)s</div>
</section>

<section class="sec">
  <div class="kicker">How it works</div>
  <h2>Thirty seconds from question to answer</h2>
  <div class="steps">
    <div class="step"><b>1</b><h3>Tap the orb</h3><p>No account and no form. Allow your microphone, or switch to typing if you prefer.</p></div>
    <div class="step"><b>2</b><h3>Ask in your words</h3><p>English, Spanish, Farsi, Armenian and about 16 more. Ask follow-ups like a real conversation.</p></div>
    <div class="step"><b>3</b><h3>Get a straight answer</h3><p>Practical advice from decades of real campaigns. When you want a human, book a free call with Siamak.</p></div>
  </div>
</section>

<section class="sec">
  <div class="kicker">What it can help with</div>
  <h2>One advisor, the questions that move a business</h2>
  <div class="grid">
    <div class="card"><h3>AI visibility</h3><p>How to get ChatGPT, Gemini and Google's AI to recommend your business.</p></div>
    <div class="card"><h3>Marketing strategy</h3><p>Positioning, messaging and which channels are worth your money.</p></div>
    <div class="card"><h3>AI in your business</h3><p>Where AI saves time or money, from lead follow-up to content and operations.</p></div>
  </div>
</section>

<section class="sec">
  <div class="band">
    <div>
      <div class="kicker">For your business</div>
      <h2>Want an advisor like this for your customers?</h2>
      <p>This advisor is an AI agent I built and run myself. I build the same for businesses: an agent that answers your customers by voice or chat, day and night, books appointments and hands off to you when it should.</p>
      <div class="cta-row" style="justify-content:flex-start">
        <a class="btn btn-pri" href="https://agents.siamakconsulting.com">Build your agent free &rarr;</a>
        <a class="btn btn-ghost" href="/ai-agents">How AI agents work</a>
      </div>
    </div>
    <ul>
      <li><b>VOICE</b>Answers calls and questions in about 20 languages</li>
      <li><b>BOOKS</b>Checks your calendar and schedules the appointment</li>
      <li><b>HANDS OFF</b>Knows when to pass the conversation to you</li>
      <li><b>24/7</b>Never misses a lead after hours</li>
    </ul>
  </div>
</section>

<section class="sec">
  <div class="kicker">Built by Siamak Kalhor</div>
  <h2>The AI products behind the advice</h2>
  <div class="app-grid">
    <a class="app" href="https://aislebird.com" target="_blank" rel="noopener"><div class="emoji">🐦</div><h3>AisleBird</h3><p>Smart grocery lists sorted by aisle</p></a>
    <a class="app" href="https://orchamind.com" target="_blank" rel="noopener"><div class="emoji">🏗️</div><h3>Orchamind</h3><p>AI assistant for contractors</p></a>
    <a class="app" href="https://resbizai.com" target="_blank" rel="noopener"><div class="emoji">🍽️</div><h3>ResBizAI</h3><p>The AI brain for restaurants</p></a>
  </div>
</section>

<section class="sec">
  <div class="kicker">Questions</div>
  <h2>Common questions</h2>
  <div class="faq">%(faq)s</div>
</section>

<section class="final">
  <h2>Your next good idea is <span class="grad">one question away.</span></h2>
  <p>Ask the advisor now, or book a free 30-minute call with Siamak himself.</p>
  <div class="cta-row">
    <button class="btn btn-pri" type="button" data-talk>%(mic)s Start talking</button>
    <a class="btn btn-ghost" href="/online-consulting">Book a free call</a>
  </div>
</section>
</main>""" % {"mic": MIC, "qs": qs, "faq": faq}

RING = r"""<script id="ask-ring">
/* Voice ring around the orb: two rings of sound bars and a flowing wave, in a slight 3D tilt.
   Decoration only. Calmer when idle, livelier when the advisor is open; stops when hidden. */
(function(){
  var cv=document.getElementById('ring'); if(!cv) return;
  var ctx=cv.getContext('2d'), orb=document.getElementById('orb');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W=0,H=0,D=1, t=0, energy=0.35, target=0.35, raf=0, visible=true;
  function size(){ D=Math.min(window.devicePixelRatio||1,2); var r=cv.getBoundingClientRect(); W=r.width; H=r.height; cv.width=W*D; cv.height=H*D; ctx.setTransform(D,0,0,D,0,0); }
  function n(a,b){ return Math.sin(a*1.7+b)*.5+Math.sin(a*3.1-b*1.3)*.3+Math.sin(a*5.3+b*.7)*.2; }
  function bars(N,R,len,w,col,tilt,spin,phase,amp){
    for(var i=0;i<N;i++){
      var a=i/N*Math.PI*2+spin, v=(n(a*2,t*1.6+phase)+1)/2; v=.25+v*.75;
      var L=len*(.35+v*amp), ca=Math.cos(a), sa=Math.sin(a);
      var x1=W/2+ca*R, y1=H/2+sa*R*tilt, x2=W/2+ca*(R+L), y2=H/2+sa*(R+L)*tilt;
      var depth=(sa*tilt+1)/2;
      ctx.strokeStyle=col(i,a,.35+depth*.65); ctx.lineWidth=w; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    }
  }
  function draw(){
    energy+= (target-energy)*.05; t+=reduce?0:.016*(0.7+energy);
    ctx.clearRect(0,0,W,H);
    var S=Math.min(W,H), tilt=.9+Math.sin(t*.4)*.04;
    var g=ctx.createRadialGradient(W/2,H/2,S*.12,W/2,H/2,S*.5); g.addColorStop(0,'rgba(45,212,255,'+(.10+energy*.12)+')'); g.addColorStop(1,'rgba(45,212,255,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ctx.lineCap='round';
    // outer ring: cyan with amber accents
    bars(120,S*.355,S*.07,Math.max(2,S*.006),function(i,a,al){ var am=(i%17<3); return am?'rgba(255,180,84,'+al+')':'rgba(45,212,255,'+al+')'; },tilt,t*.12,0,1.1*energy+.3);
    // inner ring: violet, counter-rotating
    bars(96,S*.235,S*.045,Math.max(1.5,S*.0045),function(i,a,al){ return 'rgba(160,107,255,'+(al*.95)+')'; },tilt,-t*.18,2.1,1.2*energy+.35);
    // flowing wave through the ring
    ctx.lineWidth=Math.max(1.5,S*.003); ctx.strokeStyle='rgba(45,212,255,'+(.35+energy*.3)+')'; ctx.beginPath();
    for(var x=0;x<=W;x+=4){ var u=x/W, y=H/2+Math.sin(u*6.3+t*1.8)*S*.035*(.6+energy)*Math.sin(u*Math.PI)+Math.sin(u*13+t*2.6)*S*.008; if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }
    ctx.stroke();
    if(!reduce && visible) raf=requestAnimationFrame(draw);
  }
  function start(){ cancelAnimationFrame(raf); raf=requestAnimationFrame(draw); }
  size(); window.addEventListener('resize',function(){ size(); if(reduce) draw(); });
  if('IntersectionObserver' in window){ new IntersectionObserver(function(e){ visible=e[0].isIntersecting; if(visible&&!reduce) start(); }).observe(cv); }
  document.addEventListener('visibilitychange',function(){ visible=!document.hidden; if(visible&&!reduce) start(); });
  if(orb){ new MutationObserver(function(){ target=orb.classList.contains('active')?1:.35; var l=document.getElementById('orbLabel'); if(l) l.textContent=orb.classList.contains('active')?'Listening…':'Tap to talk'; }).observe(orb,{attributes:true,attributeFilter:['class']});
    orb.addEventListener('mouseenter',function(){ if(!orb.classList.contains('active')) target=.6; }); orb.addEventListener('mouseleave',function(){ if(!orb.classList.contains('active')) target=.35; }); }
  draw(); if(!reduce) start();
})();
</script>"""

# 1. CSS: replace the page's own style block (the one that defines --void/--panel), or a previous build
s, n = re.subn(r'<style id="ask-css">.*?</style>|<style>\s*\*\{margin:0;padding:0;box-sizing:border-box\}\s*:root\{--void:#000;--panel:#06080c.*?</style>', lambda m: CSS, s, count=1, flags=re.S)
assert n == 1, "style block not found"
# 2. nav: richer but still minimal
s = re.sub(r'<nav class="nav">.*?</nav>',
           '<nav class="nav"><div class="nav-in"><a href="/" class="brand">SIAMAK_KALHOR<span>// AI</span></a>'
           '<div class="nav-r"><a href="/ai-agents" class="hide-m">AI Agents</a><a href="/videos" class="hide-m">Videos</a>'
           '<a href="/online-consulting" class="book">Book a call</a></div></div></nav>\n<div class="ambient" aria-hidden="true"></div>',
           s, count=1, flags=re.S)
s = s.replace('</nav>\n<div class="ambient" aria-hidden="true"></div>\n<div class="ambient" aria-hidden="true"></div>', '</nav>\n<div class="ambient" aria-hidden="true"></div>')
# 3. main
s = re.sub(r'<main id="main">.*?</main>', lambda m: MAIN, s, count=1, flags=re.S)
# 4. expose the loader and bind every [data-talk]
hook = "  var tb=document.getElementById('talkBtn');\n  if(tb) tb.addEventListener('click', openAdvisor);"
if "data-talk" not in s.split("</main>")[1]:
    assert hook in s, "talk button hook not found"
    s = s.replace(hook, hook + "\n  Array.prototype.forEach.call(document.querySelectorAll('[data-talk]'), function(el){ el.addEventListener('click', openAdvisor); });\n  window.skOpenAdvisor = openAdvisor;\n  (function(){ var st=document.getElementById('stage'), b=document.getElementById('talkBtn'); if(!st||!b||!('IntersectionObserver' in window)) return; b.style.transition='opacity .3s'; new IntersectionObserver(function(e){ if(loaded) return; var v=e[0].isIntersecting; b.style.opacity=v?'0':'1'; b.style.pointerEvents=v?'none':'auto'; }).observe(st); })();")
# 5. the ring replaces hero3d on this page
s = s.replace('<script src="/assets/hero3d.js?v=6" defer></script>\n', '')
s = re.sub(r'<script id="ask-ring">.*?</script>\n?', '', s, flags=re.S)
s = s.replace('<script src="/share.js" defer></script>', RING + '\n  <script src="/share.js" defer></script>', 1)
# 6. head copy for promotion
s = re.sub(r'<meta name="description" content="[^"]*"/>', '<meta name="description" content="Talk to Siamak Kalhor\'s free AI Advisor: a voice assistant trained on 40+ years of marketing and AI strategy. Ask about AI visibility, LLMO and growth, 24/7, in about 20 languages."/>', s, count=1)
open(P, "w", encoding="utf-8").write(s)
print("ask rebuilt")
