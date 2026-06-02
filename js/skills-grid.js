// Skills Grid Filter - Filtrado de tecnologías por categoría

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Añadir active al botón clickeado
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filtrar tarjetas
      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Trigger animation
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = '';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
