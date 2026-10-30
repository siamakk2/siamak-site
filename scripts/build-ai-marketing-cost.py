#!/usr/bin/env python3
"""Builds /ai-marketing-cost: "How much does AI marketing cost?" with a pricing calculator.

Targets the questions buyers type: how much does AI marketing cost, how much do AI
marketing agencies charge, AI marketing agency pricing, AI marketing cost for a small
business. Market ranges come from published 2026 sources (listed on the page); Siamak's
own numbers come from /pricing. The calculator runs in the browser, no data is sent.

Shell, nav, footer and base CSS come from build-ai-services.py (lifted from /ai-consultant).

    python3 scripts/build-ai-marketing-cost.py
"""
import json, os, runpy, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.argv = [sys.argv[0], "need-services-content.py"]
B = runpy.run_path(os.path.join(HERE, "build-ai-services.py"), run_name="lib")
ROOT, BASE = B["ROOT"], B["BASE"]
e, a, strip, head_html = B["e"], B["a"], B["strip"], B["head_html"]

TODAY = "2026-10-29"
SLUG = "ai-marketing-cost"
HOUR = "https://buy.stripe.com/cNi14o2yQaMUdbC3zX0kE03"

SOURCES = [
    ("WebFX: How much does generative engine optimization cost? (May 2026)", "https://www.webfx.com/blog/seo/geo-pricing/"),
    ("Nutshell: How much does GEO cost in 2026? (updated Sept 2026)", "https://www.nutshell.com/blog/geo-costs"),
    ("Digital Agency Network: AI agency pricing guide 2026", "https://digitalagencynetwork.com/ai-agency-pricing/"),
    ("MV3 Marketing: AI agency pricing in 2026, with Clutch and Ahrefs data (Aug 2026)", "https://www.mv3marketing.com/blog/ai-agency-pricing-in-2026-what-saas-companies-actually-pay/"),
    ("Denser: How much does an AI chatbot cost in 2026? (updated Sept 2026)", "https://denser.ai/blog/how-much-chatbot-cost/"),
]

FAQ = [
("How much does AI marketing cost?",
 "Most small businesses pay $1,500 to $5,000 a month for AI marketing done by an agency, mid-size companies $5,000 to $25,000 a month, and enterprises $25,000 and up. "
 "If you only want guidance, AI marketing consultants charge about $100 to $450 an hour. Setting up an AI chatbot, voice agent or automation usually costs $2,500 to $15,000 one-time, "
 "plus a monthly fee. Doing it yourself with tools runs $10 to $1,000 a month plus your time. Use the calculator on this page for your own mix."),
("How much do AI marketing agencies charge?",
 "AI marketing agencies usually charge a monthly retainer: about $1,500 to $5,000 for a small business, $5,000 to $25,000 for a mid-size company and $25,000 to $50,000 or more for enterprise work. "
 "One-off projects such as an audit or a rebuild typically run $5,000 to $50,000, and hourly work $50 to $300. Some agencies add a performance bonus on top of the retainer."),
("How much does AI marketing cost for a small business?",
 "A realistic small-business budget is $1,500 to $5,000 a month for done-for-you work, or a few hundred dollars a month if you get expert guidance and do the work yourself. "
 "With me, the most common starting point is an AI Visibility Launch ($2,500 one-time) followed by AI Visibility Growth ($1,500 a month)."),
("How much does AI search optimization (GEO or LLMO) cost?",
 "Agencies charge about $1,500 to $5,000 a month for small businesses and $5,000 to $25,000 for mid-size companies. Projects run $5,000 to $50,000. "
 "My prices: a fixed $1,500 AI Authority Audit, a $2,500 AI Visibility Launch and $1,500 a month for ongoing AI Visibility Growth. "
 "See also <a href=\"/how-much-does-llmo-cost\">How much does LLMO cost?</a>"),
("How much does an AI chatbot or AI voice agent cost?",
 "Off-the-shelf chatbot software costs about $19 to $500 a month. A custom-built agent costs $2,000 to $25,000 to set up, plus a monthly fee to run and monitor it. "
 "My Done-For-You AI Agent is $3,500 to set up plus $1,000 a month, or $5,000 plus $1,500 a month for doctors, dentists, law firms and financial advisors, because their agents need extra privacy safeguards."),
("Is AI marketing cheaper than traditional marketing?",
 "Not always cheaper per month, but usually more output for the money. AI does the volume work (drafts, variations, reports, follow-ups) faster, so the same budget buys more. "
 "What you still pay for is strategy and judgment: deciding what to say, to whom, and checking that it is right. That is where cheap AI marketing usually fails."),
("Why do AI marketing agency prices vary so much?",
 "Because the word covers very different work: a $99-a-month software tool, a freelancer running ChatGPT prompts, and a senior team rebuilding how a company gets found are all called AI marketing. "
 "Price follows scope, seniority, how many channels are covered, how competitive your market is, and whether setup work is included."),
("What should I get for my money?",
 "A written plan before any work starts, a list of deliverables you can check each month, access to every account in your name, and reporting tied to leads and revenue, not just impressions. "
 "No honest provider guarantees rankings or AI mentions. Before you sign, read <a href=\"/is-my-marketing-agency-working\">how to tell if a marketing agency is working</a>."),
]

