document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.scroll-menu button');

  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Hace scroll hacia la sección indicada
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});