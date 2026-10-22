"""Site videos: one definition per clip, rendered as a section with VideoObject schema.

Used by build-agency.py and by add-videos.py (for hand-written pages).
Files live in /videos/ (H.264 720x1280, faststart) with a JPEG poster beside each.
"""
import html, json

SITE = 'https://siamakconsulting.com'
esc = lambda s: html.escape(s, quote=True)

VIDEOS = {
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
       '.vid figcaption{font-size:13.5px;color:var(--muted-dim,#7c8796);margin-top:10px;text-align:center}'
       '.vid.vid-in{margin:34px auto 30px}'
       '@media(max-width:860px){.vid-grid{grid-template-columns:minmax(0,1fr);gap:28px}}</style>')


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


def section(key, extra=''):
    v = VIDEOS[key]
    f = v['file']
    return (f'<!-- VIDEO:{key} -->\n<section id="video-{key}"><div class="wrap"><div class="vid-grid"><div>'
            f'<div class="sec-label">{esc(v["label"])}</div><h2 class="sec-h">{v["heading"]}</h2>'
            f'<p class="lead" style="color:var(--muted)">{esc(v["lead"])}</p>{extra}</div>'
            f'<figure class="vid"><video controls playsinline preload="none" poster="/videos/{f}.jpg" width="720" height="1280" aria-label="{esc(v["name"])}">'
            f'<source src="/videos/{f}.mp4" type="video/mp4"></video><figcaption>{esc(v["name"])} · <a href="/videos/{f}">{watch(v)}</a></figcaption></figure>'
            f'</div></div></section>\n<!-- /VIDEO:{key} -->\n')


def inline(key):
    """A captioned video figure for article-style pages (no section heading)."""
    v = VIDEOS[key]
    f = v['file']
    return (f'<!-- VIDEO:{key} -->\n<figure class="vid vid-in"><video controls playsinline preload="none" poster="/videos/{f}.jpg" width="720" height="1280" aria-label="{esc(v["name"])}">'
            f'<source src="/videos/{f}.mp4" type="video/mp4"></video><figcaption>{esc(v["name"])} · {esc(v["label"].split("·")[-1].strip())} · <a href="/videos/{f}">{watch(v)}</a></figcaption></figure>\n'
            f'<!-- /VIDEO:{key} -->\n')
