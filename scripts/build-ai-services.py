#!/usr/bin/env python3
"""Builds the six AI service pages from scripts/ai-services-content.py.

The shell (consent defaults, GA, nav, footer, scripts) is lifted from
/ai-consultant/index.html at build time, so the new pages can never drift from
the rest of the site's chrome. Re-run after editing the content file:

    python3 scripts/build-ai-services.py

Crawl-safety rules carried over from the rest of the site: no element rests at
opacity 0, and no text is hidden with display:none at any width.
"""
import html, json, os, re, runpy

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://siamakconsulting.com"
C = runpy.run_path(os.path.join(ROOT, "scripts", "ai-services-content.py"))
PAGES = C["PAGES"]
TODAY = "2026-10-06"

shell = open(os.path.join(ROOT, "ai-consultant", "index.html"), encoding="utf-8").read()

def between(s, a, b, include=True):
    i = s.index(a); j = s.index(b, i) + (len(b) if include else 0)
    return s[i:j]

HEAD_TOP = shell[:shell.index("<title>")]                       # consent + GA + viewport
BASE_CSS = between(shell, "<style>\n*{margin:0", "</style>")
NAV_CSS  = between(shell, '<style id="canonical-nav-css">', "</style>")
NAV      = between(shell, "<nav>", "</nav>")
TAIL     = shell[shell.index("</main>") + len("</main>"):]       # footer + scripts
TAIL     = TAIL.replace('<a href="/ai-consultant">AI Consultant</a>',
            '<a href="/ai-consultant">AI Consultant</a>\n        <a href="/ai-consulting">AI Consulting</a>\n'
            '        <a href="/ai-automation">AI Automation</a>\n        <a href="/ai-agents">AI Agents</a>\n'
            '        <a href="/ai-seo">AI SEO</a>\n        <a href="/ai-marketing">AI Marketing</a>\n'
            '        <a href="/ai-advisory">AI Advisory</a>', 1)
# The graph's Person and business nodes, verbatim, so entity facts stay identical sitewide.
_g = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', shell, re.S).group(1))["@graph"]
PERSON   = next(n for n in _g if n.get("@type") == "Person")
BUSINESS = next(n for n in _g if n.get("@type") == "ProfessionalService")
WEBSITE  = next(n for n in _g if n.get("@type") == "WebSite")

