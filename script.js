const typedTextElement = document.getElementById('typing');
if (typedTextElement) {
  const phrases = ['Oi, eu sou Dev', 'João Paulo Corrêa', 'Front-End Iniciante'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = '';

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      currentText = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    typedTextElement.innerHTML = currentText;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 300);
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeEffect, speed);
    }
  }

  typeEffect();
}

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.classList.add('back-to-top');
backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const progressBars = document.querySelectorAll('.progresso');

if (progressBars.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const classes = bar.className.split(' ');
        for (let cls of classes) {
          if (cls !== 'progresso') {
            bar.style.width = getComputedStyle(bar).getPropertyValue(`--${cls}-width`) || '75%';
            if (cls === 'html') bar.style.width = '75%';
            if (cls === 'css') bar.style.width = '70%';
            if (cls === 'js') bar.style.width = '45%';
            if (cls === 'resp') bar.style.width = '65%';
            if (cls === 'semantico') bar.style.width = '70%';
          }
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => observer.observe(bar));
}