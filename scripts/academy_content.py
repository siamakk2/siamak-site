# Lesson content for the S.C.A.L.E. Academy (/academy).
# Each lesson: slug, letter, stage, score, title, minutes, summary (meta description,
# 120-160 chars), body (HTML), takeaways, exercise (list of prompts saved in the
# student's browser).

LESSONS = [
{
 'n': 1, 'letter': '1', 'stage': 'Foundations', 'score': 'All five scores',
 'title': 'The answer economy',
 'h1': 'Week 1: The answer economy',
 'minutes': 25,
 'summary': 'How ChatGPT, Gemini, Claude and Perplexity decide which businesses to recommend, and the five-stage S.C.A.L.E. system for earning that spot.',
 'body': '''
<p class="lede">Customers used to search, scroll a list of links and compare. Now many of them ask an AI assistant, and it answers with two or three names. If your business is not one of them, the customer may never see your website at all.</p>

<h2>What changed</h2>
<p>A search engine shows a ranked list and lets the customer decide. An AI assistant such as ChatGPT, Gemini, Claude or Perplexity does the comparing itself and gives one answer. That answer is built from what the model can read about you: your website, your profiles, directories, articles and reviews that mention you.</p>
<p>So the question is no longer only "do we rank?" It is "when a customer describes their problem to an AI, does it name us, and does it describe us correctly?"</p>

<h2>Why good businesses go invisible</h2>
<p>In practice, excellent businesses are left out for three reasons, and the quality of their work is rarely one of them:</p>
<ul>
<li><b>Unreadable.</b> The AI cannot reach or parse the site: crawlers are blocked, the words only appear after scripts run, or the page has almost no text.</li>
<li><b>Unclear.</b> The site has a slogan where a description should be. The model cannot say what the business does, for whom, or where.</li>
<li><b>Unvouched.</b> No trusted sources confirm the business. Competitors are listed and cited; it is not.</li>
</ul>
<p>Siamak saw this with a pediatric neuropsychology practice: elite clinical work, but referrals arrived by accident. A scan found broken links, no AI visibility, and an unserved Farsi-speaking community nearby. The clinical work did not change. The system around it did.</p>

<h2>The S.C.A.L.E. Framework</h2>
<p>S.C.A.L.E. is a five-stage system for fixing those three problems in the right order, then keeping them fixed:</p>
<ol>
<li><b>Scan</b>: an honest audit of what search engines and AI can actually see.</li>
<li><b>Clarify</b>: positioning that a person and a model can both repeat back.</li>
<li><b>Amplify</b>: structured content and schema that put your facts in a form AI can read.</li>
<li><b>Leverage</b>: trust transferred from sources AI already believes.</li>
<li><b>Evaluate</b>: monthly measurement, so the work compounds instead of fading.</li>
</ol>
<p>The order is the method. You cannot amplify what you have not clarified, and you cannot clarify what you have not scanned. Most businesses jump straight to amplifying (more posts, more ads) and spend money making noise.</p>

<h2>Measured, not guessed</h2>
<p>Each stage has a score in the free <a href="https://scale.siamakconsulting.com/" target="_blank" rel="noopener">S.C.A.L.E. app</a>: Visibility, Clarity, Structure, Authority and Momentum. The app runs 30 named checks, and every point is a check rather than an opinion, so you can watch a number move as you work. You will use it every week of this course.</p>
''',
 'takeaways': ['AI assistants now make the shortlist before a customer visits any website.',
               'Businesses are left out for being unreadable, unclear or unvouched, rarely for the quality of their work.',
               'S.C.A.L.E. fixes those in order: Scan, Clarify, Amplify, Leverage, Evaluate.'],
 'exercise': ['Which business will you work on through this course? (Your own, or one you know well.) Write its name and website.',
              'Run the free scan at scale.siamakconsulting.com and write down the five scores.',
              'Write five questions a real customer would ask an AI, without naming the business (for example: "best family dentist in Victoria for nervous kids").',
              'Ask each question in ChatGPT and in Perplexity. Who was named? Was your business? Which sources were cited?',
              'In three sentences: what do the businesses that were named have that yours does not?'],
},
{
 'n': 2, 'letter': 'S', 'stage': 'Scan', 'score': 'Visibility',
 'title': 'Scan: the honest baseline',
 'h1': 'Week 2: Scan, the honest baseline',
 'minutes': 30,
 'summary': 'Week 2 of the S.C.A.L.E. Academy: audit what search engines and AI can actually see, and find the three blockers holding a business back.',
 'body': '''
<p class="lede">Every engagement starts with a Scan. No shortcuts. Before you write a word of new content, measure what search engines and AI systems can actually reach and read today.</p>

<h2>Can AI reach the site?</h2>
<ul>
<li><b>Indexable.</b> A page marked "noindex" tells search engines not to list it. It happens by accident more often than you would think, often left over from when the site was built.</li>
<li><b>AI crawlers allowed.</b> The file at yoursite.com/robots.txt can block the crawlers AI companies use, such as GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot and Google-Extended. If they are blocked, those systems learn about you only second-hand.</li>
<li><b>Sitemap.</b> A sitemap.xml lists your key pages so crawlers find them all.</li>
</ul>

<h2>Can AI read it?</h2>
<ul>
<li><b>Words in the HTML.</b> Some site builders draw the text with scripts after the page loads. People see it; many crawlers see an empty page. The app checks whether your main text is in the page itself.</li>
<li><b>Enough words.</b> A home page with a slogan, three photos and a button gives a model nothing to work with.</li>
<li><b>Title and description.</b> The page title (shown in the browser tab and search results) and the meta description (the summary under it) should exist and be a sensible length: titles under about 60 characters, descriptions about 120 to 160.</li>
<li><b>Canonical address.</b> The page should declare its one official web address, so copies of it are not treated as separate pages.</li>
</ul>

<h2>Look beyond the website</h2>
<p>AI also reads your listings. Search the business name on Google and Maps, then check Apple Maps, Bing Places, Yelp or the main directory for your industry, and your social profiles. Is the business there? Are the name, address and phone number exactly the same everywhere? Inconsistent details make a model less sure it is the same business.</p>

<h2>Name the blockers</h2>
<p>A Scan ends with a short list: the three problems that hold the business back most, in order of impact. The most common ones are not subtle: a blocked crawler, a site whose words only appear after scripts run, or a business name spelled three ways across the web. Fix blockers before anything else; nothing later in S.C.A.L.E. works without them.</p>
''',
 'takeaways': ['First check that search engines and AI can reach the site: indexable, crawlers allowed, sitemap.',
               'Then check they can read it: real text in the HTML, a clear title, description and canonical address.',
               'Listings count too: the same name, address and phone everywhere.'],
 'exercise': ['Open yoursite.com/robots.txt. Are GPTBot, ClaudeBot, PerplexityBot or Google-Extended blocked? Paste what you see.',
              'From your scan results: which Visibility checks failed?',
              'List where the business appears outside its website (Google, Maps, directories, social). Note any place where the name, address or phone differ.',
              'Write the three biggest blockers, most important first, one sentence each.'],
},
{
 'n': 3, 'letter': 'C', 'stage': 'Clarify', 'score': 'Clarity',
 'title': 'Clarify: say it so a model can repeat it',
 'h1': 'Week 3: Clarify, say it so a model can repeat it',
 'minutes': 30,
 'summary': 'Week 3 of the S.C.A.L.E. Academy: define your Business DNA and write positioning that a customer and an AI can both repeat back correctly.',
 'body': '''
<p class="lede">An AI can only recommend you for what it understands you to be. "Quality you can trust" tells a model nothing. "Family dental clinic in Saanich offering same-week emergency appointments" is something it can repeat.</p>

<h2>Start with Business DNA</h2>
<p>Before positioning, write down the canonical facts that everything else builds on. Siamak calls this the business's DNA:</p>
<ul>
<li>The official name, exactly as it should appear everywhere</li>
<li>What it does, in one plain sentence</li>
<li>Who it serves</li>
<li>Where: city, neighbourhoods, service area</li>
<li>What makes it different, in terms you can prove (not "best quality")</li>
<li>Proof: years open, licences, certifications, notable clients</li>
</ul>
<p>When these facts are consistent across your site and listings, a model can confidently connect them to your name.</p>

<h2>One positioning sentence</h2>
<p>Fill in this formula, then cut it to 25 words or fewer:</p>
<blockquote>[Business] is a [category] in [place] that helps [customer] [result], unlike [alternative], because [proof].</blockquote>
<p>The category and the place matter most. They are how customers phrase their questions, so they are how an AI matches you to them.</p>

<h2>Put it on the front page</h2>
<ul>
<li><b>One main heading (H1)</b> that states the role, not a slogan. "Emergency plumbing in Victoria, 24/7" beats "Your trusted partner".</li>
<li><b>A page title</b> under 60 characters: service, place, name.</li>
<li><b>A meta description</b> of 120 to 160 characters that includes a reason to choose you.</li>
<li><b>A share title</b> (what shows when the link is shared) that agrees with the page title.</li>
</ul>

<h2>Test it</h2>
<p>Paste your positioning sentence into ChatGPT and ask: "In one sentence, what does this business do and who is it for?" If the answer does not match what you meant, the sentence is not clear yet. Revise and test again. Ask the AI tutor on this page to critique your draft.</p>
''',
 'takeaways': ['Write the Business DNA first: name, what, who, where, difference, proof.',
               'One positioning sentence; the category and place do the matching.',
               'The main heading, title and description say what you do, not a slogan.'],
 'exercise': ['Fill in the Business DNA: official name; what it does; who it serves; where; what makes it different; proof.',
              'Write your positioning sentence with the formula, then cut it to 25 words or fewer.',
              'Write a new main heading (H1), page title (under 60 characters) and meta description (120 to 160 characters).',
              'Paste the sentence into ChatGPT and ask what the business does. Paste its answer. Did it match?'],
},
{
 'n': 4, 'letter': 'A', 'stage': 'Amplify', 'score': 'Structure',
 'title': 'Amplify: facts in a form AI can read',
 'h1': 'Week 4: Amplify, facts in a form AI can read',
 'minutes': 35,
 'summary': 'Week 4 of the S.C.A.L.E. Academy: schema (JSON-LD), a quotable FAQ and an llms.txt file that put a business\'s facts where AI can read them.',
 'body': '''
<p class="lede">Now that the facts are clear, put them in a form machines read without guessing. Amplify comes after Clarify for a reason: structure only helps when the facts inside it are right and consistent.</p>

<h2>Schema: your business card for machines</h2>
<p>Schema is a small block of code in the page, written in a format called JSON-LD, that states facts directly: this is a dentist, this is its address, this is its phone, these are its official profiles. Search engines and AI systems read it without having to interpret your design. Use the most specific type that fits, such as Restaurant, Dentist, Plumber or LegalService, or LocalBusiness if nothing fits better.</p>
<pre><code>{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "",
  "url": "",
  "telephone": "",
  "address": {"@type": "PostalAddress", "streetAddress": "", "addressLocality": "", "addressRegion": "", "postalCode": "", "addressCountry": ""},
  "areaServed": "",
  "description": "",
  "sameAs": []
}</code></pre>
<p>Fill in only true facts, then check it with the <a href="https://validator.schema.org/" target="_blank" rel="noopener">Schema Markup Validator</a> and Google's <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">Rich Results Test</a>.</p>

<h2>An FAQ customers and AI can quote</h2>
<p>Take the questions from Week 1, the ones real customers ask. Answer each in two to four factual sentences, and make the first sentence the answer itself. AI assistants often quote answers like these. Publish them on the page, and add them as FAQPage schema too.</p>

<h2>llms.txt: an introduction written for AI</h2>
<p>An llms.txt file is a short plain-text page at the root of the site (yoursite.com/llms.txt) that introduces the business to AI systems: your positioning sentence and links to the key pages. It is a newer convention and not every AI system reads it yet, so treat it as a low-cost extra, not a fix on its own.</p>
<pre><code># [Business name]
&gt; [Your positioning sentence from Week 3]

## Key pages
- [Services](https://...): what we offer
- [Contact](https://...): phone, address, hours</code></pre>

<h2>A note on platforms</h2>
<p>Shopify, WordPress, Wix and Squarespace each have their own place to add code or an FAQ block. The S.C.A.L.E. app gives platform-specific steps with each fix. Never publish changes to a business's site without the owner's approval.</p>
''',
 'takeaways': ['Schema (JSON-LD) states the business\'s facts directly; use the most specific type and validate it.',
               'An FAQ whose answers start with the answer is easy for AI to quote.',
               'llms.txt is a cheap extra introduction for AI, not a substitute for the rest.'],
 'exercise': ['Which schema type fits the business best (for example Restaurant, Dentist, Plumber, LocalBusiness)?',
              'Fill in the schema template with true facts and paste it here. Did it pass the validator?',
              'Write six customer questions with answers that start with the answer.',
              'Draft the business\'s llms.txt.'],
},
{
 'n': 5, 'letter': 'L', 'stage': 'Leverage', 'score': 'Authority',
 'title': 'Leverage: trust that scales beyond you',
 'h1': 'Week 5: Leverage, trust that scales beyond you',
 'minutes': 30,
 'summary': 'Week 5 of the S.C.A.L.E. Academy: map the sources AI trusts, close citation gaps and build a 90-day plan to earn authority honestly.',
 'body': '''
<p class="lede">AI assistants repeat what trusted sources say. Your own website can only claim things; other sources confirm them. Leverage is about systematically earning that confirmation.</p>

<h2>Build a citation map</h2>
<p>Go back to the questions you asked in Week 1. Perplexity shows its sources, and ChatGPT often does when it searches. List the sites they cited: directories, review sites, local media, industry associations, "best of" articles. For each, note whether competitors appear there and whether your business does. That list is your shortlist of where to be.</p>

<h2>Profiles that confirm who you are</h2>
<p>Official profiles help a model connect the dots: this website, this Google listing and this LinkedIn page are the same business. Make sure each exists and has consistent details, then list them in the schema's <code>sameAs</code> field from Week 4.</p>
<ul>
<li>Google Business Profile</li>
<li>LinkedIn company page</li>
<li>Industry association or licensing body listing</li>
<li>Chamber of commerce or local business directory</li>
<li>The main social account the business actually uses</li>
</ul>

<h2>Trust transfer</h2>
<p>The strongest authority comes from people and organisations whose recommendation already carries weight: referral partners, suppliers, community groups, local journalists. For each one, ask what is in it for them, and what the first small step is. A guest article, a joint event, a supplier's "where to buy" page or a partner's referral list each create a real, earned mention.</p>

<h2>Earned only</h2>
<p>Never buy fake reviews or invent testimonials. Beyond being wrong, and against the rules of every review platform, it backfires: AI systems cross-check sources, and inconsistent or inflated claims lower trust.</p>

<h2>A 90-day plan</h2>
<p>Turn the map into three months of work: what gets fixed or claimed in month one, which partners you approach in month two, what you publish or earn in month three, and how you will know it worked.</p>
''',
 'takeaways': ['The sources AI cites for your customers\' questions are your shortlist of where to appear.',
               'Consistent official profiles, linked from schema, confirm who you are.',
               'Authority is earned through partners and real mentions; never fake reviews.'],
 'exercise': ['List five sources AI cited for your customer questions. Is a competitor there? Is the business there?',
              'Which official profiles exist, and which are missing or inconsistent?',
              'Name three partners whose recommendation would carry weight, what is in it for them, and the first step.',
              'Write the 90-day plan: month 1, month 2, month 3, and how you will measure it.'],
},
{
 'n': 6, 'letter': 'E', 'stage': 'Evaluate', 'score': 'Momentum',
 'title': 'Evaluate: measure, refine, compound',
 'h1': 'Week 6: Evaluate, measure, refine, compound',
 'minutes': 25,
 'summary': 'Week 6 of the S.C.A.L.E. Academy: measure what changed, set up a monthly routine with tracked AI questions, and earn your certificate.',
 'body': '''
<p class="lede">Growth that is not measured fades. Evaluate turns the first five weeks into a system that keeps compounding, and tells you honestly what worked.</p>

<h2>Rescan</h2>
<p>Run the S.C.A.L.E. app again on the same page and compare it with your Week 1 scores. In the app, Momentum is the change between your monthly scans, so it appears once you have two. Which scores moved? Which checks now pass?</p>

<h2>A tracked set of questions</h2>
<p>Pick ten questions real customers ask: your five from Week 1 plus five new ones. Every month, ask each in ChatGPT and Perplexity and record whether the business is named and which sources are cited. Keep the wording identical each month so the results are comparable.</p>
<p>Be honest about timing. AI answers change slowly and vary from one run to the next. Six weeks can move the app's scores; it may not yet move what an AI says. Report what moved and what has not yet, rather than claiming success early.</p>

<h2>The monthly routine</h2>
<ol>
<li>Rescan on the first of the month.</li>
<li>Re-ask the ten questions and log the results.</li>
<li>Log new reviews, citations and where inquiries came from.</li>
<li>Pick the next fix, then start the cycle again at Scan.</li>
</ol>
<p>That loop is the point of the fifth stage: each month's Evaluate becomes the next month's Scan, and small improvements compound.</p>

<h2>Your capstone</h2>
<p>Put it together as one plan for the business: the baseline and the blockers, the positioning and front-page rewrites, the schema, FAQ and llms.txt, the citation map and 90-day plan, and the monthly routine. When you have it, mark this week complete and claim your certificate below.</p>
''',
 'takeaways': ['Rescan and compare; Momentum shows the change between monthly scans.',
               'Track ten customer questions with identical wording every month.',
               'Report honestly: scores move faster than AI answers do.'],
 'exercise': ['Your rescan scores: Visibility, Clarity, Structure, Authority, overall. What changed since Week 1?',
              'Write your ten tracked questions.',
              'What will you do on the first of each month?',
              'Capstone: summarise your full S.C.A.L.E. plan for the business in a few paragraphs.'],
},
]
