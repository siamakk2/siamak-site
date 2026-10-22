#!/usr/bin/env python3
"""Builds the buyer-stage hub pages: /industries, /pricing and /case-studies.

These answer the questions people ask once they are close to hiring
("AI consultant for law firms", "AI consultant pricing", "Siamak Kalhor case
studies"). They reuse the chrome, CSS and entity nodes of the service-page
builder, so nothing can drift from the rest of the site.

    python3 scripts/build-hubs.py

Every price is copied from a live page (/services, /agency, /academy); every
proof point is on /portfolio, /bluemoon or /aislebird. Nothing is invented.
"""
import json, os, runpy

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = runpy.run_path(os.path.join(ROOT, "scripts", "build-ai-services.py"))
BASE, e, a, strip, section = B["BASE"], B["e"], B["a"], B["strip"], B["section"]
HOUR = "https://buy.stripe.com/cNi14o2yQaMUdbC3zX0kE03"
TODAY = "2026-10-15"

HUB_CSS = """<style id="hub-css">
.hub-card{display:flex;flex-direction:column}
.hub-card .ph-q{margin-top:12px;font-size:13px;color:var(--muted-dim);font-family:var(--mono);line-height:1.6}
.hub-card .links{margin-top:auto;padding-top:14px;display:flex;flex-wrap:wrap;gap:8px 16px}
.hub-card .links a{font-family:var(--mono);font-size:12.5px;color:var(--cyan);text-decoration:none}
.hub-card .links a:hover{text-decoration:underline}
.price{font-family:var(--display);font-size:28px;font-weight:700;line-height:1.1;margin:6px 0 4px;background:var(--glow);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.price-per{font-size:13px;color:var(--muted-dim);margin-bottom:10px}
.cs-stat{font-family:var(--display);font-size:34px;font-weight:700;line-height:1;background:var(--glow);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}
</style>"""


def card(title, body, links=(), tag=None, price=None, per=None, stat=None, phrases=None, ico=None):
    t = f'<span class="tag" style="display:inline-block;font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--violet);border:1px solid rgba(160,107,255,.4);border-radius:100px;padding:4px 10px;margin-bottom:12px;align-self:flex-start">{e(tag)}</span>' if tag else ""
    i = f'<div class="ico">{ico}</div>' if ico else ""
    s = f'<div class="cs-stat">{e(stat)}</div>' if stat else ""
    pr = f'<div class="price">{e(price)}</div><div class="price-per">{e(per or "")}</div>' if price else ""
    ph = f'<div class="ph-q">{e(phrases)}</div>' if phrases else ""
    ls = "".join(f'<a href="{a(h)}">{e(n)} &rarr;</a>' for n, h in links)
    return f'<div class="card hub-card">{i}{t}{s}<h3>{e(title)}</h3>{pr}<p>{body}</p>{ph}<div class="links">{ls}</div></div>'