# Calculator data. Market ranges: [low, high] per business size (small, growing, mid). m = monthly, o = one-time.
SERVICES = [
 {"k": "visibility", "name": "AI search visibility", "sub": "Found and recommended by Google, ChatGPT, Gemini (GEO, AEO, LLMO)",
  "m": [[1500, 5000], [3000, 10000], [5000, 25000]], "o": [[0, 0], [0, 0], [0, 0]],
  "mine": {"o": 2500, "m": 1500, "label": "AI Visibility Launch $2,500 one-time, then AI Visibility Growth $1,500/month"}},
 {"k": "content", "name": "Content and social media", "sub": "Articles, posts, newsletters and short video, made faster with AI",
  "m": [[1000, 3000], [2000, 5000], [3000, 10000]], "o": [[0, 0], [0, 0], [0, 0]],
  "mine": {"o": 0, "m": 1200, "label": "Content Engine $1,200/month"}},
 {"k": "ads", "name": "Paid ads management", "sub": "Google, Meta and LinkedIn campaigns (management fee, ad spend not included)",
  "m": [[600, 1500], [1500, 4000], [3000, 9500]], "o": [[0, 0], [0, 0], [0, 0]],
  "mine": {"o": None, "m": None, "label": "Quoted after a free call"}},
 {"k": "agent", "name": "AI chatbot or voice agent", "sub": "Answers questions, captures leads and books appointments 24/7",
  "m": [[100, 500], [500, 1500], [1000, 5000]], "o": [[2000, 8000], [5000, 15000], [10000, 25000]],
  "mine": {"o": 3500, "m": 1000, "label": "Done-For-You AI Agent $3,500 setup + $1,000/month",
           "reg": {"o": 5000, "m": 1500, "label": "Done-For-You AI Agent, regulated: $5,000 setup + $1,500/month"}}},
 {"k": "automation", "name": "Marketing automation", "sub": "Follow-ups, lead routing, CRM updates and reporting",
  "m": [[500, 1000], [1000, 2500], [2500, 5000]], "o": [[2500, 5000], [5000, 10000], [10000, 15000]],
  "mine": {"o": None, "m": None, "label": "Quoted after a free call"}},
 {"k": "website", "name": "AI-ready website", "sub": "A fast site built so search engines and AI can read and recommend it",
  "m": [[0, 0], [0, 0], [0, 0]], "o": [[3000, 10000], [8000, 20000], [15000, 30000]],
  "mine": {"o": 4500, "m": 0, "label": "AI-Ready Website from $4,500", "from": True}},
 {"k": "strategy", "name": "Strategy and leadership", "sub": "A senior marketer setting the plan, budget and priorities (fractional CMO)",
  "m": [[5000, 8000], [6000, 12000], [10000, 25000]], "o": [[0, 0], [0, 0], [0, 0]],
  "mine": {"o": None, "m": None, "label": "Strategy hour $350; fractional CMO quoted after a diagnostic"}},
]
SIZES = [("small", "Small", "1–10 people"), ("growing", "Growing", "11–50 people"), ("mid", "Mid-size", "51–250 people")]

