#!/usr/bin/env python3
"""Builds the done-for-you AI agency pages: /agency and /agency/start.

Site chrome (consent, analytics, fonts, base CSS, nav, footer) comes from
growth-framework/index.html at build time, so these pages always match the site.
Run from the repo root:  python3 scripts/build-agency.py
"""
import html, json, os, re

ROOT = os.path.join(os.path.dirname(__file__), '..')
SITE = 'https://siamakconsulting.com'
esc = lambda s: html.escape(s, quote=True)

PACKAGES = [
 {'key': 'launch', 'name': 'AI Visibility Launch', 'tag': 'Most popular start', 'price': '$2,500', 'per': 'one-time', 'amount': 2500, 'recurring': False,
  'link': 'https://buy.stripe.com/eVq00k6P69IQ3B2b2p0kE05', 'time': 'Delivered in about 2 weeks',
  'for': 'Businesses that want ChatGPT, Gemini and Perplexity to find, understand and name them.',
  'gets': ['Full S.C.A.L.E. scan of your site and listings', 'Schema and business-entity setup (the facts AI reads)', 'Answer-first FAQ and an llms.txt file',
           'Google profile, directory and citation clean-up', 'A 10-question AI tracking baseline', 'A written report with your next 90 days']},
 {'key': 'growth', 'name': 'AI Visibility Growth', 'tag': 'Ongoing', 'price': '$1,500', 'per': 'per month', 'amount': 1500, 'recurring': True,
  'link': 'https://buy.stripe.com/8x26oI7Ta8EMb3ugmJ0kE06', 'time': 'Month to month',
  'for': 'Businesses that want to keep climbing in Google and AI answers every month.',
  'gets': ['4 answer-first articles a month, written and published', 'Citation and listing building where AI looks', 'Ongoing technical and schema fixes',
           'Monthly AI-mention report: are you named, and where', 'Best after the Launch package']},
 {'key': 'website', 'name': 'AI-Ready Website', 'tag': 'Build', 'price': 'From $4,500', 'per': '50% deposit to start ($2,250)', 'amount': 4500, 'recurring': False,
  'link': 'https://buy.stripe.com/8x200k8Xe7AIdbC2vT0kE07', 'time': 'Launched in 3–4 weeks',
  'for': 'Businesses replacing an old site that Google and AI can barely read.',
  'gets': ['Up to 8 pages on Shopify, WordPress or custom', 'Clear positioning and copy written for you', 'Fast, mobile-first, with schema built in',
           'Titles, descriptions and share previews on every page', 'Analytics and lead forms wired up', 'Balance due at launch']},
 {'key': 'agent', 'name': 'AI Agent / Chatbot', 'tag': 'Automation', 'price': '$3,500', 'per': 'setup + $250/month care', 'amount': 3500, 'recurring': True,
  'link': 'https://buy.stripe.com/9B67sMgpG9IQb3udax0kE08', 'time': 'Live in about 3 weeks',
  'for': 'Businesses losing leads after hours or answering the same questions all day.',
  'gets': ['A website chat or voice assistant trained on your business', 'Answers questions, qualifies leads, books or forwards them', 'Leads sent to your email or CRM',
           'Monthly care: hosting, monitoring and tuning', 'You approve every answer before it goes live']},
 {'key': 'content', 'name': 'Content Engine', 'tag': 'Ongoing', 'price': '$1,200', 'per': 'per month', 'amount': 1200, 'recurring': True,
  'link': 'https://buy.stripe.com/bJe28s0qI4owgnOdax0kE09', 'time': 'Month to month',
  'for': 'Businesses that know they should publish but never have the time.',
  'gets': ['8 articles a month, researched and published', '12 social posts a month', 'Written in your voice, approved by you',
           'Built to be quoted by AI assistants and found in Google']},
]

src = open(os.path.join(ROOT, 'growth-framework/index.html'), encoding='utf-8').read()
head, _, body = src.partition('</head>')
for pat in [r'<title>.*?</title>', r'<meta\s+name="description"[^>]*>', r'<meta\s+name="robots"[^>]*>',
            r'<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>', r'<link\s+rel="canonical"[^>]*>',
            r'<link\s+rel="alternate"\s+hreflang[^>]*>', r'<script type="application/ld\+json">.*?</script>']:
    head = re.sub(pat, '', head, flags=re.S)
pre_main, rest = body.split('<main id="main">', 1)
post_main = rest.split('</main>', 1)[1].replace('</body>', '<script src="/agency/agency.js?v=1" defer></script>\n</body>')

