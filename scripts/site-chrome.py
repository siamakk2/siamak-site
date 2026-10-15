#!/usr/bin/env python3
"""Idempotent site-wide head/body additions. Re-run after any page build:
   python3 scripts/site-chrome.py
 - favicon set (SVG + PNG sizes + Apple touch icon + manifest) on every page
 - the subject-matched 3D hero script (assets/hero3d.js) on every page except the home page,
   which has its own 3D scene.
"""
import glob, os, re
ROOT = os.path.join(os.path.dirname(__file__), '..')
os.chdir(ROOT)
ICONS = ('<link rel="icon" href="/favicon.ico" sizes="48x48">\n'
         '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">\n'
         '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">\n'
         '<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">\n'
         '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n'
         '<link rel="manifest" href="/site.webmanifest">\n')
HERO = '<script src="/assets/hero3d.js?v=2" defer></script>'
n_icon = n_hero = 0
for f in glob.glob('**/*.html', recursive=True):
    if any(x in f for x in ('node_modules', '_archive', 'scripts/', '.vercel')) or os.path.basename(f).startswith('google'):
        continue
    s = open(f, encoding='utf-8', errors='ignore').read(); o = s
    if '<head' not in s:
        continue
    if not re.search(r'<link[^>]+rel="(?:shortcut )?icon"[^>]+href="/favicon\.ico"', s):
        # keep any existing icon tags; add the full set right after <meta charset>
        m = re.search(r'<meta charset="[^"]*"\s*/?>', s, re.I) or re.search(r'<head[^>]*>', s, re.I)
        s = s[:m.end()] + '\n' + ICONS + s[m.end():]; n_icon += 1
    if f != 'index.html' and HERO not in s and '</body>' in s and '<main' in s:
        s = re.sub(r'<script src="/assets/hero3d\.js[^"]*" defer></script>\n?', '', s)
        s = s.replace('</body>', HERO + '\n</body>', 1); n_hero += 1
    if s != o:
        open(f, 'w', encoding='utf-8').write(s)
print('icons added:', n_icon, ' hero script added:', n_hero)
