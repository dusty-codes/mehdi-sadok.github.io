// ---------- Navigation : fond au défilement ----------
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Menu mobile ----------
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ---------- Lien actif selon la section visible ----------
const links = menu.querySelectorAll('a:not(.nav-cta)');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

// ---------- Barres de compétences : se remplissent à l'arrivée ----------
const barObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.bar i').style.width = entry.target.dataset.level + '%';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skills li').forEach(li => barObserver.observe(li));

// ---------- Formulaire : ouvre le client mail ----------
const EMAIL = 'mehdisadok06@gmail.com'; // <-- remplace par ton adresse
const form = document.getElementById('form');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', e => {
  e.preventDefault();
  const nom = form.nom.value.trim();
  const message = form.message.value.trim();

  if (!nom || !message) {
    formMsg.textContent = 'Renseignez votre nom et votre message.';
    formMsg.classList.add('error');
    return;
  }
  formMsg.classList.remove('error');
  formMsg.textContent = 'Ouverture de votre messagerie…';

  const subject = encodeURIComponent('Message depuis ton portfolio — ' + nom);
  const body = encodeURIComponent(message + '\n\n' + nom);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
});

// ---------- Année du pied de page ----------
document.getElementById('year').textContent = new Date().getFullYear();