#!/usr/bin/env python3
"""Builds the S.C.A.L.E. Academy pages (/academy, /academy/week-1..6, /academy/certificate).

The site chrome (consent, analytics, fonts, base styles, nav, footer) is taken from
growth-framework/index.html so the Academy always matches the rest of the site; only
the page's own meta, schema and <main> are replaced. Lesson text lives in
academy_content.py. Run from the repo root:  python3 scripts/build-academy.py
"""
import html, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from academy_content import LESSONS

ROOT = os.path.join(os.path.dirname(__file__), '..')
SITE = 'https://siamakconsulting.com'
V = '5'  # bump to bust the browser cache of academy.js
COURSE_NAME = 'S.C.A.L.E. Framework: Growth Strategy for the AI Era'
esc = lambda s: html.escape(s, quote=True)

src = open(os.path.join(ROOT, 'growth-framework/index.html'), encoding='utf-8').read()
head, _, body = src.partition('</head>')
# strip the page-specific head tags
for pat in [r'<title>.*?</title>', r'<meta\s+name="description"[^>]*>', r'<meta\s+name="robots"[^>]*>',
            r'<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>', r'<link\s+rel="canonical"[^>]*>',
            r'<link\s+rel="alternate"\s+hreflang[^>]*>', r'<script type="application/ld\+json">.*?</script>']:
    head = re.sub(pat, '', head, flags=re.S)
assert '<title>' not in head and 'og:' not in head
pre_main, rest = body.split('<main id="main">', 1)
post_main = rest.split('</main>', 1)[1]
# our own voice tutor replaces the floating voice widget on these pages
post_main = re.sub(r'<elevenlabs-convai[^>]*></elevenlabs-convai>', '', post_main)
post_main = re.sub(r'<script type="text/plain" data-consent="functional" data-src="https://unpkg.com/@elevenlabs[^"]*"></script>', '', post_main)
post_main = post_main.replace('</body>', f'<script src="/academy/academy.js?v={V}" defer></script>\n</body>')
assert post_main.count('/academy/academy.js') == 1