CSS = '''<style>
.ag-hero{padding:72px 0 30px}.ag-hero .ph-sub{max-width:800px}
.ag-pill{display:inline-block;font-family:var(--mono);font-size:12px;letter-spacing:.08em;color:#ffb454;border:1px solid rgba(255,180,84,.4);border-radius:999px;padding:6px 12px;margin-bottom:18px}
.ag-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;margin-top:22px}
.ag-card{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:26px;display:flex;flex-direction:column;gap:12px}
.ag-card.hot{border-color:var(--cyan);box-shadow:0 0 0 1px rgba(45,212,255,.25),0 18px 50px rgba(45,212,255,.08)}
.ag-tag{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan)}
.ag-card h3{font-family:var(--display);font-size:24px;font-weight:600;line-height:1.2}
.ag-price{font-family:var(--display);font-size:34px;font-weight:700;line-height:1}.ag-price small{display:block;font-family:var(--body);font-size:14px;font-weight:400;color:var(--muted);margin-top:6px}
.ag-for{color:var(--muted);font-size:15px}
.ag-card ul{list-style:none;display:grid;gap:8px;margin:4px 0 6px}.ag-card li{padding-left:24px;position:relative;color:var(--muted);font-size:15px}
.ag-card li::before{content:'✓';position:absolute;left:0;color:#7ee2a8}
.ag-time{font-family:var(--mono);font-size:12px;color:var(--muted-dim)}
.ag-btn{margin-top:auto;background:var(--cyan);color:#001018;border:0;border-radius:10px;padding:14px 18px;font-weight:700;font-size:16px;text-decoration:none;text-align:center;display:block}
.ag-btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line-bright)}
.ag-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:20px}
.ag-step{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px}
.ag-step b{font-family:var(--display);font-size:30px;color:var(--cyan);display:block;line-height:1}
.ag-step h4{font-family:var(--display);font-size:18px;margin:10px 0 6px}.ag-step p{color:var(--muted);font-size:14.5px}
.ag-form{display:grid;gap:14px;max-width:760px}.ag-form .row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ag-form label{display:grid;gap:6px;font-size:14px;font-weight:600}
.ag-form input,.ag-form textarea,.ag-form select{width:100%;background:#0b1018;border:1px solid var(--line-bright);border-radius:10px;padding:12px;color:var(--text);font:inherit;font-size:16px}
.ag-form textarea{min-height:96px;resize:vertical}.ag-form .hint{font-weight:400;color:var(--muted-dim);font-size:13px}
.form-msg{min-height:1.4em;color:var(--muted);font-size:14px}
.ag-ok{border:1px solid #2f8f5f;background:rgba(47,143,95,.12);border-radius:14px;padding:18px 20px;color:#c9f2da}
@media (max-width:700px){.ag-form .row{grid-template-columns:1fr}}
</style>'''

def page(path, title, desc, ld, main, robots='index, follow, max-image-preview:large', og='og/pages/agency.jpg'):
    url = SITE + '/' + path
    meta = (f'<title>{esc(title)}</title>\n<meta name="description" content="{esc(desc)}">\n<meta name="robots" content="{robots}">\n'
            f'<link rel="canonical" href="{url}">\n<meta property="og:type" content="website">\n<meta property="og:title" content="{esc(title)}">\n'
            f'<meta property="og:description" content="{esc(desc)}">\n<meta property="og:url" content="{url}">\n<meta property="og:image" content="{SITE}/{og}">\n'
            f'<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:type" content="image/jpeg">\n'
            f'<meta property="og:image:alt" content="{esc(title)}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="{esc(title)}">\n'
            f'<meta name="twitter:description" content="{esc(desc)}">\n<meta name="twitter:image" content="{SITE}/{og}">\n'
            + ''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>\n' for x in ld) + CSS)
    h = head.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' + meta, 1)
    out = h + '</head>' + pre_main + '<main id="main">\n' + main + '\n</main>' + post_main
    assert out.count('<title>') == 1 and out.count('<main') == 1
    dest = os.path.join(ROOT, path, 'index.html'); os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, 'w', encoding='utf-8').write(out); print('built', path, len(out))

