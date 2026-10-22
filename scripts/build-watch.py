#!/usr/bin/env python3
"""Watch pages: one page per site video, where the video IS the main content.

Google only indexes a video that is the main content of its page ("Video isn't on a
watch page" in Search Console otherwise). Service pages keep their embedded clips;
each clip's VideoObject schema now lives here, on its own watch page, together with
the transcript, plus a /videos hub and video-sitemap entries.

  python3 scripts/build-watch.py      (idempotent; re-run after adding a video to videos.py)
"""
import html, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import videos

ROOT = os.path.join(os.path.dirname(__file__), '..')
SITE = videos.SITE
esc = lambda s: html.escape(s, quote=True)
TEMPLATE = open(os.path.join(ROOT, 'letter/index.html'), encoding='utf-8').read()
# drop the letter page's own sign-up styles and form script
TEMPLATE = re.sub(r'<style id="lt-css">.*?</style>\n?', '', TEMPLATE, flags=re.S)
TEMPLATE = re.sub(r'<script>\s*\(function\(\)\{var f=document\.getElementById\(\'ltForm\'\).*?</script>\n?', '', TEMPLATE, flags=re.S)

# Which service pages embed each clip (for the "where this comes from" links).
import importlib.util
spec = importlib.util.spec_from_file_location('addv', os.path.join(os.path.dirname(__file__), 'add-videos.py'))
src = open(spec.origin, encoding='utf-8').read()
PLACED = {}
for page, key in re.findall(r"\('([a-z0-9\-/]+)/index\.html', '([a-z\-]+)'", src):
    PLACED.setdefault(key, []).append('/' + page)
PLACED.setdefault('whole-job', []).insert(0, '/agency')
PAGE_NAMES = {'/agency': 'Done-for-you AI agency', '/services': 'Services', '/ai-agents': 'AI agents',
              '/ai-consulting': 'AI consulting', '/how-to-get-cited-by-ai': 'How to get cited by AI',
              '/dental-marketing-consultant': 'Dental marketing', '/ai-visibility': 'AI visibility',
              '/fa': 'صفحه‌ی فارسی', '/ai-automation': 'AI automation', '/about-us': 'About Siamak'}

def watch_url(key):
    return '%s/videos/%s' % (SITE, videos.VIDEOS[key]['file'])

def strip_tags(s):
    return re.sub(r'<[^>]+>', '', s)

def schema(key):
    d = videos.schema(key)
    d['url'] = watch_url(key)
    d['@id'] = watch_url(key) + '#video'
    d['embedUrl'] = watch_url(key)
    return d

