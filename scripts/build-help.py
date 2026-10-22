#!/usr/bin/env python3
"""Builds /help, the "Find the right help" knowledge base.

It is organised the way buyers describe what they want (Siamak's list of real
search phrases, October 2026), not by how the services are named. Each need has
the phrases people search, three short answer-first questions and the pages to
go to next. Every question goes into one FAQPage graph.

Shell, nav, footer and base CSS come from build-ai-services.py, which lifts them
from /ai-consultant, so this page never drifts from the rest of the site.

    python3 scripts/build-help.py
"""
import json, os, runpy, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.argv = [sys.argv[0], "need-services-content.py"]
B = runpy.run_path(os.path.join(HERE, "build-ai-services.py"), run_name="lib")
ROOT, BASE = B["ROOT"], B["BASE"]
e, a, strip, head_html = B["e"], B["a"], B["strip"], B["head_html"]

TODAY = "2026-10-22"
HOUR = "https://buy.stripe.com/cNi14o2yQaMUdbC3zX0kE03"

# (anchor, heading in the buyer's words, phrases people search, [(q, a)], [(label, href)])
NEEDS = [
("marketing-consultant", "I want a consultant to guide my marketing",
 ["marketing consultant", "digital marketing consultant", "marketing advisor for small business", "marketing strategy consultant"],
 [("What does a marketing consultant do for a small business?",
   "A marketing consultant looks at your marketing from the outside and tells you what to change: who to target, what to say, which channels to use, what to spend and how to measure it. You get a written plan; your team, an agency or the consultant then carries it out. I work this way by the hour or by project, with a free 30-minute first call."),
  ("Should I hire a marketing consultant or a marketing agency?",
   "Hire a consultant when you need to decide what to do, and an agency when the plan is clear and you need people to do the work. Many small businesses use both: the consultant sets the strategy and holds the agency to results."),
  ("How much does a marketing consultant cost?",
   "Mine: the first 30-minute call is free, a paid strategy hour is $350 and hourly consulting is $350 to $450 with no minimum. Projects and retainers are quoted after a diagnostic. Every price is on the <a href=\"/pricing\">pricing page</a>.")],
 [("Marketing Consultant", "/marketing-consultant"), ("Book a paid hour · $350", HOUR)]),

("agency", "I want an agency that can handle everything",
 ["full service digital marketing agency", "integrated marketing agency", "marketing agency for small business", "outsourced marketing services"],
 [("What does a full-service digital marketing agency do?",
   "A full-service digital marketing agency handles most of your marketing under one roof: strategy, website, search, social media, content, email and ads. An integrated marketing agency is the same idea, with the channels planned together so they tell one story instead of being bought separately."),
  ("Is outsourcing all my marketing right for a small business?",
   "It can be, if someone senior still sets the strategy and checks the results. The common failure is paying for activity, such as posts, reports and impressions, with nobody tying it to revenue. Before you sign, read <a href=\"/is-my-marketing-agency-working\">how to tell if a marketing agency is working</a>."),
  ("Do you work as a full-service agency?",
   "I run a consultant-led, done-for-you agency rather than a large firm: fixed-price packages you can buy online, with me setting the strategy and reviewing every deliverable. Packages include AI Visibility Launch ($2,500), AI Visibility Growth ($1,500 a month), AI-Ready Website (from $4,500), Done-For-You AI Agent ($3,500 plus $1,000 a month) and Content Engine ($1,200 a month).")],
 [("Done-for-You AI Agency", "/agency"), ("All services", "/services")]),

("grow", "I want someone to help grow my business",
 ["business growth consultant", "business development consultant", "small business consultant", "business strategy advisor"],
 [("What does a business growth consultant do?",
   "A business growth consultant finds what is limiting your revenue and builds the plan to remove it: positioning, target customers, marketing channels, the path from enquiry to sale and measurement. I do it in order with my <a href=\"/growth-framework\">S.C.A.L.E. Framework™</a>: Scan, Clarify, Amplify, Leverage, Evaluate."),
  ("What's the difference between a business growth consultant and a business development consultant?",
   "A business development consultant usually focuses on new sales opportunities: partnerships, new markets and the sales pipeline. A business growth consultant looks at the whole chain from being found to being paid, including marketing, positioning and conversion. Small businesses often need the second first, because new opportunities leak if the basics aren't fixed."),
  ("When should a small business hire a business strategy advisor?",
   "When sales have stalled and you can't say why, when you're spending more on marketing without more customers, or before a big decision such as a new market, a new location or a price change. One honest outside view at those moments is usually cheaper than a year of guessing.")],
 [("Business Growth Consultant", "/business-growth-consultant"), ("The S.C.A.L.E. Framework", "/growth-framework")]),

("ai-marketing", "I want someone who understands AI and marketing",
 ["AI marketing consultant", "AI marketing agency", "AI business consultant", "AI strategy advisor"],
 [("What does an AI marketing consultant do?",
   "An AI marketing consultant helps a business use AI where it actually pays: getting found and recommended in ChatGPT, Gemini and Google's AI Overviews, producing content faster without losing quality, and automating follow-up and reporting. Just as important, they tell you where AI isn't worth it yet."),
  ("Should I hire an AI consultant or an AI agency?",
   "A consultant gives you independent advice on what to do with AI; an agency builds and runs it. If you're not sure what you need, start with advice, then build. I compare the two honestly in <a href=\"/ai-consultant-vs-ai-agency\">AI consultant vs AI agency</a>."),
  ("What does an AI business consultant or AI strategy advisor do?",
   "They look at your whole business, not just marketing, and find the few places where AI saves real time or money: customer calls, intake, follow-up, quoting, reporting and content. Then they set the order, the budget and the rules for using AI safely with customer data.")],
 [("AI Marketing", "/ai-marketing"), ("AI Consultant", "/ai-consultant"), ("AI Advisory", "/ai-advisory")]),

("lead", "I want someone to lead the whole marketing effort",
 ["fractional CMO", "outsourced marketing director", "fractional chief marketing officer", "marketing consultant to manage my agency"],
 [("What is a fractional CMO?",
   "A fractional CMO (fractional chief marketing officer) is an experienced marketing executive who leads your marketing part-time for a monthly fee. They set the strategy and budget, manage your agencies and freelancers, and report in revenue, without the cost of a full-time executive."),
  ("What's the difference between a fractional CMO and an outsourced marketing director?",
   "They overlap. A fractional CMO is usually more senior and owns the strategy and budget. An outsourced marketing director usually runs the day-to-day plan and the people doing the work. A small business often needs one person who does both, which is how I work."),
  ("Can a consultant manage my marketing agency for me?",
   "Yes. It's one of the most useful things a senior marketer can do: brief the agency properly, review its work against enquiries and sales, and replace it if it doesn't deliver. Many of my clients keep their agency and add me above it.")],
 [("Fractional CMO", "/fractional-cmo"), ("Is my marketing agency working?", "/is-my-marketing-agency-working")]),

("website", "I want my website to bring in more sales",
 ["website strategy consultant", "website optimization agency", "conversion optimization consultant", "website and marketing services"],
 [("What does a website strategy consultant do?",
   "A website strategy consultant decides what your website must do for the business, such as bring in calls, bookings or online sales, and then shapes the pages, message, proof and calls to action to do it. The result is a site built around how your customers decide, not just how it looks."),
  ("What is conversion optimization, and is it worth paying for?",
   "Conversion optimization means turning more of the visitors you already have into customers, by fixing slow pages, unclear offers, missing proof and enquiries that never get a reply. It's usually the cheapest growth available, because you're not paying for more traffic."),
  ("Do I need a new website or better marketing?",
   "Usually neither until you know where people drop off. Run the free <a href=\"/audit\">website audit</a> first. If visitors arrive and leave, fix the site; if nobody arrives, fix the marketing; if they enquire and don't buy, fix the follow-up.")],
 [("Website Conversion Consultant", "/website-conversion-consultant"), ("Free website audit", "/audit")]),

("automation", "I want to automate parts of my business",
 ["AI automation agency", "business automation consultant", "AI implementation consultant", "AI agent development services"],
 [("What does an AI automation agency or business automation consultant do?",
   "They find the repetitive work in your business, such as answering calls, taking enquiries, booking appointments, following up and updating the CRM, and set up software and AI to do it reliably, with a person stepping in when needed. A consultant designs the plan; an agency also builds and runs it. I do both."),
  ("What should a small business automate first?",
   "Start where money is lost to slowness: missed calls, enquiries answered the next day, quotes that never get followed up. Those pay back fastest. Leave anything that needs careful judgment with a person until the simple automations are running well."),
  ("What does AI agent development include?",
   "An AI agent does more than chat: it takes steps, such as answering the call, checking the calendar, booking the appointment and handing off to you when it should. Development covers the job description, the tools it may use, the guardrails, testing and monitoring. You can <a href=\"https://agents.siamakconsulting.com\">build a free agent preview</a> in Agent Studio, or have me build one for $3,500 plus $1,000 a month.")],
 [("AI Automation", "/ai-automation"), ("AI Agents", "/ai-agents"), ("Build an agent free", "https://agents.siamakconsulting.com")]),

("visibility", "I want to be found on Google and in AI answers",
 ["SEO consultant", "AI search optimization agency", "GEO consultant", "AEO services", "LLMO consultant"],
 [("What does an SEO consultant do now that people ask AI?",
   "The same foundation, with a new goal. An SEO consultant still fixes technical problems, local listings, content and authority so Google ranks you. Now the work also has to make ChatGPT, Gemini and Google's AI Overviews name your business when someone asks who to hire."),
  ("What are GEO, AEO and LLMO?",
   "Three names for getting your business into AI answers. GEO (generative engine optimization) is being cited when an AI writes an answer; AEO (answer engine optimization) is being the direct answer; LLMO (Large Language Model Optimization) is my umbrella term for both. See <a href=\"/seo-vs-llmo\">SEO vs LLMO</a>."),
  ("How do I get my business recommended by ChatGPT?",
   "Make it easy for AI to identify you, verify you and quote you: the same business facts everywhere, structured data on your site, pages that answer buyers' questions directly, and reviews and mentions on sites AI trusts. The step-by-step guide is <a href=\"/how-to-get-cited-by-ai\">How to Get Cited by AI</a>.")],
 [("SEO Consultant", "/seo-consultant"), ("GEO & AEO", "/geo-aeo-consultant"), ("LLM Optimization", "/llm-optimization")]),

("ecommerce", "I want to grow my online store",
 ["ecommerce consultant", "Shopify marketing agency", "ecommerce growth consultant", "Shopify consultant"],
 [("What does an ecommerce growth consultant do?",
   "They find why the store isn't selling more and fix it in order: product pages that don't convert, ad spend that doesn't return, abandoned carts, repeat purchases and, now, whether AI shopping assistants recommend your products. The aim is profitable growth, not just more traffic."),
  ("Should I hire a Shopify consultant or a Shopify marketing agency?",
   "A Shopify consultant fixes the store itself: setup, apps, speed, product pages and conversion. A Shopify marketing agency brings in traffic through ads, email and social. If the store doesn't convert, more traffic only costs more, so fix the store first. I've built Shopify stores, including for the eight-year <a href=\"/bluemoon\">Blue Moon Fabrics</a> engagement."),
  ("How do I get my products recommended by AI shopping assistants?",
   "Give AI clean, complete product facts: structured product data, clear descriptions that answer buyers' questions, real reviews and consistent listings across the web. See <a href=\"/ai-for-ecommerce\">AI for ecommerce</a>.")],
 [("Ecommerce Growth Consultant", "/ecommerce-marketing-consultant"), ("AI for Ecommerce", "/ai-for-ecommerce")]),

("brand", "I want to strengthen my brand",
 ["brand strategy consultant", "branding and marketing agency", "brand positioning consultant"],
 [("What does a brand strategy consultant do?",
   "A brand strategy consultant defines what your business stands for, who it's for and why customers should choose it, then turns that into a name, a message and rules everyone can follow. The visual identity comes after the strategy, not before it."),
  ("What's the difference between brand strategy and brand positioning?",
   "Positioning is one part of brand strategy: the specific place you want to hold in the customer's mind compared with the alternatives. Brand strategy also covers your audience, personality, message, proof and how the brand shows up everywhere, including in AI answers."),
  ("Do I need a branding agency or a brand consultant?",
   "If the strategy is clear and you need a logo, a website and materials, a branding and marketing agency fits. If customers can't say why you're different, start with a consultant, because a beautiful identity on an unclear position still loses on price.")],
 [("Brand Creation", "/brand-creation")]),
]

