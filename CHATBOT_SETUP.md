# Configuración del Chatbot con Groq API

## Pasos para activar el chatbot:

### 1. **Crear cuenta en Groq (GRATIS)**
   - Ve a: https://console.groq.com
   - Regístrate con tu email
   - Verifica tu email

### 2. **Obtener tu API Key**
   - En la consola de Groq, ve a "API Keys"
   - Haz clic en "Create New API Key"
   - Copia la clave que aparece

### 3. **Configurar la API Key en tu portafolio**
   - Abre el archivo: `js/chatbot.js`
   - En la línea 9, reemplaza:
     ```javascript
     const GROQ_API_KEY = ''; // Vacío
     ```
   - Con tu API key:
     ```javascript
     const GROQ_API_KEY = 'gsk_tu_clave_aqui';
     ```

### 4. **¡Listo!**
   - El chatbot estará activo en la sección de contacto
   - Usa el modelo Mixtral-8x7b (gratuito)

## Características del Chatbot:

✅ **Gratis**: Sin límite de mensajes con Groq  
✅ **Rápido**: Respuestas en menos de 2 segundos  
✅ **Inteligente**: Basado en Mixtral-8x7b  
✅ **Profesional**: Configurado para hablar sobre tus skills  
✅ **Responsivo**: Funciona en mobile y desktop  

## Límites (Groq Free Tier):
- 30 solicitudes por minuto
- Perfecto para un chatbot casual de portafolio

## Futuras mejoras:
- Opción de recopilar email/nombre al final
- Guardar conversaciones en Supabase
- Análisis de sentimiento
- Escalabilidad a otros modelos

## Troubleshooting:

**"Error: API Key no configurada"**
- Asegúrate de haber añadido la API key en `chatbot.js`

**"Error de conexión"**
- Verifica que tu API key sea válida
- Comprueba que no hayas excedido el límite de 30 req/min

**"Timeout o respuesta lenta"**
- Es normal con Groq Free, puede tardar 2-3 segundos
- Los servidores de Groq son muy rápidos normalmente

---

¡Tu chatbot AI profesional está listo! 🚀