ORG = {'@id': SITE + '/#business'}
FAQ = [
 ('What does the done-for-you AI agency do?', 'Siamak Kalhor Consulting sets the strategy and does the work for you: AI visibility (getting your business named by ChatGPT, Gemini and Perplexity), AI-ready websites, AI agents and chatbots, and monthly content. You approve the work; you do not have to do it.'),
 ('Do I need a sales call before I buy?', 'No. Each package has a fixed price and a checkout button. After you pay, you fill in a short brief about your business and we email a kickoff plan within one business day. You can still call 323-657-7752 if you would rather talk first.'),
 ('Who actually does the work?', 'Siamak Kalhor, an AI consultant with 40 years in marketing, directs every project and reviews the work. Delivery uses AI tools and automation built in-house, which is how fixed prices stay this low without cutting corners.'),
 ('What if my business is not a good fit?', 'We review every order within one business day. If we cannot do the work well for you, we tell you and refund the payment in full before any work starts.'),
 ('Can I cancel a monthly plan?', 'Yes. Monthly plans run month to month. Email or call to cancel and billing stops at the end of the current month.'),
 ('Which platforms do you work with?', 'Shopify, WordPress, Wix, Squarespace, Webflow and custom sites. For AI agents, we connect to your email, calendar or CRM where it has an integration.'),
]
offers = [{'@type': 'Offer', 'name': p['name'], 'price': str(p['amount']), 'priceCurrency': 'USD', 'url': SITE + '/agency#' + p['key'],
           'description': p['for'], 'seller': ORG,
           **({'priceSpecification': {'@type': 'UnitPriceSpecification', 'price': str(p['amount']), 'priceCurrency': 'USD', 'unitCode': 'MON'}} if p['recurring'] and p['key'] != 'agent' else {})}
          for p in PACKAGES]
ld = [{'@context': 'https://schema.org', '@type': 'Service', '@id': SITE + '/agency#service', 'name': 'Done-for-you AI agency services',
       'serviceType': ['AI visibility (LLMO)', 'AI-ready website design', 'AI agents and chatbots', 'Content marketing'],
       'provider': ORG, 'areaServed': [{'@type': 'Country', 'name': 'United States'}, {'@type': 'City', 'name': 'Los Angeles'}], 'url': SITE + '/agency',
       'description': 'Fixed-price, done-for-you AI services for small and mid-size businesses, directed by AI consultant Siamak Kalhor.',
       'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': 'AI agency packages', 'itemListElement': offers}},
      {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]},
      {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE},
       {'@type': 'ListItem', 'position': 2, 'name': 'AI Agency', 'item': SITE + '/agency'}]}]

cards = ''
for i, p in enumerate(PACKAGES):
    gets = ''.join(f'<li>{esc(g)}</li>' for g in p['gets'])
    cards += (f'<div class="ag-card{" hot" if i == 0 else ""}" id="{p["key"]}"><div class="ag-tag">{esc(p["tag"])}</div><h3>{esc(p["name"])}</h3>'
              f'<div class="ag-price">{esc(p["price"])}<small>{esc(p["per"])}</small></div><p class="ag-for">{esc(p["for"])}</p><ul>{gets}</ul>'
              f'<div class="ag-time">{esc(p["time"])}</div><a class="ag-btn" href="{p["link"]}" data-pkg="{p["key"]}" rel="noopener">Start {esc(p["name"])} &rarr;</a></div>')
faq_html = ''.join(f'<details class="ag-card" style="padding:18px 22px;gap:0"><summary style="cursor:pointer;font-weight:600">{esc(q)}</summary><p style="color:var(--muted);margin-top:10px">{esc(a)}</p></details>' for q, a in FAQ)
main = f'''<header class="ag-hero"><div class="wrap">
<div class="ag-pill">DONE-FOR-YOU AI AGENCY · FIXED PRICES · NO SALES CALL NEEDED</div>
<h1 class="ph-h">Your <span class="grad">AI agency</span>, led by a 40-year strategist.</h1>
<p class="ph-sub">Pick a package, pay online, and the work starts. Siamak Kalhor sets the strategy and reviews every deliverable. Our AI-powered team does the work: getting you named by ChatGPT and Google, AI-ready websites, AI agents that answer leads 24/7, and monthly content.</p>
<div class="ph-btns" style="margin-top:22px"><a href="#packages" class="btn btn-pri">See the packages &rarr;</a><a href="/audit" class="btn btn-ghost">Free AI visibility report first</a></div>
</div></header>
<section id="packages"><div class="wrap"><div class="sec-label">Packages</div><h2 class="sec-h">Five ways to hire us</h2>
<p style="color:var(--muted);max-width:760px">Every price is fixed and published. Pay securely by card through Stripe, then tell us about your business in a two-minute brief.</p>
<div class="ag-grid">{cards}</div>
<p style="color:var(--muted-dim);font-size:14px;margin-top:16px">Need something bigger or different? <a href="/contact-us" style="color:var(--cyan)">Ask for a custom quote</a>, or book <a href="/online-consulting" style="color:var(--cyan)">a strategy hour with Siamak</a> ($350).</p>
</div></section>
<section><div class="wrap"><div class="sec-label">How it works</div><h2 class="sec-h">From checkout to results, without the meetings</h2>
<div class="ag-steps">
<div class="ag-step"><b>1</b><h4>Choose and pay</h4><p>Pick the package that fits and check out online by card.</p></div>
<div class="ag-step"><b>2</b><h4>Send your brief</h4><p>Two minutes: your business, your goals, your competitors, your website.</p></div>
<div class="ag-step"><b>3</b><h4>Kickoff in 1 business day</h4><p>We email a plan with dates, and exactly what access we need, if any.</p></div>
<div class="ag-step"><b>4</b><h4>We deliver, you approve</h4><p>Updates at every milestone, and a report that shows what changed.</p></div>
</div></div></section>
<section><div class="wrap"><div class="sec-label">Why us</div><h2 class="sec-h">Strategy first, then the work</h2>
<div class="ag-grid">
<div class="ag-card"><h3>40 years of judgment</h3><p class="ag-for">Siamak started in marketing before the internet. Every project begins with the business, not the tool.</p></div>
<div class="ag-card"><h3>Proof, not promises</h3><p class="ag-for">Blue Moon Fabrics grew about 100&times; over an eight-year engagement, from one Fashion District store to a national textile leader.</p><a href="/bluemoon" style="color:var(--cyan)">Read the case study &rarr;</a></div>
<div class="ag-card"><h3>We build our own AI</h3><p class="ag-for">The <a href="https://scale.siamakconsulting.com/" style="color:var(--cyan)">S.C.A.L.E. app</a>, Orchamind, Textile Wizard and more. The same tooling runs your project.</p></div>
</div></div></section>
<section><div class="wrap"><div class="sec-label">Questions</div><h2 class="sec-h">Before you start</h2><div style="display:grid;gap:10px;max-width:860px">{faq_html}</div>
<p style="margin-top:22px"><a class="ag-btn" style="display:inline-block" href="#packages">Choose a package &rarr;</a></p></div></section>'''
page('agency', 'Done-for-You AI Agency | Siamak Kalhor Consulting', 'Fixed-price AI agency services: AI visibility, AI-ready websites, AI chatbots and content. Pay online and the work starts, led by Siamak Kalhor.', ld, main)