READ = {'marketing-consultant': [('Marketing consultant or marketing agency?', 'marketing-consultant-or-marketing-agency')], 'agency': [('What a full-service marketing agency really does', 'what-a-full-service-marketing-agency-does'), ('Outsourcing your marketing: what to keep', 'outsourcing-your-marketing-what-to-keep')], 'grow': [('Business growth vs business development consultant', 'business-growth-vs-business-development-consultant')], 'ai-marketing': [('What does an AI business consultant actually do?', 'what-does-an-ai-business-consultant-do')], 'lead': [('Fractional CMO vs marketing director vs agency', 'fractional-cmo-vs-marketing-director-vs-agency')], 'website': [('Web designer or website strategy consultant?', 'website-strategy-consultant-or-web-designer'), ('Conversion optimization for small business', 'conversion-optimization-for-small-business')], 'automation': [('AI automation agency or automation consultant?', 'ai-automation-agency-or-automation-consultant'), ('Hiring an AI implementation consultant', 'hiring-an-ai-implementation-consultant')], 'visibility': [('SEO, GEO, AEO or LLMO: which do you need?', 'seo-geo-aeo-llmo-which-do-you-need'), ('SEO consultant or SEO agency?', 'seo-consultant-or-seo-agency')], 'ecommerce': [('Shopify consultant or Shopify marketing agency?', 'shopify-consultant-or-shopify-marketing-agency'), ('What an ecommerce growth consultant does', 'what-an-ecommerce-growth-consultant-does')], 'brand': [('Brand strategy vs brand positioning', 'brand-strategy-vs-brand-positioning')]}