def page(slug, title, desc, eyebrow, h1, sub, glance, sections, faq, cta, extra_graph=()):
    url = f"{BASE}/{slug}"
    og = f"{BASE}/og/{slug}.jpg"
    nav_name = eyebrow.split(" · ")[0]
    faq_ld = {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(x)}} for q, x in faq]}
    web = {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": title, "description": desc,
           "isPartOf": {"@id": BASE + "/#website"}, "author": {"@id": BASE + "/#person"},
           "breadcrumb": {"@id": url + "#breadcrumb"}, "dateModified": TODAY, "inLanguage": "en-US",
           "primaryImageOfPage": {"@type": "ImageObject", "url": og}}
    bc = {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
        {"@type": "ListItem", "position": 2, "name": nav_name, "item": url}]}
    graph = [B["WEBSITE"], B["PERSON"], B["BUSINESS"], web, bc, faq_ld, *extra_graph]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")
    gl = "".join(f"<div><b>{e(x)}</b><span>{e(y)}</span></div>" for x, y in glance)
    hero = (f'<header class="ph"><div class="wrap"><div class="crumb"><a href="/">Home</a> / <span>{e(nav_name)}</span></div>'
            f'<div class="eyebrow"><span class="dot"></span>{e(eyebrow)}</div><h1 class="ph-h">{h1}</h1><p class="ph-sub">{sub}</p>'
            f'<div class="ph-btns"><a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a>'
            f'<a href="https://scale.siamakconsulting.com/" class="btn btn-ghost">Free S.C.A.L.E. scan</a></div>'
            f'<aside class="ph-viz ph-r" aria-label="At a glance"><div class="ph-r-k">At a glance</div><div class="glance">{gl}</div>'
            f'<div class="ph-r-f">Siamak Kalhor · AI Consultant · Los Angeles</div></aside></div></header>\n')
    body = hero
    for label, h2, lead, cards, sid in sections:
        body += section(label, h2, f'<div class="grid3">{"".join(cards)}</div>', lead, sid=sid)
    faqs = "".join(f'<div class="qa"><h3 style="font-family:var(--display);font-size:17px;font-weight:600;margin-bottom:8px">{e(q)}</h3><p>{x}</p></div>' for q, x in faq)
    body += section("Questions", "Frequently asked questions", f'<div class="faq">{faqs}</div>', sid="faq")
    ch, cp = cta
    body += (f'<section><div class="wrap"><div class="cta-band"><h3>{e(ch)}</h3><p>{e(cp)}</p><div class="cta-row">'
             f'<a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a>'
             f'<a href="{HOUR}" class="btn btn-ghost" rel="noopener">Book a paid hour · $350</a>'
             f'<a href="tel:+13236577752" class="btn btn-ghost">Call 323-657-7752</a></div></div></div></section>\n')
    head = B["head_html"](title, desc, url, og, ld).replace("</head>", HUB_CSS + "\n</head>", 1)
    nav = B["NAV"].replace(f'<a href="/{slug}">', f'<a href="/{slug}" class="active" aria-current="page">', 1)
    out = head + '<body class="v2">\n<a href="#main" class="skip-link">Skip to content</a>\n<div class="ambient"></div>\n' + nav + '\n<main id="main">\n' + body + "</main>" + B["TAIL"]
    os.makedirs(os.path.join(ROOT, slug), exist_ok=True)
    open(os.path.join(ROOT, slug, "index.html"), "w", encoding="utf-8").write(out)
    print(f"{slug:14s} title={len(title)} desc={len(desc)} words~{len(strip(body).split())}")


