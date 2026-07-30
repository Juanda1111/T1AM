document.addEventListener('DOMContentLoaded', () => {
  // Elementos de la escena
  const bici = document.getElementById('bici');
  const sol = document.getElementById('sol');
  const nube = document.getElementById('nube');
  const arbol = document.getElementById('arbol');

  // Sistema de audio Web Audio API (Sintetizador)
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  // --- EFECTOS DE SONIDO SINTETIZADOS ---

  // 1. Timbre de Bicicleta (Ring Ring)
  function playBikeBell() {
    initAudio();
    const now = audioCtx.currentTime;

    const playTone = (freq, startTime) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.15);
    };

    // Doble tono agudo característico del timbre
    playTone(1200, now);
    playTone(1500, now + 0.1);
    playTone(1200, now + 0.2);
    playTone(1500, now + 0.3);
  }

  // 2. Resplandor del Sol (Tono brillante en acento)
  function playSunSound() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // Nota C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.5); // Arpegio ascendente a C6

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  }

  // 3. Sonido de Viento (Nube)
  function playWindSound() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.3);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  }

  // 4. Sacudida de hojas (Árbol)
  function playTreeSound() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  }

  // --- INTERACCIONES Y ANIMACIONES ---

  // Interacción Bicicleta: Avanza hacia la derecha y suena el timbre
  let posX = 350;
  bici.addEventListener('click', () => {
    playBikeBell();

    // Avanzar posición
    posX += 60;
    if (posX > 720) posX = -50; // Reiniciar si sale del margen
    bici.style.left = `${posX}px`;

    // Animación de rebote al avanzar
    bici.classList.add('bici-avanzando');
    setTimeout(() => bici.classList.remove('bici-avanzando'), 300);
  });

  // Interacción Sol: Giro de 360° y sonido armónico
  sol.addEventListener('click', () => {
    playSunSound();
    sol.classList.add('sol-girando');
    setTimeout(() => sol.classList.remove('sol-girando'), 600);
  });

  // Interacción Nube: Escala momentánea y sonido de ráfaga
  nube.addEventListener('click', () => {
    playWindSound();
    nube.classList.add('nube-soplo');
    setTimeout(() => nube.classList.remove('nube-soplo'), 300);
  });

  // Interacción Árbol: Sacudida de ramas
  arbol.addEventListener('click', () => {
    playTreeSound();
    arbol.classList.add('arbol-sacudida');
    setTimeout(() => arbol.classList.remove('arbol-sacudida'), 400);
  });
});