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
    ('ai-agents/index.html', 'sovereignty', r'<section><div class="wrap"><div class="sec-label">Responsible by design</div>',
     '<p style="margin-top:14px;color:var(--muted)">That is why every agent I build follows the rules below.</p>'),
    ('ai-consulting/index.html', 'sovereignty', r'<section><div class="wrap"><div class="sec-label">Engagement models</div>', ''),
    ('services/index.html', 'whole-job', r'<section id="buyer-questions">',
     '<div class="ph-btns" style="margin-top:22px"><a href="/agency" class="btn btn-pri">See the done-for-you packages &rarr;</a></div>'),
]

for page, key, anchor, extra in PLACEMENTS:
    p = os.path.join(ROOT, page)
    s = open(p, encoding='utf-8').read()
    s = re.sub(r'<!-- VIDEO:%s -->.*?<!-- /VIDEO:%s -->\n' % (key, key), '', s, flags=re.S)
    m = re.search(anchor, s)
    assert m, (page, anchor)
    s = s[:m.start()] + videos.section(key, extra) + s[m.start():]
    if 'id="vid-css"' not in s:
        s = s.replace('</head>', videos.CSS + '\n</head>', 1)
    open(p, 'w', encoding='utf-8').write(s)
    print('placed', key, 'on', page)
