// skills.js - canales verticales tipo mixer
(function(){
  const SEGMENTS = 28; // número de segmentos verticales por canal
  const channels = document.querySelectorAll('.skill-channel');
  if(!channels.length) return;

  function buildChannel(channel){
    const meter = channel.querySelector('.meter');
    if(!meter) return;
    meter.innerHTML = '';
    // Peak indicator element
    const peak = document.createElement('div');
    peak.className = 'peak';
    meter.appendChild(peak);
    for(let i=0;i<SEGMENTS;i++){
      const seg = document.createElement('div');
      seg.className = 'seg';
      meter.appendChild(seg);
    }
  }

  channels.forEach(c => buildChannel(c));
  // Crear tooltips a partir de data-info
  channels.forEach(ch => {
    const info = ch.getAttribute('data-info');
    if(info){
      const tip = document.createElement('div');
      tip.className = 'tool-tip';
      tip.textContent = info;
      ch.appendChild(tip);
    }
  });

  function zoneForIndex(idx){
    const ratio = (idx+1)/SEGMENTS; // de abajo (0) a arriba (1)
    if(ratio <= 0.55) return 'green';
    if(ratio <= 0.82) return 'amber';
    return 'red';
  }

  function fillChannel(channel){
    const level = parseInt(channel.getAttribute('data-level'),10) || 0;
    const meter = channel.querySelector('.meter');
    const segs = [...meter.querySelectorAll('.seg')];
    const peakEl = meter.querySelector('.peak');
    const activeCount = Math.round((level/100) * SEGMENTS);
    segs.forEach((seg, i) => {
      if(i < activeCount){
        const z = zoneForIndex(i);
        setTimeout(()=>{
          seg.dataset.zone = z;
          seg.classList.add('active');
        }, i * 28 + Math.random()*25);
      }
    });
    if(peakEl){
      meter.classList.add('show-peak');
      // retirar peak state tras animación para permitir re-loop opcional
      setTimeout(()=> meter.classList.remove('show-peak'), 2700);
    }
    meter.setAttribute('aria-valuenow', String(level));
  }

  let animatedCount = 0;
  let startedLoop = false;

  function replay(){
    channels.forEach(ch => {
      const meter = ch.querySelector('.meter');
      meter.classList.remove('show-peak');
      const segs = meter.querySelectorAll('.seg');
      segs.forEach(s => { s.classList.remove('active'); s.removeAttribute('data-zone'); });
      ch.dataset.animated = '';
    });
    // pequeño respiro antes de volver a llenar
    setTimeout(()=>{ channels.forEach(ch => fillChannel(ch)); }, 200);
  }

  let loopTimer = null;
  function startLoop(){
    if(startedLoop) return;
    startedLoop = true;
    loopTimer = setInterval(()=>{ replay(); }, 8000); // cada 8s
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const ch = e.target;
        if(!ch.dataset.animated){
          fillChannel(ch);
          ch.dataset.animated = 'true';
          animatedCount++;
          if(animatedCount === channels.length){
            // tras primera pasada completa inicia loop automático
            startLoop();
          }
        }
      }
    });
  }, { threshold: 0.35 });

  channels.forEach(c => obs.observe(c));
})();
