"""Site videos: one definition per clip, rendered as a section with VideoObject schema.

Used by build-agency.py and by add-videos.py (for hand-written pages).
Files live in /videos/ (H.264 720x1280, faststart) with a JPEG poster beside each.
"""
import html, json

SITE = 'https://siamakconsulting.com'
esc = lambda s: html.escape(s, quote=True)

VIDEOS = {
    'inhouse': {
        'file': 'agency-all-in-house', 'seconds': 44, 'date': '2026-10-25T09:00:00-07:00',
        'name': 'Most agencies hand your work to someone else. We do it all in house.',
        'label': 'Watch · 44 seconds',
        'heading': 'Most agencies hand your work to someone else. <span class="grad">We do it all in house.</span>',
        'lead': 'No freelancers, subcontractors or overseas hand-offs. Strategy, copy, design, video, websites and AI agents are built by us, on our own tools, and checked by me. You talk to the people who actually do the work. Even this video was made in house.',
        'description': 'A 44-second film narrated by Siamak Kalhor: Siamak Kalhor Consulting is now a full agency that does every job in house (strategy, copy, design, video, websites and AI agents) with no middlemen or hand-offs, built on its own tools and checked by Siamak.',
        'transcript': "Most agencies sell you the work, then hand it to someone else. Freelancers. Subcontractors. Someone overseas. We don't. Siamak Kalhor Consulting is now a full agency, and every job is done in house. Strategy. Copy. Design. Video. Websites. AI agents. Built by us, on our own tools, and checked by me. No middlemen. No hand-offs. No lost messages. You talk to the people who actually do the work. Even this video was made in house. Your agency, in house. Start at siamakconsulting.com.",
    },
    'atoz': {
        'file': 'full-service-a-to-z', 'seconds': 33, 'date': '2026-10-24T19:00:00-07:00',
        'name': 'For 40 years I told businesses what to do. Now I can do it for them.',
        'label': 'Watch · 33 seconds',
        'heading': 'Not just a consultant anymore. <span class="grad">Your whole business, handled.</span>',
        'lead': 'Strategy, brand, website, Google and AI search, content, ads and email, every lead answered day and night, and operations automated. A team of AI agents does the volume around the clock, and I direct every move, for one store or a hundred locations.',
        'description': 'A 33-second film narrated by Siamak Kalhor announcing his full-service AI agency: after forty years of advising businesses, he now runs their growth from A to Z, with AI agents doing the volume around the clock and one strategist directing every move.',
        'transcript': "For 40 years, I told businesses what to do. Now I can do it for them, from A to Z. Strategy, brand, website, Google and AI search, content, ads, and email. Every lead answered day and night, operations automated. How? A team of AI agents does the volume around the clock, and I direct every move. One store or 100 locations, it scales without hiring an army. I'm not just a consultant anymore. Your whole business, handled. Start at siamakconsulting.com.",
    },
    'portfolio': {
        'file': 'portfolio-apps-i-built', 'seconds': 63, 'date': '2026-10-22T13:00:00-07:00',
        'name': "I don't just advise on AI. I ship it.",
        'label': 'Watch · 1 minute',
        'heading': "I don't just advise on AI. <span class=\"grad\">I ship it.</span>",
        'lead': 'Twelve AI apps designed, coded and launched, from S.C.A.L.E. and Agent Studio to AisleBird, Parcel Finder and Napa Wino, plus client builds like Blue Moon Fabrics, an eight-year engagement that grew one store into a national leader. Tell me what you are building and I will take it from idea to launch.',
        'description': 'A one-minute tour, narrated by Siamak Kalhor, of the twelve AI apps he has designed, coded and launched (S.C.A.L.E., Agent Studio, S.C.A.L.E. Academy, Orchamind, ResBizAI, AisleBird, Parcel Finder, Textile Wizard, Weftwise and Napa Wino) and of client builds such as Blue Moon Fabrics.',
        'transcript': "I don't just advise on artificial intelligence. I ship it. From idea to live product. Twelve artificial intelligence apps designed, coded, and launched. S.C.A.L.E. scans your website the way assistants see it. Agent Studio builds your business agent in about ten minutes. And the Academy teaches my framework with a tutor in thirteen languages. Orchamind runs contractors. ResBizAI runs restaurants. AisleBird sorts your grocery list in over three hundred stores. Parcel Finder, Textile Wizard, Weftwise, Napa Wino. Built for real businesses and for clients like Blue Moon Fabrics, an eight-year build that grew one store into a national leader. Five stars on Google across more than a decade. Tell me what you're building. I'll take it from idea to launch. siamakconsulting.com.",
    },
    'whole-job': {
        'file': 'we-do-the-whole-job', 'seconds': 35,
        'name': 'AI is the tool. Strategy is the job.',
        'label': 'Watch · 35 seconds',
        'heading': 'AI is the tool. <span class="grad">Strategy is the job.</span>',
        'lead': 'Everybody thinks AI can do everything. Without a marketing background, an understanding of the algorithm, and one system in sync everywhere, you are just making it up. Siamak Kalhor Consulting does the whole job: strategy first, then the work, at fixed published prices.',
        'description': 'Why AI tools alone do not grow a business, and how Siamak Kalhor Consulting\'s done-for-you AI agency combines 40 years of strategy with fixed-price packages: AI Visibility Launch, AI Visibility Growth, AI-Ready Website, AI Agent / Chatbot and Content Engine.',
    },
    'sovereignty': {
        'file': 'data-sovereignty', 'seconds': 51,
        'name': 'Secure by design. Sovereign by default.',
        'label': 'Watch · 51 seconds',
        'heading': 'Secure by design. <span class="grad">Sovereign by default.</span>',
        'lead': 'Your data is your most valuable asset, until the day it leaks. For Indigenous communities it runs deeper, which is why the OCAP® and CARE principles exist. Every AI system Siamak Kalhor Consulting builds is encrypted, access-controlled, consent-first and respects who the data belongs to.',
        'description': 'A short film on data protection and Indigenous data sovereignty: the cost of a data breach, the OCAP® principles (ownership, control, access, possession) and the CARE principles, and how Siamak Kalhor Consulting builds AI that is encrypted, access-controlled, consent-first and community-governed.',
    },
    'studio': {
        'file': 'agent-studio-build-your-agent', 'seconds': 30, 'date': '2026-10-22T13:00:00-07:00',
        'name': 'The agent that runs your business while you run it.',
        'label': 'Watch · 30 seconds',
        'heading': 'Meet the agent that runs your business <span class="grad">while you run it.</span>',
        'lead': 'Name it, give it a voice, then connect your store, your website, your inbox and your CRM. It watches orders, leads and reviews, follows up, reports on revenue and runs your social media, and it only acts within the guardrails you set. Build yours free in Agent Studio.',
        'description': 'A 30-second introduction to Agent Studio by Siamak Kalhor Consulting: name an AI business agent, give it a voice, connect your store, website, inbox and CRM, and let it watch orders, leads and reviews, follow up, report on revenue and run social media within the guardrails you set.',
        'transcript': "Meet the agent that runs your business while you run it. Name it, give it a voice, then connect your store, your website, your inbox, and your CRM. It watches orders, leads, and reviews. It follows up, reports on revenue, and runs your social media. Built for every industry, and it only acts within the guardrails you set. Siamak Kalhor Consulting. Build your agent free at agents.siamakconsulting.com.",
    },
    'agents': {
        'file': 'ai-agents-take-steps', 'seconds': 32, 'date': '2026-10-17T17:00:00-07:00',
        'name': 'AI that talks is everywhere. AI that does the work is rare.',
        'label': 'Watch · 32 seconds',
        'heading': 'An AI agent doesn\'t just answer. <span class="grad">It takes steps.</span>',
        'lead': 'It answers the call, checks the calendar, books the appointment and updates the CRM. And when something needs a person, it knows when to hand it back to you. I design, build and monitor custom AI agents for owner-led and mid-size businesses, the same way I built my own.',
        'description': 'A 32-second explainer narrated by Siamak Kalhor on what separates an AI agent from a chatbot: an agent takes steps (answering the call, checking the calendar, booking the appointment, updating the CRM) and hands the conversation back to a person when it needs one.',
        'transcript': "AI that talks is everywhere. AI that does the work is rare. An AI agent doesn't just answer questions. It takes steps. It answers the call. Checks the calendar. Books the appointment. And updates the CRM. And when something needs a person, it knows when to hand it back to you. I design, build and monitor custom AI agents for owner-led and mid-size businesses, the same way I built my own. Want to see what an agent could take off your plate? Start at siamakconsulting.com.",
    },
    'reviews': {
        'file': 'ai-reads-your-reviews', 'seconds': 34, 'date': '2026-10-17T17:00:00-07:00',
        'name': 'Your next customer won\'t read your reviews. AI will.',
        'label': 'Watch · 34 seconds',
        'heading': 'Your next customer won\'t read your reviews. <span class="grad">AI will.</span>',
        'lead': 'When someone asks ChatGPT who is good nearby, it reads your reviews and quotes the specific ones. It looks for three things: specific (what you fixed, in the customer\'s words), recent (this year, not 2019) and everywhere (Google, Yelp and your industry\'s sites).',
        'description': 'A 34-second explainer narrated by Siamak Kalhor on how AI assistants such as ChatGPT read and quote customer reviews, why a specific review beats five stars, and the three things AI looks for: specific, recent and everywhere. Review examples in the video are labelled EXAMPLE.',
        'transcript': "Your next customer won't read your reviews. AI will. When someone asks ChatGPT who's good nearby, it reads your reviews, and it quotes the specific ones. It looks for three things. Specific: what you fixed, in their words. Recent: this year, not 2019. And everywhere: Google, Yelp, and your industry's sites. This week, ask three happy customers to describe what you solved for them. Want to know what AI says about your business? Get a free check at siamakconsulting.com.",
    },
    'automation': {
        'file': 'ai-automation-hours-back', 'seconds': 41, 'date': '2026-10-18T09:30:00-07:00',
        'name': 'Automate the work nobody should be doing by hand.',
        'label': 'Watch · 41 seconds',
        'heading': 'Automate the work nobody should be <span class="grad">doing by hand.</span>',
        'lead': 'Lead replies at 11 PM. Re-typing PDFs into spreadsheets. Chasing the same five follow-ups every week. I find the hours worth reclaiming, build the automation, and keep a human wherever judgment matters.',
        'description': 'A 41-second explainer narrated by Siamak Kalhor on AI automation: software that reads, decides and writes, sorting email, pulling data from documents, drafting replies and qualifying leads. Unlike rule-based automation, it handles messy inputs and makes judgment calls within limits the business sets. The incoming message shown is labelled EXAMPLE.',
        'transcript': "It's 11 PM. A lead just replied, and nobody's awake to answer. Meanwhile, someone on your team is re-typing PDFs into a spreadsheet, chasing the same five follow-ups again. That's not work. That's a job for AI automation. It reads, decides and writes. It sorts the email, pulls the data, drafts the reply, qualifies the lead. Old automation follows fixed rules. AI handles the messy stuff, within limits you set. I find the hours worth reclaiming, build the automation, and keep a human wherever judgment matters. Get your hours back. Start at siamakconsulting.com.",
    },
    'shifts': {
        'file': 'five-shifts', 'seconds': 42, 'date': '2026-10-18T16:30:00-07:00',
        'name': 'Marketing has been reinvented five times. I was there for all of them.',
        'label': 'Watch · 42 seconds',
        'heading': 'Five shifts in forty years. <span class="grad">The principle never changed.</span>',
        'lead': 'I started in marketing before the internet existed, when the Yellow Pages decided who got the call. Then came websites, Google, the phone in your pocket and social media. Each time most businesses waited, and the ones who moved early won for a decade. AI answers are the fifth shift.',
        'description': 'A 42-second film narrated by Siamak Kalhor on the five times marketing has been reinvented during his 40-year career: websites, search, mobile, social media and now AI answers, and the principle that held through all of them: be clear, be trusted, be everywhere your customer looks. The Yellow Pages listings shown are labelled EXAMPLE.',
        'transcript': "I started in marketing before the internet existed. Back then, the Yellow Pages decided who got the call. Then came websites. Then Google. Then the phone in your pocket. Then social media. Every time, most businesses waited. And every time, the ones who moved early won for a decade. Now it's happening a fifth time. Customers don't search. They ask AI. And it answers with a few names. Forty years taught me one thing: the tools change, the principle doesn't. Be clear, be trusted, be everywhere your customer looks. Strategy that outlives the algorithm. Start at siamakconsulting.com.",
    },
    'shifts-fa': {
        'file': 'five-shifts-fa', 'seconds': 51, 'date': '2026-10-18T16:30:00-07:00', 'lang': 'fa',
        'name': 'پنج بار بازاریابی از نو تعریف شد. من همه‌اش را دیدم.',
        'label': 'تماشا کنید · ۵۱ ثانیه',
        'heading': 'پنج تغییر در چهل سال',
        'lead': '',
        'description': 'فیلم کوتاه فارسی با صدای سیامک کلهر درباره‌ی پنج باری که بازاریابی در چهل سال کار او از نو تعریف شد: وب‌سایت، جست‌وجو، موبایل، شبکه‌های اجتماعی و اکنون پاسخ‌های هوش مصنوعی، و اصلی که در همه‌ی آن‌ها ثابت ماند: واضح باش، قابل اعتماد باش، همه‌جا باش.',
        'transcript': 'من قبل از اینکه اینترنت وجود داشته باشه، بازاریابی رو شروع کردم. اون موقع، صفحات زرد تعیین می‌کرد تلفن کی زنگ بخوره. بعد وب‌سایت‌ها اومدن. بعد گوگل. بعد گوشی توی جیب‌مون. بعد شبکه‌های اجتماعی. هر بار، بیشتر کسب‌وکارها صبر کردن. و هر بار، اونایی که زودتر حرکت کردن، تا ده سال برنده بودن. حالا برای پنجمین بار داره اتفاق می‌افته. مشتری دیگه جست‌وجو نمی‌کنه. از هوش مصنوعی می‌پرسه. و جوابش فقط چند تا اسمه. چهل سال یه چیز رو به من یاد داد: ابزارها عوض می‌شن، اصل ماجرا نه. واضح باش، قابل اعتماد باش، و همه‌جایی باش که مشتری نگاه می‌کنه. استراتژی‌ای که از الگوریتم عمر بیشتری داره. از siamakconsulting.com شروع کنید.',
    },
    'nobody-fa': {
        'file': 'nobody-searches-fa', 'seconds': 37, 'date': '2026-10-18T09:00:00-07:00', 'lang': 'fa',
        'name': 'دیگه کسی گوگل نمی‌کنه. می‌پرسن.',
        'label': 'تماشا کنید · ۳۷ ثانیه',
        'heading': 'دیگه کسی گوگل نمی‌کنه. <span class="grad">می‌پرسن.</span>',
        'lead': 'مشتری امروز از هوش مصنوعی می‌پرسد و یک پاسخ با چند اسم می‌گیرد. اگر اسم شما در آن نباشد، آن مشتری هرگز شما را نمی‌بیند.',
        'description': 'ویدیوی کوتاه فارسی با صدای سیامک کلهر و زیرنویس فارسی و انگلیسی: چرا مشتریان به‌جای جست‌وجو از هوش مصنوعی می‌پرسند و هوش مصنوعی کدام کسب‌وکارها را نام می‌برد — سایتی که به پرسش‌های واقعی جواب بدهد، حرفی که دیگران درباره‌ی شما می‌زنند و اطلاعات یکسان در همه‌جا.',
        'transcript': 'دیگه کسی گوگل نمی‌کنه. می‌پرسن. مشتری از هوش مصنوعی می‌پرسه: یه دندون‌پزشک خوب نزدیک من کیه؟ و فقط یه جواب می‌گیره، با سه تا اسم. اگه اسم شما توش نباشه، اون مشتری هیچ‌وقت شما رو نمی‌بینه. خب، هوش مصنوعی کی رو اسم می‌بره؟ یک: کسی که سایتش به سؤال‌های واقعی مشتری جواب بده. دو: کسی که بقیه درباره‌ش حرف می‌زنن. سه: کسی که اطلاعاتش همه‌جا یکسانه. می‌خواید بدونید هوش مصنوعی درباره‌ی کسب‌وکار شما چی می‌گه؟ بررسی رایگان در siamakconsulting.com.',
    },

}