CSS = '''<style>
.ac-hero{padding:72px 0 28px}.ac-hero .ph-sub{max-width:760px}
.ac-pill{display:inline-block;font-family:var(--mono);font-size:12px;letter-spacing:.08em;color:#ffb454;border:1px solid rgba(255,180,84,.4);border-radius:999px;padding:6px 12px;margin-bottom:18px}
.ac-card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:26px}
.ac-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.ac-enroll{display:grid;gap:10px;max-width:520px}
.ac-enroll input{width:100%;background:#0b1018;border:1px solid var(--line-bright);border-radius:10px;padding:13px 14px;color:var(--text);font:inherit;font-size:16px}
.ac-enroll input:focus{outline:2px solid var(--cyan);outline-offset:1px}
.ac-enroll button,.ac-btn{background:var(--cyan);color:#001018;border:0;border-radius:10px;padding:13px 18px;font-weight:600;font-size:16px;cursor:pointer;text-decoration:none;display:inline-block;text-align:center}
.ac-btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line-bright)}
.ac-btn:disabled,.ac-enroll button:disabled{opacity:.6;cursor:wait}
.form-msg{min-height:1.4em;color:var(--muted);font-size:14px}
.ac-weeks{list-style:none;display:grid;gap:10px;margin-top:8px}
.ac-weeks a{display:grid;grid-template-columns:56px 1fr auto;gap:16px;align-items:center;text-decoration:none;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
.ac-weeks a:hover{border-color:var(--cyan)}
.ac-weeks .lt{font-family:var(--display);font-size:28px;font-weight:700;color:var(--cyan);text-align:center}
.ac-weeks .t{font-weight:600}.ac-weeks .s{color:var(--muted);font-size:14px}
.ac-weeks .st{font-family:var(--mono);font-size:12px;color:var(--muted-dim)}
.ac-weeks a.is-done .st::before{content:'✓ done';color:#7ee2a8}
.ac-bar{height:6px;background:var(--surface-2);border-radius:99px;overflow:hidden}.ac-bar span{display:block;height:100%;background:var(--glow);width:0;transition:width .4s}
.ac-layout{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:36px;align-items:start;padding-bottom:64px}
.ac-side{position:sticky;top:84px;display:grid;gap:16px}
.lesson-body h2{font-family:var(--display);font-size:26px;margin:34px 0 10px}
.lesson-body p,.lesson-body li{color:var(--muted);font-size:17px}
.lesson-body p{margin:0 0 14px}.lesson-body ul,.lesson-body ol{margin:0 0 16px 22px;display:grid;gap:8px}
.lesson-body b{color:var(--text)}.lesson-body a{color:var(--cyan)}
.lesson-body .lede{font-size:20px;color:var(--text)}
.lesson-body blockquote{border-left:4px solid var(--cyan);background:var(--surface);padding:16px 18px;border-radius:0 10px 10px 0;margin:0 0 16px;color:var(--text)}
.lesson-body pre{background:#0b1018;border:1px solid var(--line);border-radius:10px;padding:16px;overflow:auto;margin:0 0 16px;font-size:13px}
.lesson-body code{font-family:var(--mono)}
.ac-meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:14px 0 26px;color:var(--muted-dim);font-size:14px}
.ac-tag{font-family:var(--mono);font-size:12px;border:1px solid var(--line-bright);border-radius:999px;padding:4px 10px;color:var(--muted)}
.ac-take{list-style:none;display:grid;gap:10px}.ac-take li{padding-left:26px;position:relative;color:var(--muted)}
.ac-take li::before{content:'→';position:absolute;left:0;color:var(--cyan)}
.ac-ex label{display:block;font-weight:600;margin:16px 0 6px;font-size:15px}
.ac-ex textarea{width:100%;min-height:90px;background:#0b1018;border:1px solid var(--line-bright);border-radius:10px;padding:12px;color:var(--text);font:inherit;font-size:15px;resize:vertical}
.tutor{display:grid;gap:10px}
.tutor h3{font-family:var(--display);font-size:20px;margin:0}
.tutor .sub{color:var(--muted-dim);font-size:13px;margin:0}
#tutor-log{height:340px;overflow:auto;display:flex;flex-direction:column;gap:10px;padding:4px 2px}
.msg{border-radius:12px;padding:10px 12px;font-size:14.5px;line-height:1.55}
.msg p{margin:0 0 8px}.msg p:last-child{margin:0}
.msg-user{background:rgba(45,212,255,.12);border:1px solid rgba(45,212,255,.3);align-self:flex-end;max-width:90%}
.msg-ai{background:var(--surface-2);border:1px solid var(--line);color:var(--muted);max-width:95%}
.msg.is-wait{opacity:.7}
.tutor-row{display:flex;gap:8px}
.tutor-row input{flex:1;min-width:0;background:#0b1018;border:1px solid var(--line-bright);border-radius:10px;padding:11px 12px;color:var(--text);font:inherit;font-size:16px}
.tutor-row button{border:0;border-radius:10px;padding:0 14px;font-weight:600;cursor:pointer;background:var(--cyan);color:#001018;min-height:44px}
#tutor-mic{background:var(--surface-2);color:var(--text);border:1px solid var(--line-bright);font-size:18px}
#tutor-mic.is-on{background:#ff6b6b;color:#fff;border-color:#ff6b6b}
.tutor-opts{display:flex;gap:12px;align-items:center;flex-wrap:wrap;font-size:13px;color:var(--muted)}
.tutor-opts select{background:#0b1018;color:var(--text);border:1px solid var(--line-bright);border-radius:8px;padding:6px}
.suggest{display:flex;flex-wrap:wrap;gap:6px}.suggest button{background:transparent;border:1px solid var(--line-bright);color:var(--muted);border-radius:999px;padding:6px 10px;font-size:12.5px;cursor:pointer;text-align:left}
.suggest button:hover{border-color:var(--cyan);color:var(--text)}
.ac-nav{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:28px}
#complete-btn.is-done{background:#1f7a4d;color:#fff}
.ac-steps{display:flex;gap:6px;margin:10px 0 0}.ac-steps a{flex:1;text-align:center;text-decoration:none;font-family:var(--mono);font-size:12px;padding:7px 0;border-radius:8px;border:1px solid var(--line);color:var(--muted)}
.ac-steps a.is-done{border-color:#2f8f5f;color:#7ee2a8}.ac-steps a.is-here{border-color:var(--cyan);color:var(--text)}
#gate{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.78);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px}
#gate[hidden]{display:none}#gate .ac-card{max-width:520px;width:100%}
body.gated{overflow:hidden}
.cert{background:#fbf9f3;color:#14202f;border-radius:18px;padding:56px 48px;text-align:center;border:10px double #0e7490;max-width:900px;margin:0 auto}
.cert .k{font-family:var(--mono);letter-spacing:.2em;font-size:13px;color:#0e7490}
.cert h1{font-family:var(--display);font-size:clamp(30px,5vw,52px);margin:16px 0 6px;color:#14202f}
.cert .c-name{font-family:'Fraunces',Georgia,serif;font-style:italic;font-size:clamp(34px,6vw,60px);margin:18px 0;color:#14202f}
.cert p{color:#4a5568}.cert .sig{margin-top:34px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:14px;color:#4a5568;text-align:left}
.cert .sig b{color:#14202f;display:block;font-size:16px}
.cert-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:24px 0}
@media print{nav,footer,.cert-actions,.ambient,.skip-link{display:none!important}body{background:#fff}.cert{border-color:#0e7490}}
@media (max-width:900px){.ac-layout{grid-template-columns:minmax(0,1fr)}.ac-side{position:static}#tutor-log{height:300px}}
</style>'''

