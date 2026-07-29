/*=========================================
PREMIUM PORTFOLIO INTERACTIONS
=========================================*/

const header = document.querySelector('.header');
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('active', window.scrollY > 50);
  }

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const revealElements = document.querySelectorAll('section, .project-card, .skill-card, .stat-card, .timeline-item, .education-card, .leadership-card');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.88;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('active', 'reveal');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

const counters = document.querySelectorAll('.stat-card h2');
let counterStarted = false;

function runCounter() {
  if (counterStarted) return;

  const section = document.querySelector('.about');
  if (!section) return;

  const top = section.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    counterStarted = true;

    counters.forEach(counter => {
      const finalText = counter.innerText;
      const finalNumber = parseInt(finalText, 10);
      let value = 0;
      const speed = Math.ceil(finalNumber / 45);

      const update = () => {
        value += speed;
        if (value >= finalNumber) {
          counter.innerText = finalText;
        } else {
          counter.innerText = `${value}+`;
          requestAnimationFrame(update);
        }
      };

      update();
    });
  }
}

window.addEventListener('scroll', runCounter);

const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const code = document.querySelector('.typing-code');
if (code) {
  const text = code.textContent;
  code.textContent = '';

  let i = 0;
  function type() {
    if (i < text.length) {
      code.textContent += text.charAt(i);
      i++;
      setTimeout(type, 18);
    }
  }

  type();
}

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-list');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('show-menu');
  });
}

document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show-menu');
  });
});

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 700);
  });
});

window.addEventListener('mousemove', e => {
  const blobs = document.querySelectorAll('.gradient');

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.015;
    const x = (window.innerWidth / 2 - e.clientX) * speed;
    const y = (window.innerHeight / 2 - e.clientY) * speed;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  });
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

console.log('🚀 Portfolio Loaded Successfully');