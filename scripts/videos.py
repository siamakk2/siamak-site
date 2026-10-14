"""Site videos: one definition per clip, rendered as a section with VideoObject schema.

Used by build-agency.py and by add-videos.py (for hand-written pages).
Files live in /videos/ (H.264 720x1280, faststart) with a JPEG poster beside each.
"""
import html, json

SITE = 'https://siamakconsulting.com'
esc = lambda s: html.escape(s, quote=True)

VIDEOS = {
    'whole-job': {
        'file': 'we-do-the-whole-job', 'seconds': 35,
        'name': 'AI is the tool. Strategy is the job.',
        'label': 'Watch · 35 seconds',
        'heading': 'AI is the tool. <span class="grad">Strategy is the job.</span>',
        'lead': 'Everybody thinks AI can do everything. Without a marketing background, an understanding of the algorithm, and one system in sync everywhere, you are just making it up. Siamak Kalhor Consulting does the whole job: strategy first, then the work, at fixed published prices.',
        'description': 'Why AI tools alone do not grow a business, and how Siamak Kalhor Consulting\'s done-for-you AI agency combines 40 years of strategy with fixed-price packages: AI Visibility Launch, AI Visibility Growth, AI-Ready Website, AI Agent / Chatbot and Content Engine.',
    },
    'sovereignty': {
        'file': 'data-sovereignty', 'seconds': 51,
        'name': 'Secure by design. Sovereign by default.',
        'label': 'Watch · 51 seconds',
        'heading': 'Secure by design. <span class="grad">Sovereign by default.</span>',
        'lead': 'Your data is your most valuable asset, until the day it leaks. For Indigenous communities it runs deeper, which is why the OCAP® and CARE principles exist. Every AI system Siamak Kalhor Consulting builds is encrypted, access-controlled, consent-first and respects who the data belongs to.',
        'description': 'A short film on data protection and Indigenous data sovereignty: the cost of a data breach, the OCAP® principles (ownership, control, access, possession) and the CARE principles, and how Siamak Kalhor Consulting builds AI that is encrypted, access-controlled, consent-first and community-governed.',
    },
}

CSS = ('<style id="vid-css">.vid-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:48px;align-items:center}'
       '.vid{margin:0;justify-self:center;width:100%;max-width:360px}'
       '.vid video{display:block;width:100%;height:auto;aspect-ratio:9/16;border-radius:22px;border:1px solid var(--line-bright,#2a3446);background:#05070b;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(45,212,255,.12)}'
       '.vid figcaption{font-size:13.5px;color:var(--muted-dim,#7c8796);margin-top:10px;text-align:center}'
       '@media(max-width:860px){.vid-grid{grid-template-columns:minmax(0,1fr);gap:28px}}</style>')


def schema(key):
    v = VIDEOS[key]
    return {'@context': 'https://schema.org', '@type': 'VideoObject', 'name': v['name'], 'description': v['description'],
            'thumbnailUrl': f"{SITE}/videos/{v['file']}.jpg", 'contentUrl': f"{SITE}/videos/{v['file']}.mp4",
            'uploadDate': '2026-10-14', 'duration': f"PT{v['seconds']}S", 'inLanguage': 'en',
            'publisher': {'@id': SITE + '/#business'}, 'creator': {'@id': SITE + '/#business'}}


def section(key, extra=''):
    v = VIDEOS[key]
    f = v['file']
    return (f'<!-- VIDEO:{key} -->\n<section id="video-{key}"><div class="wrap"><div class="vid-grid"><div>'
            f'<div class="sec-label">{esc(v["label"])}</div><h2 class="sec-h">{v["heading"]}</h2>'
            f'<p class="lead" style="color:var(--muted)">{esc(v["lead"])}</p>{extra}</div>'
            f'<figure class="vid"><video controls playsinline preload="none" poster="/videos/{f}.jpg" width="720" height="1280" aria-label="{esc(v["name"])}">'
            f'<source src="/videos/{f}.mp4" type="video/mp4"></video><figcaption>{esc(v["name"])}</figcaption></figure>'
            f'</div></div></section>\n<script type="application/ld+json">{json.dumps(schema(key), ensure_ascii=False)}</script>\n<!-- /VIDEO:{key} -->\n')
