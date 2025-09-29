// Archivo principal JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portafolio cargado");
  const sections = document.querySelectorAll('.site-section');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const themeToggle = document.getElementById('themeToggleFab') || document.getElementById('themeToggle');

  // ====== Tema (persistencia) ======
  const root = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme','dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label','Cambiar a modo claro');
        themeToggle.setAttribute('title','Cambiar a modo claro');
      }
    } else {
      root.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label','Cambiar a modo oscuro');
        themeToggle.setAttribute('title','Cambiar a modo oscuro');
      }
    }
  }

  let saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) { saved = prefersDark ? 'dark' : 'light'; }
  applyTheme(saved);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // ABOUT timeline progress activation
  const aboutWrapper = document.querySelector('.about-wrapper');
  const progressFill = document.querySelector('.vinyl-progress-fill');
  const eduItems = [...document.querySelectorAll('.edu-item')];
  const currentIndex = eduItems.findIndex(i => i.classList.contains('current'));
  if(aboutWrapper && progressFill && currentIndex !== -1){
    // compute percentage (current index / total-1)
    const pct = (currentIndex / (eduItems.length - 1)) * 100;
    progressFill.style.width = pct + '%';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          aboutWrapper.classList.add('loaded');
          obs.disconnect();
        }
      });
    }, { threshold:0.25 });
    obs.observe(aboutWrapper);
  }

  // Interacción accesible anillos disco educativo
  const recordRingsNode = document.querySelectorAll('.edu-visual-record .record-ring');
  if(recordRingsNode.length){
    const recordRings = [...recordRingsNode];
    const stageBadges = [...document.querySelectorAll('.edu-visual-record .record-stage-info')];
    const liveRegion = document.getElementById('eduStageLive');
    const centerDisplay = document.querySelector('.record-center-display');
    const progressFillEl = progressFill; // reutilizamos barra global
    const totalStages = recordRings.length;
    function renderCenter(label, years){
      if(!centerDisplay) return;
      centerDisplay.innerHTML = `<div class="rcd-label">${label}</div><div class="rcd-years">${years}</div>`;
      centerDisplay.classList.remove('flash');
      void centerDisplay.offsetWidth; // reflow para reiniciar animación
      centerDisplay.classList.add('flash');
    }
    function setCurrentStage(stage){
      recordRings.forEach(r=> r.classList.toggle('current', r.dataset.stage === stage));
      stageBadges.forEach(b=> b.classList.toggle('current', b.dataset.stage === stage));
      recordRings.forEach(r=> r.setAttribute('aria-pressed', r.dataset.stage === stage ? 'true':'false'));
      const idx = recordRings.findIndex(r => r.dataset.stage === stage);
      if(progressFillEl && idx >=0 && totalStages>1){
        const pct = (idx / (totalStages - 1)) * 100;
        progressFillEl.style.width = pct + '%';
      }
      const ring = recordRings[idx];
      if(ring){
        const years = ring.getAttribute('data-years') || '';
        const label = ring.getAttribute('data-label') || '';
        renderCenter(label, years);
        if(liveRegion){ liveRegion.textContent = `${label} ${years}`; }
      }
    }
    recordRings.forEach(r => {
      r.setAttribute('tabindex','0');
      r.setAttribute('role','button');
      r.setAttribute('aria-pressed', r.classList.contains('current') ? 'true' : 'false');
      r.style.cursor = 'pointer';
      r.addEventListener('click', () => setCurrentStage(r.dataset.stage));
      r.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          r.classList.add('focus-ping');
          setTimeout(()=> r.classList.remove('focus-ping'), 600);
          setCurrentStage(r.dataset.stage);
        }
      });
      r.addEventListener('focus', () => setCurrentStage(r.dataset.stage));
      r.addEventListener('mouseenter', () => setCurrentStage(r.dataset.stage));
    });
    // Inicializar con el que venga marcado .current o el primero
    const initial = recordRings.find(r=> r.classList.contains('current'))?.dataset.stage || recordRings[0].dataset.stage;
    setCurrentStage(initial);
  }

  // ===== Timeline simplificada (horizontal clara) =====
  const simpleSteps = [...document.querySelectorAll('.timeline-simple .t-step')];
  const simpleProgress = document.querySelector('.timeline-simple .t-progress-bar');
  const detailBox = document.querySelector('.education-simple .t-detail');
  function updateSimpleTimeline(stage){
    if(!simpleSteps.length) return;
    simpleSteps.forEach(s => s.classList.toggle('active', s.dataset.stage === stage));
    simpleSteps.forEach(s => s.setAttribute('aria-pressed', s.dataset.stage === stage ? 'true':'false'));
    const idx = simpleSteps.findIndex(s => s.dataset.stage === stage);
    if(simpleProgress && idx >=0){
      const pct = (idx / (simpleSteps.length - 1)) * 100;
      simpleProgress.style.width = pct + '%';
    }
    if(detailBox){
      const step = simpleSteps[idx];
      if(step){
        const place = step.dataset.place;
        const desc = step.dataset.desc;
        const years = step.dataset.years;
        detailBox.innerHTML = `<strong>${place}</strong> · ${desc} <span style="opacity:.65; margin-left:.35rem; font-size:.75rem;">(${years})</span>`;
      }
    }
  }
  if(simpleSteps.length){
    simpleSteps.forEach(btn => {
      btn.addEventListener('click', () => updateSimpleTimeline(btn.dataset.stage));
      btn.addEventListener('keydown', e => {
        if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
          e.preventDefault();
          const idx = simpleSteps.indexOf(btn);
            const next = simpleSteps[idx+1] || simpleSteps[0];
            next.focus(); updateSimpleTimeline(next.dataset.stage);
        } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
          e.preventDefault();
          const idx = simpleSteps.indexOf(btn);
            const prev = simpleSteps[idx-1] || simpleSteps[simpleSteps.length-1];
            prev.focus(); updateSimpleTimeline(prev.dataset.stage);
        } else if(e.key === 'Home') { e.preventDefault(); simpleSteps[0].focus(); updateSimpleTimeline(simpleSteps[0].dataset.stage); }
        else if(e.key === 'End') { e.preventDefault(); const last = simpleSteps[simpleSteps.length-1]; last.focus(); updateSimpleTimeline(last.dataset.stage); }
      });
    });
    // inicializar
    const active = simpleSteps.find(s => s.classList.contains('active'))?.dataset.stage || simpleSteps[0].dataset.stage;
    updateSimpleTimeline(active);
  }

  // ===== Crossfader Educación =====
  const crossfader = document.querySelector('.edu-crossfader');
  if(crossfader){
    const pointer = crossfader.querySelector('.fader-pointer');
    const bubble = pointer?.querySelector('.fp-bubble');
    const knob = pointer?.querySelector('.fp-knob');
    const labelEl = pointer?.querySelector('.fp-label');
    const yearEl = pointer?.querySelector('.fp-year');
    const progress = crossfader.querySelector('.fader-progress');
    const rail = crossfader.querySelector('.fader-track') || crossfader; // fallback
    const ticks = [...crossfader.querySelectorAll('.tick')];
    const detailBox = document.querySelector('.education-simple .t-detail');
    const hiddenSteps = [...document.querySelectorAll('.t-step')];
    let ratio = parseFloat(crossfader.getAttribute('data-ratio')) || 0; // 0..1 continuo
    let dragging = false;
    const YEAR_START = 2007;
    const YEAR_END = 2025;
    const STAGE_BOUNDARIES = [2016, 2022];
    function stageForYear(y){
      if(y < STAGE_BOUNDARIES[0]) return 1;
      if(y < STAGE_BOUNDARIES[1]) return 2;
      return 3;
    }
    function yearFromRatio(r){
      const span = YEAR_END - YEAR_START; return Math.round(YEAR_START + r * span); }
    function dataForStage(stage){
      const btn = hiddenSteps.find(b => b.dataset.stage == stage); if(!btn) return null;
      return { place: btn.dataset.place, desc: btn.dataset.desc, years: btn.dataset.years };
    }
    function updateUI(){
      ratio = Math.max(0, Math.min(1, ratio));
      // Offset lateral para que no pegue extremos: track ocupa 5% a 95% (usable 90%)
  const OFFSET = 6;       // % desde el borde izquierdo (alineado con track CSS)
  const USABLE = 88;      // ancho porcentual disponible (100 - 2*OFFSET)
      const pointerLeft = OFFSET + ratio * USABLE;      // 5% -> 95%
  let progressWidth = ratio * USABLE;             // 0 -> 90%
  if(progressWidth > USABLE) progressWidth = USABLE;
  progress.style.width = progressWidth + '%';
      // Aseguramos que el progress esté alineado con el inicio del track (left ya definido en CSS como 5%)
      if(pointer){
        pointer.style.left = pointerLeft + '%';
        pointer.style.transform = 'translate(-50%, -50%)';
      }
      crossfader.setAttribute('data-ratio', ratio.toFixed(4));
      const y = yearFromRatio(ratio);
      const stage = stageForYear(y);
      crossfader.dataset.stage = stage;
      crossfader.setAttribute('aria-valuenow', String(y));
      crossfader.setAttribute('aria-valuetext', `Año ${y}`);
      if(yearEl) yearEl.textContent = y;
      const stageData = dataForStage(stage);
      ticks.forEach(t => t.classList.toggle('active', parseInt(t.dataset.stage) === stage));
      if(stageData){
        if(labelEl) labelEl.textContent = stageData.place.split(' ')[0];
        if(detailBox){
          detailBox.innerHTML = `<strong>${stageData.place}</strong> · ${stageData.desc} <span style="opacity:.65; margin-left:.35rem; font-size:.75rem;">(${stageData.years})</span>`;
        }
      }
    }
    function pointerPosToRatio(clientX){
      const rect = rail.getBoundingClientRect();
      const x = Math.min(rect.right, Math.max(rect.left, clientX));
      return (x - rect.left) / rect.width; // 0..1
    }
    const onMove = (e) => { if(!dragging) return; ratio = pointerPosToRatio(e.clientX); updateUI(); };
    const onUp = () => { if(!dragging) return; dragging=false; crossfader.classList.remove('dragging'); document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); };
    function startDrag(e){
      e.preventDefault();
      dragging = true;
      crossfader.classList.add('dragging');
      ratio = pointerPosToRatio(e.clientX);
      updateUI();
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    }
  [knob, pointer].forEach(el => el && el.addEventListener('pointerdown', startDrag));
    rail.addEventListener('pointerdown', e => { if(e.target === rail){ ratio = pointerPosToRatio(e.clientX); updateUI(); } });
    // Keyboard: mover en pasos pequeños (un año) y grandes (5 años con Shift)
    crossfader.addEventListener('keydown', e => {
      const stepYear = e.shiftKey ? 5 : 1;
      const span = YEAR_END - YEAR_START;
      if(['ArrowRight','ArrowUp'].includes(e.key)) { e.preventDefault(); ratio = Math.min(1, ratio + stepYear / span); updateUI(); }
      else if(['ArrowLeft','ArrowDown'].includes(e.key)) { e.preventDefault(); ratio = Math.max(0, ratio - stepYear / span); updateUI(); }
      else if(e.key === 'Home'){ e.preventDefault(); ratio = 0; updateUI(); }
      else if(e.key === 'End'){ e.preventDefault(); ratio = 1; updateUI(); }
      else if(e.key === 'PageUp'){ e.preventDefault(); ratio = Math.min(1, ratio + 10/span); updateUI(); }
      else if(e.key === 'PageDown'){ e.preventDefault(); ratio = Math.max(0, ratio - 10/span); updateUI(); }
    });
    // Click en ticks salta al inicio de esa etapa (sin snap forzado luego)
    ticks.forEach(t => t.addEventListener('click', () => {
      const stage = parseInt(t.dataset.stage);
      if(stage === 1) ratio = 0;
      else if(stage === 2) ratio = (STAGE_BOUNDARIES[0] - YEAR_START) / (YEAR_END - YEAR_START);
      else if(stage === 3) ratio = (STAGE_BOUNDARIES[1] - YEAR_START) / (YEAR_END - YEAR_START);
      updateUI();
    }));
    if(!pointer){ console.warn('[Crossfader] No se encontró .fader-pointer'); }
    updateUI();
  }

  const activateLink = (id) => {
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateLink(entry.target.id);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => observer.observe(sec));
});