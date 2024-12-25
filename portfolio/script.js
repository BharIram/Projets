document.addEventListener('DOMContentLoaded', () => {
  // ... (garder le code précédent) ...

  // Intersection Observer pour les animations au scroll
  const observerOptions = {
      threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Ajouter les classes d'animation appropriées
              if (entry.target.classList.contains('skill-card')) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
              if (entry.target.classList.contains('project-card')) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
              // Désinscrire l'élément une fois animé
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observer les éléments à animer
  document.querySelectorAll('.skill-card, .project-card').forEach(el => {
      observer.observe(el);
  });

  // Animation séquentielle des cartes de compétences
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.2}s`;
  });

  // Animation au hover des projets
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px)';
      });
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
      });
  });

  // Animation du texte de la section hero
  const animateHeroText = () => {
      const heroContent = document.querySelector('.hero-content');
      heroContent.style.opacity = '1';
  };

  // Déclencher l'animation après un court délai
  setTimeout(animateHeroText, 500);
});
// Obtenir le canvas et le contexte de dessin
const canvas = document.getElementById('bubble');
const ctx = canvas.getContext('2d');

// Définir les dimensions du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Créer un tableau pour les bulles
let bubbles = [];
const maxBubbles = 10; // Limite du nombre de bulles actives

// Fonction pour générer des bulles
function createBubble() {
    if (bubbles.length < maxBubbles) { // Créer une bulle seulement si le nombre max n'est pas atteint
        const radius = Math.random() * 30 + 20; // Rayon plus grand (entre 20 et 50)
        const x = Math.random() * canvas.width; // Position aléatoire sur l'axe X
        const y = canvas.height + radius; // Position initiale en bas du canvas
        const speed = Math.random() * 0.5 + 0.5; // Vitesse réduite (entre 0.5 et 1)
        const direction = Math.random() * 2 * Math.PI; // Direction aléatoire pour la bulle
        const dx = Math.cos(direction) * 0.2; // Vitesse horizontale réduite
        const dy = -speed; // Vitesse verticale (vers le haut)

        // Ajouter la nouvelle bulle dans le tableau
        bubbles.push({ x, y, radius, dx, dy });
    }
}

// Fonction pour dessiner les bulles
function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas à chaque frame

    bubbles.forEach((bubble, index) => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2, false); // Dessiner la bulle
        const colors = ['rgba(254, 225, 232, 1)',  'rgba(254, 225, 232, 0.7)', 'rgba(254, 225, 232, 0.5)'];

        bubbles.forEach((bubble, index) => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2, false); // Dessiner la bulle
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]; // Couleur aléatoire
            ctx.fill();
            ctx.closePath();
        });
        // Mettre à jour la position de la bulle
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Si la bulle sort de l'écran, on la supprime
        if (bubble.y + bubble.radius < 0) {
            bubbles.splice(index, 1); // Supprimer la bulle
        }
    });
}

// Fonction pour animer les bulles
function animate() {
    drawBubbles();
    requestAnimationFrame(animate); // Demander à ce que la fonction d'animation soit rappelée
}

// Créer des bulles à intervalles plus espacés
setInterval(createBubble, 500); // Générer une nouvelle bulle toutes les 500ms

// Lancer l'animation
animate();
