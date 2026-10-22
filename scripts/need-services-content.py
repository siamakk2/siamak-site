# Content for the "how buyers describe the help they want" pages. Rendered by:
#
#     python3 scripts/build-ai-services.py need-services-content.py
#
# These two pages fill gaps found when Siamak's list of real search phrases was
# checked against the site (October 2026): no page used "marketing consultant",
# "digital marketing consultant", "marketing advisor for small business" or
# "SEO consultant" as its subject. Same rules as the other content files:
#  - every proof point is on a live page; no invented statistics or guarantees
#  - prices match /pricing exactly
#  - each page owns one search intent:
#      /marketing-consultant -> "marketing consultant", "digital marketing consultant",
#                               "marketing advisor for small business", "marketing strategy consultant"
#      /seo-consultant       -> "SEO consultant", "AI search optimization agency",
#                               "GEO consultant", "AEO services", "LLMO consultant"
#                               (deep method pages: /ai-seo, /geo-aeo-consultant, /llm-optimization)

TODAY = "2026-10-22"
PARENT = ("Services", "/services")
REL_H2 = "Other ways I help"
REL_EXTRA = [("/help", "Find the right help", "Answers sorted by what you need"),
             ("/business-growth-consultant", "Business Growth", "Strategy for the whole business"),
             ("/fractional-cmo", "Fractional CMO", "Someone senior in charge of marketing"),
             ("/geo-aeo-consultant", "GEO & AEO", "Found and cited in AI answers"),
             ("/agency", "Done-for-You AI Agency", "Fixed-price packages, pay online"),
             ("/pricing", "Pricing", "Every published price in one place")]

HOUR = "https://buy.stripe.com/cNi14o2yQaMUdbC3zX0kE03"

PROOF_CORE = [
    ("8-year engagement", "Blue Moon Fabrics", "A single LA Fashion District store engineered into a national textile leader: the 100× build.", "/bluemoon"),
    ("300+ stores", "AisleBird", "A voice-first shopping app scaled to 300+ stores across 11 retail chains, with AI categorization.", "/aislebird"),
    ("SaaS", "S.C.A.L.E.", "My growth method turned into software: it reads a website the way AI systems do and ranks what to fix.", "https://scale.siamakconsulting.com/"),
    ("40 years", "Market experience", "Legal, medical, e-commerce, hospitality and finance, from before the internet to the age of AI answers.", "/about-us"),
]

PAGES = []