# ------------------------------------------------------------------ industries
IND = [
 ("⚖", "Law firms", "AI client intake that answers 24/7, marketing that wins cases, and visibility when people ask AI for a lawyer.",
  "AI consultant for law firms · law firm marketing consultant · AI client intake automation",
  [("Law firm marketing", "/law-firm-marketing-consultant"), ("AI client intake", "/ai-for-law-firms"), ("Marketing budget", "/law-firm-marketing-budget")]),
 ("◇", "Dental practices", "AI marketing for dentists: more new patients found in search and AI answers, and fewer lost between search and the phone call.",
  "dental marketing consultant · AI marketing for dentists",
  [("Dental marketing", "/dental-marketing-consultant"), ("Where patients are lost", "/the-long-view/why-dental-practices-lose-patients-between-search-and-phone-call"), ("Dental budget", "/dental-marketing-budget")]),
 ("✚", "Medical practices", "AI marketing for medical practices: local authority, trust and the answers patients look for before they book.",
  "AI marketing for medical practices · medical practice marketing consultant",
  [("Medical marketing", "/medical-practice-marketing-consultant"), ("Local authority for doctors", "/the-long-view/how-doctors-can-build-local-authority")]),
 ("✦", "Cosmetic & aesthetic practices", "Growth for cosmetic and aesthetic practices, where patient trust is engineered long before the consultation.",
  "cosmetic practice growth consultant · cosmetic surgery marketing",
  [("Cosmetic surgery marketing", "/cosmetic-surgery-marketing-consultant"), ("Patient trust", "/the-long-view/patient-trust-is-engineered-cosmetic-surgery-marketing")]),
 ("▦", "E-commerce & Shopify", "Shopify and e-commerce growth: AI product answers, listings, conversion fixes and visibility in AI shopping answers.",
  "AI ecommerce consultant · Shopify sales growth consultant · ecommerce marketing advisor",
  [("E-commerce & Shopify growth", "/ecommerce-marketing-consultant"), ("AI for e-commerce", "/ai-for-ecommerce"), ("Grow a Shopify store profitably", "/the-long-view/how-to-grow-a-shopify-store-profitably")]),
 ("⌂", "Contractors", "AI automation for contractors: every lead answered and followed up, estimates drafted, jobs costed.",
  "AI automation for contractors · contractor lead follow-up automation",
  [("AI for contractors", "/ai-for-contractors"), ("Can AI follow up leads?", "/the-long-view/can-ai-follow-up-with-leads-automatically")]),
 ("◎", "Restaurants", "AI for restaurants: discovered in AI recommendations, and scheduling, inventory and P&amp;L run by voice.",
  "AI consultant for restaurants · restaurant management automation",
  [("AI for restaurants", "/ai-for-restaurants"), ("Why AI skips your restaurant", "/the-long-view/why-your-restaurant-doesnt-show-up-in-ai-recommendations")]),
 ("⟁", "Fabric, textile & wholesale", "Wholesale e-commerce and textile software from the team behind the Blue Moon Fabrics 100× build.",
  "textile business software · wholesale ecommerce consultant",
  [("Blue Moon case study", "/bluemoon"), ("Textile Wizard", "/textile-wizard"), ("Weftwise", "https://weftwise.vercel.app/")]),
 ("❖", "Hospitality & wineries", "Hotels, inns, wineries and tasting rooms named in AI travel recommendations, from my base in Napa Valley.",
  "AI marketing for wineries · hotel AI visibility · Napa Valley AI advisor",
  [("Napa wineries", "/the-long-view/how-napa-wineries-get-recommended-by-ai"), ("Hotels & inns", "/the-long-view/how-hotels-and-inns-get-named-in-ai-travel-recommendations"), ("Napa Valley", "/ai-marketing-consultant-napa-valley")]),
]
page("industries",
     "AI Consultant by Industry | Law, Dental, Medical, E-commerce",
     "AI and marketing consulting by industry: law firms, dental, medical and cosmetic practices, e-commerce, contractors, restaurants, textiles and hospitality.",
     "Industries · AI Consultant by Industry",
     'An AI consultant who <span class="grad">knows your industry.</span>',
     "People rarely search for “an AI consultant”. They search for someone who understands <em>their</em> business. Forty years across <strong>legal, medical, e-commerce, hospitality, textiles and construction</strong> means the playbook for your industry is one I've run, not one I've read about.",
     [("9", "industries served"), ("40 yrs", "across sectors"), ("100×", "Blue Moon Fabrics"), ("LA · Napa", "and online")],
     [("Industries", "Choose your industry", "Each page explains what AI and better marketing change in that business, with the questions owners there actually ask.",
       [card(t, b, l, ico=i, phrases="People search: " + p) for i, t, b, p, l in IND], "list")],
     [("Do you only work with these industries?", "No. These are the industries I know most deeply, but the S.C.A.L.E. Framework™ works for any business where customers research before they buy. <a href=\"/online-consulting\">Book a call</a> and I'll tell you honestly whether I'm the right fit."),
      ("What does an AI consultant for law firms do?", "Sets up AI client intake that answers and qualifies enquiries 24/7, makes the firm visible when people ask AI for a lawyer, and builds marketing that produces signed cases rather than clicks. See <a href=\"/ai-for-law-firms\">AI client intake</a>."),
      ("Can AI help a dental or medical practice get more patients?", "Yes: by making the practice the one AI and Google recommend locally, answering patient questions before they call, and making sure no enquiry waits. See <a href=\"/dental-marketing-consultant\">dental</a> and <a href=\"/medical-practice-marketing-consultant\">medical</a>."),
      ("Do you work with Shopify stores?", "Yes. I've built and grown Shopify stores across fabric, fashion and apparel, and I build AI tools for them, such as Weftwise. See <a href=\"/ecommerce-marketing-consultant\">e-commerce and Shopify growth</a>.")],
     ("Talk to someone who knows your industry", "Book a free 30-minute call. Bring the question your industry keeps asking."),
     extra_graph=[{"@type": "ItemList", "@id": BASE + "/industries#list", "name": "Industries served",
                   "itemListElement": [{"@type": "ListItem", "position": k + 1, "name": t, "url": (l[0][1] if l[0][1].startswith("http") else BASE + l[0][1])}
                                       for k, (i, t, b, p, l) in enumerate(IND)]}])