def page(path, title, desc, og_img, og_alt, ld, main, body_attrs='', robots='index, follow, max-image-preview:large'):
    url = SITE + '/' + path if path else SITE + '/academy'
    meta = (f'<title>{esc(title)}</title>\n<meta name="description" content="{esc(desc)}">\n'
            f'<meta name="robots" content="{robots}">\n<link rel="canonical" href="{url}">\n'
            f'<meta property="og:type" content="website">\n<meta property="og:title" content="{esc(title)}">\n'
            f'<meta property="og:description" content="{esc(desc)}">\n<meta property="og:url" content="{url}">\n'
            f'<meta property="og:image" content="{SITE}/{og_img}">\n<meta property="og:image:width" content="1200">\n'
            f'<meta property="og:image:height" content="630">\n<meta property="og:image:type" content="image/jpeg">\n'
            f'<meta property="og:image:alt" content="{esc(og_alt)}">\n<meta name="twitter:card" content="summary_large_image">\n'
            f'<meta name="twitter:title" content="{esc(title)}">\n<meta name="twitter:description" content="{esc(desc)}">\n'
            f'<meta name="twitter:image" content="{SITE}/{og_img}">\n'
            + ''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>\n' for x in ld) + CSS)
    h = head.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                     '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' + meta, 1)
    assert h != head
    b = pre_main.replace('<body class="v2">', f'<body class="v2"{body_attrs}>', 1)
    assert b != pre_main
    out = h + '</head>' + b + '<main id="main">\n' + main + '\n</main>' + post_main
    assert out.count('<title>') == 1 and out.count('<!DOCTYPE html>') == 1 and out.count('<main') == 1
    dest = os.path.join(ROOT, path or 'academy', 'index.html') if path else os.path.join(ROOT, 'academy', 'index.html')
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, 'w', encoding='utf-8').write(out)
    print('built', dest.replace(ROOT + '/', ''), len(out))

