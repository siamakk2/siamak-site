#!/usr/bin/env python3
"""Places site videos on hand-written pages (idempotent: re-running replaces the block).
The agency page gets its video from build-agency.py.
"""
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import videos

ROOT = os.path.join(os.path.dirname(__file__), '..')
# (page, video key, regex for the element the video goes BEFORE, extra html under the text)
PLACEMENTS = [
    ('index.html', 'studio', r'<section id="agent-studio-band">',
     '<div class="ph-btns" style="margin-top:22px"><a href="https://agents.siamakconsulting.com" class="btn btn-pri">Build my agent free &rarr;</a></div>'),
    ('ai-agents/index.html', 'sovereignty', r'<section><div class="wrap"><div class="sec-label">Responsible by design</div>',
     '<p style="margin-top:14px;color:var(--muted)">That is why every agent I build follows the rules below.</p>'),
    ('ai-consulting/index.html', 'sovereignty', r'<section><div class="wrap"><div class="sec-label">Engagement models</div>', ''),
    ('services/index.html', 'whole-job', r'<section id="buyer-questions">',
     '<div class="ph-btns" style="margin-top:22px"><a href="/agency" class="btn btn-pri">See the done-for-you packages &rarr;</a></div>'),
    ('ai-agents/index.html', 'agents', r'<section><div class="wrap"><div class="sec-label">Know what you&#x27;re buying</div>',
     '<div class="ph-btns" style="margin-top:22px"><a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a></div>'),
    ('how-to-get-cited-by-ai/index.html', 'reviews', r'<section style="padding:56px 0;background:var\(--surface-2\);border-top:1px solid var\(--line\);"><div class="wrap" style="max-width:780px;"><div class="sec-head" style="margin-bottom:30px;"><div class="sec-label">FAQ',
     '<div class="ph-btns" style="margin-top:22px"><a href="/audit" class="btn btn-pri">Get the free AI check &rarr;</a></div>'),
    ('dental-marketing-consultant/index.html', 'reviews', r'<section><div class="wrap">\n<div class="sec-label">Diagnostic</div>',
     '<p style="margin-top:14px;color:var(--muted)">The example reviews in the video are illustrations, not real patients.</p>'),
    ('ai-automation/index.html', 'automation', r'<section id="how-i-help"><div class="wrap"><div class="sec-label">Where automation pays first',
     '<div class="ph-btns" style="margin-top:22px"><a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a></div>'),
    ('ai-visibility/index.html', 'reviews', r'<h2>What decides whether a model names you</h2>', 'INLINE'),
    ('about-us/index.html', 'shifts', r'<section><div class="wrap">\n<div class="sec-label">What I believe</div>',
     '<div class="ph-btns" style="margin-top:22px"><a href="/contact-us" class="btn btn-pri">Talk to Siamak &rarr;</a></div>'),
    ('fa/index.html', 'shifts-fa', r'<h2>چرا تجربه اهمیت دارد</h2>\n<p>چهل سال', 'INLINE_AFTER_H2'),
    ('fa/index.html', 'nobody-fa', r'<h2>مسئله‌ای که امروز با آن روبه‌رو هستید</h2>', 'INLINE'),
]

for page, key, anchor, extra in PLACEMENTS:
    p = os.path.join(ROOT, page)
    s = open(p, encoding='utf-8').read()
    s = re.sub(r'<!-- VIDEO:%s -->.*?<!-- /VIDEO:%s -->\n' % (key, key), '', s, flags=re.S)
    m = re.search(anchor, s)
    assert m, (page, anchor)
    if extra == 'INLINE_AFTER_H2':
        cut = s.index('</h2>', m.start()) + len('</h2>\n')
        s = s[:cut] + videos.inline(key) + s[cut:]
    else:
        block = videos.inline(key) if extra == 'INLINE' else videos.section(key, extra)
        s = s[:m.start()] + block + s[m.start():]
    if 'id="vid-css"' not in s:
        s = s.replace('</head>', videos.CSS + '\n</head>', 1)
    else:
        s = re.sub(r'<style id="vid-css">.*?</style>', lambda _: videos.CSS, s, count=1, flags=re.S)
    open(p, 'w', encoding='utf-8').write(s)
    print('placed', key, 'on', page)