# ------------------------------------------------------------------ pricing
CONSULT = [
 ("Free strategy call", "Free", "30 minutes", "Your goals, numbers and the one move that matters most. No obligation.", [("Book the call", "/online-consulting")]),
 ("Paid strategy hour", "$350", "one hour, pay online", "A full hour on any question: a second opinion, an agency proposal, an AI decision.", [("Book and pay", HOUR)]),
 ("Hourly consulting", "$350–$450", "per hour, no minimum", "For specific questions, reviews and decisions you want pressure-tested.", [("Engagement models", "/services")]),
 ("AI Authority Audit", "$1,500", "fixed, about two weeks", "What ChatGPT, Gemini, Claude, Perplexity and AI Overviews say about you, with twelve deliverables and a ranked fix list.", [("See the deliverables", "/analyze-your-brand")]),
 ("Monthly retainer", "Quoted", "after a diagnostic", "Continuous strategy, content and AI visibility work with a defined monthly deliverable list.", [("How retainers work", "/services")]),
 ("Fractional CMO", "Quoted", "monthly, after a diagnostic", "Senior marketing leadership: strategy, budget, vendors and revenue reporting.", [("Fractional CMO", "/fractional-cmo")]),
]
AGENCY = [
 ("AI Visibility Launch", "$2,500", "one-time", "launch"), ("AI Visibility Growth", "$1,500", "per month", "growth"),
 ("AI-Ready Website", "From $4,500", "50% deposit to start", "website"), ("Done-For-You AI Agent", "$3,500", "setup + $1,000/month", "agent"),
 ("Content Engine", "$1,200", "per month", "content"),
]
LEARN = [
 ("Free website audit", "Free", "instant", "See how search engines and AI systems read your site.", [("Run it", "/audit")]),
 ("S.C.A.L.E. scan", "Free", "online", "My method as software: five dimensions scored, fixes ranked.", [("Start the scan", "https://scale.siamakconsulting.com/")]),
 ("S.C.A.L.E. Academy", "$197", "lifetime access", "The full six-week AI visibility course, to do the work in-house.", [("See the course", "/academy")]),
]
offers = ([{"@type": "Offer", "name": n, "price": p.replace("$", "").replace(",", "").split("–")[0], "priceCurrency": "USD"} for n, p, *_ in CONSULT if p.startswith("$")]
          + [{"@type": "Offer", "name": n, "price": p.replace("From ", "").replace("$", "").replace(",", ""), "priceCurrency": "USD", "url": BASE + "/agency#" + k} for n, p, per, k in AGENCY]
          + [{"@type": "Offer", "name": "S.C.A.L.E. Academy", "price": "197", "priceCurrency": "USD", "url": BASE + "/academy"}])
page("pricing",
     "AI Consultant Pricing | Published Prices | Siamak Kalhor",
     "What an AI consultant costs, published: $350 strategy hour, $350–$450 hourly, $1,500 AI Authority Audit, fixed-price agency packages and a $197 course.",
     "Pricing · AI Consultant Pricing",
     'Every price, <span class="grad">published.</span>',
     "Most consultants make you book a call to learn the price. Here is everything I charge, in one place. Where a price says <em>quoted</em>, it's because pricing a plan before knowing your constraint would be guesswork.",
     [("Free", "30-min first call"), ("$350", "strategy hour"), ("$1,500", "AI Authority Audit"), ("$197", "online course")],
     [("Consulting", "Work with me directly", "Advice, diagnosis and leadership, from a single hour to an ongoing role.",
       [card(n, b, l, price=p, per=per) for n, p, per, b, l in CONSULT], "consulting"),
      ("Done-for-you", "Fixed-price agency packages", "Pay online and the work starts. I direct every project and review the work.",
       [card(n, "Fixed price, pay by card through Stripe, kickoff plan within one business day.", [("Details & checkout", "/agency#" + k)], price=p, per=per) for n, p, per, k in AGENCY], "agency"),
      ("Do it yourself", "Free tools and the course", "For teams who want to do the work in-house.",
       [card(n, b, l, price=p, per=per) for n, p, per, b, l in LEARN], "learn")],
     [("How much does an AI consultant cost?", "With me: a free 30-minute call, a $350 paid strategy hour you can book online, and hourly consulting at $350–$450 with no minimum. The AI Authority Audit is a fixed $1,500, and done-for-you packages run from $1,200 a month to $4,500 and up for a website."),
      ("How much does a fractional CMO cost?", "Fractional CMO engagements are quoted as a monthly fee after a diagnostic, because the right scope depends on your size, goals and team. The diagnostic itself can be a single paid hour."),
      ("How much does LLMO or AI search optimization cost?", "The audit is $1,500 fixed; an AI Visibility Launch is $2,500 one-time; ongoing AI Visibility Growth is $1,500 a month. My guide <a href=\"/how-much-does-llmo-cost\">How Much Does LLMO Cost?</a> explains what drives the price and when to hire nobody."),
      ("Do you offer refunds or guarantees?", "I don't guarantee rankings or AI mentions, because nobody honestly can. Each package lists exactly what you receive, so you can hold me to the deliverables. See the <a href=\"/terms\">terms</a>."),
      ("Can I pay online?", "Yes. The paid strategy hour, the AI Authority Audit, the agency packages and the Academy can all be paid by card online.")],
     ("Not sure which one fits?", "Book the free 30-minute call. I'll tell you the cheapest option that solves the problem, including doing nothing."),
     extra_graph=[{"@type": "OfferCatalog", "@id": BASE + "/pricing#catalog", "name": "Siamak Kalhor Consulting price list",
                   "provider": {"@id": BASE + "/#business"}, "itemListElement": offers}])