EXTRA_CSS = """<style id="help-css">
.help-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:26px}
.help-nav a{display:flex;gap:14px;align-items:center;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:var(--surface);text-decoration:none;color:var(--text);font-family:var(--display);font-weight:600;font-size:16px;transition:border-color .2s}
.help-nav a:hover{border-color:var(--cyan)}
.help-nav i{font-style:normal;font-family:var(--mono);font-size:12px;color:var(--cyan);min-width:22px}
.need{scroll-margin-top:90px}
.need-h{font-family:var(--display);font-size:clamp(26px,3.2vw,36px);font-weight:600;line-height:1.15;margin:6px 0 14px}
.need-q{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 22px;font-size:13.5px;color:var(--muted-dim)}
.need-q span{padding:5px 11px;border:1px solid var(--line);border-radius:999px;color:var(--muted)}
.need-q b{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;align-self:center;margin-right:4px}
.need .qa h3{font-family:var(--display);font-size:17px;font-weight:600;margin-bottom:8px}
.need .qa p a,.help-lead a{color:var(--cyan)}
.need-go{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.need+.need{border-top:1px solid var(--line)}
.need-read{margin-top:16px;font-size:15px;color:var(--muted)}.need-read b{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;color:var(--muted-dim);margin-right:8px}.need-read a{color:var(--cyan);margin-right:16px}
@media(max-width:700px){.help-nav{grid-template-columns:1fr}}
</style>"""