EXTRA_CSS = r"""
<style id="ai-svc-css">
/* ---- AI service pages: components layered on the site's base tokens ---- */
.ph{padding:70px 0 34px}
.ph-sub{font-size:18.5px}
.ph-r{position:relative;border:1px solid var(--line-bright);border-radius:20px;padding:26px;background:radial-gradient(circle at 80% 0%,rgba(160,107,255,.18),transparent 55%),radial-gradient(circle at 0% 100%,rgba(45,212,255,.14),transparent 55%),var(--panel);box-shadow:0 30px 80px rgba(0,0,0,.5)}
.ph-r::before{content:'';position:absolute;inset:-1px;border-radius:20px;padding:1px;background:var(--glow);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.55;pointer-events:none}
.ph-r-k{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-dim);margin-bottom:14px}
.ph-r-f{margin-top:16px;font-family:var(--mono);font-size:11px;color:var(--muted-dim);letter-spacing:.06em}
.glance{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.glance div{background:var(--surface);padding:20px 20px}
.glance b{display:block;font-family:var(--display);font-size:30px;font-weight:700;line-height:1.1;background:var(--glow);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.glance span{display:block;font-size:13px;color:var(--muted);margin-top:5px;line-height:1.4}
.defn{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:0;border:1px solid var(--line-bright);border-radius:16px;overflow:hidden;background:var(--surface)}
.defn-main{padding:34px 36px;border-left:3px solid transparent;border-image:var(--glow) 1}
.defn-main .k{font-family:var(--mono);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);margin-bottom:12px}
.defn-main h2{font-family:var(--display);font-size:clamp(24px,3vw,32px);font-weight:600;line-height:1.15;margin-bottom:14px}
.defn-main p{font-size:17.5px;line-height:1.75;color:var(--text)}
.defn-side{background:var(--surface-2);padding:30px 28px;display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--line)}
.defn-side .k{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--violet);margin-bottom:10px}
.defn-side p{font-family:'Fraunces',Georgia,serif;font-style:italic;font-size:19px;line-height:1.5;color:var(--text)}
.note{margin-top:18px;padding:16px 20px;border:1px dashed var(--line-bright);border-radius:12px;font-size:15px;color:var(--muted);line-height:1.65;background:rgba(160,107,255,.05)}
.note b{color:var(--text)}.note a,.lead a,.qa a,.fit a{color:var(--cyan);text-decoration:underline;text-underline-offset:3px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.card .rcv{margin-top:14px;padding-top:14px;border-top:1px solid var(--line);font-size:14px;color:var(--muted);line-height:1.65}
.card .rcv b{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--cyan);margin-bottom:5px;font-weight:500}
.card .more{display:inline-block;margin-top:14px;font-family:var(--mono);font-size:12px;color:var(--cyan);text-decoration:none}
.card .more:hover{text-decoration:underline}
a.card{text-decoration:none;color:inherit;display:block}
/* diagram frame */
.dia{margin-top:26px;background:radial-gradient(ellipse at 50% 0%,rgba(45,212,255,.07),transparent 60%),var(--panel);border:1px solid var(--line);border-radius:18px;padding:34px}
.nd{background:var(--surface);border:1px solid var(--line-bright);border-radius:12px;padding:16px 18px;position:relative}
.nd h4{font-family:var(--display);font-size:16px;font-weight:600;margin-bottom:4px}
.nd p{font-size:13.5px;color:var(--muted);line-height:1.55}
.nd .i{font-family:var(--mono);font-size:11px;color:var(--cyan);letter-spacing:.1em;display:block;margin-bottom:6px}
.nd.hot{border-color:var(--violet);box-shadow:0 0 0 1px rgba(160,107,255,.35),0 10px 30px rgba(160,107,255,.12)}
.nd.hot .i{color:var(--violet)}
.arr{display:flex;align-items:center;justify-content:center;color:var(--cyan);font-family:var(--mono);font-size:18px;flex:0 0 auto}
/* flow */
.flow{display:flex;align-items:stretch;gap:8px}
.flow .nd{flex:1 1 0;min-width:0}
/* hub */
.hub{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;position:relative}
.hub .core{grid-column:1/-1;justify-self:center;width:min(440px,100%);text-align:center;background:linear-gradient(180deg,rgba(45,212,255,.10),rgba(160,107,255,.10)),var(--surface);border:1px solid var(--cyan);border-radius:16px;padding:22px 26px;margin:6px 0}
.hub .core h4{font-family:var(--display);font-size:22px;font-weight:700}
.hub .core p{font-size:14px;color:var(--muted);margin-top:4px}
.hub a.nd{text-decoration:none;color:inherit;transition:border-color .2s,transform .2s}
.hub a.nd:hover{border-color:var(--cyan);transform:translateY(-2px)}
/* filter */
.filter{display:grid;grid-template-columns:1fr auto 1.5fr auto 1fr;gap:12px;align-items:center}
.stack{display:flex;flex-direction:column;gap:10px}
.pill{background:var(--surface);border:1px solid var(--line);border-radius:100px;padding:10px 16px;font-size:14px;color:var(--muted);text-align:center}
.gates{display:flex;flex-direction:column;gap:10px;border:1px solid var(--violet);border-radius:14px;padding:14px;background:rgba(160,107,255,.06)}
.verdict{border-radius:10px;padding:11px 16px;font-family:var(--display);font-weight:600;font-size:15px;text-align:center;border:1px solid var(--line-bright)}
.verdict.good{border-color:#3ddc97;color:#7ef0bd;background:rgba(61,220,151,.07)}
.verdict.mid{border-color:var(--cyan);color:var(--cyan);background:rgba(45,212,255,.06)}
.verdict.low{border-color:#ffb454;color:#ffcf8f;background:rgba(255,180,84,.06)}
.verdict.no{border-color:#ff7a7a;color:#ffa3a3;background:rgba(255,122,122,.06)}
/* lanes */
.lanes{display:flex;flex-direction:column;gap:14px}
.lane{display:grid;grid-template-columns:150px 1fr;gap:14px;align-items:center}
.lane-l{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan)}
.lane:nth-child(2) .lane-l{color:var(--violet)}
.lane .flow .nd{text-align:center;padding:14px 10px}
.lane .flow .nd h4{margin:0;font-size:15.5px}
.base{margin-top:6px;border:1px solid var(--line-bright);border-radius:12px;padding:14px;background:var(--surface-2)}
.base .lane-l{color:var(--muted-dim);margin-bottom:10px;display:block;text-align:center}
.base .row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.base .row span{font-size:13.5px;padding:7px 13px;border-radius:100px;border:1px solid var(--line-bright);color:var(--text);background:var(--surface)}
/* anatomy */
.anat{display:grid;grid-template-columns:1fr 1.1fr 1fr;gap:14px;align-items:center}
.anat .col{display:flex;flex-direction:column;gap:12px}
.anat .core{background:linear-gradient(180deg,rgba(45,212,255,.12),rgba(160,107,255,.12)),var(--surface);border:1px solid var(--cyan);border-radius:50%;aspect-ratio:1/1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px;box-shadow:0 0 60px rgba(45,212,255,.12)}
.anat .core h4{font-family:var(--display);font-size:22px;font-weight:700;margin-bottom:8px}
.anat .core p{font-size:13.5px;color:var(--muted);line-height:1.55;max-width:230px}
/* loop */
.loop{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;position:relative}
.loop .nd .ai{font-size:13px;color:var(--muted);margin-top:8px;line-height:1.5}
.loop .nd .you{font-size:13px;color:var(--text);margin-top:6px;line-height:1.5}
.loop .nd .you::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--violet);margin-right:6px;vertical-align:1px}
.loop .nd .ai::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--cyan);margin-right:6px;vertical-align:1px}
.loop-back{margin-top:14px;text-align:center;font-family:var(--mono);font-size:12.5px;color:var(--muted-dim);border-top:1px dashed var(--line-bright);padding-top:12px}
.legend{display:flex;gap:18px;justify-content:center;margin-top:12px;font-size:13px;color:var(--muted)}
.legend i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:1px}
/* table */
.tbl-wrap{margin-top:22px;border:1px solid var(--line);border-radius:14px;overflow-x:auto;background:var(--surface)}
table.cmp{width:100%;border-collapse:collapse;min-width:640px}
table.cmp th,table.cmp td{text-align:left;padding:15px 18px;border-bottom:1px solid var(--line);font-size:14.5px;line-height:1.55;vertical-align:top}
table.cmp thead th{font-family:var(--display);font-size:15px;font-weight:600;background:var(--surface-2);color:var(--text)}
.hl-2 thead th:nth-child(2),.hl-3 thead th:nth-child(3),.hl-4 thead th:nth-child(4),.hl-5 thead th:nth-child(5){color:var(--cyan)}
table.cmp tbody th{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted-dim);font-weight:500;width:150px}
table.cmp td{color:var(--muted)}
.hl-2 td:nth-child(2),.hl-3 td:nth-child(3),.hl-4 td:nth-child(4),.hl-5 td:nth-child(5){color:var(--text);background:rgba(45,212,255,.045)}
table.cmp tr:last-child th,table.cmp tr:last-child td{border-bottom:none}
/* fit */
.fit{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.fit .side{border:1px solid var(--line);border-radius:14px;padding:26px 28px;background:var(--surface)}
.fit .side h3{font-family:var(--display);font-size:18px;font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:10px}
.fit .side.yes h3 span{color:#3ddc97}.fit .side.no h3 span{color:#ff7a7a}
.fit ul{list-style:none;display:flex;flex-direction:column;gap:11px}
.fit li{font-size:15px;color:var(--muted);line-height:1.6;padding-left:22px;position:relative}
.fit .yes li::before{content:'✓';position:absolute;left:0;color:#3ddc97;font-weight:700}
.fit .no li::before{content:'✕';position:absolute;left:0;color:#ff7a7a}
/* proof */
.proof .card .tag{display:inline-block;font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--violet);border:1px solid rgba(160,107,255,.4);border-radius:100px;padding:4px 10px;margin-bottom:14px}
/* extra list */
.xl{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8px}
.xl .x{border:1px solid var(--line);border-left:3px solid var(--violet);border-radius:10px;padding:18px 20px;background:var(--surface)}
.xl .x b{display:block;font-family:var(--display);font-size:16px;margin-bottom:5px}
.xl .x p{font-size:14.5px;color:var(--muted);line-height:1.6}
/* related */
.rel{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
.rel a{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:16px 18px;border:1px solid var(--line);border-radius:11px;background:var(--surface);text-decoration:none;color:var(--text);font-family:var(--display);font-weight:600;font-size:15.5px;transition:border-color .2s}
.rel a span{font-family:var(--body);font-weight:400;font-size:13px;color:var(--muted);display:block;margin-top:2px}
.rel a:hover{border-color:var(--cyan)}
.rel a::after{content:'→';color:var(--cyan);font-family:var(--mono)}
.crumb{font-family:var(--mono);font-size:12px;color:var(--muted-dim);margin-bottom:18px}
.crumb a{color:var(--muted);text-decoration:none}.crumb a:hover{color:var(--cyan)}
@media(max-width:1000px){
  body.v2 .ph-viz.ph-r{max-width:520px;margin:34px 0 0}
  .grid4{grid-template-columns:1fr 1fr}
  .loop{grid-template-columns:1fr 1fr}
  .filter{grid-template-columns:1fr}
  .filter .arr{transform:rotate(90deg)}
  .anat{grid-template-columns:1fr 1fr}
  .anat .core{grid-column:1/-1;grid-row:1;aspect-ratio:auto;border-radius:16px;max-width:none}
}
@media(max-width:860px){
  .defn{grid-template-columns:1fr}
  .defn-side{border-left:none;border-top:1px solid var(--line)}
  .defn-main{padding:26px 22px}.defn-side{padding:22px}
  .dia{padding:20px 16px}
  .flow{flex-direction:column}
  .flow .arr{transform:rotate(90deg);height:18px}
  .lane{grid-template-columns:1fr}
  .hub{grid-template-columns:1fr 1fr}
  .fit,.xl,.rel{grid-template-columns:1fr}
}
@media(max-width:560px){
  .grid4,.loop,.anat,.hub{grid-template-columns:1fr}
  .wrap{padding:0 16px}
  .cta-band{padding:32px 20px}
  .ph-sub{font-size:17px}
  .glance b{font-size:21px}
}
</style>"""