EXTRA_CSS = r"""
<style id="cost-css">
.ph{padding:66px 0 30px}
.answer{border:1px solid var(--line-bright);border-radius:18px;padding:24px 26px;background:var(--panel,#0b0f16);margin-top:26px;max-width:880px}
.answer .k{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);margin-bottom:10px}
.answer p{font-size:18px;line-height:1.65;color:var(--text);margin:0}
.glance5{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-top:26px}
.glance5 div{background:var(--surface);padding:18px}
.glance5 b{display:block;font-family:var(--display);font-size:23px;font-weight:700;line-height:1.15;color:var(--text)}
.glance5 span{display:block;font-size:13px;color:var(--muted);margin-top:6px;line-height:1.45}

.calc{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.9fr);gap:26px;align-items:start;margin-top:22px}
@media(max-width:900px){.calc{grid-template-columns:minmax(0,1fr)}}
.cbox{border:1px solid var(--line-bright);border-radius:18px;background:var(--surface);padding:22px}
.cstep{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-dim);margin:4px 0 10px}
.cstep + .seg,.cstep + .svcs{margin-bottom:22px}
.seg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.seg label{cursor:pointer}
.seg input{position:absolute;opacity:0;pointer-events:none}
.seg span{display:block;border:1px solid var(--line-bright);border-radius:12px;padding:11px 12px;font-size:14.5px;color:var(--muted);line-height:1.35;transition:all .15s}
.seg span b{display:block;color:var(--text);font-size:15.5px}
.seg input:checked + span{border-color:var(--cyan);background:rgba(45,212,255,.08);color:var(--text)}
.seg input:focus-visible + span{outline:2px solid var(--cyan);outline-offset:2px}
.svcs{display:grid;gap:8px}
.svc{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line);border-radius:12px;padding:12px 14px;cursor:pointer;transition:border-color .15s}
.svc:hover{border-color:var(--line-bright)}
.svc input{margin-top:4px;width:18px;height:18px;accent-color:#2dd4ff;flex:none}
.svc b{display:block;color:var(--text);font-size:15.5px}
.svc small{display:block;color:var(--muted);font-size:13.5px;line-height:1.45;margin-top:2px}
.reg{display:flex;gap:10px;align-items:center;font-size:14px;color:var(--muted);margin:-8px 0 20px 2px}
.reg input{accent-color:#2dd4ff;width:16px;height:16px}
.result{position:sticky;top:90px;border:1px solid var(--line-bright);border-radius:18px;padding:22px;background:radial-gradient(circle at 80% 0%,rgba(160,107,255,.16),transparent 55%),radial-gradient(circle at 0% 100%,rgba(45,212,255,.12),transparent 55%),var(--panel,#0b0f16)}
.result h3{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-dim);margin:0 0 6px;font-weight:500}
.rnum{font-family:var(--display);font-size:34px;font-weight:700;line-height:1.1;color:var(--text)}
.rnum small{font-size:16px;color:var(--muted);font-weight:500}
.rone{font-size:15px;color:var(--muted);margin-top:6px}
.rsplit{border-top:1px solid var(--line);margin:18px 0 0;padding-top:16px}
.rmine .rnum{background:var(--glow);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.rlist{list-style:none;margin:10px 0 0;padding:0;font-size:13.5px;color:var(--muted);line-height:1.5}
.rlist li{padding:5px 0;border-top:1px dashed var(--line)}
.rlist li:first-child{border-top:0}
.rnote{font-size:12.5px;color:var(--muted-dim);margin-top:14px;line-height:1.55}
.rcta{display:flex;flex-direction:column;gap:8px;margin-top:16px}
.rcta .btn{justify-content:center;text-align:center}
.tbl{width:100%;border-collapse:collapse;margin-top:18px;font-size:15px}
.tbl th,.tbl td{border-bottom:1px solid var(--line);padding:12px 12px;text-align:left;vertical-align:top}
.tbl th{font-family:var(--mono);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-dim);font-weight:500}
.tbl td:first-child{color:var(--text);font-weight:600}
.tbl td{color:var(--muted)}
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:14px;padding:0 6px}
.drivers{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:18px}
.drivers div{border:1px solid var(--line);border-radius:14px;padding:18px;background:var(--surface)}
.drivers b{display:block;color:var(--text);font-size:16.5px;margin-bottom:6px}
.drivers p{font-size:14.5px;color:var(--muted);line-height:1.55;margin:0}
.srcs{font-size:14px;color:var(--muted);line-height:1.7;margin-top:10px}
.srcs a{color:var(--cyan)}
</style>
"""

