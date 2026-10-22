#!/usr/bin/env python3
"""Works the phrases buyers actually search into the existing service pages.

Source: Siamak's list of how people describe the help they want (October 2026).
A check against the site found 30 of 39 phrases on no page at all. Each page
below gets (optionally) a sharper title and description and a few extra
questions written in those words, added to both the visible FAQ and the page's
FAQPage JSON-LD. The pages are patched in place because several were
hand-edited after their builders ran (videos, retitles, answer panels), so a
rebuild would lose that work.

Idempotent: a question already on the page is skipped.

    python3 scripts/add-search-phrases.py
"""
import html, json, os, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
HOUR = "https://buy.stripe.com/cNi14o2yQaMUdbC3zX0kE03"
strip = lambda t: html.unescape(re.sub(r"<[^>]+>", "", t))

PAGES = {
"agency": dict(
  title="Done-for-You Marketing & AI Agency | Siamak Kalhor",
  desc="A consultant-led, full-service digital marketing and AI agency for small business: fixed-price packages you buy online, directed by Siamak Kalhor.",
  style="details",
  faq=[("Are you a full-service digital marketing agency?",
        "In practice, yes, but consultant-led rather than a large firm. One accountable strategist, Siamak Kalhor, sets the direction and reviews every deliverable, and the packages cover AI visibility, AI-ready websites, AI agents and content. You buy at a fixed price online instead of signing a long retainer."),
       ("What outsourced marketing services can a small business buy here?",
        "AI Visibility Launch ($2,500 one-time), AI Visibility Growth ($1,500 a month), AI-Ready Website (from $4,500), a Done-For-You AI Agent ($3,500 setup plus $1,000 a month) and the Content Engine ($1,200 a month). For strategy on its own, a paid strategy hour is $350."),
       ("Is this an integrated marketing agency?",
        "Yes, in the sense that matters: your website, search and AI visibility, content and follow-up are planned as one system against one set of numbers, not bought as separate channels that never talk to each other.")]),
"ai-marketing": dict(
  style="qa",
  faq=[("Are you an AI marketing agency or an AI marketing consultant?",
        "Both, in that order. I start as a consultant, deciding where AI should and shouldn't touch your marketing, and my <a href=\"/agency\">done-for-you agency</a> can then do the work at fixed prices. If you'd rather keep your current agency, I can direct it instead."),
       ("What does an AI strategy advisor do for a small business?",
        "An AI strategy advisor helps an owner decide where AI is worth using, in what order, at what cost and with which safeguards for customer data. For most small businesses that means a short list: being found in AI answers, faster content, and automated follow-up. See <a href=\"/ai-advisory\">AI Advisory</a>.")]),
"ai-consultant": dict(
  title="AI Consultant & AI Business Consultant | Siamak Kalhor",
  desc="An AI business consultant and AI strategy advisor who helps owners implement AI: 40 years of market judgment, plus AI adoption, automation, visibility and advisory.",
  style="new-qa",
  faq=[("What does an AI business consultant do?",
        "An AI business consultant looks across your whole business, not just marketing, and finds the few places where AI saves real time or money: answering calls, intake, follow-up, quoting, reporting and content. Then they set the order, the budget and the rules for using AI safely."),
       ("What is an AI strategy advisor?",
        "An AI strategy advisor is a senior adviser an owner can call on for AI decisions without hiring a full-time technology executive: which tools to adopt, what to automate, what to avoid and how to measure it. I work this way by the hour or monthly through <a href=\"/ai-advisory\">AI Advisory</a>."),
       ("What does an AI implementation consultant do?",
        "An AI implementation consultant turns the plan into working systems: choosing the tools, connecting them to the software you already use, testing them with real cases, training the team and monitoring the results. I implement through <a href=\"/ai-automation\">AI Automation</a> and <a href=\"/ai-agents\">AI Agents</a>."),
       ("Should I hire an AI consultant or an AI agency?",
        "Hire a consultant when you're not yet sure what AI should do for you, and an agency when you know and need it built. I compare the two honestly in <a href=\"/ai-consultant-vs-ai-agency\">AI consultant vs AI agency</a>."),
       ("How much does an AI consultant cost?",
        "The first 30-minute call is free, a paid strategy hour is $350 and hourly consulting is $350 to $450 with no minimum. Larger engagements are quoted after a diagnostic. See <a href=\"/pricing\">pricing</a>.")]),
"business-growth-consultant": dict(
  title="Small Business Growth & Marketing Strategy Consultant",
  desc="A small business marketing consultant with 40 years' experience: a marketing audit, clear positioning, the right channels and systems that compound.",
  style="qa",
  faq=[("What does a small business marketing consultant do?",
        "A small business marketing consultant works out which marketing will actually pay for an owner-led business and puts it in order: who to target, what to say, which channels to use, how enquiries become sales and how to measure it. The difference from an agency is that the advice starts from your numbers and constraint, not from a list of services to sell."),
       ("Do you offer marketing audit services?",
        "Yes. The marketing audit is the first step of every engagement: your numbers and spend, positioning, channels, website and sales funnel, reviews and how AI assistants describe you, ending with the one constraint holding growth back and a ranked fix list. It is billed at the hourly rate ($350–$450) or scoped at a fixed price. If you only want to know how ChatGPT, Gemini, Claude and Perplexity see you, the <a href=\"/analyze-your-brand\">AI Authority Audit</a> is a fixed $1,500."),
       ("Are you a small business consultant?",
        "Yes. Most of my clients are owner-led and small to mid-size businesses. As a small business consultant I focus on what limits revenue: positioning, marketing, the path from enquiry to sale, and the systems that keep it working without the owner doing everything."),
       ("What does a business development consultant do, and do I need one?",
        "A business development consultant focuses on new sales opportunities: partnerships, new markets and the sales pipeline. If your existing enquiries aren't turning into customers, fix that first, because new opportunities leak through the same gaps. I cover both, in that order."),
       ("What is a business strategy advisor?",
        "A business strategy advisor is an experienced outsider an owner can call on for big decisions, such as a new market, a price change, a new service or a stalled year. You get an honest second view before you commit, not after.")]),
"fractional-cmo": dict(
  title="Fractional CMO & Outsourced Marketing Director | Siamak Kalhor",
  style="qa",
  faq=[("What is a fractional chief marketing officer?",
        "A fractional chief marketing officer is the same as a fractional CMO: a senior marketing executive who leads your marketing part-time for a monthly fee. You get the strategy, budget decisions and accountability of a CMO without a full-time executive salary."),
       ("What's the difference between a fractional CMO and an outsourced marketing director?",
        "A fractional CMO usually owns the strategy and the budget; an outsourced marketing director usually runs the day-to-day plan and the people doing the work. Small businesses typically need one person doing both, which is how I work."),
       ("Can you manage my marketing agency for me?",
        "Yes. Many clients keep their agency and add me above it: I brief the agency properly, review its work against enquiries and sales rather than activity, and recommend a replacement if it doesn't deliver. See <a href=\"/is-my-marketing-agency-working\">How do I know if my marketing agency is working?</a>")]),
"website-conversion-consultant": dict(
  title="Conversion Rate Optimization & Sales Funnel Consultant",
  desc="Website traffic but no sales, or not generating leads? A conversion rate optimization and sales funnel consultant audits where buyers drop off and fixes it.",
  style="qa",
  faq=[("What is a website conversion audit?",
        "A website conversion audit measures where visitors drop off on the way to becoming customers, step by step: whether the page answers what you do and why you in the first few seconds, the proof near the decision, speed and mobile use, forms and calls to action, and how fast enquiries are answered. You get the leaks ranked by what they cost and the order to fix them. Start with the free <a href=\"/audit\">website audit</a>; the full conversion audit is billed hourly ($350–$450) or at a fixed price after a free call."),
       ("Why is my website not generating leads?",
        "Usually one of four reasons: the right people aren't arriving, the page doesn't make the offer clear, there's no reason to trust you at the moment of decision, or the enquiry step is hard on a phone. If you get traffic but no enquiries, the problem is on the page, not in the ads. A conversion audit shows which one it is."),
       ("Are you a conversion rate optimization consultant or a sales funnel consultant?",
        "Both, because they are the same chain. Conversion rate optimization (CRO) improves the share of visitors who enquire or buy; a sales funnel consultant follows the buyer further, from first click through enquiry and follow-up to the signed sale. Many leads are lost after the website, when nobody replies in time, so I fix the whole funnel, not just the pages."),
       ("What does a website strategy consultant do?",
        "A website strategy consultant decides what your website has to do for the business (calls, bookings, quotes or online sales) and shapes the pages, message, proof and calls to action to do it. The site is built around how your customers decide, not just how it looks."),
       ("What does a conversion optimization consultant do?",
        "A conversion optimization consultant turns more of your existing visitors into customers. The work finds where people drop off and fixes it: slow pages, unclear offers, missing proof, awkward forms and enquiries that aren't answered fast enough."),
       ("Do you offer website and marketing services together?",
        "Yes. I set the strategy for both, and my <a href=\"/agency\">done-for-you agency</a> builds AI-Ready Websites from $4,500 and runs the marketing at fixed prices, so the site and the marketing work from the same plan."),
       ("Are you a website optimization agency?",
        "I work as a consultant first: the diagnosis and the ranked fix list. Your web developer can then make the changes, or my done-for-you team can do them at a fixed price. Start with the free <a href=\"/audit\">website audit</a>.")]),
"ai-automation": dict(
  title="AI Automation Consultant & Agency | Automate Intake & Operations",
  style="qa",
  faq=[("Are you an AI automation agency or a consultant?",
        "Both. As a consultant I find the work worth automating and design it safely; as an agency I build it, connect it to your software and monitor it. You can stop after the plan or have me build it."),
       ("What does a business automation consultant do?",
        "A business automation consultant maps how work actually moves through your business, such as enquiries, bookings, quotes, documents and reports, finds the repetitive steps and sets up software and AI to do them, with a person stepping in where judgment is needed."),
       ("What does an AI implementation consultant do?",
        "They take AI from idea to daily use: choosing the tools, connecting them to your existing systems, testing with real cases, training the team and checking the results every month. Implementation is where most AI projects fail, so it gets the most care.")]),
"ai-agents": dict(
  style="qa",
  faq=[("What do AI agent development services include?",
        "Mine include the agent's job description (what it may see, do and never touch), the connections to your tools, the guardrails and hand-off rules, testing with real conversations, launch and monthly monitoring. You can also <a href=\"https://agents.siamakconsulting.com\">build a free agent preview</a> yourself in Agent Studio."),
       ("Do you build AI agents for businesses outside Los Angeles?",
        "Yes. Agents run in the cloud and the work is done online, so I build them for businesses across the United States and in several languages.")]),
"ecommerce-marketing-consultant": dict(
  title="Shopify Conversion Optimization & Ecommerce Consultant",
  desc="Shopify conversion optimization expert with 40 years in retail: turn store traffic into sales, cut wasted ad spend and get products recommended by AI.",
  style="check",
  faq=[("What does a Shopify conversion optimization expert look at?",
        "The places a Shopify store loses buyers between the click and the order: product pages that don't answer the shopper's question, slow themes and too many apps, a clumsy mobile checkout, shipping costs that appear too late, missing reviews and proof, and abandoned carts nobody follows up. Each fix is measured against orders and profit, not sessions. See <a href=\"/the-long-view/why-your-online-store-gets-traffic-but-no-sales\">why stores get traffic but no sales</a>."),
       ("Are you a Shopify consultant or a Shopify marketing agency?",
        "A Shopify consultant first: I fix the store itself, meaning product pages, speed, apps, checkout and conversion, because more traffic to a store that doesn't convert only costs more. Then the marketing: search, AI visibility, email and ads, done by your team, your agency or my <a href=\"/agency\">done-for-you packages</a>."),
       ("What does an ecommerce consultant do?",
        "An ecommerce consultant finds why an online store isn't selling more and fixes it in order: conversion, ad spend that doesn't return, abandoned carts, repeat purchases and whether AI shopping assistants recommend the products. The measure is profit, not traffic.")]),
"brand-creation": dict(
  title="Brand Strategy & Brand Creation Consultant | Siamak Kalhor",
  style="faq-item",
  faq=[("What does a brand strategy consultant do?",
        "A brand strategy consultant defines what your business stands for, who it's for and why customers should choose it, then turns that into a name, a message and rules everyone can follow. The visual identity comes after the strategy, not before it."),
       ("What is a brand positioning consultant?",
        "A brand positioning consultant focuses on one part of brand strategy: the specific place you want to hold in the customer's mind compared with the alternatives. Clear positioning is what stops customers choosing on price alone."),
       ("Do I need a branding and marketing agency or a brand consultant?",
        "If your strategy is clear and you need a logo, website and materials, a branding and marketing agency fits. If customers can't say why you're different, start with a consultant, because a beautiful identity on an unclear position still loses on price.")]),
}