PERSON = {'@type': 'Person', '@id': SITE + '/#person', 'name': 'Siamak Kalhor', 'url': SITE}
ORG = {'@type': 'Organization', '@id': SITE + '/#business', 'name': 'Siamak Kalhor Consulting', 'url': SITE}
COURSE = {'@context': 'https://schema.org', '@type': 'Course', '@id': SITE + '/academy#course', 'name': COURSE_NAME,
          'alternateName': 'S.C.A.L.E. Academy', 'url': SITE + '/academy',
          'description': 'A free six-week online course with an AI tutor: how ChatGPT, Gemini, Claude and Perplexity decide which businesses to recommend, and the five-stage S.C.A.L.E. Framework (Scan, Clarify, Amplify, Leverage, Evaluate) for earning that recommendation.',
          'provider': ORG, 'creator': PERSON, 'inLanguage': 'en', 'isAccessibleForFree': True,
          'educationalCredentialAwarded': 'Certificate of completion',
          'teaches': ['Large Language Model Optimization (LLMO)', 'AI visibility', 'Positioning', 'Schema markup', 'Citation building', 'Marketing measurement'],
          'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'category': 'Free'},
          'hasCourseInstance': {'@type': 'CourseInstance', 'courseMode': 'Online', 'courseWorkload': 'PT3H', 'instructor': PERSON},
          'syllabusSections': [{'@type': 'Syllabus', 'name': f"Week {l['n']}: {l['title']}", 'description': l['summary'], 'url': f"{SITE}/academy/week-{l['n']}"} for l in LESSONS]}

def weeks_list(link_prefix='/academy/week-'):
    items = ''
    for l in LESSONS:
        items += (f'<li><a href="{link_prefix}{l["n"]}" data-week-link="{l["n"]}"><span class="lt">{esc(l["letter"])}</span>'
                  f'<span><span class="t">Week {l["n"]} · {esc(l["title"])}</span><br><span class="s">{esc(l["summary"])}</span></span>'
                  f'<span class="st">{l["minutes"]} min</span></a></li>')
    return f'<ol class="ac-weeks">{items}</ol>'

ENROLL_FORM = '''<form class="ac-enroll" data-enroll {extra}>
<label class="sr-only" for="{p}-name" style="position:absolute;left:-9999px">Your name</label><input id="{p}-name" name="name" autocomplete="name" placeholder="Your name">
<label class="sr-only" for="{p}-email" style="position:absolute;left:-9999px">Email</label><input id="{p}-email" name="email" type="email" autocomplete="email" required placeholder="Email address">
<label class="sr-only" for="{p}-biz" style="position:absolute;left:-9999px">Business website (optional)</label><input id="{p}-biz" name="business" placeholder="Business you'll work on (optional)">
<button type="submit">{cta}</button><p class="form-msg" role="status"></p>
<p style="font-size:13px;color:var(--muted-dim);margin:0">Free. We email your welcome link and certificate; no spam. <a href="/privacy" style="color:var(--muted)">Privacy</a></p>
</form>'''

# ------------------------------------------------------------------ landing
FAQ = [
 ('What is the S.C.A.L.E. Academy?', 'The S.C.A.L.E. Academy is a free six-week online course by AI consultant Siamak Kalhor. It teaches how AI assistants such as ChatGPT, Gemini, Claude and Perplexity decide which businesses to recommend, and the five-stage S.C.A.L.E. Framework for earning that recommendation.'),
 ('How much does the course cost?', 'Nothing. The course, the AI tutor and the certificate of completion are free. You only need an email address to enroll.'),
 ('How does the AI tutor work?', 'Every lesson has an AI tutor trained on that week\'s material. You can type or speak your questions, have answers read aloud, and ask it to apply the lesson to your own business. It answers in the language you write in.'),
 ('How long does it take?', 'Six lessons of about 25 to 35 minutes each, plus a hands-on exercise per week. Go at your own pace; your progress is saved in your browser.'),
 ('Do I get a certificate?', 'Yes. When you complete all six weeks you can claim a certificate of completion with your name, a unique ID and a shareable link you can add to LinkedIn.'),
 ('Do I need technical skills?', 'No. The course is written for business owners and marketers. Where code is involved, such as schema, you get a template to fill in and a free validator to check it.'),
]
landing_ld = [COURSE,
  {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]},
  {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
    {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE}, {'@type': 'ListItem', 'position': 2, 'name': 'Academy', 'item': SITE + '/academy'}]}]
