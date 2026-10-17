// The Long View Letter: one entry per issue. api/letter.js reads this file once a day.
//
// status 'draft'    nothing is sent
// status 'preview'  sent once to Siamak only, with [PREVIEW] in the subject
// status 'send'     sent once to every confirmed subscriber, on or after `date`
//
// {{first}} is replaced with the reader's first name ("there" if unknown).
// Keep `html` and `text` saying the same thing.

module.exports = [
  {
    id: '2026-11',
    date: '2026-11-03',
    status: 'preview',
    subject: 'Nobody searches anymore. They ask.',
    html:
      '<p>Hi {{first}},</p>' +
      '<p>Something changed this year in how customers find a business, and most owners I talk to haven\'t noticed yet.</p>' +
      '<p>People used to search Google, scan ten blue links and maybe read a few reviews. More and more of them now ask ChatGPT, Gemini or Google\'s AI a full question: "Who\'s a good dentist near me who takes my insurance?" They get one short answer with two or three names in it. If your business isn\'t one of those names, that customer never sees you.</p>' +
      '<p>That shifts where the effort should go:</p>' +
      '<ul>' +
      '<li><b>Your website has to answer questions, not just look good.</b> AI tools quote pages that state plainly who you are, what you do, where, and for whom.</li>' +
      '<li><b>What others say about you counts more.</b> Directories, associations, press and reviews are where AI checks whether you\'re real and trusted.</li>' +
      '<li><b>Consistency wins.</b> If your hours, address or services differ from one site to the next, AI tends to leave you out rather than guess.</li>' +
      '</ul>' +
      '<p>One thing to try this week: ask ChatGPT the question your best customer would ask, the way they\'d ask it. Are you in the answer? Is what it says about you right?</p>' +
      '<p>I wrote the full story, including what this means for Google clicks, Yelp, reviews and Shopify apps, here: ' +
      '<a href="https://siamakconsulting.com/the-long-view/nobody-searches-anymore" style="color:#5b2bd6">Nobody searches anymore. They ask.</a></p>' +
      '<p>And if you\'d like to see how AI sees your business today, there\'s a free check at ' +
      '<a href="https://siamakconsulting.com/audit" style="color:#5b2bd6">siamakconsulting.com/audit</a>. Reply to this email with any question; I read every one.</p>' +
      '<p>Siamak</p>',
    text:
      'Hi {{first}},\n\n' +
      'Something changed this year in how customers find a business, and most owners I talk to haven\'t noticed yet.\n\n' +
      'People used to search Google, scan ten blue links and maybe read a few reviews. More and more of them now ask ChatGPT, Gemini or Google\'s AI a full question: "Who\'s a good dentist near me who takes my insurance?" They get one short answer with two or three names in it. If your business isn\'t one of those names, that customer never sees you.\n\n' +
      'That shifts where the effort should go:\n\n' +
      '- Your website has to answer questions, not just look good. AI tools quote pages that state plainly who you are, what you do, where, and for whom.\n' +
      '- What others say about you counts more. Directories, associations, press and reviews are where AI checks whether you\'re real and trusted.\n' +
      '- Consistency wins. If your hours, address or services differ from one site to the next, AI tends to leave you out rather than guess.\n\n' +
      'One thing to try this week: ask ChatGPT the question your best customer would ask, the way they\'d ask it. Are you in the answer? Is what it says about you right?\n\n' +
      'The full story, including what this means for Google clicks, Yelp, reviews and Shopify apps:\nhttps://siamakconsulting.com/the-long-view/nobody-searches-anymore\n\n' +
      'Free check of how AI sees your business: https://siamakconsulting.com/audit\n\n' +
      'Reply with any question; I read every one.\n\nSiamak'
  }
];
