# 📜 Sección de Certificaciones

## ✅ Lo que hemos implementado

Tu portafolio ahora tiene una **sección profesional de certificaciones** completamente integrada y funcional.

### 📋 Certificaciones Incluidas

1. **IA Generativa: Conceptos Fundamentales**
   - Introducción a qué es IA generativa y sus aplicaciones

2. **IA Generativa & Búsqueda Inteligente**
   - Evolución de búsqueda en internet con IA

3. **IA Generativa: Más Allá de Ingeniería**
   - Aplicaciones de IA en otras disciplinas

4. **Ética en IA Generativa**
   - Problemáticas sociales, desafíos éticos y sesgos

5. **Fundamentos Profesionales de IA**
   - Certificado Microsoft & LinkedIn

6. **AWS: Servicios Principales**
   - Introducción a AWS y servicios en la nube

7. **Microsoft Copilot: Agiliza tu Trabajo**
   - Optimización de productividad

8. **Descubre Microsoft 365 Copilot**
   - Integración en ecosistema empresarial

---

## 🎨 Características Visuales

✅ **Grid Responsivo**: Se adapta a cualquier pantalla (3 columnas en desktop, 1 en móvil)

✅ **Animaciones Suaves**: 
- Efecto de entrada en cascada
- Hover effects fluidos
- Transiciones spring (cubic-bezier)

✅ **Iconos Emojis**: Cada certificación tiene un emoji único identificador

✅ **Diseño Profesional**:
- Gradientes elegantes
- Sombras dinámicas
- Colores corporativos
- Tema claro/oscuro integrado

✅ **Botones de Acceso**:
- Enlace directo a PDFs
- Abre en nueva pestaña
- Botones con efecto hover

---

## 🔗 Navegación

Se añadió automáticamente en la barra de navegación:
- **Orden**: Inicio → Sobre mí → **Certificaciones** ← Proyectos → Skills → Contacto

El enlace es completamente funcional:
```html
<li class="nav-item"><a class="nav-link" href="#certifications">Certificaciones</a></li>
```

---

## 📁 Estructura de Archivos

```
PortfolioEliasGonzalez/
├── index.html (añadida sección)
├── css/
│   └── certifications.css (NUEVO)
└── assets/certificaciones/
    ├── CertificadoDeFinalizacion_Que es la IA generativa.pdf
    ├── CertificadoDeFinalizacion_Inteligencia artificial generativa...pdf
    ├── CertificadoDeFinalizacion_Inteligencia artificial mas alla...pdf
    ├── CertificadoDeFinalizacion_Problematicas sociales...pdf
    ├── CertificadoDeFinalizacion_Fundamentos profesionales...pdf
    ├── CertificadoDeFinalizacion_Introduccion a AWS...pdf
    ├── CertificadoDeFinalizacion_Agiliza tu trabajo...pdf
    └── CertificadoDeFinalizacion_Descubre Microsoft 365...pdf
```

---

## 🚀 Cómo Funciona

1. **Usuario navega a Certificaciones** (desde navbar o scroll)
2. **Ve un grid de 8 tarjetas** con información de cada certificación
3. **Haz hover** sobre una tarjeta → Se eleva y muestra efecto visual
4. **Haz clic en "Ver Certificado"** → Descarga o abre el PDF en nueva pestaña
5. **Responsive**: En móvil se ve en una sola columna

---

## 🎯 Ventajas Profesionales

✅ **Demuestra compromiso** con el aprendizaje continuo

✅ **Certificaciones reconocidas**: Microsoft, LinkedIn, AWS

✅ **Enfoque en IA**: Alineado con tendencias del mercado actual

✅ **Facilita búsqueda de empleo**: Reclutadores ven formación verificada

✅ **Visible en LinkedIn**: Puedes vincular estas certificaciones

✅ **Accesible**: Los PDFs se abren directamente sin descargar

---

## 📱 Responsive Design

- **Desktop (3 columnas)**: Grid auto-fill con minmax(320px, 1fr)
- **Tablet (2 columnas)**: Fluye automáticamente
- **Móvil (1 columna)**: Optimizado para lectura vertical
- **Botones 100%**: Se expanden completamente en móvil

---

## ⚙️ Personalización Futura

Si añades más certificaciones:

1. Copia una tarjeta existente:
```html
<article class="cert-card" role="listitem">
  <div class="cert-header">
    <div class="cert-icon" aria-hidden="true">EMOJI</div>
    <h3 class="cert-title">Nombre de Certificación</h3>
  </div>
  <p class="cert-desc">Descripción breve</p>
  <a href="assets/certificaciones/archivo.pdf" target="_blank" rel="noopener" class="cert-link">
    <svg class="cert-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <!-- SVG path -->
    </svg>
    Ver Certificado
  </a>
</article>
```

2. Actualiza el CSS `.cert-card:nth-child(N)` para animaciones en cascada

3. Los estilos se aplicarán automáticamente

---

## 🎓 SEO y Accesibilidad

✅ **Semantic HTML**: `<article role="listitem">`
✅ **ARIA Labels**: Accesible para screen readers
✅ **Links accessibles**: Todos con `target="_blank"` y `rel="noopener"`
✅ **Contraste**: Cumple WCAG AA
✅ **Reducir movimiento**: Respeta `prefers-reduced-motion`

---

¡Tu portafolio ahora tiene una sección profesional de certificaciones! 📜✨
