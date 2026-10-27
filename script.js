// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Tutup menu saat klik link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== SMOOTH ACTIVE NAVBAR =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.style.color = '';
    if (item.getAttribute('href') === `#${current}`) {
      item.style.color = '#a78bfa';
    }
  });
});

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
      observer.disconnect();
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkills, {
  threshold: 0.3
});

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// ===== SCROLL REVEAL (fade-in cards) =====
const revealElements = document.querySelectorAll('.about-card, .project-card, .contact-card, .skill-category');

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== MODAL PROFILE =====
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');

document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    const name  = card.dataset.name;
    const nim   = card.dataset.nim;
    const role  = card.dataset.role;
    const email = card.dataset.email;
    const wa    = card.dataset.wa;
    const photo = card.dataset.photo;
    const about = card.dataset.about;

    document.getElementById('modalName').textContent  = name;
    document.getElementById('modalNim').textContent   = 'NIM: ' + nim;
    document.getElementById('modalRole').innerHTML    = '<i class="fas fa-laptop-code"></i> ' + role;
    document.getElementById('modalDetails').textContent = about;

    // Foto atau icon
    const modalPhoto = document.getElementById('modalPhoto');
    const modalIcon  = document.getElementById('modalIcon');
    if (photo) {
      modalPhoto.src = photo;
      modalPhoto.style.display = 'block';
      modalIcon.style.display  = 'none';
    } else {
      modalPhoto.style.display = 'none';
      modalIcon.style.display  = 'flex';
    }

    // Tombol aksi
    document.getElementById('modalActions').innerHTML = `
      <a href="mailto:${email}" class="modal-btn modal-btn-email">
        <i class="fas fa-envelope"></i> Email
      </a>
      <a href="https://wa.me/${wa}" target="_blank" class="modal-btn modal-btn-wa">
        <i class="fab fa-whatsapp"></i> WhatsApp
      </a>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Tutup modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