CSS = ('<style id="vid-css">.vid-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:48px;align-items:center}'
       '.vid{margin:0;justify-self:center;width:100%;max-width:360px}'
       '.vid video{display:block;width:100%;height:auto;aspect-ratio:9/16;border-radius:22px;border:1px solid var(--line-bright,#2a3446);background:#05070b;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(45,212,255,.12)}'
       '.vid figcaption{font-size:13.5px;color:var(--muted-dim,#7c8796);margin-top:10px;text-align:center}.vid figcaption a{color:var(--cyan,#2dd4ff);text-decoration:underline;text-underline-offset:3px}'
       '.vid.vid-in{margin:34px auto 30px}'
       '.vid-lite{display:block;position:relative;width:100%;aspect-ratio:9/16;padding:0;margin:0;border-radius:22px;overflow:hidden;cursor:pointer;border:1px solid var(--line-bright,#2a3446);background:#05070b;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(45,212,255,.12)}'
       '.vid-lite img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}'
       '.vid-lite .vplay{position:absolute;left:50%;top:50%;width:76px;height:76px;margin:-38px 0 0 -38px;border-radius:50%;background:rgba(5,7,11,.55);border:1px solid rgba(255,255,255,.45);backdrop-filter:blur(6px);transition:transform .2s}'
       '.vid-lite .vplay:after{content:"";position:absolute;left:31px;top:24px;border-style:solid;border-width:14px 0 14px 22px;border-color:transparent transparent transparent #fff}'
       '.vid-lite:hover .vplay{transform:scale(1.08)}'
       '@media(max-width:860px){.vid-grid{grid-template-columns:minmax(0,1fr);gap:28px}}</style>'
       '<script id="vid-js">document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".vid-lite");if(!b)return;e.preventDefault();'
       'var v=document.createElement("video");v.controls=true;v.setAttribute("playsinline","");v.preload="auto";v.poster=b.getAttribute("data-poster");'
       'v.setAttribute("aria-label",b.getAttribute("aria-label")||"");v.src=b.getAttribute("data-src");b.parentNode.replaceChild(v,b);var p=v.play();if(p&&p.catch)p.catch(function(){});});</script>')