QA_H3 = '<div class="qa"><h3 style="font-family:var(--display);font-size:17px;font-weight:600;margin-bottom:8px">{q}</h3><p>{a}</p></div>'


def visible(style, q, a):
    eq = html.escape(q, quote=False)
    if style in ("qa", "new-qa"):
        return QA_H3.format(q=eq, a=a)
    if style == "details":
        return ('<details class="ag-card" style="padding:18px 22px;gap:0"><summary style="cursor:pointer;font-weight:600">%s</summary>'
                '<p style="color:var(--muted);margin-top:10px">%s</p></details>') % (eq, a)
    if style == "check":
        return '<div class="check"><span class="c">?</span><p><strong>%s</strong> %s</p></div>\n' % (eq, a)
    raise ValueError(style)


def add_visible(s, style, block, page):
    if style == "qa":
        i = s.index('<section id="faq">'); j = s.index('<div class="faq">', i) + len('<div class="faq">')
        end = s.index('</div></div></section>', j)   # closes .faq, .wrap, section
        return s[:end] + block + s[end:]
    if style == "details":
        i = s.index('Before you start</h2>'); end = s.rindex('</details>', i, s.index('</section>', i)) + len('</details>')
        return s[:end] + block + s[end:]
    if style == "check":
        i = s.index('Common questions</h2>'); j = s.index('<div class="checks">', i)
        end = s.index('\n</div></div></section>', j)
        return s[:end] + "\n" + block.rstrip("\n") + s[end:]
    raise ValueError(style)


