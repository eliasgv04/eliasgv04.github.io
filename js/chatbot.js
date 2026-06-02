/**
 * 💬 CHATBOT AI PROFESIONAL - Elías González
 * Implementación con Groq API (gratuita)
 * Características: Conversación fluida, contextual, con CTA y fallback
 */

(function () {
  'use strict';

  // ============= CONFIGURACIÓN =============
  const GROQ_API_KEY = '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';
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  // ============= ELEMENTOS DEL DOM =============
  const chatContainer = document.getElementById('chatbotContainer');
  const messagesContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSend');

  // ============= ESTADO DEL CHATBOT =============
  let conversationHistory = [];
  let isWaitingForResponse = false;
  let messageCount = 0;
  let userContactInfo = {
    name: null,
    email: null
  };

  // ============= SYSTEM PROMPT MEJORADO =============
  const SYSTEM_PROMPT = `Eres Elías, un Full-Stack Developer profesional y amable. Información sobre ti:

📋 EXPERIENCIA LABORAL:
- Prácticas en Minsait (2026): Desarrollo con Spring Boot + Angular, testing con JUnit/Karma/Jasmine
- Educación: Grado en Ingeniería Informática (UCLM, 2022-2026)
- Inglés: B2 Cambridge certificado

🛠️ STACK TÉCNICO:
Backend: Spring Boot (88%), Java (85%), Python (82%)
Frontend: Angular (90%), TypeScript, HTML5, CSS3, JavaScript
Testing: JUnit (85%), Karma/Jasmine (85%), Mockito
Bases de datos: MySQL (80%), MongoDB (72%), Oracle (70%), SQL avanzado
DevOps & Tools: Git (88%), GitHub (85%), Jenkins (65%), Jira (78%), Trello (75%)
AI Assistants: Claude (85%), GitHub Copilot (80%), Groq (78%), OpenAI Codex (75%)
Mobile: Swift (60%)

🚀 PROYECTOS PRINCIPALES:
1. Spotify to Vinyl - Búsqueda musical + compra de vinilos (Python, HTML, SQL)
2. InvenCloud - Gestión de inventario para ferretería (HTML, CSS, JavaScript, CRUD)
3. Gestión de Proyecto Iterativa - Dirección end-to-end (Visual Paradigm, Maven)
4. Curso Swift - Fundamentos + apps con SwiftUI (Swift, API integration)
5. Mi Portafolio - Este sitio que estás visitando (Angular, Responsive, Chatbot AI)

💡 VALORES:
- Curioso y detallista: disfruto crear interfaces limpias y accesibles
- Orientado a resultados: código mantenible, pruebas rigurosas
- Comunicativo: B2 inglés, experiencia en community management
- Experiencia operativa: autonomía desde trabajos de verano

📞 DISPONIBILIDAD:
- Abierto a ofertas de empleo en desarrollo Full-Stack
- Interesado en colaboraciones y proyectos desafiantes
- Ubicación: España
- Contacto: eliasgonzalezvaldepenas@gmail.com

INSTRUCCIONES DE CONVERSACIÓN:
1. Sé profesional pero amable y cercano (no robótico)
2. Responde preguntas sobre skills, experiencia, proyectos de forma clara y concisa
3. Usa emojis ocasionalmente para mantener tono positivo
4. Si alguien pregunta por disponibilidad/colaboración: muestra entusiasmo genuino
5. Después de 5-6 mensajes: ofrece de forma natural compartir nombre/email para seguimiento
6. Si preguntan algo fuera de tu contexto: responde brevemente y redirige al portafolio
7. NO menciones que eres una IA, actúa como Elías mismo
8. Proporciona URLs cuando sea relevante (GitHub, LinkedIn, portfolios)

FORMATO DE RESPUESTA:
- Mantén respuestas concisas (máx 200 palabras)
- Estructura con bullets si hay múltiples puntos
- Termina con pregunta relevante para continuar conversación
- Antes de pedir contacto, permite al menos 4 intercambios naturales`;

  // ============= FUNCIÓN: ENVIAR A GROQ API =============
  async function sendToGroq(userMessage) {
    if (!GROQ_API_KEY) {
      return {
        error: 'API Key no configurada'
      };
    }

    conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error en Groq API');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || 'No se pudo obtener respuesta';

      conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      return { success: true, message: assistantMessage };
    } catch (error) {
      console.error('Error Groq:', error);
      return {
        error: `No puedo conectar ahora, pero puedes contactar directamente a Elías:`,
        fallback: true
      };
    }
  }

  // ============= FUNCIÓN: RENDERIZAR MENSAJE =============
  function addMessageToUI(message, isUser = false, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isHTML) {
      contentDiv.innerHTML = message;
    } else {
      contentDiv.textContent = message;
    }

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Auto-scroll
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  }

  // ============= FUNCIÓN: MOSTRAR CARGA =============
  function showLoadingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.id = 'loading-indicator';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content loading';
    contentDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // ============= FUNCIÓN: REMOVER CARGA =============
  function removeLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  // ============= FUNCIÓN: RENDERIZAR RESPUESTA CON FALLBACK =============
  function renderBotResponse(result) {
    if (result.error) {
      if (result.fallback) {
        const contactHTML = `
          <div class="error-message">
            <p><strong>⚠️ ${result.error}</strong></p>
            <div class="contact-options">
              <a href="mailto:eliasgonzalezvaldepenas@gmail.com" class="contact-btn email-btn">📧 Email</a>
              <a href="https://linkedin.com/in/elias-gonzález-valdepeñas-98aa97170" target="_blank" class="contact-btn linkedin-btn">💼 LinkedIn</a>
              <a href="https://github.com/eliasgv04" target="_blank" class="contact-btn github-btn">🐙 GitHub</a>
            </div>
          </div>
        `;
        addMessageToUI(contactHTML, false, true);
      } else {
        addMessageToUI(`❌ ${result.error}`, false);
      }
    } else {
      addMessageToUI(result.message, false);
      
      // Ofrecer contacto después de ciertos mensajes
      if (messageCount >= 5 && !userContactInfo.name) {
        setTimeout(() => {
          addMessageToUI('📞 ¿Te gustaría que Elías se comunique contigo? Comparte tu nombre y email aquí o contacta directamente.', false);
        }, 800);
      }
    }
  }

  // ============= FUNCIÓN: ENVIAR MENSAJE =============
  async function sendMessage() {
    const message = chatInput.value.trim();

    if (!message) return;

    chatInput.disabled = true;
    chatSendBtn.disabled = true;
    isWaitingForResponse = true;

    // Mostrar mensaje del usuario
    addMessageToUI(message, true);
    chatInput.value = '';
    messageCount++;

    // Mostrar indicador de carga
    showLoadingIndicator();

    // Pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Enviar a Groq
    const result = await sendToGroq(message);

    // Remover carga
    removeLoadingIndicator();

    // Renderizar respuesta
    renderBotResponse(result);

    // Reactivar input
    chatInput.disabled = false;
    chatSendBtn.disabled = false;
    isWaitingForResponse = false;
    chatInput.focus();
  }

  // ============= EVENT LISTENERS =============
  chatSendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isWaitingForResponse) {
      sendMessage();
    }
  });

  // Enfoque automático al chatbot
  chatInput.addEventListener('focus', () => {
    chatContainer.classList.add('focused');
  });

  chatInput.addEventListener('blur', () => {
    chatContainer.classList.remove('focused');
  });

  // ============= INICIALIZACIÓN =============
  console.log('✅ Chatbot profesional cargado');
})();