# ------------------------------------------------------------------ case studies
CASES = [
 ("8-year engagement", "100×", "Blue Moon Fabrics", "A single LA Fashion District store engineered into a national textile leader: positioning, e-commerce, software and authority built as one system.", [("Read the case study", "/bluemoon")]),
 ("Consumer app", "300+", "AisleBird", "A voice-first shopping app scaled to 300+ stores across 11 retail chains, with AI categorization that sorts a list by aisle.", [("See AisleBird", "/aislebird")]),
 ("Industry software", None, "Textile Wizard", "Inventory, invoicing and accounts receivable software built for textile businesses, from the inside of one.", [("See Textile Wizard", "/textile-wizard")]),
 ("E-commerce AI", "3 tools", "Weftwise", "Catalog intelligence for fabric stores: an AI fabric expert on every product page, a yardage calculator and a listing studio.", [("Open Weftwise", "https://weftwise.vercel.app/")]),
 ("SaaS", "5 scores", "S.C.A.L.E.", "My consulting method turned into software: it reads a website the way AI systems do, scores five dimensions and ranks the fixes.", [("Try the scan", "https://scale.siamakconsulting.com/")]),
 ("Self-audit", "68/100", "My own site, scored", "I ran my own AI visibility audit on myself, published the score and the fixes, and rebuilt the site from it.", [("Read it", "/the-long-view/anatomy-of-an-invisible-brand")]),
 ("Dental", "Local", "Sunland Dental Care", "Local authority and patient acquisition for a Southern California dental practice: search visibility, entity consistency and patient-question content.", [("Portfolio", "/portfolio#clients")]),
 ("Industrial", "B2B", "Golden West Chemical", "Marketing management for an industrial chemical supplier, in a category where buyers research technically and generic marketing fails.", [("Portfolio", "/portfolio#clients")]),
 ("Legal AI", "24/7", "Your Legal Brain", "Law-firm intake and operations: calls answered around the clock in four languages and filed into the firm's case software.", [("AI client intake", "/ai-for-law-firms")]),
]
page("case-studies",
     "Case Studies | Siamak Kalhor Consulting Results",
     "Siamak Kalhor case studies: the Blue Moon Fabrics 100× build, AisleBird at 300+ stores, AI software, and client work in dental, legal and industrial sectors.",
     "Case Studies · Results",
     'Builds that <span class="grad">compounded.</span>',
     "Real growth comes from systems that get stronger every month, not viral spikes. These are the businesses and products I've built that way, from <strong>a single Fashion District store grown 100×</strong> to AI software in daily use.",
     [("100×", "Blue Moon Fabrics"), ("300+", "AisleBird stores"), ("8+", "AI products shipped"), ("40 yrs", "market experience")],
     [("Case studies", "What the work has produced", "Each one links to the full story or the live product.",
       [card(h, b, l, tag=t, stat=s) for t, s, h, b, l in CASES], "cases")],
     [("What results has Siamak Kalhor Consulting achieved?", "The best-known is Blue Moon Fabrics, a single LA Fashion District store engineered over an eight-year engagement into a national textile leader, roughly 100× its starting point. AisleBird, a voice-first shopping app, scaled to 300+ stores across 11 retail chains."),
      ("Do you have case studies in my industry?", "There's client work in dental, legal, industrial supply, construction, e-commerce and textiles. See <a href=\"/industries\">industries</a> or <a href=\"/portfolio\">the full portfolio</a>, and ask on a call about anything closer to your business."),
      ("Can you guarantee similar results?", "No. Every business starts from a different place, and anyone who guarantees results in marketing or AI search is guessing. What I can promise is the method, the deliverables and honest measurement."),
      ("Where can I see reviews?", "Search for Siamak Kalhor Consulting on Google. If you'd like to speak with someone I've worked with, ask on your first call.")],
     ("Want to be the next one?", "Book a free 30-minute call and we'll find the one constraint holding your growth back."))
