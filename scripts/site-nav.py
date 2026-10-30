#!/usr/bin/env python3
"""Single source of truth for the site menu.

Run:  python3 scripts/site-nav.py
Rewrites the <div class="nav-links" id="navLinks"> block on every page that has
one, marks the current page as active, and adds the grouped-menu CSS once.
Builders that lift the nav from an existing page (build-ai-services.py etc.)
inherit it automatically.
"""
import glob, html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (label, [(group heading or None, [(href, text), ...]), ...], extra classes)
MENU = [
    ("Services", [
        ("Get Found by Google &amp; AI", [
            ("/ai-visibility", "AI Visibility (LLMO)"),
            ("/geo-aeo-consultant", "GEO &amp; AEO"),
            ("/ai-seo", "AI SEO"),
            ("/ai-search-marketing-consultant", "AI Search Marketing"),
            ("/llm-optimization", "LLM Optimization"),
            ("/seo-consultant", "SEO Consultant"),
        ]),
        ("Strategy &amp; Leadership", [
            ("/ai-consulting", "AI Consulting"),
            ("/ai-advisory", "AI Advisory"),
            ("/marketing-consultant", "Marketing Consultant"),
            ("/fractional-cmo", "Fractional CMO"),
            ("/business-growth-consultant", "Business Growth"),
            ("/llmo-training", "Team AI Training"),
        ]),
        ("AI Built for Your Business", [
            ("/ai-agents", "AI Agents"),
            ("/ai-automation", "AI Automation"),
            ("/custom-ai-software", "Custom AI Software"),
            ("/website-conversion-consultant", "Website Conversion"),
        ]),
        ("Done-for-You Marketing", [
            ("/agency", "Done-for-You AI Agency"),
            ("/full-service-ai-agency", "Full-Service, A to Z"),
            ("/ai-marketing", "AI Marketing"),
            ("/ai-marketing-agency", "AI Marketing Agency"),
            ("/internet-marketing", "Internet Marketing"),
            ("/social-media-marketing", "Social Media Marketing"),
            ("/brand-creation", "Brand Creation"),
        ]),
        (None, [("/services", "All Services &rarr;")]),
    ], "dd-cols"),
    ("Industries", [
        (None, [
            ("/law-firm-marketing-consultant", "Law Firms"),
            ("/ai-for-law-firms", "AI Client Intake for Law Firms"),
            ("/dental-marketing-consultant", "Dental Practices"),
            ("/medical-practice-marketing-consultant", "Medical Practices"),
            ("/cosmetic-surgery-marketing-consultant", "Cosmetic Surgery"),
            ("/ecommerce-marketing-consultant", "E-commerce Brands"),
            ("/ai-for-ecommerce", "Fabric &amp; Wholesale Stores"),
            ("/ai-for-restaurants", "Restaurants"),
            ("/ai-for-contractors", "Contractors"),
            ("/industries", "All Industries &rarr;"),
        ]),
    ], ""),
    ("Pricing", [
        ("What It Costs", [
            ("/pricing", "Pricing &amp; Packages"),
            ("/ai-marketing-cost", "AI Marketing Cost Calculator"),
            ("/how-much-does-llmo-cost", "What LLMO Costs"),
            ("/help", "Find the Right Help"),
        ]),
        ("Free Checks", [
            ("/audit", "Free AI Visibility Scan"),
            ("/analyze-your-brand", "AI Authority Audit"),
            ("/local", "Local Visibility Check"),
        ]),
    ], ""),
    ("Learn", [
        ("Read &amp; Watch", [
            ("/the-long-view", "The Long View (articles)"),
            ("/videos", "Videos"),
            ("/ai-marketing-news", "AI Marketing News"),
            ("/answers", "Answers"),
            ("/seo-vs-llmo", "SEO vs LLMO"),
            ("/the-growth-glossary", "Growth Glossary"),
        ]),
        ("Ask", [
            ("/faq", "Ask Siamak (FAQ)"),
            ("/ask", "Ask My AI"),
            ("/ai-advisor", "AI Advisor, 20 Languages"),
        ]),
        ("The S.C.A.L.E. Method", [
            ("/growth-framework", "S.C.A.L.E. Framework"),
            ("/academy", "S.C.A.L.E. Academy (course)"),
            ("https://scale.siamakconsulting.com/", "S.C.A.L.E. App &rarr;"),
        ]),
        (None, [("/llm-info", "Info for AI Systems")]),
    ], "dd-cols"),
    ("Work", [
        ("Results", [
            ("/case-studies", "Case Studies"),
            ("/portfolio", "Portfolio"),
            ("/portfolio#clients", "Clients"),
        ]),
        ("Products I Built", [
            ("/textile-wizard", "Textile Wizard"),
            ("https://www.yourlegalbrain.com/", "Your Legal Brain &rarr;"),
        ]),
        ("Real Estate", [
            ("/listings", "K2 Investment Listings"),
        ]),
    ], ""),
]

LINKS_AFTER = [
    ("/agency", "AI Agency", ' class="nav-ag" style="color:#ffb454;font-weight:600"'),
    ("/about-us", "About", ""),
    ("/contact-us", "Contact", ""),
]

LANG = '''      <div class="nav-item has-dd">
        <button type="button" class="dd-trigger" aria-haspopup="true" aria-expanded="false" aria-label="Language" style="font-family:var(--mono);font-size:13px;">&#127760; <span class="dd-caret">&#9662;</span></button>
        <div class="dd-menu dd-right">
          <a href="/">English</a>
          <a href="/es">Espa&ntilde;ol</a>
          <a href="/fa">&#1601;&#1575;&#1585;&#1587;&#1740;</a>
          <a href="/hy">&#1344;&#1377;&#1397;&#1381;&#1408;&#1381;&#1398;</a>
        </div>
      </div>
'''

