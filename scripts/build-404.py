#!/usr/bin/env python3
"""Builds /404.html (Vercel serves it for any unknown URL) using the site chrome."""
import os, re
ROOT = os.path.join(os.path.dirname(__file__), '..')
src = open(os.path.join(ROOT, 'growth-framework/index.html'), encoding='utf-8').read()
head, _, body = src.partition('</head>')
for pat in [r'<title>.*?</title>', r'<meta\s+name="description"[^>]*>', r'<meta\s+name="robots"[^>]*>',
            r'<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>', r'<link\s+rel="canonical"[^>]*>',
            r'<link\s+rel="alternate"\s+hreflang[^>]*>', r'<script type="application/ld\+json"[^>]*>.*?</script>']:
    head = re.sub(pat, '', head, flags=re.S)
pre, rest = body.split('<main id="main">', 1)
post = rest.split('</main>', 1)[1]
meta = '<title>Page Not Found | Siamak Kalhor Consulting</title>\n<meta name="robots" content="noindex, follow">\n<meta name="description" content="This page does not exist. Find AI agency packages, the free AI visibility report and articles on AI search.">'
head = head.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' + meta, 1)
links = [('/agency', 'Done-for-you AI agency', 'Fixed-price packages. Pay online and the work starts.'),
         ('/audit', 'Free AI visibility report', 'See how AI assistants read your website.'),
         ('/the-long-view', 'The Long View', 'Research and guides on AI search and LLMO.'),
         ('/academy', 'S.C.A.L.E. Academy', 'The online course. Week 1 is free.'),
         ('/services', 'All services', 'Consulting, audits and fractional CMO.'),
         ('/contact-us', 'Contact', 'Call 323-657-7752 or send a message.')]
cards = ''.join(f'<a href="{h}" style="display:block;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px 20px;text-decoration:none;color:var(--text)"><b style="font-family:var(--display);font-size:18px">{t} &rarr;</b><p style="color:var(--muted);font-size:14.5px;margin-top:6px">{d}</p></a>' for h, t, d in links)
main = f'''<div class="wrap" style="padding:80px 28px 90px;max-width:960px">
<div class="sec-label">404</div><h1 class="ph-h">This page doesn't exist.</h1>
<p class="ph-sub" style="margin-bottom:26px">The link may be old or mistyped. Here is where most people are headed:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:14px">{cards}</div></div>'''
out = head + '</head>' + pre + '<main id="main">\n' + main + '\n</main>' + post
open(os.path.join(ROOT, '404.html'), 'w', encoding='utf-8').write(out); print('built 404.html', len(out))