def build():
    url = BASE + "/help"
    title = "Find the Right Marketing & AI Help | Siamak Kalhor"
    desc = ("Plain answers sorted by what you need: a marketing consultant, an agency, a fractional CMO, "
            "SEO and AI search, automation, ecommerce or brand strategy.")
    og_img = BASE + "/og/help.jpg"
    qas = [(q, ans) for n in NEEDS for q, ans in n[3]]
    graph = [B["WEBSITE"], B["PERSON"], B["BUSINESS"],
        {"@type": ["WebPage", "FAQPage"], "@id": url + "#webpage", "url": url, "name": title, "description": desc,
         "isPartOf": {"@id": BASE + "/#website"}, "author": {"@id": BASE + "/#person"}, "inLanguage": "en-US",
         "dateModified": TODAY, "breadcrumb": {"@id": url + "#breadcrumb"},
         "primaryImageOfPage": {"@type": "ImageObject", "url": og_img},
         "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(ans)}} for q, ans in qas]},
        {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
            {"@type": "ListItem", "position": 2, "name": "Find the right help", "item": url}]}]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")

    nav_cards = "".join(f'<a href="#{k}"><i>{i+1:02d}</i>{e(h)}</a>' for i, (k, h, *_rest) in enumerate(NEEDS))
    hero = ('<header class="ph"><div class="wrap"><div class="crumb"><a href="/">Home</a> / <span>Find the right help</span></div>'
            '<div class="eyebrow"><span class="dot"></span>Knowledge base</div>'
            '<h1 class="ph-h">What kind of help <span class="grad">are you looking for?</span></h1>'
            '<p class="ph-sub help-lead">Pick the sentence that sounds most like you. Each one has straight answers to the questions owners ask '
            'before they hire anyone, what it costs, and where to go next. If none fits, <a href="/faq">ask me directly</a> or '
            '<a href="/online-consulting">book a free 30-minute call</a>.</p>'
            f'<nav class="help-nav" aria-label="Choose what you need">{nav_cards}</nav></div></header>\n')
    secs = ""
    for i, (k, h, phrases, qa, go) in enumerate(NEEDS):
        chips = "".join(f"<span>{e(x)}</span>" for x in phrases)
        items = "".join(f'<div class="qa"><h3>{e(q)}</h3><p>{ans}</p></div>' for q, ans in qa)
        btns = "".join(f'<a href="{a(href)}" class="btn {"btn-pri" if j == 0 else "btn-ghost"}">{e(lbl)}{" &rarr;" if j == 0 else ""}</a>'
                       for j, (lbl, href) in enumerate(go))
        reads = ('<p class="need-read"><b>Read more</b>' + ''.join(f'<a href="/the-long-view/{sl}">{e(t)}</a>' for t, sl in READ.get(k, [])) + '</p>') if READ.get(k) else ''
        secs += (f'<section class="need" id="{k}"><div class="wrap"><div class="sec-label">{i+1:02d} · {len(qa)} answers</div>'
                 f'<h2 class="need-h">“{e(h)}”</h2><div class="need-q"><b>People search</b>{chips}</div>'
                 f'<div class="faq">{items}</div>{reads}<div class="need-go">{btns}</div></div></section>\n')
    cta = ('<section><div class="wrap"><div class="cta-band"><h3>Still not sure what you need?</h3>'
           '<p>That\'s what the first call is for. Thirty minutes, free, and you\'ll leave knowing your next step, even if it isn\'t me.</p>'
           '<div class="cta-row"><a href="/online-consulting" class="btn btn-pri">Book a free 30-min call &rarr;</a>'
           f'<a href="{HOUR}" class="btn btn-ghost" rel="noopener">Book a paid hour · $350</a>'
           '<a href="tel:+13236577752" class="btn btn-ghost">Call 323-657-7752</a></div></div></div></section>\n')
    body = hero + secs + cta
    head = head_html(title, desc, url, og_img, ld).replace("</head>", EXTRA_CSS + "\n</head>", 1)
    out = (head + '<body class="v2">\n<a href="#main" class="skip-link">Skip to content</a>\n<div class="ambient"></div>\n'
           + B["NAV"] + '\n<main id="main">\n' + body + "</main>" + B["TAIL"])
    os.makedirs(os.path.join(ROOT, "help"), exist_ok=True)
    open(os.path.join(ROOT, "help", "index.html"), "w", encoding="utf-8").write(out)
    print("help: %d needs, %d answers, ~%d words" % (len(NEEDS), len(qas), len(strip(body).split())))


build()