JS = r"""
<script id="cost-js">
(function(){
  var DATA = __DATA__;
  var f = document.getElementById('costCalc'); if(!f) return;
  function $(s){return f.querySelector(s)}
  function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
  function rng(lo,hi){return lo===hi? money(lo) : money(lo)+'–'+money(hi)}
  function calc(){
    var size = (f.querySelector('input[name=size]:checked')||{}).value || 'small';
    var mode = (f.querySelector('input[name=mode]:checked')||{}).value || 'agency';
    var si = {small:0,growing:1,mid:2}[size];
    var reg = $('#reg').checked;
    var picked = DATA.filter(function(s){ var c=f.querySelector('input[name=svc][value='+s.k+']'); return c && c.checked; });
    $('#regRow').style.display = picked.some(function(s){return s.k==='agent'}) ? 'flex' : 'none';
    var mLo=0,mHi=0,oLo=0,oHi=0,myM=0,myO=0,quoted=[],lines=[],fromWeb=false;
    picked.forEach(function(s){
      mLo+=s.m[si][0]; mHi+=s.m[si][1]; oLo+=s.o[si][0]; oHi+=s.o[si][1];
      var mine = (s.k==='agent' && reg && s.mine.reg) ? s.mine.reg : s.mine;
      if(mine.m===null){ quoted.push(s.name); lines.push(mine.label); }
      else { myM+=mine.m; myO+=mine.o; lines.push(mine.label); if(mine.from) fromWeb=true; }
    });
    var mk = $('#mkt'), me = $('#mine'), list=$('#mineList'), oneEl=$('#mktOne'), myOne=$('#mineOne'), note=$('#modeNote');
    if(!picked.length){
      mk.innerHTML='Pick a service'; oneEl.textContent=''; me.innerHTML='—'; myOne.textContent=''; list.innerHTML=''; note.textContent=''; return;
    }
    if(mode==='agency'){
      mk.innerHTML = rng(mLo,mHi)+' <small>/month</small>';
      oneEl.textContent = oHi ? 'plus '+rng(oLo,oHi)+' one-time setup' : 'no setup fee typical';
      note.textContent = 'Typical 2026 agency prices for a '+size.replace('mid','mid-size')+' business. Ad spend and software not included.';
    } else if(mode==='consultant'){
      var hrs = Math.max(3, picked.length*3), hrsHi = Math.max(6, picked.length*5);
      mk.innerHTML = rng(hrs*150, hrsHi*450)+' <small>/month</small>';
      oneEl.textContent = 'about '+hrs+'–'+hrsHi+' hours of expert guidance a month at $150–$450/hour; your team does the work';
      note.textContent = 'You save the agency fee but pay with your team\'s time.';
    } else {
      mk.innerHTML = money(10*picked.length)+'–'+money(Math.min(1000, 250*picked.length))+' <small>/month</small>';
      oneEl.textContent = 'in software, plus your own time to learn and do the work';
      note.textContent = 'Cheapest in cash, most expensive in time. A course or a paid strategy hour first keeps you from spending it in the wrong place.';
    }
    if(mode==='diy'){
      me.innerHTML = '$0–$197'; myOne.textContent = 'free S.C.A.L.E. scan and website audit; S.C.A.L.E. Academy course $197 one-time';
      list.innerHTML = '<li>Free scan: scale.siamakconsulting.com</li><li>Agent Studio: free preview, $99 blueprint</li>';
    } else if(mode==='consultant'){
      me.innerHTML = '$350 <small>/hour</small>'; myOne.textContent = 'strategy hour, no minimum; hourly consulting $350–$450; AI Authority Audit $1,500 fixed';
      list.innerHTML = '<li>Free 30-minute first call</li>';
    } else {
      me.innerHTML = (myM? money(myM)+' <small>/month</small>' : (quoted.length===picked.length? 'Quoted' : '$0 <small>/month</small>'));
      myOne.textContent = myO ? 'plus '+(fromWeb?'from ':'')+money(myO)+' one-time' : '';
      list.innerHTML = lines.map(function(l){return '<li>'+l+'</li>'}).join('');
    }
  }
  f.addEventListener('change', calc); calc();
})();
</script>
"""


