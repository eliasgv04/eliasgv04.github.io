const vinyl = document.querySelector('.vinyl');
const label = document.querySelector('.label');
const tonearm = document.querySelector('.tonearm');
const togglePlay = document.getElementById('togglePlay');
const audio = document.getElementById('audioTrack');
const progressCircle = document.querySelector('.track-progress .fg');
const eqBars = document.querySelectorAll('.mini-eq span');
const pulse = document.querySelector('.audio-pulse');
const volumeKnob = document.getElementById('volumeKnob');
const volumeValue = document.getElementById('volumeValue');
const elapsedEl = document.getElementById('elapsed');
const durationEl = document.getElementById('duration');
const homeSection = document.getElementById('home');
const turntable = document.querySelector('.turntable');

let isPlaying = false;
let audioCtx, sourceNode, analyser, dataArray, rafId, gainNode;
// Volumen lógico (0-1) que maneja el usuario (lineal). Aplicaremos una curva perceptual al asignarlo al <audio>.
let currentVolume = 0.8; // default
const storedVol = parseFloat(localStorage.getItem('playerVolume'));
if (!isNaN(storedVol)) {
  currentVolume = Math.min(1, Math.max(0, storedVol));
}
// map volume 0-1 to angle range (-135deg a +135deg)
function volumeToAngle(v){ return -135 + (270 * v); }
function angleToVolume(a){ return Math.min(1, Math.max(0, (a + 135) / 270)); }
let isMuted = false;
let isBoost = false;
let prevVolumeForMute = currentVolume;
const muteKnob = document.getElementById('muteKnob');
const boostKnob = document.getElementById('boostKnob');
const loopKnob = document.getElementById('loopKnob');

function applyGain(){
  const maxExtra = isBoost ? 6 : 0; // +6dB opcional
  const dB = isMuted ? -80 : (-50 + (50 + maxExtra) * currentVolume);
  const gainLinear = Math.pow(10, dB / 20);
  if (gainNode) gainNode.gain.value = gainLinear; else audio.volume = gainLinear;
}
function setVolume(v, opts={}){
  currentVolume = Math.min(1, Math.max(0, v));
  applyGain();
  const angle = volumeToAngle(currentVolume);
  volumeKnob.style.setProperty('--angle', angle + 'deg');
  const percent = Math.round(currentVolume*100);
  volumeKnob.setAttribute('aria-valuenow', percent.toString());
  volumeKnob.setAttribute('aria-valuetext', percent + '% de volumen');
  if (volumeValue) volumeValue.textContent = percent + '%';
  if (opts.save !== false) {
    try { localStorage.setItem('playerVolume', currentVolume.toString()); } catch(e) {}
  }
}
setVolume(currentVolume, { save:false });

// Marcar vinyl para color dinámico
vinyl.classList.add('dynamic-color');

function pointerAngle(clientX, clientY){
  const rect = volumeKnob.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  let deg = Math.atan2(dy, dx) * 180/Math.PI; // -180..180 (0 = eje X positivo)
  deg = deg - 90; // rotamos para que -90 sea arriba
  // normalizamos a rango -135..135
  if (deg < -180) deg += 360;
  if (deg > 180) deg -= 360;
  deg = Math.max(-135, Math.min(135, deg));
  return deg;
}

let dragging = false;
function handlePointer(e){
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const ang = pointerAngle(clientX, clientY);
  const vol = angleToVolume(ang);
  setVolume(vol);
}