faq_html = ''.join(f'<details class="ac-card" style="padding:18px 22px"><summary style="cursor:pointer;font-weight:600">{esc(q)}</summary><p style="color:var(--muted);margin-top:10px">{esc(a)}</p></details>' for q, a in FAQ)
landing = f'''<header class="ac-hero"><div class="wrap">
<div class="ac-pill">FREE ONLINE COURSE · 6 WEEKS · AI TUTOR · CERTIFICATE</div>
<h1 class="ph-h">The <span class="grad">S.C.A.L.E.</span> Academy</h1>
<p class="ph-sub">Learn how ChatGPT, Gemini, Claude and Perplexity decide which businesses to recommend, and the five-stage framework for becoming one of them. Taught by Siamak Kalhor, with an AI tutor you can type or talk to.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px;margin-top:30px;align-items:start">
<div class="ac-card">
<h2 style="font-family:var(--display);font-size:22px;margin-bottom:6px">Enroll free</h2>
<p style="color:var(--muted);font-size:15px;margin-bottom:14px">Start in under a minute. Work on your own business as you go.</p>
{ENROLL_FORM.format(extra='data-hide-when-enrolled data-next="/academy/week-1"', p='hero', cta='Start the course →')}
<form id="link-form" class="ac-enroll" style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px"><p style="font-size:14px;color:var(--muted);margin:0">Already enrolled? Get your personal link by email.</p><label for="hero-link" style="position:absolute;left:-9999px">Your enrolled email</label><input id="hero-link" name="email" type="email" autocomplete="email" placeholder="Your enrolled email"><button type="submit" class="ac-btn ghost">Email me my link</button><p class="form-msg" role="status"></p></form>
<p data-welcome-back hidden style="color:#7ee2a8;margin-bottom:8px"></p><p data-resume-msg hidden style="color:#ffb454;margin-bottom:8px"></p><div data-enrolled-msg hidden><p style="color:var(--muted)">You're enrolled. <span data-progress-count>0</span> of 6 weeks complete.</p><div class="ac-bar" style="margin:10px 0 16px"><span data-progress-bar></span></div><a class="ac-btn" href="/academy/week-1" data-cta-start>Start week 1 →</a></div>
</div>
<div class="ac-grid" style="grid-template-columns:1fr 1fr">
<div class="ac-card"><h3 style="font-family:var(--display);font-size:18px">6 short lessons</h3><p style="color:var(--muted);font-size:14px">25–35 minutes each, one per stage of S.C.A.L.E.</p></div>
<div class="ac-card"><h3 style="font-family:var(--display);font-size:18px">AI tutor</h3><p style="color:var(--muted);font-size:14px">Ask by text or voice, in your language; it coaches you on your business.</p></div>
<div class="ac-card"><h3 style="font-family:var(--display);font-size:18px">Hands-on</h3><p style="color:var(--muted);font-size:14px">Weekly exercises with the free S.C.A.L.E. app and real AI answers.</p></div>
<div class="ac-card"><h3 style="font-family:var(--display);font-size:18px">Certificate</h3><p style="color:var(--muted);font-size:14px">Earn a shareable certificate of completion for LinkedIn.</p></div>
</div></div></div></header>
<section><div class="wrap">
<div class="sec-label">The syllabus</div><h2 class="sec-h">Six weeks, five stages</h2>
<p style="color:var(--muted);max-width:760px;margin-bottom:18px">Order matters: you can't amplify what you haven't clarified, and you can't clarify what you haven't scanned. Each week maps to one score in the S.C.A.L.E. app, so you can watch your number move.</p>
{weeks_list()}
</div></section>
<section><div class="wrap">
<div class="sec-label">Your instructor</div><h2 class="sec-h">Forty years of market instinct, rebuilt for AI</h2>
<div class="ac-card" style="display:grid;gap:12px;max-width:860px">
<p style="color:var(--muted)">Siamak Kalhor started in marketing before the internet existed. Today he helps businesses become visible to AI systems like ChatGPT, Gemini and Claude. He grew Blue Moon Fabrics from a single LA Fashion District store into a national textile leader over an eight-year engagement, and scaled AisleBird, a voice-first shopping app, to 235+ stores across 10 metros.</p>
<p style="color:var(--muted)">S.C.A.L.E. is the method he uses with clients, now taught as a course and built into the <a href="https://scale.siamakconsulting.com/" style="color:var(--cyan)">S.C.A.L.E. app</a>.</p>
<p><a href="/about-us" style="color:var(--cyan)">About Siamak</a> · <a href="/growth-framework" style="color:var(--cyan)">The S.C.A.L.E. Framework</a></p>
</div></div></section>
<section><div class="wrap">
<div class="sec-label">Questions</div><h2 class="sec-h">About the course</h2>
<div style="display:grid;gap:10px;max-width:860px">{faq_html}</div>
<p style="margin-top:24px"><a class="ac-btn" href="#main">Enroll free →</a> <a class="ac-btn ghost" href="/contact-us">Want it done with you? Talk to Siamak</a></p>
</div></section>'''
page('academy', 'S.C.A.L.E. Academy — Free AI Visibility Course', 'Free six-week online course with an AI tutor: learn how ChatGPT and other AI assistants choose businesses, and how to become one they recommend.',
     'og/pages/academy.jpg', 'S.C.A.L.E. Academy — free AI visibility course with an AI tutor', landing_ld, landing, ' data-academy="landing"')

