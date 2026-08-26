const { guard } = require('./_guard');
// AI Advisor endpoint — powers the multilingual voice consultant at /voice-consultant/
// The page POSTs { model, max_tokens, system, messages } and expects Anthropic's
// native response shape back: { content: [{ type: 'text', text: '...' }] }
module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'advisor', limit: 40, window: 3600 }))) return;

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        content: [{ type: 'text', text: "The AI advisor isn't set up yet. Please call Siamak at 323-657-7752 and he'll help you directly." }]
      });
    }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== 'object') body = {};

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) {
      return res.status(200).json({
        content: [{ type: 'text', text: 'Please ask a question and I&apos;ll help.' }]
      });
    }

    // Cap sizes so a bad client can't run up cost
    const maxTokens = Math.min(parseInt(body.max_tokens, 10) || 800, 1500);
    const system = typeof body.system === 'string' ? body.system.slice(0, 8000) : '';
    const safeMessages = messages.slice(-10).map(function (m) {
      return {
        role: m && m.role === 'assistant' ? 'assistant' : 'user',
        content: typeof m.content === 'string' ? m.content.slice(0, 4000) : ''
      };
    }).filter(function (m) { return m.content; });

    const payload = {
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: safeMessages
    };
    if (system) payload.system = system;

    const ctrl = new AbortController();
    const timer = setTimeout(function () { ctrl.abort(); }, 25000);

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });
    clearTimeout(timer);

    if (!upstream.ok) {
      const detail = await upstream.text().catch(function () { return ''; });
      console.error('Anthropic API error', upstream.status, detail.slice(0, 300));
      return res.status(200).json({
        content: [{ type: 'text', text: "I couldn't reach the AI service just now. Please try again in a moment, or call Siamak at 323-657-7752." }]
      });
    }

    const data = await upstream.json();
    // Pass through the native shape the page expects.
    return res.status(200).json(data);

  } catch (err) {
    console.error('api/claude failure:', err && err.message);
    return res.status(200).json({
      content: [{ type: 'text', text: "Something went wrong on my end. Please try again, or call Siamak at 323-657-7752." }]
    });
  }
};