def faq_item_block(s, q, a):
    """Clone an existing brand-creation faq-item and swap the text."""
    i = s.index('<div class="faq-item">', s.index('<div class="faq-sec">'))
    j = s.index('<div class="faq-item">', i + 10)
    item = s[i:j]
    qm = re.search(r'(<button class="faq-q"[^>]*>)(.*?)(<span)', item, re.S)
    am = re.search(r'(<div class="faq-a"[^>]*>)(.*?)(</div>)', item, re.S)
    out = item[:qm.start(2)] + html.escape(q, quote=False) + item[qm.end(2):]
    am = re.search(r'(<div class="faq-a"[^>]*>)(.*?)(</div>)', out, re.S)
    inner = am.group(2)
    pm = re.match(r'(\s*<p[^>]*>)(.*?)(</p>\s*)$', inner, re.S)
    inner = (pm.group(1) + a + pm.group(3)) if pm else "<p>" + a + "</p>"
    return out[:am.start(2)] + inner + out[am.end(2):]


def add_ld(s, faqs):
    """Append questions to the page's FAQPage node (graph or standalone)."""
    for m in re.finditer(r'(<script type="application/ld\+json"[^>]*>)(.*?)(</script>)', s, re.S):
        try:
            d = json.loads(m.group(2))
        except ValueError:
            continue
        nodes = d["@graph"] if isinstance(d, dict) and "@graph" in d else [d]
        for n in nodes:
            t = n.get("@type")
            if t == "FAQPage" or (isinstance(t, list) and "FAQPage" in t):
                have = {x["name"] for x in n["mainEntity"]}
                for q, a in faqs:
                    if q not in have:
                        n["mainEntity"].append({"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(a)}})
                txt = json.dumps(d, ensure_ascii=False).replace("</", "<\\/")
                return s[:m.start(2)] + txt + s[m.end(2):], True
    return s, False


def set_meta(s, title, desc):
    if title:
        t = html.escape(title, quote=False)
        s = re.sub(r"<title>.*?</title>", "<title>%s</title>" % t, s, count=1, flags=re.S)
        for pat in (r'(<meta property="og:title" content=")[^"]*(")', r'(<meta name="twitter:title" content=")[^"]*(")'):
            s = re.sub(pat, lambda m: m.group(1) + html.escape(title, quote=True) + m.group(2), s, count=1)
    if desc:
        for pat in (r'(<meta name="description" content=")[^"]*(")', r'(<meta property="og:description" content=")[^"]*(")',
                    r'(<meta name="twitter:description" content=")[^"]*(")'):
            s = re.sub(pat, lambda m: m.group(1) + html.escape(desc, quote=True) + m.group(2), s, count=1)
    return s


for slug, cfg in PAGES.items():
    p = os.path.join(ROOT, slug, "index.html")
    s = open(p, encoding="utf-8").read()
    s = set_meta(s, cfg.get("title"), cfg.get("desc"))
    new = [(q, a) for q, a in cfg["faq"] if html.escape(q, quote=False) not in s and q not in s]
    style = cfg["style"]
    if new:
        if style == "new-qa":
            if '<section id="faq">' not in s:
                sec = ('<section id="faq"><div class="wrap"><div class="sec-label">Questions</div>'
                       '<h2 class="sec-h">AI consultant: frequently asked questions</h2><div class="faq"></div></div></section>')
                k = s.index('<section><div class="wrap"><div class="cta-band">')
                s = s[:k] + sec + s[k:]
            style = "qa"
        if style == "faq-item":
            blocks = "".join(faq_item_block(s, q, a) for q, a in new)
            i = s.index('<div class="faq-sec">')
            k = s.index('\n</div>\n<div class="cta-band">', i)
            s = s[:k] + "\n" + blocks.replace("</div></div><div", "</div></div>\n<div") + s[k:]
        else:
            s = add_visible(s, style, "".join(visible(style, q, a) for q, a in new), slug)
        s, ok = add_ld(s, cfg["faq"])
        if not ok:
            ld = {"@context": "https://schema.org", "@type": "FAQPage", "@id": "https://siamakconsulting.com/%s#faq" % slug,
                  "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in cfg["faq"]]}
            s = s.replace("</head>", '<script type="application/ld+json">%s</script>\n</head>' % json.dumps(ld, ensure_ascii=False), 1)
    open(p, "w", encoding="utf-8").write(s)
    print("%-32s +%d questions%s" % (slug, len(new), " · retitled" if cfg.get("title") else ""))