# ------------------------------------------------------------------ lessons
LANGS = [('en-US', 'English'), ('es-ES', 'Español'), ('fr-FR', 'Français'), ('fa-IR', 'فارسی'), ('hy-AM', 'Հայերեն'), ('ar-SA', 'العربية'),
         ('zh-CN', '中文'), ('hi-IN', 'हिन्दी'), ('pt-BR', 'Português'), ('de-DE', 'Deutsch'), ('ru-RU', 'Русский'), ('ko-KR', '한국어'), ('ja-JP', '日本語')]
SUGGEST = {
 1: ['Why would ChatGPT skip a good business?', 'Help me write 5 customer questions for my business', 'What does each S.C.A.L.E. score measure?'],
 2: ['How do I check if AI crawlers are blocked?', 'What is a canonical address?', 'Which blocker should I fix first?'],
 3: ['Critique my positioning sentence', 'What makes a good main heading?', 'Help me write my Business DNA'],
 4: ['Which schema type fits my business?', 'Write an FAQ answer for me', 'Is llms.txt worth doing?'],
 5: ['Where should my business be listed?', 'How do I approach a referral partner?', 'Help me plan 90 days of authority work'],
 6: ['Which 10 questions should I track?', 'How do I report progress honestly?', 'What should my monthly routine be?'],
}
for l in LESSONS:
    n = l['n']; path = f'academy/week-{n}'
    prev_l = f'<a class="ac-btn ghost" href="/academy/week-{n-1}">← Week {n-1}</a>' if n > 1 else '<a class="ac-btn ghost" href="/academy">← Course home</a>'
    next_l = (f'<a class="ac-btn" id="next-week" href="/academy/week-{n+1}">Week {n+1}: {esc(LESSONS[n]["title"].split(":")[0])} →</a>' if n < 6
              else '<a class="ac-btn" id="next-week" href="#certificate">Claim your certificate ↓</a>')
    steps = ''.join(f'<a href="/academy/week-{x["n"]}" data-week-link="{x["n"]}" aria-label="Week {x["n"]}: {esc(x["title"])}">{esc(x["letter"])}</a>' for x in LESSONS)
    takeaways = ''.join(f'<li>{esc(t)}</li>' for t in l['takeaways'])
    ex = ''.join(f'<label for="ex{n}-{i}">{i+1}. {esc(q)}</label><textarea id="ex{n}-{i}" data-note="w{n}-{i}" aria-label="Week {n}, question {i+1}: {esc(q)}"></textarea>' for i, q in enumerate(l['exercise']))
    langs = ''.join(f'<option value="{c}">{esc(t)}</option>' for c, t in LANGS)
    sugg = ''.join(f'<button type="button" data-suggest>{esc(s)}</button>' for s in SUGGEST[n])
    cert = ''
    if n == 6:
        cert = '''<section id="certificate" class="ac-card" style="margin-top:28px">
<h2 style="font-family:var(--display);font-size:24px;margin-bottom:8px">Your certificate of completion</h2>
<div id="cert-locked"><p style="color:var(--muted)">Mark all six weeks complete to claim your certificate. You have finished <b data-progress-count>0</b> of 6.</p></div>
<div id="cert-box" hidden><p style="color:var(--muted);margin-bottom:12px">You finished all six weeks. Enter your name exactly as it should appear on the certificate.</p>
<form id="cert-form" class="ac-enroll"><label for="cert-name" style="position:absolute;left:-9999px">Full name</label><input id="cert-name" name="fullname" autocomplete="name" placeholder="Full name" required>
<button type="submit">Issue my certificate</button><p class="form-msg" role="status"></p></form>
<p><a id="cert-link" hidden style="color:var(--cyan)" href="#">View your certificate →</a></p></div>
</section>'''
    main = f'''<div class="wrap" style="padding-top:40px">
<p style="font-family:var(--mono);font-size:12px;color:var(--muted-dim)"><a href="/academy" style="color:var(--muted)">S.C.A.L.E. Academy</a> / Week {n} of 6</p>
<div class="ac-steps" aria-label="Course progress">{steps}</div>
</div>
<div class="wrap ac-layout" style="padding-top:28px">
<article>
<div class="ac-pill">WEEK {n} · {esc(l['stage'].upper())} · {esc(l['score'].upper())}</div>
<h1 class="ph-h" style="font-size:clamp(32px,4.4vw,50px)">{esc(l['h1'])}</h1>
<div class="ac-meta"><span class="ac-tag">{l['minutes']} min read</span><span class="ac-tag">{'Covers all five scores' if n == 1 else 'Scored as ' + esc(l['score'])}</span><button type="button" id="read-btn" class="ac-btn ghost" style="padding:8px 14px;font-size:14px">▶ Listen to this lesson</button></div>
<div class="lesson-body">{l['body']}</div>
<div class="ac-card" style="margin-top:26px"><h2 style="font-family:var(--display);font-size:20px;margin-bottom:12px">Key takeaways</h2><ul class="ac-take">{takeaways}</ul></div>
<div class="ac-card ac-ex" style="margin-top:20px"><h2 style="font-family:var(--display);font-size:20px">This week's exercise</h2>
<p style="color:var(--muted);font-size:14px;margin-top:6px">Your answers are saved in this browser only. Stuck? Ask the AI tutor. <span id="saved-note" style="color:#7ee2a8"></span></p>{ex}
<p style="margin-top:14px"><button type="button" id="copy-notes" class="ac-btn ghost" style="padding:8px 14px;font-size:14px">Copy my answers</button></p></div>
<div class="ac-nav">{prev_l}<button type="button" id="complete-btn" class="ac-btn">Mark week {n} complete</button>{next_l}</div>
{cert}
</article>
<aside class="ac-side">
<div class="ac-card tutor" aria-label="AI tutor">
<h3>AI tutor · Week {n}</h3><p class="sub">Ask anything about this lesson or your business. Type, or tap the mic to talk.</p>
<div id="tutor-log" aria-live="polite"></div>
<div class="suggest">{sugg}</div>
<form id="tutor-form" class="tutor-row"><label for="tutor-input" style="position:absolute;left:-9999px">Your question</label><input id="tutor-input" autocomplete="off" placeholder="Ask the tutor…"><button type="button" id="tutor-mic" aria-label="Speak your question" aria-pressed="false">🎙</button><button type="submit">Ask</button></form>
<div class="tutor-opts"><label>Language <select id="tutor-lang">{langs}</select></label><label><input type="checkbox" id="tutor-speak"> Read answers aloud</label></div>
</div>
<div class="ac-card"><p style="font-size:14px;color:var(--muted)">Measure your progress with the free <a href="https://scale.siamakconsulting.com/" style="color:var(--cyan)">S.C.A.L.E. app</a>. Want hands-on help? <a href="/contact-us" style="color:var(--cyan)">Talk to Siamak</a>.</p>
<p style="font-size:13px;color:var(--muted-dim);margin-top:8px"><span data-progress-count>0</span> of 6 weeks complete</p><div class="ac-bar" style="margin-top:6px"><span data-progress-bar></span></div></div>
</aside>
</div>
<div id="gate" hidden role="dialog" aria-modal="true" aria-labelledby="gate-h"><div class="ac-card">
<h2 id="gate-h" style="font-family:var(--display);font-size:24px;margin-bottom:6px">Enroll free to start</h2>
<p style="color:var(--muted);font-size:15px;margin-bottom:14px">The S.C.A.L.E. Academy is free. Enter your email to unlock all six lessons, the AI tutor and your certificate.</p>
{ENROLL_FORM.format(extra='', p='gate', cta='Unlock the course')}
<form id="link-form" class="ac-enroll" style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px"><p style="font-size:14px;color:var(--muted);margin:0">Already enrolled? Get your personal link by email.</p><label for="gate-link" style="position:absolute;left:-9999px">Your enrolled email</label><input id="gate-link" name="email" type="email" autocomplete="email" placeholder="Your enrolled email"><button type="submit" class="ac-btn ghost">Email me my link</button><p class="form-msg" role="status"></p></form>
</div></div>'''
    ld = [{'@context': 'https://schema.org', '@type': 'LearningResource', 'name': l['h1'], 'description': l['summary'], 'url': f'{SITE}/{path}',
           'learningResourceType': 'Lesson', 'timeRequired': f"PT{l['minutes']}M", 'inLanguage': 'en', 'isAccessibleForFree': True,
           'isPartOf': {'@id': SITE + '/academy#course', '@type': 'Course', 'name': COURSE_NAME}, 'author': PERSON, 'position': n},
          {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE}, {'@type': 'ListItem', 'position': 2, 'name': 'Academy', 'item': SITE + '/academy'},
            {'@type': 'ListItem', 'position': 3, 'name': f'Week {n}', 'item': f'{SITE}/{path}'}]}]
    title = f"Week {n}: {l['title'].split(':')[0]} | S.C.A.L.E. Academy"
    page(path, title, l['summary'], f'og/pages/academy-week-{n}.jpg', l['h1'], ld, main, f' data-academy="lesson" data-week="{n}"')