def page(key):
    v = videos.VIDEOS[key]; f = v['file']; fa = v.get('lang') == 'fa'
    url = watch_url(key)
    name = v['name']
    title = ('%s | ویدیو | سیامک کلهر' if fa else '%s | Video | Siamak Kalhor') % name
    desc = v['description']
    if len(desc) > 300: desc = desc[:297].rsplit(' ', 1)[0] + '…'
    img = '%s/videos/%s.jpg' % (SITE, f)
    s = TEMPLATE
    s = s.replace('<html lang="en">', '<html lang="fa">' if fa else '<html lang="en">', 1)
    s = re.sub(r'<title>.*?</title>', '<title>%s</title>' % esc(title), s, count=1, flags=re.S)
    s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % esc(desc), s, count=1)
    s = re.sub(r'<meta property="og:type" content="[^"]*">', '<meta property="og:type" content="video.other">', s, count=1)
    if fa: s = s.replace('<meta property="og:locale" content="en_US">', '<meta property="og:locale" content="fa_IR">', 1)
    for prop, val in [('og:url', url), ('og:title', title), ('og:description', desc), ('og:image', img), ('og:image:secure_url', img),
                      ('og:image:alt', name)]:
        s = re.sub(r'<meta property="%s" content="[^"]*">' % re.escape(prop), '<meta property="%s" content="%s">' % (prop, esc(val)), s, count=1)
    s = re.sub(r'<meta property="og:image:width" content="[^"]*">', '<meta property="og:image:width" content="720">', s, count=1)
    s = re.sub(r'<meta property="og:image:height" content="[^"]*">', '<meta property="og:image:height" content="1280">', s, count=1)
    s = s.replace('<meta property="og:image:alt"', '<meta property="og:video" content="%s/videos/%s.mp4">\n<meta property="og:video:type" content="video/mp4">\n<meta property="og:video:width" content="720">\n<meta property="og:video:height" content="1280">\n<meta property="og:image:alt"' % (SITE, f), 1)
    for nm, val in [('twitter:url', url), ('twitter:title', title), ('twitter:description', desc), ('twitter:image', img), ('twitter:image:alt', name)]:
        s = re.sub(r'<meta name="%s" content="[^"]*">' % re.escape(nm), '<meta name="%s" content="%s">' % (nm, esc(val)), s, count=1)
    s = re.sub(r'<link rel="canonical" href="[^"]*"\s*/?>', '<link rel="canonical" href="%s"/>' % url, s, count=1)
    s = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*/?>', '', s)
    graph = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'WebPage', '@id': url + '#page', 'url': url, 'name': name, 'description': desc, 'inLanguage': v.get('lang', 'en'),
         'primaryImageOfPage': img, 'mainEntity': {'@id': url + '#video'}, 'isPartOf': {'@id': SITE + '/#website'}},
        schema(key),
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE + '/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Videos', 'item': SITE + '/videos'},
            {'@type': 'ListItem', 'position': 3, 'name': name, 'item': url}]}]}
    s = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema.org","@graph":\[.*?\]\}\s*</script>',
               lambda m: '<script type="application/ld+json">%s</script>' % json.dumps(graph, ensure_ascii=False), s, count=1, flags=re.S)
    # page body
    seconds = v['seconds']
    label = v['label']
    where = ''.join('<a class="w-rel" href="%s">%s &rarr;</a>' % (p, esc(PAGE_NAMES.get(p, p))) for p in dict.fromkeys(PLACED.get(key, [])))
    tr = v.get('transcript', '')
    tr_html = ('<section><div class="wrap w-narrow"><div class="sec-label">%s</div><h2 class="sec-h">%s</h2><p class="w-tr">%s</p></div></section>' % (
        'متن کامل' if fa else 'Transcript', 'آنچه در ویدیو گفته می‌شود' if fa else 'What is said in the video', esc(tr))) if tr else ''
    body = ('<main id="main">\n<header class="ph"><div class="wrap"><div class="w-grid"><div><div class="eyebrow"><span class="dot"></span>%s</div>'
            '<h1 class="ph-h w-h">%s</h1><p class="ph-sub">%s</p><div class="w-rels">%s</div>'
            '<p class="w-fine">%s <a href="/videos">%s</a></p></div>'
            '<figure class="w-vid"><video controls playsinline preload="metadata" poster="/videos/%s.jpg" width="720" height="1280" aria-label="%s">'
            '<source src="/videos/%s.mp4" type="video/mp4"></video></figure></div></div></header>\n%s\n'
            '<section><div class="wrap w-narrow"><div class="cta-band"><h3>%s</h3><p>%s</p><div class="cta-row">'
            '<a href="/audit" class="btn btn-pri">%s</a><a href="/contact-us" class="btn btn-ghost">%s</a></div></div></div></section>\n</main>') % (
        esc(label), esc(name), esc(v['lead']) if v['lead'] else esc(strip_tags(v['heading'])),
        where,
        'ویدیوهای بیشتر:' if fa else 'More short films from Siamak Kalhor:', 'همه‌ی ویدیوها' if fa else 'all videos',
        f, esc(name), f, tr_html,
        'ببینید هوش مصنوعی درباره‌ی کسب‌وکار شما چه می‌گوید' if fa else 'See what AI says about your business',
        'بررسی رایگان، بدون ثبت‌نام، حدود ۶۰ ثانیه.' if fa else 'Free, no signup, about 60 seconds.',
        'بررسی رایگان هوش مصنوعی' if fa else 'Run the free AI check &rarr;', 'تماس' if fa else 'Talk to Siamak')
    if fa: body = body.replace('<main id="main">', '<main id="main" dir="rtl">', 1)
    s = re.sub(r'<main id="main">.*?</main>', lambda m: body, s, count=1, flags=re.S)
    s = s.replace('</head>', CSS + '\n</head>', 1) if 'id="w-css"' not in s else s
    return s

CSS = ('<style id="w-css">.ph>.wrap{display:block!important}.ph .w-grid{width:100%;max-width:none!important}.w-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:56px;align-items:center}'
       '.w-h{font-size:clamp(34px,4.4vw,56px)}.w-vid{margin:0;justify-self:center;width:100%;max-width:380px}'
       '.w-vid video{display:block;width:100%;height:auto;aspect-ratio:9/16;border-radius:22px;border:1px solid var(--line-bright,#2a3446);background:#05070b;box-shadow:0 30px 80px rgba(0,0,0,.55)}'
       '.w-rels{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.w-rel{font-size:14px;padding:8px 14px;border:1px solid var(--line,#1c2330);border-radius:999px;color:var(--text,#e8edf2);text-decoration:none}'
       '.w-rel:hover{border-color:var(--cyan,#2dd4ff)}.w-fine{margin-top:18px;font-size:14px;color:var(--muted-dim,#7c8796)}'
       '.w-narrow{max-width:860px}.w-tr{font-size:18px;line-height:1.75;color:var(--muted,#a6b0bd)}'
       '.w-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:22px;margin-top:28px}'
       '.w-card{display:block;text-decoration:none;color:var(--text,#e8edf2);border:1px solid var(--line,#1c2330);border-radius:18px;overflow:hidden;background:rgba(255,255,255,.02)}'
       '.w-card img{display:block;width:100%;aspect-ratio:9/16;object-fit:cover}.w-card span{display:block;padding:14px 16px;font-size:15px;line-height:1.4}'
       '.w-card small{display:block;color:var(--muted-dim,#7c8796);margin-top:4px}'
       '[dir=rtl] .w-grid{direction:rtl}@media(max-width:860px){.w-grid{grid-template-columns:minmax(0,1fr);gap:24px}.w-vid{order:-1;max-width:300px}.ph:has(.w-grid){padding-top:28px}}</style>')