if (volumeKnob) {
  volumeKnob.addEventListener('pointerdown', e=>{
    dragging = true; volumeKnob.setPointerCapture(e.pointerId); handlePointer(e);
  });
  volumeKnob.addEventListener('pointermove', e=>{ if (dragging) handlePointer(e); });
  volumeKnob.addEventListener('pointerup', e=>{ dragging = false; });
  volumeKnob.addEventListener('pointerleave', e=>{ dragging = false; });
  // Soporte táctil extra
  volumeKnob.addEventListener('touchstart', handlePointer, {passive:true});
  volumeKnob.addEventListener('touchmove', e=>{ handlePointer(e); }, {passive:true});
  // Teclado
  volumeKnob.addEventListener('keydown', e=>{
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { setVolume(currentVolume + 0.05); e.preventDefault(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { setVolume(currentVolume - 0.05); e.preventDefault(); }
    if (e.key === 'Home') { setVolume(0); }
    if (e.key === 'End') { setVolume(1); }
    if (isMuted && currentVolume > 0) { // desmutea si se ajusta volumen
      isMuted = false;
      updateMuteKnob();
      applyGain();
    }
  });
}

function setupAudioGraph(){
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  sourceNode = audioCtx.createMediaElementSource(audio);
  gainNode = audioCtx.createGain();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 64;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  sourceNode.connect(gainNode).connect(analyser).connect(audioCtx.destination);
  applyGain();
}

function updateProgress(){
  if (!audio.duration) return;
  const ratio = audio.currentTime / audio.duration;
  const full = 339.292; // 2 * PI * r  (r=54)
  progressCircle.style.strokeDashoffset = (full - full * ratio).toString();
  // Tiempo
  if (elapsedEl) elapsedEl.textContent = formatTime(audio.currentTime);
}

function animateFrame(){
  updateProgress();
  if (analyser) {
    analyser.getByteFrequencyData(dataArray);
    // Energía global para efectos (promedio de todas las frecuencias)
    let sum = 0;
    for (let i=0;i<dataArray.length;i++) sum += dataArray[i];
    const globalAvg = (sum / dataArray.length) / 255; // 0 - 1
    // Frecuencias altas (último tercio) para shift de color
    let hiSum = 0; let hiCount = 0;
    for (let i = Math.floor(dataArray.length*0.66); i < dataArray.length; i++){ hiSum += dataArray[i]; hiCount++; }
    const hiAvg = hiCount ? (hiSum/hiCount)/255 : 0;
    const hueDeg = Math.round(hiAvg * 240); // 0 - 240º
    document.documentElement.style.setProperty('--accent-shift', hueDeg + 'deg');
    // Ecualizador REAL por bandas (5 barras) basado en el espectro actual.
    if (eqBars && eqBars.length) {
      // Crear bandas dividiendo el espectro en 5 secciones log-friendly.
      const bands = 5;
      const binCount = dataArray.length; // p.e. 32 si fftSize=64
      if (!window.__eqPrev) window.__eqPrev = Array.from({length:bands},()=>0.15);
      // Para una sensación más musical, usamos una distribución exponencial ligera.
      // Calculamos bordes de bandas usando potencia para dar más resolución a graves.
      const edges = [];
      for (let b=0;b<=bands;b++) {
        // Potencia 1.4 para sesgar hacia graves
        const frac = Math.pow(b / bands, 1.4);
        edges.push(Math.min(binCount-1, Math.round(frac * (binCount-1))));
      }
      const bandValues = [];
      for (let b=0;b<bands;b++) {
        const start = edges[b];
        const end = edges[b+1];
        let acc = 0; let c=0;
        for (let k=start;k<=end;k++){ acc += dataArray[k]; c++; }
        const avg = c ? acc / c : 0; // 0-255
        bandValues.push(avg / 255); // normalizado 0-1
      }
      // Si está muteado, las barras deberían quedar casi planas.
      const targetValues = isMuted ? bandValues.map(()=>0.03) : bandValues.map(v=> Math.max(0.05, v));
      // Smoothing
      window.__eqPrev = window.__eqPrev.map((prev,i)=>{
        const t = targetValues[i];
        const eased = prev + (t - prev) * 0.28; // factor suavizado
        if (eqBars[i]) {
          // Map a escala visual: 0.05 → ~0.07; 1 → 1.
          const scale = 0.05 + eased * 0.95;
            eqBars[i].style.transform = `scaleY(${scale.toFixed(2)})`;
        }
        return eased;
      });
    }
    // Actualizar brillo del label y pulso
    if (label) label.style.setProperty('--level', globalAvg.toFixed(2));
    if (pulse) pulse.style.transform = `translate(-50%,-50%) scale(${1 + globalAvg*0.4})`;
  }
  rafId = requestAnimationFrame(animateFrame);
}

togglePlay.addEventListener('click', () => {
  isPlaying = !isPlaying;

  if (isPlaying) {
    setupAudioGraph();
    audioCtx.resume();
    audio.play();
    tonearm.classList.add('playing');
    vinyl.classList.add('playing');
    vinyl.style.animationPlayState = 'running';
    togglePlay.textContent = '⏸ Pause';
    togglePlay.classList.add('playing');
    document.body.classList.add('playing-audio');
    animateFrame();
  } else {
    audio.pause();
    tonearm.classList.remove('playing');
    vinyl.classList.remove('playing');
    vinyl.style.animationPlayState = 'paused';
    togglePlay.textContent = '▶ Play';
    togglePlay.classList.remove('playing');
    cancelAnimationFrame(rafId);
    document.body.classList.remove('playing-audio');
  }
});

audio.addEventListener('ended', () => {
  isPlaying = false;
  tonearm.classList.remove('playing');
  vinyl.classList.remove('playing');
  vinyl.style.animationPlayState = 'paused';
  togglePlay.textContent = '▶ Play';
  togglePlay.classList.remove('playing');
  progressCircle.style.strokeDashoffset = '339.292';
  cancelAnimationFrame(rafId);
  document.body.classList.remove('playing-audio');
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', ()=>{
  if (durationEl) durationEl.textContent = formatTime(audio.duration);
  updateProgress();
});

function formatTime(sec){
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

// Parallax ligero
let parallaxRAF = null;
if (homeSection && turntable) {
  homeSection.addEventListener('mousemove', e=>{
    const rect = homeSection.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    if (!parallaxRAF) {
      parallaxRAF = requestAnimationFrame(()=>{
        const maxTilt = 6; // grados
        const rotateX = (+y * maxTilt).toFixed(2);
        const rotateY = (-x * maxTilt).toFixed(2);
        turntable.classList.add('parallax-active');
        turntable.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        parallaxRAF = null;
      });
    }
  });
  homeSection.addEventListener('mouseleave', ()=>{
    turntable.classList.remove('parallax-active');
    turntable.style.transform = '';
  });
}

// ==== Lógica Mini Knobs extra (Mute / Boost / Loop) ====
function toggleKnobActive(el, on){
  if (!el) return;
  el.dataset.state = on ? 'on' : 'off';
  el.classList.toggle('active', !!on);
  el.setAttribute('aria-checked', on ? 'true':'false');
}
function updateMuteKnob(){ toggleKnobActive(muteKnob, isMuted); }
function updateBoostKnob(){ toggleKnobActive(boostKnob, isBoost); }
function updateLoopKnob(){ toggleKnobActive(loopKnob, audio.loop); }

function handleMiniKnob(el, action){
  if (!el) return;
  el.addEventListener('click', action);
  el.addEventListener('keydown', e=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action(); }});
}

handleMiniKnob(muteKnob, ()=>{
  isMuted = !isMuted;
  if (isMuted) {
    prevVolumeForMute = currentVolume;
  } else if (prevVolumeForMute > 0 && currentVolume === 0) {
    setVolume(prevVolumeForMute, {save:false});
  }
  updateMuteKnob();
  applyGain();
});

handleMiniKnob(boostKnob, ()=>{
  isBoost = !isBoost;
  updateBoostKnob();
  applyGain();
});

handleMiniKnob(loopKnob, ()=>{
  audio.loop = !audio.loop;
  updateLoopKnob();
});

// Inicializar estados visuales
updateMuteKnob();
updateBoostKnob();
updateLoopKnob();

