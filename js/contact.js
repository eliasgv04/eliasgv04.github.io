// contact.js - lógica interactiva para la sección de contacto (cassette)
// Progressive enhancement: el formulario funciona con mailto incluso sin JS (submit normal)

(function(){
  const form = document.querySelector('#contactForm');
  if(!form) return;

  const nameInput = form.querySelector('#cfName');
  const emailInput = form.querySelector('#cfEmail');
  // radios de motivo
  const subjectRadios = form.querySelectorAll('input[name="subject"]');
  const messageArea = form.querySelector('#cfMessage');
  const msgMeterFill = form.querySelector('.mm-fill');
  const tapeFill = document.querySelector('.tape-level-fill');
  const quickTagBtns = form.querySelectorAll('.qt-btn');
  const sendStatus = form.querySelector('.send-status');
  const recDot = form.querySelector('.rec-dot');

  // estados
  let sending = false;

  // Validación básica
  function showFieldError(input, msg){
    const row = input.closest('.field-row');
    const fMsg = row ? row.querySelector('.f-msg') : null;
    if(fMsg){ fMsg.textContent = msg || ''; }
    if(msg){ input.setAttribute('aria-invalid','true'); }
    else { input.removeAttribute('aria-invalid'); }
  }

  function validateEmail(value){
    return /.+@.+\..+/.test(value.trim());
  }

  function validate(){
    let ok = true;
    // nombre
    if(nameInput.value.trim().length < 2){
      showFieldError(nameInput,'Nombre demasiado corto'); ok=false;
    } else showFieldError(nameInput,'');
    // email
    if(!validateEmail(emailInput.value)) { showFieldError(emailInput,'Email inválido'); ok=false; }
    else showFieldError(emailInput,'');
    // mensaje
    if(messageArea.value.trim().length < 10){ showFieldError(messageArea,'Mensaje muy corto'); ok=false; }
    else showFieldError(messageArea,'');
    return ok;
  }

  // Meter longitud
  function updateMeter(){
    const len = messageArea.value.length;
    const pct = Math.min(100, (len / 800) * 100); // 800 chars referencia
    msgMeterFill.style.width = pct + '%';
    if(tapeFill){
      // cinta avanza menos (hasta ~70%) para no vaciar visualmente
      const tapePct = 15 + (pct * 0.55);
      tapeFill.style.width = tapePct + '%';
    }
  }

  messageArea.addEventListener('input', updateMeter);
  updateMeter();

  // Quick tags
  quickTagBtns.forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.preventDefault();
      const tag = btn.dataset.tag?.trim();
      if(!tag) return;
      const current = messageArea.value;
      const already = current.includes(tag);
      const spacer = current && !/\s$/.test(current) ? ' ' : '';
      if(!already){
        messageArea.value = current + spacer + tag;
        messageArea.focus();
        updateMeter();
        animateReels();
      } else {
        // breve resaltado si ya existe
        messageArea.classList.add('flash');
        setTimeout(()=>messageArea.classList.remove('flash'),400);
      }
    });
  });

  // Crossfader según subject (decorativo)
  // (Crossfader visual eliminado; limpieza de lógica)

  // Animación reels al escribir
  let reelTimer;
  const reels = document.querySelectorAll('.reel .spokes');
  function animateReels(){
    document.querySelector('.cassette')?.classList.add('typing');
    clearTimeout(reelTimer);
    reelTimer = setTimeout(()=>{
      document.querySelector('.cassette')?.classList.remove('typing');
    }, 1600);
  }
  messageArea.addEventListener('input', animateReels);

  // Submit -> mailto
  form.addEventListener('submit', e=>{
    if(sending) { e.preventDefault(); return; }
    if(!validate()) { e.preventDefault(); return; }
    e.preventDefault();
    sending = true;
    sendStatus.textContent = 'Preparando mensaje…';
    recDot.classList.add('active');

    // construir mailto
    const to = 'eliagonzalezvaldepenas@gmail.com';
  const chosen = [...subjectRadios].find(r=>r.checked)?.value || 'Mensaje';
  const subj = encodeURIComponent(chosen + ' - ' + nameInput.value.trim());
    const bodyLines = [
      'Nombre: ' + nameInput.value.trim(),
      'Email: ' + emailInput.value.trim(),
      '',
      messageArea.value.trim(),
      '',
      '-- Enviado desde el portfolio cassette --'
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const href = `mailto:${to}?subject=${subj}&body=${body}`;

    // pequeña animación y abrir
    setTimeout(()=>{
      window.location.href = href;
      sendStatus.textContent = 'Abriendo tu cliente de correo…';
      setTimeout(()=>{
        sendStatus.textContent = 'Si no se abrió, copia: ' + to;
        sending = false;
        recDot.classList.remove('active');
      }, 3200);
    }, 450);
  });

})();