def build():
    url = f"{BASE}/{SLUG}"
    title = "How Much Does AI Marketing Cost? 2026 Prices & Calculator"
    desc = ("AI marketing costs $1,500–$5,000 a month for most small businesses and $5,000–$25,000 for mid-size companies. "
            "See what AI marketing agencies charge, by service, and estimate yours with a free calculator.")
    og_img = f"{BASE}/og/{SLUG}.jpg"
    faq_ld = {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(ans)}} for q, ans in FAQ]}
    page = {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": title, "description": desc,
            "isPartOf": {"@id": BASE + "/#website"}, "author": {"@id": BASE + "/#person"}, "inLanguage": "en-US",
            "datePublished": TODAY, "dateModified": TODAY, "breadcrumb": {"@id": url + "#breadcrumb"},
            "primaryImageOfPage": {"@type": "ImageObject", "url": og_img},
            "about": [{"@type": "Thing", "name": "AI marketing pricing"}, {"@type": "Thing", "name": "AI marketing agency cost"}]}
    app = {"@type": "WebApplication", "@id": url + "#calculator", "name": "AI Marketing Cost Calculator", "url": url + "#calculator",
           "applicationCategory": "BusinessApplication", "operatingSystem": "Any", "isAccessibleForFree": True,
           "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "creator": {"@id": BASE + "/#person"},
           "description": "Estimate what AI marketing costs for your business size and services, compared with typical 2026 agency prices."}
    bc = {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
        {"@type": "ListItem", "position": 2, "name": "Pricing", "item": BASE + "/pricing"},
        {"@type": "ListItem", "position": 3, "name": "AI marketing cost", "item": url}]}
    graph = [B["WEBSITE"], B["PERSON"], B["BUSINESS"], page, bc, app, faq_ld]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")

    hero = ('<header class="ph"><div class="wrap"><div class="crumb"><a href="/">Home</a> / <a href="/pricing">Pricing</a> / <span>AI marketing cost</span></div>'
            '<div class="eyebrow"><span class="dot"></span>2026 pricing guide · free calculator</div>'
            '<h1 class="ph-h">How much does AI marketing cost? <span class="grad">Real 2026 prices.</span></h1>'
            '<div class="answer"><div class="k">The short answer</div><p>Most small businesses pay <b>$1,500 to $5,000 a month</b> for AI marketing done by an agency. '
            'Mid-size companies pay <b>$5,000 to $25,000 a month</b>. An AI marketing consultant charges about <b>$100 to $450 an hour</b>, and setting up an AI chatbot, '
            'voice agent or automation usually costs <b>$2,500 to $15,000</b> one-time plus a monthly fee. Below: what AI marketing agencies charge for each service, '
            'what drives the price, and a calculator for your own mix.</p></div>'
            '<div class="glance5">'
            '<div><b>$1,500–$5,000</b><span>a month, agency, small business</span></div>'
            '<div><b>$5,000–$25,000</b><span>a month, agency, mid-size company</span></div>'
            '<div><b>$100–$450</b><span>an hour, AI marketing consultant</span></div>'
            '<div><b>$2,500–$15,000</b><span>one-time, AI agent or automation setup</span></div>'
            '<div><b>$10–$1,000</b><span>a month, do-it-yourself AI tools</span></div>'
            '</div></div></header>\n')

    size_html = "".join(f'<label><input type="radio" name="size" value="{k}"{" checked" if k == "small" else ""}><span><b>{n}</b>{d}</span></label>' for k, n, d in SIZES)
    mode_html = ('<label><input type="radio" name="mode" value="agency" checked><span><b>Done for me</b>an agency does the work</span></label>'
                 '<label><input type="radio" name="mode" value="consultant"><span><b>Guide my team</b>a consultant advises</span></label>'
                 '<label><input type="radio" name="mode" value="diy"><span><b>Do it myself</b>tools and a course</span></label>')
    svc_html = "".join(f'<label class="svc"><input type="checkbox" name="svc" value="{s["k"]}"{" checked" if s["k"] in ("visibility", "content") else ""}>'
                       f'<span><b>{e(s["name"])}</b><small>{e(s["sub"])}</small></span></label>' for s in SERVICES)
    calc = ('<section id="calculator"><div class="wrap"><div class="sec-label">Calculator</div>'
            '<h2 class="sec-h">AI marketing cost calculator</h2>'
            '<p class="lead">Choose your size, what you need and who should do the work. You\'ll see what agencies typically charge in 2026 next to my published prices. '
            'Estimates only; nothing you pick is sent anywhere.</p>'
            '<form class="calc" id="costCalc" onsubmit="return false"><div class="cbox">'
            f'<div class="cstep">1 · Your business</div><div class="seg">{size_html}</div>'
            f'<div class="cstep">2 · What you need</div><div class="svcs">{svc_html}</div>'
            '<label class="reg" id="regRow"><input type="checkbox" id="reg"> I\'m a doctor, dentist, law firm or financial advisor (the agent handles private client data)</label>'
            f'<div class="cstep">3 · Who does the work</div><div class="seg">{mode_html}</div>'
            '</div><aside class="result" aria-live="polite">'
            '<h3>Typical market price</h3><div class="rnum" id="mkt"></div><div class="rone" id="mktOne"></div>'
            '<div class="rsplit rmine"><h3>With Siamak Kalhor</h3><div class="rnum" id="mine"></div><div class="rone" id="mineOne"></div><ul class="rlist" id="mineList"></ul></div>'
            '<p class="rnote" id="modeNote"></p>'
            '<div class="rcta"><a href="/online-consulting" class="btn btn-pri">Get an exact quote on a free call &rarr;</a>'
            '<a href="/pricing" class="btn btn-ghost">See every published price</a></div>'
            '</aside></form></div></section>\n')

    rows = [("AI search visibility (GEO, AEO, LLMO)", "$1,500–$5,000", "$5,000–$25,000", "$5,000–$50,000 per project"),
            ("Content and social media", "$1,000–$3,000", "$3,000–$10,000", "$2,000–$10,000 per project"),
            ("Paid ads management (fee only)", "$600–$1,500", "$3,000–$9,500+", "often a % of ad spend"),
            ("AI chatbot or voice agent", "$100–$500 to run", "$1,000–$5,000 to run", "$2,000–$25,000 setup"),
            ("Marketing automation", "$500–$1,000", "$2,500–$5,000", "$2,500–$15,000 setup"),
            ("AI-ready website", "—", "—", "$3,000–$30,000+ per project"),
            ("Strategy / fractional CMO", "$5,000–$8,000", "$10,000–$25,000", "$100–$450 an hour")]
    tbl = "".join(f"<tr><td>{e(r[0])}</td><td>{e(r[1])}</td><td>{e(r[2])}</td><td>{e(r[3])}</td></tr>" for r in rows)
    agency = ('<section id="agency-prices"><div class="wrap"><div class="sec-label">Agency pricing</div>'
              '<h2 class="sec-h">How much do AI marketing agencies charge?</h2>'
              '<p class="lead">Most AI marketing agencies charge a monthly retainer: about $1,500 to $5,000 for a small business, $5,000 to $25,000 for a mid-size company, '
              'and $25,000 to $50,000 or more for enterprise work. Projects such as an audit or a rebuild run $5,000 to $50,000, and hourly work $50 to $300. '
              'In the US, agency hourly rates cluster around $100 to $149. Here is the range by service.</p>'
              '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Service</th><th>Small business / month</th><th>Mid-size / month</th><th>Project or setup</th></tr></thead>'
              f'<tbody>{tbl}</tbody></table></div>'
              '<p class="srcs">Ranges compiled from the 2026 sources listed at the bottom of this page. Ad spend and software subscriptions are extra.</p>'
              '<h3 style="margin-top:30px">The four ways agencies price AI marketing</h3>'
              '<div class="drivers">'
              '<div><b>Monthly retainer</b><p>A fixed fee for an agreed list of work every month. The most common model, and the easiest to budget.</p></div>'
              '<div><b>Project fee</b><p>A fixed price for a defined job: an audit, a website, an agent build. Good for a clear start and finish.</p></div>'
              '<div><b>Hourly</b><p>Pay for time, usually for advice, reviews and strategy. Best when you have a team to do the work.</p></div>'
              '<div><b>Performance or hybrid</b><p>A lower base fee plus a bonus tied to leads or sales. Read the definition of a "lead" carefully.</p></div>'
              '</div></div></section>\n')

    drivers = ('<section><div class="wrap"><div class="sec-label">What drives the price</div>'
               '<h2 class="sec-h">Why one quote is $1,500 and another is $15,000</h2>'
               '<div class="drivers">'
               '<div><b>Scope</b><p>One channel or all of them. AI visibility alone costs far less than visibility, content, ads and automation together.</p></div>'
               '<div><b>Seniority</b><p>A tool, a junior team running prompts, or a senior strategist deciding what to say. You pay for judgment.</p></div>'
               '<div><b>Your market</b><p>A dentist in a small town needs less than a law firm in Los Angeles competing with fifty others.</p></div>'
               '<div><b>Setup work</b><p>Websites, agents and automations cost the most at the start, then much less each month to run.</p></div>'
               '<div><b>Who does the work</b><p>Done-for-you costs the most in cash. Guidance plus your own team costs less cash and more time.</p></div>'
               '<div><b>Industry rules</b><p>Medical, dental, legal and financial work needs privacy safeguards and review, which adds cost.</p></div>'
               '</div></div></section>\n')

    compare = ('<section><div class="wrap"><div class="sec-label">Your options</div>'
               '<h2 class="sec-h">Agency, consultant, freelancer or do it yourself?</h2>'
               '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Option</th><th>Typical cost</th><th>Who does the work</th><th>Best for</th></tr></thead><tbody>'
               '<tr><td>AI marketing agency</td><td>$1,500–$25,000+ a month</td><td>The agency</td><td>Owners with no time or team for marketing</td></tr>'
               '<tr><td>AI marketing consultant</td><td>$100–$450 an hour</td><td>Your team, with expert direction</td><td>Businesses with staff who need a plan they can trust</td></tr>'
               '<tr><td>Freelancer</td><td>About $1,350 a month on average (SEO freelancers)</td><td>One person</td><td>A single, well-defined task</td></tr>'
               '<tr><td>Do it yourself</td><td>$10–$1,000 a month in tools</td><td>You</td><td>Very small budgets, if you have the time to learn</td></tr>'
               '</tbody></table></div>'
               '<p class="srcs">Freelancer average from an Ahrefs survey cited by MV3 Marketing.</p></div></section>\n')

    mine = ('<section><div class="wrap"><div class="sec-label">My prices</div>'
            '<h2 class="sec-h">What I charge, <span class="grad">published</span></h2>'
            '<p class="lead">I\'m a consultant-led, done-for-you AI agency: I set the strategy and review every deliverable, and my AI agents do the volume. '
            'Here is what that costs. Every price is also on the <a href="/pricing">pricing page</a>.</p>'
            '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Service</th><th>Price</th><th>What you get</th></tr></thead><tbody>'
            '<tr><td>First call</td><td>Free, 30 minutes</td><td>Your goals, your numbers and the one move that matters most</td></tr>'
            f'<tr><td>Strategy hour</td><td><a href="{HOUR}" rel="noopener">$350</a></td><td>A full hour on any question; hourly consulting $350–$450 after that</td></tr>'
            '<tr><td>AI Authority Audit</td><td>$1,500 fixed</td><td>What ChatGPT, Gemini, Claude, Perplexity and AI Overviews say about you, with a ranked fix list</td></tr>'
            '<tr><td>AI Visibility Launch</td><td>$2,500 one-time</td><td>The foundation that makes Google and AI understand and recommend you</td></tr>'
            '<tr><td>AI Visibility Growth</td><td>$1,500 a month</td><td>Ongoing AI search work, content and monthly measurement</td></tr>'
            '<tr><td>Content Engine</td><td>$1,200 a month</td><td>Articles, posts and scripts made with AI and checked by me</td></tr>'
            '<tr><td>AI-Ready Website</td><td>From $4,500</td><td>A fast website built for search engines and AI</td></tr>'
            '<tr><td>Done-For-You AI Agent</td><td>$3,500 + $1,000/month</td><td>An agent that answers, qualifies and books 24/7 ($5,000 + $1,500/month for regulated practices)</td></tr>'
            '<tr><td>S.C.A.L.E. Academy</td><td>$197 one-time</td><td>The full course, to do the work in-house</td></tr>'
            '</tbody></table></div>'
            '<div class="ph-btns" style="margin-top:22px"><a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a>'
            '<a href="/agency" class="btn btn-ghost">See the done-for-you packages</a></div></div></section>\n')

    faq_items = "".join(f'<div class="qa"><h3>{e(q)}</h3><p>{ans}</p></div>' for q, ans in FAQ)
    faq = ('<section id="faq"><div class="wrap"><div class="sec-label">Questions</div>'
           f'<h2 class="sec-h">AI marketing cost: common questions</h2><div class="faq">{faq_items}</div></div></section>\n')
    srcs = ('<section><div class="wrap"><div class="sec-label">Sources</div><h2 class="sec-h">Where these numbers come from</h2>'
            '<p class="srcs">Market ranges are compiled from these published 2026 guides and are typical prices, not quotes. '
            'My prices are my own, published on <a href="/pricing">siamakconsulting.com/pricing</a>. Last updated October 29, 2026.</p><ul class="srcs">'
            + "".join(f'<li><a href="{a(u)}" rel="noopener">{e(t)}</a></li>' for t, u in SOURCES)
            + '</ul><p class="srcs">Related: <a href="/how-much-does-llmo-cost">How much does LLMO cost?</a> · '
              '<a href="/ai-marketing-agency">AI marketing agency</a> · <a href="/ai-consultant-vs-ai-agency">AI consultant vs AI agency</a> · '
              '<a href="/is-my-marketing-agency-working">Is my marketing agency working?</a></p></div></section>\n')

    body = hero + calc + agency + drivers + compare + mine + faq + srcs
    data = [{"k": s["k"], "name": s["name"], "m": s["m"], "o": s["o"], "mine": s["mine"]} for s in SERVICES]
    js = JS.replace("__DATA__", json.dumps(data))
    head = head_html(title, desc, url, og_img, ld).replace("</head>", EXTRA_CSS + "\n</head>", 1)
    out = (head + '<body class="v2">\n<a href="#main" class="skip-link">Skip to content</a>\n<div class="ambient"></div>\n'
           + B["NAV"] + '\n<main id="main">\n' + body + "</main>" + js + B["TAIL"])
    os.makedirs(os.path.join(ROOT, SLUG), exist_ok=True)
    open(os.path.join(ROOT, SLUG, "index.html"), "w", encoding="utf-8").write(out)
    print("%s: %d FAQs, ~%d words" % (SLUG, len(FAQ), len(strip(body).split())))


build()