# --------------------------------------------------------------- marketing consultant
PAGES.append(dict(
slug="marketing-consultant",
nav="Marketing Consultant",
title="Marketing Consultant for Small Business | Siamak Kalhor",
desc="A digital marketing consultant and marketing advisor for small business: strategy, channels, website, AI visibility and agency oversight. Free first call.",
og_kicker="MARKETING CONSULTANT",
og_headline="A marketing consultant who tells you|what to do next, and why.",
og_sub="Strategy · Digital marketing · Website · AI visibility · Agencies",
service_type="Marketing consulting",
eyebrow="Marketing Consultant · Small Business",
h1='A marketing consultant who tells you <span class="grad">what to do next, and why.</span>',
sub="Most owners don't need more marketing ideas. They need someone experienced to say <strong>which three things to do, which ten to stop, and how to tell if it's working.</strong> I'm a marketing consultant and marketing advisor for small and mid-size businesses, with forty years of judgment and the digital and AI tools of today.",
glance=[("40 yrs","of marketing strategy"),("100×","Blue Moon Fabrics build"),("$350","paid strategy hour"),("30 min","free first call")],
defn=dict(term="Marketing consultant",
  q="What does a marketing consultant do?",
  a="A marketing consultant is an independent expert who diagnoses a business's marketing and tells it what to change: who to target, what to say, which channels to use, how much to spend and how to measure the result. A digital marketing consultant focuses that advice on online channels such as the website, search, AI answers, social media, email and paid ads. Unlike an agency, a consultant is paid mainly for judgment and direction rather than for doing all of the work.",
  plain="An experienced outsider who looks at your marketing, tells you the truth about it and gives you a plan you can act on."),
why=dict(label="Why owners call me",h2='Busy marketing is not the same as <span class="grad">marketing that works.</span>',
  lead="These are the four situations small business owners describe to me most often.",
  cards=[("◇","“I don't know which marketing is working”","Money goes to ads, posts, tools and an agency, and nobody can say which of it brought in a customer."),
         ("◎","“I need an advisor, not another vendor”","Every company that calls you is selling one channel. You want someone with no stake in which one you pick."),
         ("⚡","“We're everywhere and nothing connects”","A website, social accounts, ads and email, each done separately, with no strategy tying them together."),
         ("◈","“Customers now ask ChatGPT who to hire”","Search has changed. If AI assistants don't know your business, you're missing from the answer.")]),
diagram=dict(type="flow",label="How I work",h2="The S.C.A.L.E. Framework™",
  lead="The same five steps in the same order, whether the job is one strategy hour or a year of advising.",
  nodes=[("Scan","Your numbers, market, competitors and what AI says about you."),("Clarify","Who you serve and why they should choose you."),("Amplify","The few channels that reach those customers."),("Leverage","Automation and AI that make what works cheaper."),("Evaluate","A revenue-first scorecard, every month.")], highlight=1),
help=dict(label="What a marketing consultant delivers",h2="Marketing consulting, deliverable by deliverable",
  lead="Advice you can act on and hold me to, not a deck that gets filed.",
  cards=[("▦","Marketing strategy","Where your growth will come from and what to stop spending on.","A one-page marketing strategy and a 90-day plan with owners and dates.","/business-growth-consultant"),
         ("◇","Positioning & message","Why a customer should pick you, in words they'd actually use.","Positioning, a message hierarchy and copy rules for your team and vendors.","/brand-creation"),
         ("◈","Digital marketing plan","The right mix of website, search, social, email and paid, in priority order.","A ranked channel plan with a budget, an expected return and a test for each line.","/internet-marketing"),
         ("⟁","Website & conversion","More of your existing visitors turned into calls, bookings and sales.","A conversion review of your key pages and a ranked fix list.","/website-conversion-consultant"),
         ("⚡","Search & AI visibility","Being found in Google and recommended by ChatGPT, Gemini and AI Overviews.","An AI visibility baseline and the fixes that move it.","/seo-consultant"),
         ("◎","Agency & vendor review","A second opinion on the people you already pay.","A plain-English review of their work, proposals and reports, and what to ask for next.","/is-my-marketing-agency-working")]),
compare=dict(label="Your options",h2="Marketing consultant, agency, fractional CMO or an in-house hire?",
  lead="Each is the right answer for someone. Here's the honest comparison.",
  cols=["","Marketing consultant","Marketing agency","Fractional CMO","In-house marketer"],
  rows=[["You get","Senior advice and a plan","People who execute the work","Senior leadership, part-time and ongoing","A person on your team every day"],
        ["Typical cost","Hourly or per project","A monthly retainer","A monthly fee","A salary plus benefits"],
        ["Best when","You need to decide what to do","The plan is clear and you need hands","You need someone in charge of all of it","Marketing is big enough for a full-time role"],
        ["Main risk","You still need someone to do the work","Activity without strategy","Senior time is limited, so focus matters","One person can't be expert in everything"]], hl=2),
process=dict(label="How it starts",h2="Small first step, then only what's worth doing",
  steps=[("Free 30-minute call","Your goals, numbers and what you've tried. You leave with an honest view of where to start, even if that isn't me."),
         ("Strategy hour or diagnostic","One paid hour for a focused question, or a diagnostic of your marketing from first contact to sale."),
         ("Your plan","A one-page strategy, the channel plan and the scorecard, agreed with you."),
         ("Do it your way","Your team does the work with my advice, my <a href=\"/agency\">done-for-you agency</a> does it at a fixed price, or I lead it as your <a href=\"/fractional-cmo\">fractional CMO</a>."),
         ("Monthly review","What moved revenue, what to stop and what comes next.")]),
fit=dict(good=["Owner-led and small businesses spending on marketing without clear results","Owners who want an independent marketing advisor with no channel to sell","Businesses with an agency or freelancers who need a second opinion","Established firms that need their marketing updated for AI search"],
         bad=["Anyone who only wants posts written or ads run, with no strategy","Businesses looking for a guaranteed ranking or overnight results","Owners who won't share their numbers; strategy without them is guesswork","Companies that need a full-time employee in the office"]),
proof=dict(label="Proof, not promises",h2="Marketing that compounded",cards=PROOF_CORE),
faq=[("What does a digital marketing consultant do?","A digital marketing consultant reviews a business's online marketing, including the website, Google and AI search, social media, email and paid ads, and tells it what to change and in what order. The result is a plan with priorities, a budget and a way to measure it, which your team, an agency or the consultant then carries out."),
     ("How much does a marketing consultant cost?","My first 30-minute call is free. A paid strategy hour is $350, and hourly consulting is $350 to $450 with no minimum. Larger projects and retainers are quoted after a diagnostic. Every price is on the <a href=\"/pricing\">pricing page</a>, and you can <a href=\"" + HOUR + "\">book a paid hour online</a>."),
     ("Should I hire a marketing consultant or a marketing agency?","Hire a consultant when you need to decide what to do, and an agency when you already know and need people to do it. Many small businesses get the best result from both: a consultant sets the strategy and holds the agency to it. If you want one firm for both, my <a href=\"/agency\">done-for-you packages</a> pair my strategy with the execution."),
     ("What is a marketing advisor for a small business?","A marketing advisor is a senior marketer a small business can call on for decisions, without hiring one full-time. The advisor reviews plans and spending, answers questions as they come up and keeps the marketing pointed at revenue. I work this way by the hour, or monthly as a <a href=\"/fractional-cmo\">fractional CMO</a>."),
     ("What does a marketing strategy consultant deliver?","A clear written strategy: who your best customers are, why they should choose you, which channels will reach them, what to spend and how you'll know it's working. Mine comes as a one-page strategy and a 90-day plan built on the <a href=\"/growth-framework\">S.C.A.L.E. Framework™</a>."),
     ("Can you review the agency I already have?","Yes, and it's one of the most common reasons owners book a paid hour. I read the proposal, contract and reports and tell you in plain English what you're getting and what to ask for. See <a href=\"/is-my-marketing-agency-working\">How do I know if my marketing agency is working?</a>"),
     ("Do you only work with businesses in Los Angeles?","No. I'm based in Los Angeles, and most of my consulting runs online by video call, so I work with businesses across the United States and beyond. See <a href=\"/online-consulting\">online consulting</a>.")],
cta=("Get an honest read on your marketing","Book a free 30-minute call. Bring your numbers and your frustrations; you'll leave with a clear next step either way."),
))