e = html.escape
def a(t):  # attribute-safe
    return html.escape(t, quote=True)

def strip(t):
    return re.sub(r"<[^>]+>", "", t)

def diagram(d):
    t = d["type"]
    if t == "flow":
        parts = []
        for i, (h, p) in enumerate(d["nodes"]):
            if i: parts.append('<div class="arr" aria-hidden="true">→</div>')
            hot = " hot" if d.get("highlight") == i else ""
            parts.append(f'<div class="nd{hot}"><span class="i">{i+1:02d}</span><h4>{e(h)}</h4><p>{e(p)}</p></div>')
        return f'<div class="flow">{"".join(parts)}</div>'
    if t == "hub":
        nodes = d["nodes"]
        def nd(n):
            h, p, href = n
            return f'<a class="nd" href="{a(href)}"><span class="i">{e(h.upper())}</span><p>{e(p)}</p></a>'
        top = "".join(nd(n) for n in nodes[:3]); bot = "".join(nd(n) for n in nodes[3:])
        ch, cp = d["center"]
        return f'<div class="hub">{top}<div class="core"><h4>{e(ch)}</h4><p>{e(cp)}</p></div>{bot}</div>'
    if t == "filter":
        ins = "".join(f'<div class="pill">{e(x)}</div>' for x in d["inputs"])
        gates = "".join(f'<div class="nd"><h4>{e(h)}</h4><p>{e(p)}</p></div>' for h, p in d["gates"])
        outs = "".join(f'<div class="verdict {c}">{e(x)}</div>' for x, c in d["outputs"])
        return (f'<div class="filter"><div class="stack">{ins}</div><div class="arr" aria-hidden="true">→</div>'
                f'<div class="gates">{gates}</div><div class="arr" aria-hidden="true">→</div><div class="stack">{outs}</div></div>')
    if t == "lanes":
        lanes = ""
        for name, steps in d["lanes"]:
            fl = []
            for i, s in enumerate(steps):
                if i: fl.append('<div class="arr" aria-hidden="true">→</div>')
                fl.append(f'<div class="nd"><h4>{e(s)}</h4></div>')
            lanes += f'<div class="lane"><div class="lane-l">{e(name)}</div><div class="flow">{"".join(fl)}</div></div>'
        base = "".join(f"<span>{e(b)}</span>" for b in d["base"])
        return f'<div class="lanes">{lanes}<div class="base"><span class="lane-l">Shared foundation</span><div class="row">{base}</div></div></div>'
    if t == "anatomy":
        col = lambda xs: '<div class="col">' + "".join(f'<div class="nd"><h4>{e(h)}</h4><p>{e(p)}</p></div>' for h, p in xs) + "</div>"
        ch, cp = d["core"]
        return f'<div class="anat">{col(d["left"])}<div class="core"><h4>{e(ch)}</h4><p>{e(cp)}</p></div>{col(d["right"])}</div>'
    if t == "loop":
        ns = "".join(f'<div class="nd"><span class="i">{i+1:02d}</span><h4>{e(h)}</h4><p class="ai">{e(ai.replace("AI does: ",""))}</p><p class="you">{e(you.replace("You decide: ",""))}</p></div>'
                     for i, (h, ai, you) in enumerate(d["nodes"]))
        return (f'<div class="loop">{ns}</div><div class="legend"><span><i style="background:var(--cyan)"></i>AI does</span>'
                f'<span><i style="background:var(--violet)"></i>You decide</span></div>'
                f'<div class="loop-back">↺ Measure feeds the next month\'s research. The loop compounds.</div>')
    raise ValueError(t)

