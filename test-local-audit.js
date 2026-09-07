const src = require('fs').readFileSync('api/local-audit.js', 'utf8');
const body = src.replace(/^const \{ guard \}.*$/m, '')
                .replace(/^module\.exports[\s\S]*$/m, '');
// eval intact, then hand back the helpers as the final expression
const F = eval(body + '\n;({normalize, mentions, collectSources, textOf, buildPrompts, containsPhrase});');

let pass = 0, fail = 0;
const ok = (n, c) => { c ? (pass++, console.log('  PASS', n)) : (fail++, console.log('  FAIL', n)); };

console.log('\n[1] name matching');
ok('exact name', F.mentions('I recommend Sunland Dental Care for families.', 'Sunland Dental Care', ''));
ok('shortened name', F.mentions('Try Sunland Dental on Foothill.', 'Sunland Dental Care Inc', ''));
ok('punctuation differs', F.mentions('Mr. Chile Taproom is great', 'Mr Chile Taproom', ''));
ok('domain fallback', F.mentions('see howardconstructioninc.com', 'Howard Construction Co', 'https://www.howardconstructioninc.com'));
ok('no false positive', !F.mentions('Try Valley Dental Group instead.', 'Sunland Dental Care', ''));
ok('generic single-word name needs a domain', !F.mentions('a dental office', 'Dental', '', 'dentist dental'));
ok('generic name still matches on domain', F.mentions('see sunlanddentalcare.com', 'Dental', 'https://www.sunlanddentalcare.com', 'dental'));
ok('no substring bleed (dental vs dentalworks)', !F.mentions('DentalWorks is popular', 'Dental Care', '', 'dentist'));
ok('real name unaffected by category arg', F.mentions('Sunland Dental Care is great', 'Sunland Dental Care', '', 'dentist'));
ok('case insensitive', F.mentions('SUNLAND DENTAL CARE', 'Sunland Dental Care', ''));

console.log('\n[2] source collection');
const content = [
  { type: 'web_search_tool_result', content: [
      { url: 'https://www.yelp.com/biz/x', title: 'Yelp' },
      { url: 'https://www.yelp.com/biz/y', title: 'Yelp' },
      { url: 'https://maps.google.com/z', title: 'Maps' } ] },
  { type: 'text', text: 'Answer', citations: [ { url: 'https://patch.com/article', title: 'Patch' } ] }
];
const s = F.collectSources(content);
ok('dedupes by host', s.length === 3);
ok('counts repeats', s[0].host === 'yelp.com' && s[0].count === 2);
ok('strips www', s.every(x => !x.host.startsWith('www.')));
ok('reads citations on text blocks', s.some(x => x.host === 'patch.com'));
ok('ignores malformed urls', F.collectSources([{ type: 'text', citations: [{ url: 'not-a-url' }] }]).length === 0);
ok('handles empty content', F.collectSources([]).length === 0 && F.collectSources(null).length === 0);

console.log('\n[3] prompts');
const p = F.buildPrompts('dentist', 'Sunland', '');
ok('three prompts', p.length === 3);
ok('city interpolated', p.every(x => x.includes('Sunland')));
ok('no undefined leaks', p.every(x => !x.includes('undefined')));
ok('neighborhood used when given', F.buildPrompts('dentist','Los Angeles','Silver Lake').some(x => x.includes('Silver Lake')));

console.log('\n[4] text extraction');
ok('joins text blocks only', F.textOf([{type:'text',text:'a'},{type:'web_search_tool_result'},{type:'text',text:'b'}]) === 'a\nb');
ok('empty is safe', F.textOf(null) === '');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