# ------------------------------------------------------------------ intake
opts = ''.join(f'<option value="{p["key"]}">{esc(p["name"])}</option>' for p in PACKAGES)
start = f'''<div class="wrap" style="padding:56px 28px 72px;max-width:900px">
<div class="ag-pill">STEP 2 OF 3 · YOUR BRIEF</div>
<h1 class="ph-h" style="font-size:clamp(32px,4.4vw,48px)">Thank you. Now tell us about your business.</h1>
<p id="ag-status" class="ph-sub" style="margin-bottom:22px">Two minutes. This is everything we need to start; we email your kickoff plan within one business day.</p>
<form id="ag-brief" class="ag-form">
<label>Package <select name="pkg" id="ag-pkg">{opts}</select></label>
<div class="row"><label>Your name<input name="name" autocomplete="name" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label></div>
<div class="row"><label>Phone<input name="phone" type="tel" autocomplete="tel"></label><label>Business name<input name="business" autocomplete="organization" required></label></div>
<div class="row"><label>Website<input name="website" type="url" placeholder="https://"></label><label>Industry<input name="industry" placeholder="e.g. dental practice, law firm, online store"></label></div>
<div class="row"><label>Location or service area<input name="location" placeholder="e.g. Los Angeles and Orange County"></label><label>Website platform<select name="platform"><option value="">Not sure</option><option>Shopify</option><option>WordPress</option><option>Wix</option><option>Squarespace</option><option>Webflow</option><option>Custom / other</option><option>No website yet</option></select></label></div>
<label>What do you want to achieve? <span class="hint">e.g. more booked calls, be named by ChatGPT for "best X in Y", replace an old website</span><textarea name="goals" required></textarea></label>
<label>Who are your best customers? <textarea name="customers"></textarea></label>
<label>Main competitors <span class="hint">names or websites</span><textarea name="competitors"></textarea></label>
<label>Access <span class="hint">Who manages your website and Google profile? Do not type passwords here; we will set up safe access with you.</span><textarea name="access"></textarea></label>
<label>Anything else we should know?<textarea name="notes"></textarea></label>
<button type="submit" class="ag-btn" style="border:0;cursor:pointer">Send my brief &rarr;</button>
<p class="form-msg" role="status"></p>
</form>
<div id="ag-done" class="ag-ok" hidden><h2 style="font-family:var(--display);font-size:24px;margin-bottom:8px">Brief received.</h2><p>We will email your kickoff plan within one business day. A copy of your brief is on its way to your inbox. Questions: 323-657-7752.</p></div>
</div>'''
page('agency/start', 'Start Your AI Agency Project | Siamak Kalhor Consulting', 'Send your project brief after checkout: your business, goals, competitors and website. We email a kickoff plan within one business day.', [], start, robots='noindex, follow')