# --------------------------------------------------------------- SEO consultant
PAGES.append(dict(
slug="seo-consultant",
nav="SEO Consultant",
title="SEO Consultant for Google and AI Search | Siamak Kalhor",
desc="An SEO consultant for Google and AI search: technical and local SEO, content, and GEO, AEO and LLMO so ChatGPT, Gemini and AI Overviews recommend you.",
og_kicker="SEO CONSULTANT",
og_headline="Rank in Google.|Get named by AI.",
og_sub="SEO · Local SEO · GEO · AEO · LLMO",
service_type="Search engine optimization",
eyebrow="SEO Consultant · AI Search Optimization",
h1='Rank in Google. <span class="grad">Get named by AI.</span>',
sub="Your customers search two ways now: they type into Google, and they ask ChatGPT, Gemini or Google's AI <em>“who should I hire?”</em> I'm an SEO consultant who works on both: <strong>classic SEO so Google ranks you, and AI search optimization (GEO, AEO and LLMO) so the AI answer names you.</strong>",
glance=[("SEO","Google rankings"),("GEO · AEO","AI answers"),("$1,500","AI Authority Audit"),("Free","website audit")],
defn=dict(term="SEO consultant",
  q="What does an SEO consultant do?",
  a="An SEO consultant improves how a business is found in search. The work covers technical health (speed, crawling and structured data), local search (Google Business Profile, reviews and directories), content that answers what customers search for, and authority from links and mentions. A modern SEO consultant also covers AI search, known as generative engine optimization (GEO), answer engine optimization (AEO) or Large Language Model Optimization (LLMO), so the business is cited in ChatGPT, Gemini, Perplexity and Google's AI Overviews.",
  plain="Someone who makes sure people find you when they search, whether they search on Google or ask an AI."),
note='<b>Looking for the method in depth?</b> This page is for hiring an SEO consultant. The details live on <a href="/ai-seo">AI SEO</a> (ranking and AI Overviews), <a href="/geo-aeo-consultant">GEO &amp; AEO</a> (AI answers) and <a href="/llm-optimization">LLM Optimization</a> (my full LLMO method).',
why=dict(label="Why search feels harder",h2='You rank, but the phone is quieter. <span class="grad">Here\'s usually why.</span>',
  lead="The way people search changed. These are the four gaps I find most often.",
  cards=[("◇","AI answers before the click","Google's AI Overviews and ChatGPT answer the question, so fewer people scroll to the blue links."),
         ("◎","AI can't tell who you are","Your name, services and address differ across the web, so AI isn't sure you're one business."),
         ("⚡","Nothing worth quoting","Your pages describe you in sales language instead of answering what buyers ask."),
         ("◈","Local signals are weak","An incomplete Google Business Profile, few recent reviews and inconsistent listings.")]),
diagram=dict(type="flow",label="How the work runs",h2="One plan for Google and AI search",
  lead="Classic SEO is the foundation. AI search optimization is built on top of it.",
  nodes=[("Audit","What Google and the AI systems say about you today, and why."),("Fix the foundation","Speed, crawling, schema and one consistent set of business facts."),("Answer the questions","Pages that answer what buyers ask, in words AI can quote."),("Build authority","Reviews, citations and mentions Google and AI trust."),("Measure","Rankings, AI mentions and enquiries, every month.")], highlight=2),
help=dict(label="SEO and AI search services",h2="What the work includes",
  lead="Every item here produces something you can check.",
  cards=[("▦","SEO & AI visibility audit","Where you rank, what AI says about you and the ranked list of fixes.","The AI Authority Audit: twelve deliverables and a fix list, fixed at $1,500.","/analyze-your-brand"),
         ("◇","Technical SEO","A site Google and AI crawlers can read quickly and completely.","Speed, crawling, robots rules, llms.txt and JSON-LD structured data, checked and fixed.","/audit"),
         ("◈","Local SEO","Showing up in Google Maps and in AI answers about businesses near your customers.","Google Business Profile, reviews, directories and consistent business facts.","/local"),
         ("⟁","Content that gets cited","Pages that rank in Google and get quoted in AI answers.","Service pages and FAQ hubs rewritten so each question has a clear answer.","/how-to-get-cited-by-ai"),
         ("⚡","GEO, AEO & LLMO","Being the business AI systems name when asked who to hire.","Entity fixes, citations and a tracked set of AI prompts.","/geo-aeo-consultant"),
         ("◎","Monthly reporting","Proof the work is moving the numbers that matter.","Rankings, AI visibility score and enquiries, reported every month.",None)]),
compare=dict(label="Your options",h2="SEO consultant, SEO agency, AI search agency or doing it yourself?",
  lead="Each is right for someone. Here's the honest comparison.",
  cols=["","SEO consultant","SEO agency","AI search optimization agency","Do it yourself"],
  rows=[["You get","Senior diagnosis and a plan, plus the work if you want it","A team that produces links and content","A specialist in AI answers only","Your own time and tools"],
        ["Covers AI answers?","Yes, with Google SEO underneath","Often not yet","Yes, sometimes without Google SEO","Only if you learn it"],
        ["Best when","You want to know what's wrong before you spend","The plan is clear and you need volume","You already rank well in Google","The business is small and you have time"],
        ["Main risk","You still need someone to do the work","Reports full of activity, not enquiries","Losing the Google traffic that pays today","Fixing the wrong things first"]], hl=2),
process=dict(label="How to start",h2="Find out first, then fix in order",
  steps=[("Free check","Run the free <a href=\"/audit\">website audit</a> or the <a href=\"https://scale.siamakconsulting.com/\">S.C.A.L.E. scan</a> to see how Google and AI read your site."),
         ("Free 30-minute call","Bring the results. I'll tell you what matters and what doesn't."),
         ("Audit","The $1,500 <a href=\"/analyze-your-brand\">AI Authority Audit</a> tests the AI systems directly and ranks every fix by impact."),
         ("Fix","Your team or web person does it with my plan, or my <a href=\"/agency\">done-for-you agency</a> does it at a fixed price."),
         ("Measure","The same searches and AI prompts every month, so progress is visible rather than claimed.")]),
fit=dict(good=["Local and professional businesses that depend on being found online","Businesses that rank in Google but are missing from ChatGPT or AI Overviews","Owners who want one adviser for both Google and AI search","Teams that need a clear SEO plan they can carry out themselves"],
         bad=["Anyone who wants a guaranteed first-page ranking; nobody can honestly promise one","Requests for hundreds of thin AI-written pages","Link schemes or tactics that break Google's rules","Sites that can't be edited at all"]),
proof=dict(label="Proof, not promises",h2="I practise this on my own business first",
  cards=[("SaaS","S.C.A.L.E.","Software that reads a website the way AI systems do, scores five dimensions and ranks what to fix.","https://scale.siamakconsulting.com/"),
         ("Self-audit","I scored my own site 68/100","The public write-up of auditing my own AI visibility, and what I fixed.","/the-long-view/anatomy-of-an-invisible-brand"),
         ("Guide","SEO vs LLMO","What changes with AI search, and what still carries over from classic SEO.","/seo-vs-llmo"),
         ("Pricing","What AI visibility costs","An honest guide to LLMO pricing and when to hire nobody at all.","/how-much-does-llmo-cost")]),
faq=[("What does an SEO consultant do?","An SEO consultant finds out why a business isn't being found in search and fixes it: technical problems that stop Google reading the site, weak local listings, content that doesn't answer what customers search for, and a lack of trusted links and mentions. I also cover AI search, so ChatGPT, Gemini and Google's AI Overviews name the business too."),
     ("Should I hire an SEO consultant or an SEO agency?","Hire a consultant when you need to know what's actually wrong and what to fix first. Hire an agency when the plan is clear and you need a team to produce the work. Many businesses do both: the consultant sets the plan and checks the agency's work against enquiries, not activity."),
     ("What is an AI search optimization agency?","An AI search optimization agency works on getting businesses mentioned and recommended in AI answers from ChatGPT, Gemini, Perplexity, Claude and Google's AI Overviews. The work is also called GEO, AEO or LLMO. My <a href=\"/agency\">done-for-you packages</a> start at $2,500 for an AI Visibility Launch, with AI Visibility Growth at $1,500 a month."),
     ("What are GEO and AEO services?","GEO (generative engine optimization) gets your business cited when an AI writes an answer. AEO (answer engine optimization) makes your business the direct answer in featured snippets, voice search and AI answers. The same work serves both. See <a href=\"/geo-aeo-consultant\">GEO &amp; AEO</a>."),
     ("What does an LLMO consultant do?","An LLMO consultant works on Large Language Model Optimization: making sure AI models identify your business correctly, describe it accurately and recommend it for the right questions. LLMO is my umbrella term for GEO and AEO, explained in full on <a href=\"/llm-optimization\">LLM Optimization</a> and in <a href=\"/best-llmo-consultant\">how to choose an LLMO consultant</a>."),
     ("How much does an SEO consultant cost?","My first 30-minute call is free and hourly consulting is $350 to $450. The AI Authority Audit, which covers Google and AI search, is a fixed $1,500. Ongoing work is quoted after the audit or bought as a fixed-price package. See <a href=\"/pricing\">pricing</a>."),
     ("Is SEO still worth it now that people use ChatGPT?","Yes. AI systems draw heavily on the open web, and Google's AI Overviews sit on top of Google's own index, so good SEO is still the foundation AI search is built on. What changes is the goal: being the business the answer names, not just a link on page one. See <a href=\"/seo-vs-llmo\">SEO vs LLMO</a>.")],
cta=("Find out how Google and AI see your business","Run the free audit tonight, then bring the results to a free 30-minute call."),
))
