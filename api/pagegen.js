const { guard } = require('./_guard');
// Landing-page generator for the free Online Presence Report (/website-audit).
// The page builds the prompt from the visitor's own report and asks for one
// complete HTML page per call (four versions). This endpoint did not exist,
// so the "4 real upgraded landing pages" step always failed.
// Returns Anthropic's native shape: { content: [{ type: 'text', text }] }.
module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'pagegen', limit: 24, window: 3600 }))) return;
  const fail = (msg) => res.status(200).json({ error: msg, content: [] });
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return fail('Page generation is not set up yet.');
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const msgs = Array.isArray(body && body.messages) ? body.messages : [];
    const prompt = msgs.length && typeof msgs[msgs.length - 1].content === 'string' ? msgs[msgs.length - 1].content : '';
    if (!prompt || prompt.length > 20000) return fail('Invalid request.');
    // The prompt must be the audit page's own template, not arbitrary use.
    if (!/Siamak Kalhor Consulting/.test(prompt) || !/<!DOCTYPE html>/.test(prompt)) return fail('Invalid request.');

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 110000);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 8000, messages: [{ role: 'user', content: prompt }] })
    });
    clearTimeout(timer);
    const data = await r.json();
    if (!r.ok) { console.error(JSON.stringify({ source: 'pagegen', status: r.status, error: data && data.error })); return fail('The page builder is busy. Please try again.'); }
    let text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();
    if (data.stop_reason === 'max_tokens' && !/<\/html>\s*$/i.test(text)) text += '\n</body></html>';
    return res.status(200).json({ content: [{ type: 'text', text }] });
  } catch (e) {
    console.error(JSON.stringify({ source: 'pagegen', error: e.message }));
    return fail(e.name === 'AbortError' ? 'The page took too long to build. Please try again.' : 'Page builder error.');
  }
};