# ------------------------------------------------------------------ certificate
cert_main = '''<div class="wrap" style="padding:48px 28px 72px">
<div id="cert-error" class="ac-card" hidden style="max-width:640px;margin:0 auto;text-align:center"><h1 style="font-family:var(--display);font-size:28px">Certificate not found</h1><p style="color:var(--muted);margin:10px 0 18px">Check the link, or earn your own certificate in the free S.C.A.L.E. Academy.</p><a class="ac-btn" href="/academy">Go to the Academy</a></div>
<div id="cert" hidden>
<div class="cert">
<div class="k">S.C.A.L.E. ACADEMY · CERTIFICATE OF COMPLETION</div>
<h1>This certifies that</h1>
<div class="c-name" id="c-name"></div>
<p>has completed all six weeks of the online course</p>
<p style="font-size:20px;color:#14202f;font-weight:600;margin-top:6px" id="c-course"></p>
<p style="margin-top:6px">Scan · Clarify · Amplify · Leverage · Evaluate</p>
<div class="sig"><div><b>Siamak Kalhor</b>Instructor, Siamak Kalhor Consulting</div><div><b id="c-date"></b>Date issued</div><div><b id="c-id"></b>Certificate ID</div></div>
</div>
<div class="cert-actions"><a class="ac-btn" id="c-linkedin" href="#" target="_blank" rel="noopener">Add to LinkedIn</a><button type="button" class="ac-btn ghost" id="c-share">Share link</button><button type="button" class="ac-btn ghost" id="c-print">Print or save PDF</button></div>
<p style="text-align:center;color:var(--muted-dim);font-size:13px">Verify at siamakconsulting.com/academy/certificate with the ID above. <a href="/academy" style="color:var(--muted)">Take the free course</a></p>
</div></div>'''
page('academy/certificate', 'S.C.A.L.E. Academy Certificate of Completion', 'A certificate of completion for the free S.C.A.L.E. Academy course on AI visibility by Siamak Kalhor Consulting.',
     'og/pages/academy.jpg', 'S.C.A.L.E. Academy certificate', [], cert_main, ' data-academy="certificate"', robots='noindex, follow')
