// projects.js
// Lógica de filtrado y pequeños detalles de accesibilidad para la sección Proyectos

(function(){
  const toolbar = document.querySelector('.projects-filters');
  if(!toolbar) return;

  const buttons = Array.from(toolbar.querySelectorAll('.pf-btn'));
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const live = document.getElementById('projectsLive');

  function updateLive(msg){
    if(live){
      live.textContent = msg;
    }
  }

  function applyFilter(filter){
    let visible = 0;
    cards.forEach(card => {
      const cats = card.getAttribute('data-cat') || '';
      const match = filter === 'all' || cats.split(/\s+/).includes(filter);
      if(match){
        card.hidden = false;
        visible++;
      } else {
        card.hidden = true;
      }
    });
    updateLive(`${visible} proyecto${visible!==1?'s':''} visibles`);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = toolbar.querySelector('.pf-btn.active');
      if(current && current !== btn){
        current.classList.remove('active');
        current.setAttribute('aria-pressed','false');
      }
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');
      applyFilter(btn.dataset.filter);
    });
    btn.addEventListener('keydown', e => {
      // Flechas para navegar entre filtros
      if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
        e.preventDefault();
        let idx = buttons.indexOf(btn);
        if(e.key === 'ArrowRight') idx = (idx + 1) % buttons.length;
        else if(e.key === 'ArrowLeft') idx = (idx - 1 + buttons.length) % buttons.length;
        else if(e.key === 'Home') idx = 0;
        else if(e.key === 'End') idx = buttons.length -1;
        buttons[idx].focus();
      }
    });
  });

  // Nota emergente simple para botones con data-note
  document.addEventListener('click', e => {
    const noteBtn = e.target.closest('.note-btn');
    if(noteBtn){
      const msg = noteBtn.getAttribute('data-note');
      if(msg){
        // Popup accesible mínimo
        showNoteToast(msg, noteBtn);
      }
    }
  });

  let toastTimer = null;
  function showNoteToast(message, anchor){
    let toast = document.querySelector('.proj-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'proj-toast';
      toast.setAttribute('role','status');
      toast.setAttribute('aria-live','polite');
      document.body.appendChild(toast);
      Object.assign(toast.style, {
        position:'fixed',
        zIndex:9999,
        maxWidth:'300px',
        fontSize:'0.75rem',
        lineHeight:'1.3',
        padding:'0.65rem 0.8rem 0.7rem',
        background:'linear-gradient(135deg,var(--proj-card-bg,#222),var(--proj-card-bg-alt,#333))',
        border:'1px solid var(--proj-border,#444)',
        color:'var(--text-color,#fff)',
        borderRadius:'10px',
        boxShadow:'0 6px 22px -6px rgba(0,0,0,.45)',
        transition:'opacity .4s, transform .4s',
        opacity:'0',
        transform:'translateY(6px)'
      });
    }
    toast.textContent = message;
    const rect = anchor.getBoundingClientRect();
    const top = rect.top + window.scrollY - 12 - 8; // margen
    const left = rect.left + window.scrollX;
    toast.style.top = `${top}px`;
    toast.style.left = `${Math.min(left, window.scrollX + window.innerWidth - 320)}px`;
    requestAnimationFrame(()=>{
      toast.style.opacity='1';
      toast.style.transform='translateY(0)';
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>{
      toast.style.opacity='0';
      toast.style.transform='translateY(6px)';
    }, 3600);
  }

  // Inicial
  applyFilter('all');
  updateLive('Todos los proyectos visibles');
})();