def hub():
    url = SITE + '/videos'
    title = 'Short Films on AI, Search and Business | Siamak Kalhor'
    desc = 'Short narrated films from Siamak Kalhor on how AI assistants choose businesses, AI agents, automation, reviews and data security, each with a full transcript.'
    s = TEMPLATE
    s = re.sub(r'<title>.*?</title>', '<title>%s</title>' % esc(title), s, count=1, flags=re.S)
    s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % esc(desc), s, count=1)
    for prop, val in [('og:url', url), ('og:title', title), ('og:description', desc)]:
        s = re.sub(r'<meta property="%s" content="[^"]*">' % re.escape(prop), '<meta property="%s" content="%s">' % (prop, esc(val)), s, count=1)
    for nm, val in [('twitter:url', url), ('twitter:title', title), ('twitter:description', desc)]:
        s = re.sub(r'<meta name="%s" content="[^"]*">' % re.escape(nm), '<meta name="%s" content="%s">' % (nm, esc(val)), s, count=1)
    s = re.sub(r'<link rel="canonical" href="[^"]*"\s*/?>', '<link rel="canonical" href="%s"/>' % url, s, count=1)
    s = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*/?>', '', s)
    items = [{'@type': 'ListItem', 'position': i + 1, 'url': watch_url(k), 'name': v['name']} for i, (k, v) in enumerate(videos.VIDEOS.items())]
    graph = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CollectionPage', '@id': url + '#page', 'url': url, 'name': 'Videos', 'description': desc},
        {'@type': 'ItemList', 'itemListElement': items},
        {'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE + '/'},
                                                         {'@type': 'ListItem', 'position': 2, 'name': 'Videos', 'item': url}]}]}
    s = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema.org","@graph":\[.*?\]\}\s*</script>',
               lambda m: '<script type="application/ld+json">%s</script>' % json.dumps(graph, ensure_ascii=False), s, count=1, flags=re.S)
    cards = ''.join('<a class="w-card" href="/videos/%s"%s><img src="/videos/%s.jpg" alt="" loading="lazy" width="720" height="1280"><span>%s<small>%s</small></span></a>' % (
        v['file'], ' dir="rtl" lang="fa"' if v.get('lang') == 'fa' else '', v['file'], esc(v['name']), esc(v['label'])) for v in videos.VIDEOS.values())
    body = ('<main id="main">\n<header class="ph"><div class="wrap"><div class="eyebrow"><span class="dot"></span>Videos</div>'
            '<h1 class="ph-h">Short films, <span class="grad">plain answers</span></h1><p class="ph-sub">%s</p></div></header>\n'
            '<section><div class="wrap"><div class="w-list">%s</div></div></section>\n</main>') % (esc(desc), cards)
    s = re.sub(r'<main id="main">.*?</main>', lambda m: body, s, count=1, flags=re.S)
    return s.replace('</head>', CSS + '\n</head>', 1)

def write(path, s):
    p = os.path.join(ROOT, path); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8').write(s)

for key, v in videos.VIDEOS.items():
    write('videos/%s/index.html' % v['file'], page(key))
write('videos/index.html', hub())

# sitemap: watch pages with video extension
sm_p = os.path.join(ROOT, 'sitemap.xml'); sm = open(sm_p, encoding='utf-8').read()
if 'xmlns:video=' not in sm:
    sm = sm.replace('<urlset ', '<urlset xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n        ', 1)
sm = re.sub(r'\s*<!-- WATCH -->.*?<!-- /WATCH -->', '', sm, flags=re.S)
x = lambda t: html.escape(t, quote=False)
entries = ['  <url><loc>%s/videos</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>' % SITE]
for key, v in videos.VIDEOS.items():
    entries.append('  <url><loc>%s</loc><video:video><video:thumbnail_loc>%s/videos/%s.jpg</video:thumbnail_loc><video:title>%s</video:title>'
                   '<video:description>%s</video:description><video:content_loc>%s/videos/%s.mp4</video:content_loc>'
                   '<video:duration>%d</video:duration><video:publication_date>%s</video:publication_date></video:video></url>' % (
        watch_url(key), SITE, v['file'], x(v['name']), x(v['description'][:2048]), SITE, v['file'], v['seconds'], v.get('date', '2026-10-14T09:00:00-07:00')))
sm = sm.replace('</urlset>', '  <!-- WATCH -->\n' + '\n'.join(entries) + '\n  <!-- /WATCH -->\n</urlset>', 1)
open(sm_p, 'w', encoding='utf-8').write(sm)
print('watch pages:', len(videos.VIDEOS), '+ hub; sitemap updated')
