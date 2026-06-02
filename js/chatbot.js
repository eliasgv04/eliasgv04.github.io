/**
 * Chatbot de Elías González
 * Llama al endpoint proxy /api/chat — la API key está en variables de entorno de Netlify
 */

(function () {
  'use strict';

  // En local (config.local.js) llama a Groq directamente.
  // En producción (Netlify) usa el proxy seguro /api/chat.
  const LOCAL_KEY = window.__GROQ_KEY || null;
  const GROQ_URL  = 'https://api.groq.com/openai/v1/chat/completions';
  const PROXY_URL = '/api/chat';

  const messagesEl = document.getElementById('chatMessages');
  const inputEl    = document.getElementById('chatInput');
  const sendBtn    = document.getElementById('chatSend');

  if (!messagesEl || !inputEl || !sendBtn) return;

  let history  = [];
  let waiting  = false;
  let msgCount = 0;

  // ── System prompt ────────────────────────────────────────
  const SYSTEM = `Eres el asistente de Elías González, un Full-Stack Developer. Habla en primera persona como si fueras Elías.

PERFIL:
- Estudiante en UCLM (Ingeniería Informática, 2022-2026)
- Prácticas en Minsait 2026: Spring Boot + Angular, testing JUnit/Karma/Jasmine
- Inglés B2 Cambridge certificado
- Disponible para ofertas Full-Stack en España

STACK: Spring Boot (88%), Java (85%), Python (72%), Angular (90%), JavaScript (80%), HTML/CSS (92%), JUnit/Karma/Jasmine, MySQL/MongoDB/Oracle, Git/GitHub, Jenkins, Jira, Claude, GitHub Copilot, Swift

PROYECTOS: Spotify to Vinyl (Python, HTML, SQL), InvenCloud (gestión ferretería), Curso Swift (SwiftUI), este portafolio

CONTACTO: eliasgonzalezvaldepenas@gmail.com | github.com/eliasgv04

REGLAS:
- Respuestas concisas (máx 150 palabras)
- Tono cercano y profesional
- Usa bullets si hay varios puntos
- Termina con una pregunta breve para continuar la conversación
- Si no sabes algo específico di que pregunta directamente a Elías por email`;

  // ── Render helpers ───────────────────────────────────────
  function addMsg(text, isUser = false, isHTML = false) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-message ' + (isUser ? 'user-message' : 'bot-message');

    const bubble = document.createElement('div');
    bubble.className = 'message-content';
    if (isHTML) bubble.innerHTML = text;
    else bubble.textContent = text;

    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-message bot-message';
    wrap.id = 'typing-indicator';
    wrap.innerHTML = '<div class="message-content loading"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('typing-indicator')?.remove();
  }

  function fallbackHTML() {
    return `<div class="error-message">
      <p>⚠️ No puedo conectar ahora. Contacta a Elías directamente:</p>
      <div class="contact-options">
        <a href="mailto:eliasgonzalezvaldepenas@gmail.com" class="contact-btn email-btn">📧 Email</a>
        <a href="https://linkedin.com/in/elias-gonzález-valdepeñas-98aa97170" target="_blank" rel="noopener" class="contact-btn linkedin-btn">💼 LinkedIn</a>
        <a href="https://github.com/eliasgv04" target="_blank" rel="noopener" class="contact-btn github-btn">🐙 GitHub</a>
      </div>
    </div>`;
  }

  // ── API call ─────────────────────────────────────────────
  // local dev: llama a Groq directamente con la key de config.local.js
  // producción: usa el proxy serverless /api/chat (key en Netlify env vars)
  async function callAPI(userMsg) {
    history.push({ role: 'user', content: userMsg });

    const useLocal = !!LOCAL_KEY;
    const url      = useLocal ? GROQ_URL : PROXY_URL;
    const headers  = { 'Content-Type': 'application/json' };
    if (useLocal) headers['Authorization'] = 'Bearer ' + LOCAL_KEY;

    const payload = useLocal
      ? { model: 'llama-3.1-8b-instant', messages: [{ role: 'system', content: SYSTEM }, ...history], temperature: 0.72, max_tokens: 512 }
      : { messages: [{ role: 'system', content: SYSTEM }, ...history] };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (!reply) throw new Error('empty response');

      history.push({ role: 'assistant', content: reply });
      return { ok: true, text: reply };
    } catch (err) {
      console.warn('[chatbot]', err.message);
      return { ok: false };
    }
  }

  // ── Send ─────────────────────────────────────────────────
  async function send() {
    const msg = inputEl.value.trim();
    if (!msg || waiting) return;

    waiting = true;
    inputEl.disabled = true;
    sendBtn.disabled = true;
    inputEl.value = '';
    msgCount++;

    addMsg(msg, true);
    showTyping();

    const result = await callAPI(msg);

    hideTyping();

    if (result.ok) {
      addMsg(result.text);
    } else {
      addMsg(fallbackHTML(), false, true);
    }

    inputEl.disabled = false;
    sendBtn.disabled = false;
    waiting = false;
    inputEl.focus();
  }

  // ── Mini EQ header animation ─────────────────────────────
  function buildHeaderEQ() {
    const eq = document.getElementById('chatHeaderEQ');
    if (!eq) return;
    for (let i = 0; i < 5; i++) {
      const b = document.createElement('span');
      b.className = 'heq-bar';
      const dur = (500 + i * 110) + 'ms';
      const delay = (i * 85) + 'ms';
      b.style.cssText = `--dur:${dur};--delay:${delay}`;
      eq.appendChild(b);
    }
  }

  // ── Events ────────────────────────────────────────────────
  sendBtn.addEventListener('click', send);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });

  buildHeaderEQ();
})();