def schema(key):
    v = VIDEOS[key]
    d = {'@context': 'https://schema.org', '@type': 'VideoObject', 'name': v['name'], 'description': v['description'],
            'thumbnailUrl': f"{SITE}/videos/{v['file']}.jpg", 'contentUrl': f"{SITE}/videos/{v['file']}.mp4",
            'uploadDate': v.get('date', '2026-10-14T09:00:00-07:00'), 'duration': f"PT{v['seconds']}S", 'inLanguage': v.get('lang', 'en'),
            'publisher': {'@id': SITE + '/#business'}, 'creator': {'@id': SITE + '/#business'}}
    if v.get('transcript'):
        d['transcript'] = v['transcript']
    return d


def watch(v):
    return 'متن کامل و صفحه‌ی ویدیو' if v.get('lang') == 'fa' else 'Watch page and transcript'


def player(v):
    """A click-to-play poster. The <video> element is created only when someone presses play, so this page
    carries no video markup for Google: the video is indexed on its own watch page (/videos/<file>) instead,
    which is what Search Console's "Video isn't on a watch page" asks for."""
    f = v['file']
    return (f'<button type="button" class="vid-lite" data-src="/videos/{f}.mp4" data-poster="/videos/{f}.jpg" aria-label="Play video: {esc(v["name"])}">'
            f'<img src="/videos/{f}.jpg" alt="{esc(v["name"])}" width="720" height="1280" loading="lazy"><span class="vplay" aria-hidden="true"></span></button>')


def section(key, extra=''):
    v = VIDEOS[key]
    f = v['file']
    return (f'<!-- VIDEO:{key} -->\n<section id="video-{key}"><div class="wrap"><div class="vid-grid"><div>'
            f'<div class="sec-label">{esc(v["label"])}</div><h2 class="sec-h">{v["heading"]}</h2>'
            f'<p class="lead" style="color:var(--muted)">{esc(v["lead"])}</p>{extra}</div>'
            f'<figure class="vid">{player(v)}<figcaption>{esc(v["name"])} · <a href="/videos/{f}">{watch(v)}</a></figcaption></figure>'
            f'</div></div></section>\n<!-- /VIDEO:{key} -->\n')


def inline(key):
    """A captioned video figure for article-style pages (no section heading)."""
    v = VIDEOS[key]
    f = v['file']
    return (f'<!-- VIDEO:{key} -->\n<figure class="vid vid-in">{player(v)}<figcaption>{esc(v["name"])} · {esc(v["label"].split("·")[-1].strip())} · <a href="/videos/{f}">{watch(v)}</a></figcaption></figure>\n'
            f'<!-- /VIDEO:{key} -->\n')
