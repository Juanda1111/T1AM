document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('texto');
  const numCaracteres = document.getElementById('numCaracteres');

  // Evento 'input' detecta escritura, borrado y pegado de texto en tiempo real
  textarea.addEventListener('input', () => {
    numCaracteres.textContent = textarea.value.length;
  });
});