def section(label, h2, inner, lead=None, sid=None):
    idattr = f' id="{sid}"' if sid else ""
    ld = f'<p class="lead">{lead}</p>' if lead else ""
    return f'<section{idattr}><div class="wrap"><div class="sec-label">{e(label)}</div><h2 class="sec-h">{h2}</h2>{ld}{inner}</div></section>\n'

def build(p):
    url = f'{BASE}/{p["slug"]}'
    og_img = f'{BASE}/og/{p["slug"]}.jpg'
    # ---------------- JSON-LD
    faq_ld = {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(ans)}} for q, ans in p["faq"]]}
    svc = {"@type": "Service", "@id": url + "#service", "name": p["eyebrow"].split(" · ")[0],
           "serviceType": p["service_type"], "description": p["desc"], "url": url,
           "provider": {"@id": BASE + "/#business"},
           "areaServed": [{"@type": "City", "name": "Los Angeles"}, {"@type": "Place", "name": "Napa Valley"},
                          {"@type": "Country", "name": "United States"}],
           "hasOfferCatalog": {"@type": "OfferCatalog", "name": p["eyebrow"].split(" · ")[0] + " services",
               "itemListElement": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": c[1],
                   "description": strip(c[3])}} for c in p["help"]["cards"]]}}
    term = {"@type": "DefinedTerm", "@id": url + "#term", "name": p["defn"]["term"], "description": p["defn"]["a"],
            "inDefinedTermSet": BASE + "/the-growth-glossary", "url": url}
    page = {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": p["title"], "description": p["desc"],
            "isPartOf": {"@id": BASE + "/#website"}, "about": [{"@id": url + "#service"}, {"@id": url + "#term"}],
            "mainEntity": {"@id": url + "#service"}, "author": {"@id": BASE + "/#person"},
            "breadcrumb": {"@id": url + "#breadcrumb"}, "dateModified": TODAY, "inLanguage": "en-US",
            "primaryImageOfPage": {"@type": "ImageObject", "url": og_img}}
    crumbs = [("Home", BASE)]
    if p["slug"] != "ai-consulting": crumbs.append(("AI Consulting", BASE + "/ai-consulting"))
    crumbs.append((p["nav"], url))
    bc = {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(crumbs)]}
    graph = [WEBSITE, PERSON, BUSINESS, page, bc, svc, term, faq_ld]
    if p["slug"] == "ai-consulting":
        graph.append({"@type": "ItemList", "@id": url + "#practice-areas", "name": "AI consulting practice areas",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": q["nav"], "url": f'{BASE}/{q["slug"]}'}
                                for i, q in enumerate(x for x in PAGES if x["slug"] != "ai-consulting")]})
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")

    # ---------------- body
    crumb_html = " / ".join(f'<a href="{a(u.replace(BASE, "") or "/")}">{e(n)}</a>' for n, u in crumbs[:-1]) + f" / <span>{e(crumbs[-1][0])}</span>"
    glance = "".join(f"<div><b>{e(b)}</b><span>{e(s)}</span></div>" for b, s in p["glance"])
    hero = (f'<header class="ph"><div class="wrap"><div class="crumb">{crumb_html}</div>'
            f'<div class="eyebrow"><span class="dot"></span>{e(p["eyebrow"])}</div>'
            f'<h1 class="ph-h">{p["h1"]}</h1><p class="ph-sub">{p["sub"]}</p>'
            f'<div class="ph-btns"><a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a>'
            f'<a href="https://scale.siamakconsulting.com/" class="btn btn-ghost">Free S.C.A.L.E. scan</a></div>'
            f'<aside class="ph-viz ph-r" aria-label="At a glance"><div class="ph-r-k">At a glance</div><div class="glance">{glance}</div>'
            f'<div class="ph-r-f">Siamak Kalhor · AI Consultant · Los Angeles</div></aside></div></header>\n')
    d = p["defn"]
    note = f'<div class="note">{p["note"]}</div>' if p.get("note") else ""
    defn = (f'<section><div class="wrap"><div class="defn"><div class="defn-main"><div class="k">Definition</div>'
            f'<h2>{e(d["q"])}</h2><p>{e(d["a"])}</p></div><div class="defn-side"><div class="k">In plain English</div>'
            f'<p>{e(d["plain"])}</p></div></div>{note}</div></section>\n')
    w = p["why"]
    why = section(w["label"], w["h2"], '<div class="grid4">' + "".join(
        f'<div class="card"><div class="ico">{c[0]}</div><h3>{e(c[1])}</h3><p>{e(c[2])}</p></div>' for c in w["cards"]) + "</div>", w["lead"])
    dg = p["diagram"]
    dia = section(dg["label"], e(dg["h2"]), f'<div class="dia">{diagram(dg)}</div>', e(dg["lead"]))
    hp = p["help"]
    cards = ""
    for ico, h, desc, rcv, link in hp["cards"]:
        more = f'<a class="more" href="{a(link)}">Learn more &rarr;</a>' if link else ""
        cards += f'<div class="card"><div class="ico">{ico}</div><h3>{e(h)}</h3><p>{e(desc)}</p><div class="rcv"><b>You receive</b>{e(rcv)}</div>{more}</div>'
    helps = section(hp["label"], e(hp["h2"]), f'<div class="grid3">{cards}</div>', e(hp["lead"]),
                    sid="strategy" if p["slug"] == "ai-consulting" else "how-i-help")
    cm = p["compare"]
    thead = "".join(f"<th scope=\"col\">{e(c)}</th>" for c in cm["cols"])
    rows = "".join("<tr><th scope=\"row\">" + e(r[0]) + "</th>" + "".join(f"<td>{e(x)}</td>" for x in r[1:]) + "</tr>" for r in cm["rows"])
    hl = cm.get("hl", 2 if cm["cols"][1].startswith(("Independent", "AI advisor")) else len(cm["cols"]))
    cmp_html = section(cm["label"], e(cm["h2"]), f'<div class="tbl-wrap"><table class="cmp hl-{hl}"><thead><tr>{thead}</tr></thead><tbody>{rows}</tbody></table></div>', e(cm["lead"]))
    pr = p["process"]
    steps = "".join(f'<div class="step"><div class="l">{i+1:02d}</div><div><h4>{e(h)}</h4><p>{e(t)}</p></div></div>' for i, (h, t) in enumerate(pr["steps"]))
    proc = section(pr["label"], e(pr["h2"]), f'<div class="steps">{steps}</div>')
    extra = ""
    if p.get("extra"):
        x = p["extra"]
        extra = section(x["label"], e(x["h2"]), '<div class="xl">' + "".join(f'<div class="x"><b>{e(h)}</b><p>{e(t)}</p></div>' for h, t in x["items"]) + "</div>", e(x["lead"]))
    f = p["fit"]
    fit = section("Who it's for", "A good fit, and not a fit",
        f'<div class="fit"><div class="side yes"><h3><span>✓</span>Good fit</h3><ul>{"".join(f"<li>{x}</li>" for x in f["good"])}</ul></div>'
        f'<div class="side no"><h3><span>✕</span>Not a fit</h3><ul>{"".join(f"<li>{x}</li>" for x in f["bad"])}</ul></div></div>',
        "I'd rather tell you now than six months into an engagement.")
    pf = p["proof"]
    pcards = "".join(f'<a class="card" href="{a(l)}"><span class="tag">{e(t)}</span><h3>{e(h)}</h3><p>{e(x)}</p><span class="more">View &rarr;</span></a>' for t, h, x, l in pf["cards"])
    proof = section(pf["label"], e(pf["h2"]), f'<div class="grid4 proof">{pcards}</div>')
    faqs = "".join(f'<div class="qa"><h3 style="font-family:var(--display);font-size:17px;font-weight:600;margin-bottom:8px">{e(q)}</h3><p>{ans}</p></div>' for q, ans in p["faq"])
    faq = section("Questions", f'{e(p["nav"])}: frequently asked questions', f'<div class="faq">{faqs}</div>', sid="faq")
    others = [q for q in PAGES if q["slug"] != p["slug"]]
    rel_links = "".join(f'<a href="/{q["slug"]}"><div>{e(q["nav"])}<span>{e(q["defn"]["plain"][:60].rsplit(" ",1)[0])}…</span></div></a>' for q in others)
    rel_links += '<a href="/ai-consultant"><div>About your AI consultant<span>Who I am and how I work…</span></div></a>'
    rel = section("Related services", "Explore the other practice areas", f'<div class="rel">{rel_links}</div>')
    ch, cp = p["cta"]
    cta = (f'<section><div class="wrap"><div class="cta-band"><h3>{e(ch)}</h3><p>{e(cp)}</p><div class="cta-row">'
           f'<a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a>'
           f'<a href="https://buy.stripe.com/cNi14o2yQaMUdbC3zX0kE03" class="btn btn-ghost" rel="noopener">Book a paid hour · $350</a>'
           f'<a href="tel:+13236577752" class="btn btn-ghost">Call 323-657-7752</a></div></div></div></section>\n')

    body = hero + defn + why + dia + helps + cmp_html + proc + extra + fit + proof + faq + cta + rel
    nav = NAV.replace(f'<a href="/{p["slug"]}">', f'<a href="/{p["slug"]}" class="active" aria-current="page">', 1)
    head = (HEAD_TOP + f'<title>{e(p["title"])}</title>\n'
        f'<meta name="description" content="{a(p["desc"])}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>\n'
        f'<meta name="author" content="Siamak Kalhor">\n'
        f'<meta property="og:title" content="{a(p["title"])}">\n<meta property="og:description" content="{a(p["desc"])}">\n'
        f'<meta property="og:type" content="website">\n<meta property="og:url" content="{url}">\n'
        f'<meta name="theme-color" content="#000000">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">\n'
        + BASE_CSS + "\n" + f'<link rel="canonical" href="{url}"/>\n'
        f'<script type="application/ld+json">{ld}</script>\n'
        f'<link rel="alternate" hreflang="en" href="{url}"/><link rel="alternate" hreflang="x-default" href="{url}"/>'
        + NAV_CSS + '\n<link rel="stylesheet" href="/type.css">\n<!--type-scaled-->\n' + EXTRA_CSS + "\n"
        '<meta property="og:site_name" content="Siamak Kalhor Consulting">\n<meta property="og:locale" content="en_US">\n'
        f'<meta property="og:image" content="{og_img}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
        f'<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="{a(p["title"])}">\n'
        f'<meta name="twitter:description" content="{a(p["desc"])}">\n<meta name="twitter:image" content="{og_img}">\n'
        "</head>\n")
    out = head + '<body class="v2">\n<a href="#main" class="skip-link">Skip to content</a>\n<div class="ambient"></div>\n' + nav + '\n<main id="main">\n' + body + "</main>" + TAIL
    os.makedirs(os.path.join(ROOT, p["slug"]), exist_ok=True)
    open(os.path.join(ROOT, p["slug"], "index.html"), "w", encoding="utf-8").write(out)
    return len(p["title"]), len(p["desc"]), len(strip(body).split())

for p in PAGES:
    tl, dl, words = build(p)
    print(f'{p["slug"]:15s} title={tl:3d} desc={dl:3d} words~{words}')
