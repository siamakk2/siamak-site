#!/usr/bin/env python3
"""Aligns existing page titles and descriptions with how buyers search
(service + problem + industry phrasing). Idempotent: re-running is harmless.
Updates <title>, meta description, og:/twitter: title and description, and any
JSON-LD "name"/"headline"/"description" that repeated the old wording exactly.
"""
import html, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = {
 "ai-marketing": ("AI Marketing Consultant for Small Business | Siamak Kalhor",
   "AI marketing consultant for small business: more qualified leads, stronger brand authority and better follow-up, with AI doing the volume and strategy in charge."),
 "ai-automation": ("AI Automation Consultant | Automate Intake & Operations",
   "AI automation consultant for small business: lead response, intake, documents and reporting automated with humans in the loop, so your team gets hours back."),
 "ai-consultant": ("AI Consultant & AI Strategy Consultant | Siamak Kalhor",
   "An AI strategy consultant who helps owners implement AI in their business: 40 years of market judgment, AI adoption, automation, visibility and advisory."),
 "llmo-training": ("AI Training for Business Owners & Teams | AI Marketing Workshop",
   "AI training for business owners and their teams: hands-on AI marketing workshops and LLMO training for executives, marketers, writers and developers."),
 "dental-marketing-consultant": ("Dental Marketing Consultant | AI Marketing for Dentists", None),
 "medical-practice-marketing-consultant": ("AI Marketing for Medical Practices | Siamak Kalhor", None),
 "cosmetic-surgery-marketing-consultant": ("Cosmetic Practice Growth Consultant | Siamak Kalhor", None),
 "ecommerce-marketing-consultant": ("Shopify & Ecommerce Growth Consultant | Siamak Kalhor",
   "Shopify and ecommerce growth consultant with 40 years of retail experience: fix the conversion gap, cut wasted ad spend and get products recommended by AI."),
 "ai-for-ecommerce": ("AI Ecommerce Consultant | Shopify, Fabric & Wholesale Stores", None),
 "ai-for-restaurants": ("AI Consultant for Restaurants | Discovery & Automation",
   "AI consultant for independent restaurants: get discovered by AI assistants and maps, and automate restaurant management: scheduling, inventory and P&L."),
 "ai-for-contractors": ("AI Automation for Contractors | Lead Follow-Up That Never Sleeps",
   "AI automation for contractors and field-service businesses: every lead answered and followed up automatically, estimates drafted, jobs costed."),
 "ai-for-law-firms": ("AI Client Intake Automation for Law Firms | 24/7 Legal Intake", None),
 "law-firm-marketing-consultant": ("Law Firm Marketing Consultant | AI Consultant for Law Firms", None),
 "ai-marketing-consultant-napa-valley": ("AI Marketing Consultant & AI Business Advisor in Napa Valley", None),
 "services": ("AI Consulting & Marketing Services | Siamak Kalhor", None),
}
def esc(s): return html.escape(s, quote=True)
def jesc(s): return s.replace('"', '\\"')
for slug, (title, desc) in T.items():
    p = os.path.join(ROOT, slug, "index.html"); s = open(p, encoding="utf-8").read()
    ot = html.unescape(re.search(r"<title>(.*?)</title>", s, re.S).group(1))
    od = html.unescape(re.search(r'<meta name="description" content="([^"]*)"', s).group(1))
    s = re.sub(r"<title>.*?</title>", "<title>" + esc(title) + "</title>", s, 1, flags=re.S)
    for prop in ('property="og:title"', 'name="twitter:title"'):
        s = re.sub(r'(<meta %s content=")[^"]*(")' % prop, lambda m: m.group(1) + esc(title) + m.group(2), s)
    for v in {ot, esc(ot), ot.replace("&", "\\u0026")}:
        s = s.replace('"name": "%s"' % jesc(v), '"name": "%s"' % jesc(title)).replace('"name":"%s"' % jesc(v), '"name":"%s"' % jesc(title))
        s = s.replace('"headline": "%s"' % jesc(v), '"headline": "%s"' % jesc(title)).replace('"headline":"%s"' % jesc(v), '"headline":"%s"' % jesc(title))
    if desc:
        s = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + esc(desc) + m.group(2), s, 1)
        for prop in ('property="og:description"', 'name="twitter:description"'):
            s = re.sub(r'(<meta %s content=")[^"]*(")' % prop, lambda m: m.group(1) + esc(desc) + m.group(2), s)
        for v in {od, esc(od)}:
            s = s.replace('"description": "%s"' % jesc(v), '"description": "%s"' % jesc(desc)).replace('"description":"%s"' % jesc(v), '"description":"%s"' % jesc(desc))
    open(p, "w", encoding="utf-8").write(s)
    print(f"{slug:40s} t={len(title):3d} d={len(desc) if desc else '-'}")
