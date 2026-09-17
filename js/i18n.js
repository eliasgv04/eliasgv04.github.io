/**
 * 🌍 Sistema de Internacionalización (i18n)
 * Soporte para Español e Inglés
 */

const translations = {
  es: {
    // Navbar
    nav_inicio: 'Inicio',
    nav_about: 'Sobre mí',
    nav_certifications: 'Certificaciones',
    nav_projects: 'Proyectos',
    nav_skills: 'Skills',
    nav_contact: 'Contacto',
    nav_download_cv: 'Descargar CV',

    // Home Section
    home_tagline: 'Portafolio de <strong>Elías González</strong> · Ingeniería Informática & Desarrollo Full-Stack',

    // About Section
    about_title: 'Sobre mí',
    about_intro: 'Me defino como alguien curioso y detallista: disfruto creando interfaces limpias, accesibles y con una estética cuidada. Me inspira combinar tecnología y ritmo visual, como se ve en el tocadiscos de inicio.',
    about_formation: 'Formación',
    education_2007: 'Colegio Santiago el Mayor',
    education_2016: 'IES Francisco Nieva',
    education_2022: 'Escuela Superior de Informática (UCLM)',
    education_2026: 'Minsait · Prácticas',

    // Highlights
    highlights_title: 'Más de mí',
    highlights_intro: 'Me gusta complementar mi perfil técnico con habilidades que aportan valor transversal: comunicación internacional, gestión de identidad digital, criterio estético y experiencia operativa real.',
    highlight_english: 'Inglés (B2 Cambridge)',
    highlight_english_desc: 'Certificación oficial Cambridge B2. Practico el idioma a diario (lectura de documentación técnica, vídeos y conversación) y amplío vocabulario especializado en tecnología, producto y colaboración internacional.',
    highlight_community: 'Community Manager',
    highlight_community_desc: 'Gestión de redes de Torrenueva FS (futsal): planificación de publicaciones, copy adaptado al tono deportivo, coherencia gráfica de identidad y análisis básico de alcance e interacción para iterar contenido.',
    highlight_creativity: 'Creatividad visual',
    highlight_creativity_desc: 'Creación y edición de imágenes (Procreate y herramientas de IA) centrada en narrativa visual, color, composición y adaptación a distintos formatos sociales manteniendo legibilidad y coherencia estética.',
    highlight_experience: 'Experiencia y gestión',
    highlight_experience_desc: 'Primer verano: cocinero en un bar (ritmo de servicio y trabajo en equipo). Segundo: autónomo en España gestionando y cocinando en mi propio bar de piscina (menú, aprovisionamiento, control de costes, higiene y coordinación en picos de demanda).',

    // Certifications Section
    cert_title: 'Certificaciones',
    cert_intro: 'Formación continua en IA Generativa y tecnologías emergentes. Certificados profesionales que reflejan mi compromiso con el aprendizaje y la actualización en tecnologías de futuro.',
    cert_1_title: 'IA Generativa: Conceptos Fundamentales',
    cert_1_desc: 'Introducción a qué es IA generativa y sus aplicaciones prácticas en desarrollo e innovación.',
    cert_2_title: 'IA Generativa & Búsqueda Inteligente',
    cert_2_desc: 'Evolución de búsqueda en internet con IA generativa y cómo impacta en la experiencia del usuario.',
    cert_3_title: 'IA Generativa: Más Allá de Ingeniería',
    cert_3_desc: 'Aplicaciones de IA en otras disciplinas y cómo la IA generativa transforma diferentes industrias.',
    cert_4_title: 'Ética en IA Generativa',
    cert_4_desc: 'Problemáticas sociales, desafíos éticos y sesgos en sistemas de IA generativa.',
    cert_5_title: 'Fundamentos Profesionales de IA',
    cert_5_desc: 'Certificado Microsoft & LinkedIn: Fundamentos profesionales de inteligencia artificial generativa.',
    cert_6_title: 'AWS: Servicios Principales',
    cert_6_desc: 'Introducción a AWS y sus servicios principales para desarrollo en la nube.',
    cert_7_title: 'Microsoft Copilot: Agiliza tu Trabajo',
    cert_7_desc: 'Optimización de flujos de trabajo y productividad con Microsoft Copilot.',
    cert_8_title: 'Descubre Microsoft 365 Copilot',
    cert_8_desc: 'Integración de Copilot en el ecosistema Microsoft 365 para productividad empresarial.',
    cert_view: 'Ver Certificado',

    // Projects Section
    projects_title: 'PROYECTOS',
    projects_intro: 'Selección compacta de trabajos que combinan desarrollo web, interfaces, lógica de juego, gestión y creación de contenido. Cada tarjeta muestra de forma directa contexto, enfoque técnico y un enlace para explorar más.',
    projects_intro_2: 'La sección irá creciendo con proyectos más profundos (rendimiento, APIs, accesibilidad, multijugador, herramientas propias y colaboraciones) conforme avance mi trayectoria.',
    projects_filter_all: 'Todos',
    projects_filter_web: 'Web',
    projects_filter_ui: 'UI',
    projects_filter_tools: 'Herramientas',
    projects_filter_data: 'Data',
    projects_filter_otros: 'Otros',
    projects_code: 'Código',
    // Project cards
    proj_1_title: 'Spotify to Vinyl',
    proj_1_desc: 'Aplicación web (Flask + MySQL) para descubrir vinilos: búsqueda de artistas y álbumes combinando las APIs de Discogs y Last.fm, ficha de detalle por álbum, wishlist de favoritos y notificaciones. Autenticación real con contraseñas hasheadas y sesiones, contenerizada con Docker. Proyecto de Ingeniería del Software desarrollado en equipo con metodología Scrum.',
    proj_futsal_app_title: 'FutsalKit · Plataforma Multi-Club (TFG)',
    proj_futsal_app_desc: 'Trabajo de Fin de Grado (Ingeniería Informática, UCLM) nacido de una necesidad real como delegado de C.D. Torrenueva Futsal. Plataforma multi-club para fútbol sala amateur: banco de ejercicios con ficha de sesión en PDF, pizarra táctica animada por fotogramas exportable a vídeo y estadísticas de partido en directo, con datos aislados por club (RLS). Más de 580 tests automatizados (~96% cobertura) y en uso real por el club.',
    proj_demo: 'Demo',
    proj_website: 'Sitio web',
    proj_management_title: 'Gestión de Proyecto Iterativa',
    proj_management_desc: 'Dirección y control end‑to‑end: planificación en iteraciones, autoevaluación periódica del equipo, gestión de la calidad (criterios y métricas de aceptación), control de configuración (versionado, trazabilidad de artefactos y baseline), identificación y mitigación de riesgos, comunicación continua y revisión de entregables.',
    proj_prakisama_title: 'Prakisama · Web Corporativa',
    proj_prakisama_desc: 'Sitio web para Prakisama, empresa de construcción con más de 30 años de experiencia (obra nueva, reformas, espacios comerciales y obra pública). Catálogo de servicios, galería de proyectos ejecutados, noticias y formulario de contacto para presupuestos. Construido con Astro, priorizando velocidad de carga y SEO.',
    proj_torrenueva_web_title: 'Torrenueva Futsal · Web Oficial del Club',
    proj_torrenueva_web_desc: 'Web pública del C.D. Torrenueva Futsal: noticias y calendario de temporada, plantilla y cuerpo técnico, resultados, tienda de merchandising y patrocinadores. Construida con Astro para carga rápida y buen SEO, con una estructura fácil de mantener desde el club.',
    proj_ligaxml_title: 'Análisis LaLiga · XML + XQuery',
    proj_ligaxml_desc: 'Transformación de 37.147 partidos de Primera y Segunda División (1970-2018) de CSV a XML jerárquico, validado contra un esquema XSD. Consultas analíticas en XQuery sobre BaseX (goleadores, rendimiento local/visitante, evolución por temporada) y dashboard HTML de resultados.',
    proj_pokemon_title: 'Juego estilo Pokémon (Diseño + Batallas)',
    proj_pokemon_desc: 'Aplicación en XAML/C#: creador de criatura (nombre, tipos, stats, sprite) y núcleo de juego con colección, sistema de turnos, cálculo de daño, estados, batallas multijugador y notificaciones de eventos/captura.',
    proj_gramola_title: 'Gramola Virtual (Jukebox con Spotify)',
    proj_gramola_desc: 'Servicio para bares donde los clientes eligen canciones que se cuelan en la playlist tras la actual. El propietario gestiona el local; los clientes buscan temas vía API de Spotify y pagan para insertarlos en la cola. Backend Spring + Stripe + MySQL; front Angular; pruebas funcionales con Selenium.',
    proj_datawarehouse_title: 'Data Warehouse Netflix · Modelo en Estrella',
    proj_datawarehouse_desc: 'Data warehouse sobre el catálogo de Netflix (asignatura BBDDA, UCLM): modelo en estrella con tabla de hechos y dimensiones (Actor, Director, Género, País) unidas por tablas puente N:M. Pipeline ETL en Python (Pandas + SQLAlchemy) con inserciones por lotes y limpieza de datos, cargando en MySQL sobre Docker. Incluye script de EDA inicial y menú de consultas analíticas.',

    // Skills Section
    skills_title: 'Skills',
    skills_filter_all: 'Todos',
    skills_filter_backend: 'Backend',
    skills_filter_frontend: 'Frontend',
    skills_filter_testing: 'Testing',
    skills_filter_database: 'Bases de Datos',
    skills_filter_data: 'Data',
    skills_filter_devops: 'DevOps & Tools',
    skills_filter_ai: 'IA Assistants',

    // Contact Section
    contact_title: 'Contacto',
    contact_intro: 'Chatea conmigo sobre experiencia, proyectos o colaboraciones',
    chatbot_greeting: '¡Hola! 👋',
    chatbot_intro: 'Soy el asistente de Elías. Puedo ayudarte con:',
    chatbot_experience: 'Mi experiencia (Spring Boot, Angular, Testing)',
    chatbot_projects: 'Mis proyectos y GitHub',
    chatbot_collaborations: 'Colaboraciones u ofertas',
    chatbot_question: '¿En qué puedo ayudarte? 😊',
    chatbot_placeholder: 'Pregunta sobre experiencia, proyectos, etc...',
    chatbot_send: 'Enviar mensaje',
    contact_connect: 'Conecta',
    contact_email: 'Email',
    contact_github: 'GitHub',
    contact_linkedin: 'LinkedIn',

    // Footer
    footer_text: 'Hecho con ❤️ por Elías González',
    footer_copyright: '© 2026 Elías González. Todos los derechos reservados.',
  },
  en: {
    // Navbar
    nav_inicio: 'Home',
    nav_about: 'About',
    nav_certifications: 'Certifications',
    nav_projects: 'Projects',
    nav_skills: 'Skills',
    nav_contact: 'Contact',
    nav_download_cv: 'Download CV',

    // Home Section
    home_tagline: 'Portfolio of <strong>Elías González</strong> · Computer Science & Full-Stack Development',

    // About Section
    about_title: 'About Me',
    about_intro: 'I define myself as curious and detail-oriented: I enjoy creating clean, accessible interfaces with careful aesthetics. I\'m inspired by combining technology and visual rhythm, as seen in the home turntable.',
    about_formation: 'Education',
    education_2007: 'Santiago el Mayor School',
    education_2016: 'Francisco Nieva High School',
    education_2022: 'School of Computer Science (UCLM)',
    education_2026: 'Minsait · Internship',

    // Highlights
    highlights_title: 'More About Me',
    highlights_intro: 'I like to complement my technical profile with skills that provide transversal value: international communication, digital identity management, aesthetic criteria, and real operational experience.',
    highlight_english: 'English (B2 Cambridge)',
    highlight_english_desc: 'Official Cambridge B2 certification. I practice the language daily (reading technical documentation, watching videos, and conversing) and expand specialized vocabulary in technology, product, and international collaboration.',
    highlight_community: 'Community Manager',
    highlight_community_desc: 'Social media management for Torrenueva FS (futsal): publication planning, copy adapted to sports tone, graphic identity consistency, and basic reach and interaction analysis to iterate content.',
    highlight_creativity: 'Visual Creativity',
    highlight_creativity_desc: 'Image creation and editing (Procreate and AI tools) focused on visual narrative, color, composition, and adaptation to different social formats while maintaining legibility and aesthetic consistency.',
    highlight_experience: 'Experience & Management',
    highlight_experience_desc: 'First summer: bartender (service pace and teamwork). Second: self-employed in Spain managing and cooking at my own poolside bar (menu, supply, cost control, hygiene, and coordination during peak demand).',

    // Certifications Section
    cert_title: 'Certifications',
    cert_intro: 'Continuous training in Generative AI and emerging technologies. Professional certificates that reflect my commitment to learning and staying updated with future technologies.',
    cert_1_title: 'Generative AI: Fundamental Concepts',
    cert_1_desc: 'Introduction to what generative AI is and its practical applications in development and innovation.',
    cert_2_title: 'Generative AI & Intelligent Search',
    cert_2_desc: 'Evolution of internet search with generative AI and how it impacts user experience.',
    cert_3_title: 'Generative AI: Beyond Engineering',
    cert_3_desc: 'AI applications in other disciplines and how generative AI transforms different industries.',
    cert_4_title: 'Ethics in Generative AI',
    cert_4_desc: 'Social issues, ethical challenges, and biases in generative AI systems.',
    cert_5_title: 'Professional Fundamentals of AI',
    cert_5_desc: 'Microsoft & LinkedIn Certificate: Professional fundamentals of generative artificial intelligence.',
    cert_6_title: 'AWS: Main Services',
    cert_6_desc: 'Introduction to AWS and its main services for cloud development.',
    cert_7_title: 'Microsoft Copilot: Accelerate Your Work',
    cert_7_desc: 'Workflow optimization and productivity enhancement with Microsoft Copilot.',
    cert_8_title: 'Discover Microsoft 365 Copilot',
    cert_8_desc: 'Copilot integration in the Microsoft 365 ecosystem for enterprise productivity.',
    cert_view: 'View Certificate',

    // Projects Section
    projects_title: 'PROJECTS',
    projects_intro: 'Compact selection of work combining web development, interfaces, game logic, management, and content creation. Each card directly shows context, technical approach, and a link to explore more.',
    projects_intro_2: 'The section will grow with deeper projects (performance, APIs, accessibility, multiplayer, custom tools, and collaborations) as my career progresses.',
    projects_filter_all: 'All',
    projects_filter_web: 'Web',
    projects_filter_ui: 'UI',
    projects_filter_tools: 'Tools',
    projects_filter_data: 'Data',
    projects_filter_otros: 'Other',
    projects_code: 'Code',
    // Project cards
    proj_1_title: 'Spotify to Vinyl',
    proj_1_desc: "Web app (Flask + MySQL) for discovering vinyl records: artist and album search combining the Discogs and Last.fm APIs, per-album detail pages, a favorites wishlist and notifications. Real authentication with hashed passwords and sessions, containerized with Docker. Software Engineering coursework built in a team using Scrum.",
    proj_futsal_app_title: 'FutsalKit · Multi-Club Platform (Thesis)',
    proj_futsal_app_desc: "Bachelor's thesis (Computer Engineering, UCLM) born from a real need as a delegate of C.D. Torrenueva Futsal. Multi-club platform for amateur futsal: exercise bank with auto-generated PDF session sheets, keyframe-animated tactical board exportable to video, and live match stats — with per-club data isolation (RLS). 580+ automated tests (~96% coverage), in real use by the club.",
    proj_demo: 'Demo',
    proj_website: 'Website',
    proj_management_title: 'Iterative Project Management',
    proj_management_desc: 'End-to-end direction and control: iteration planning, periodic team self-assessment, quality management (acceptance criteria and metrics), configuration control (versioning, artifact traceability and baseline), risk identification and mitigation, continuous communication and deliverable review.',
    proj_prakisama_title: 'Prakisama · Corporate Website',
    proj_prakisama_desc: 'Website for Prakisama, a construction company with 30+ years of experience (new builds, renovations, commercial spaces and public works). Service catalogue, gallery of completed projects, news section and a quote-request contact form. Built with Astro, optimized for speed and SEO.',
    proj_torrenueva_web_title: "Torrenueva Futsal · Official Club Website",
    proj_torrenueva_web_desc: "Public website for C.D. Torrenueva Futsal: season news and calendar, roster and coaching staff, match results, merchandise shop and sponsors. Built with Astro for fast loading and strong SEO, with a structure the club can easily maintain on its own.",
    proj_ligaxml_title: 'LaLiga Analysis · XML + XQuery',
    proj_ligaxml_desc: 'Transformation of 37,147 First and Second Division matches (1970–2018) from CSV to hierarchical XML, validated against an XSD schema. Analytical XQuery queries over BaseX (top scorers, home/away performance, season trends) plus an HTML results dashboard.',
    proj_pokemon_title: 'Pokémon-style Game (Design + Battles)',
    proj_pokemon_desc: 'XAML/C# app: creature creator (name, types, stats, sprite) and game core with collection, turn system, damage calculation, status effects, multiplayer battles and event/capture notifications.',
    proj_gramola_title: 'Virtual Jukebox (with Spotify)',
    proj_gramola_desc: 'Bar service where customers pick songs that jump into the current playlist. The owner manages the venue; customers search tracks via Spotify API and pay to queue them. Spring backend + Stripe + MySQL; Angular frontend; functional tests with Selenium.',
    proj_datawarehouse_title: 'Netflix Data Warehouse · Star Schema',
    proj_datawarehouse_desc: 'Data warehouse built on the Netflix catalogue (BBDDA course, UCLM): star schema with a fact table and dimension tables (Actor, Director, Genre, Country) linked through N:M bridge tables. Python ETL pipeline (Pandas + SQLAlchemy) with batch inserts and data cleaning, loading into MySQL on Docker. Includes an initial EDA script and an analytical query menu.',

    // Skills Section
    skills_title: 'Skills',
    skills_filter_all: 'All',
    skills_filter_backend: 'Backend',
    skills_filter_frontend: 'Frontend',
    skills_filter_testing: 'Testing',
    skills_filter_database: 'Databases',
    skills_filter_data: 'Data',
    skills_filter_devops: 'DevOps & Tools',
    skills_filter_ai: 'AI Assistants',

    // Contact Section
    contact_title: 'Contact',
    contact_intro: 'Chat with me about experience, projects, or collaborations',
    chatbot_greeting: 'Hello! 👋',
    chatbot_intro: 'I\'m Elías\'s assistant. I can help you with:',
    chatbot_experience: 'My experience (Spring Boot, Angular, Testing)',
    chatbot_projects: 'My projects and GitHub',
    chatbot_collaborations: 'Collaborations or job offers',
    chatbot_question: 'How can I help you? 😊',
    chatbot_placeholder: 'Ask about experience, projects, etc...',
    chatbot_send: 'Send message',
    contact_connect: 'Connect',
    contact_email: 'Email',
    contact_github: 'GitHub',
    contact_linkedin: 'LinkedIn',

    // Footer
    footer_text: 'Made with ❤️ by Elías González',
    footer_copyright: '© 2026 Elías González. All rights reserved.',
  }
};

// Sistema de i18n
class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'es';
    this.init();
  }

  init() {
    this.setLanguage(this.currentLanguage);
  }

  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      this.updatePage();
    }
  }

  t(key) {
    return translations[this.currentLanguage][key] || key;
  }

  updatePage() {
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      
      if (el.getAttribute('data-i18n-html')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Actualizar atributos con data-i18n-attr
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attrs = JSON.parse(el.getAttribute('data-i18n-attr'));
      Object.keys(attrs).forEach(attr => {
        const key = attrs[attr];
        el.setAttribute(attr, this.t(key));
      });
    });

    // Event personalizado para que otros scripts se enteren del cambio de idioma
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: this.currentLanguage } }));
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }
}

// Inicializar el sistema de i18n
const i18n = new I18n();
