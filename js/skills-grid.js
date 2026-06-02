// Skills Grid — filtrado + mini ecualizador animado

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards    = document.querySelectorAll('.skill-card');

  // ── Filtro ──────────────────────────────────────────────
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.animation = 'none';
          requestAnimationFrame(() => { card.style.animation = ''; });
        }
      });
    });
  });

  // ── Mini ecualizador por carta ────────────────────────────
  const N_BARS = 12;

  function buildEq(card) {
    const level = parseInt(card.dataset.level || '75', 10) / 100;
    const wrap  = document.createElement('div');
    wrap.className = 'skill-eq';
    wrap.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < N_BARS; i++) {
      const bar = document.createElement('div');
      bar.className = 'skill-eq-bar';

      // Altura base: patrón sinusoidal + nivel → aspecto de EQ real
      const phase  = (i / N_BARS) * Math.PI * 2;
      const jitter = 0.12 * (Math.sin(phase * 3.7 + i) + 1); // 0–0.24
      const h      = Math.min(1, Math.max(0.08, level * 0.75 + Math.sin(phase) * 0.18 + jitter));

      bar.style.setProperty('--peak', (h * 100).toFixed(1) + '%');
      bar.style.setProperty('--delay', (i * 80) + 'ms');
      // Cada barra con duración ligeramente distinta → asincronía natural
      const dur = (700 + ((i * 137) % 600)).toFixed(0); // 700–1300 ms, sin random
      bar.style.setProperty('--dur', dur + 'ms');

      wrap.appendChild(bar);
    }
    card.appendChild(wrap);
  }

  skillCards.forEach(buildEq);
});
