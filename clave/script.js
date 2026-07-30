document.addEventListener('DOMContentLoaded', () => {
  const pinInput = document.getElementById('pinInput');
  const keypad = document.getElementById('keypad');
  const btnClear = document.getElementById('btnClear');
  const btnSubmit = document.getElementById('btnSubmit');

  const MAX_LENGTH = 4;
  let currentPin = '';

  // Funcion para desordenar los numeros (Seguridad en teclados virtuales)
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Genera las teclas dinamicamente desordenadas (0 al 9)
  function renderKeypad() {
    keypad.innerHTML = '';
    const numbers = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    numbers.forEach((num) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'key-btn';
      button.textContent = num;
      button.addEventListener('click', () => handleKeyPress(num));
      keypad.appendChild(button);
    });
  }

  function handleKeyPress(number) {
    if (currentPin.length < MAX_LENGTH) {
      currentPin += number;
      updateUI();
    }
  }

  function updateUI() {
    pinInput.value = currentPin;
    btnSubmit.disabled = currentPin.length !== MAX_LENGTH;
  }

  btnClear.addEventListener('click', () => {
    currentPin = '';
    updateUI();
  });

  btnSubmit.addEventListener('click', () => {
    if (currentPin.length === MAX_LENGTH) {
      alert(`Clave ingresada: ${currentPin}`);
      // Aqui enviarias la clave por HTTPS al servidor o la procesarias
      currentPin = '';
      updateUI();
      renderKeypad(); // Reordena el teclado tras un intento
    }
  });

  // Inicializar teclado al cargar
  renderKeypad();
});