LISTINGS_DD = '''      <div class="nav-item has-dd">
        <button type="button" class="dd-trigger" aria-haspopup="true" aria-expanded="false">Real Estate <span class="dd-caret">&#9662;</span></button>
        <div class="dd-menu">
          <a href="/listings">All Listings &rarr;</a>
          <a href="/listings/k2-investment">About K2 Investment</a>
          <a href="/listings/90-longhorn-ridge-napa">90 Longhorn Ridge, Napa</a>
          <a href="/listings/95-longhorn-ridge-napa">95 Longhorn Ridge, Napa</a>
          <a href="/listings/1048-s-los-angeles-st-dtla">1048 S Los Angeles St, DTLA</a>
        </div>
      </div>
'''

CSS_MARK = "/* grouped-menu v1 */"
CSS = CSS_MARK + """
.dd-head{display:block;padding:10px 14px 4px;font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--cyan,#2dd4ff);opacity:.85}
.dd-grp{display:flex;flex-direction:column;gap:2px}
.dd-grp+.dd-grp{margin-top:4px}
.dd-trigger.active{color:var(--text)}
.dd-menu a.active{color:var(--text);background:var(--surface-2)}
.dd-right{left:auto;right:0}
@media(min-width:961px){
  .has-dd.open .dd-cols,.has-dd:hover .dd-cols{display:grid;grid-template-columns:repeat(2,minmax(220px,1fr));column-gap:10px;align-items:start}
  .dd-cols .dd-grp+.dd-grp{margin-top:0}
  .dd-menu .dd-grp a{padding:7px 14px;line-height:1.35}
  .dd-head{padding-top:8px}
  .dd-cols .dd-grp.dd-wide{grid-column:1/-1;border-top:1px solid var(--line);margin-top:4px;padding-top:4px}
  .has-dd.open .dd-menu,.has-dd:hover .dd-menu{max-height:calc(100vh - 90px);overflow-y:auto}
}
@media(max-width:960px){.dd-head{padding:10px 14px 2px}}
"""


def norm(p):
    p = p.split("#")[0].rstrip("/")
    return p or "/"


def build(page_path, listings=False):
    out = []
    for label, groups, cls in MENU:
        hrefs = [norm(h) for _, links in groups for h, _ in links if h.startswith("/")]
        on = page_path in hrefs or (label == "Work" and page_path.startswith("/listings"))
        out.append('      <div class="nav-item has-dd">\n')
        out.append(f'        <button type="button" class="dd-trigger{" active" if on else ""}" aria-haspopup="true" aria-expanded="false">{label} <span class="dd-caret">&#9662;</span></button>\n')
        out.append(f'        <div class="dd-menu{(" " + cls) if cls else ""}">\n')
        for head, links in groups:
            wide = " dd-wide" if (head is None and cls) else ""
            out.append(f'          <div class="dd-grp{wide}">')
            if head:
                out.append(f'<span class="dd-head">{head}</span>')
            for h, t in links:
                act = ' class="active" aria-current="page"' if (h.startswith("/") and "#" not in h and norm(h) == page_path) else ""
                out.append(f'<a href="{h}"{act}>{t}</a>')
            out.append("</div>\n")
        out.append("        </div>\n      </div>\n")
        if label == "Work" and listings:
            out.append(LISTINGS_DD)
    for h, t, extra in LINKS_AFTER:
        if norm(h) == page_path:
            extra = (extra.replace('class="nav-ag"', 'class="nav-ag active"') if "class=" in extra else ' class="active"') + ' aria-current="page"'
        out.append(f'      <a href="{h}"{extra}>{t}</a>\n')
    out.append(LANG)
    return "\n" + "".join(out) + "    "


NAV_RE = re.compile(r'(<div class="nav-links" id="navLinks">)(.*?)(</div>\s*<div class="nav-right">)', re.S)


def page_path_of(f):
    rel = os.path.relpath(f, ROOT).replace(os.sep, "/")
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("/index.html")]
    return "/" + rel[:-5]


def main():
    changed = 0
    for f in sorted(glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True)):
        if "/node_modules/" in f or "/.git/" in f:
            continue
        s = open(f, encoding="utf-8").read()
        m = NAV_RE.search(s)
        if not m:
            continue
        # Only touch the canonical dropdown nav (has a Services dropdown)
        if "dd-trigger" not in m.group(2) or ">Services <" not in m.group(2):
            continue
        pp = page_path_of(f)
        new = NAV_RE.sub(lambda mm: mm.group(1) + build(pp, pp.startswith("/listings")) + mm.group(3), s, count=1)
        # The trailing </div> of the last dropdown was consumed by the regex's lazy
        # match ending at the first "</div> <div class=nav-right>", i.e. the
        # nav-links closing tag, so structure is preserved.
        if CSS_MARK not in new:
            mm = re.search(r'<style id="canonical-nav-css">.*?(</style>)', new, re.S)
            if mm:
                new = new[: mm.start(1)] + CSS + new[mm.start(1):]
            else:
                new = new.replace("</head>", f"<style>{CSS}</style>\n</head>", 1)
        if new != s:
            open(f, "w", encoding="utf-8").write(new)
            changed += 1
    print("updated", changed, "pages")


if __name__ == "__main__":
    main()
