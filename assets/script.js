// Year
const yearEl = document.getElementById('y'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', ()=>{
    const cls = document.documentElement.classList;
    const isDark = cls.toggle('dark');
    themeBtn.setAttribute('aria-pressed', String(isDark));
  });
}

// Enhanced sticky header behavior
const header = document.querySelector('.site-header');
let rafId = null;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (rafId) return;
  
  rafId = requestAnimationFrame(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 10;
    
    // Add scrolled class for shadow and enhanced styling
    header.classList.toggle('scrolled', currentScrollY > scrollThreshold);
    
    // Optional: Add subtle hide/show effect on scroll direction
    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - could add hide effect here if desired
      } else {
        // Scrolling up - ensure header is visible
        header.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollY = currentScrollY;
    rafId = null;
  });
});

// Ensure header is visible on page load
window.addEventListener('load', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Dynamic timeline alignment
function alignTimeline() {
  const workCards = document.querySelectorAll('.work-card');
  const timelineDates = document.querySelectorAll('.timeline-date');
  const timelineDots = document.querySelectorAll('.timeline-dot');
  
  if (workCards.length === 0) return;
  
  workCards.forEach((card, index) => {
    if (index < timelineDates.length && index < timelineDots.length) {
      const cardHeight = card.offsetHeight;
      const cardTop = card.offsetTop;
      
      // Align timeline date with the top of the work card
      const date = timelineDates[index];
      date.style.height = `${cardHeight}px`;
      date.style.paddingTop = '20px';
      
      // Position timeline dot in the center of the work card
      const dot = timelineDots[index];
      //const dotTop = cardTop + (cardHeight / 2) - 8; // 8px is half the dot height
      const dotTop = cardTop+40; // 8px is half the dot height
      dot.style.position = 'absolute';
      dot.style.top = `${dotTop}px`;
      dot.style.margin = '0';
    }
  });
}

// Align timeline on load and resize
window.addEventListener('load', alignTimeline);
window.addEventListener('resize', alignTimeline);

// Smooth anchor scrolling with slight easing offset (for browsers not supporting CSS smooth)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.length === 1) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY - 72; // header offset
    const duration = 500;
    const ease = t => t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    let startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      const p = Math.min((ts - startTime)/duration, 1);
      const y = start + (end - start) * ease(p);
      window.scrollTo(0, y);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
});

// Parallax drift for the avatar inside the hero graphic (subtle!)
const heroGraphic = document.querySelector('.hero-graphic');
const avatarRing = document.querySelector('.avatar-ring');
const avatarInnerRing = document.querySelector('.avatar-inner-ring');
const avatarImage = document.querySelector('.avatar-image');

if (heroGraphic && avatarRing && avatarInnerRing && avatarImage) {
  let raf = null;
  
  heroGraphic.addEventListener('mousemove', (e) => {
    const r = heroGraphic.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;  // range ~[-4, 4]
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      // Apply parallax to all avatar elements
      avatarRing.style.transform = `translate(${x}px, ${y - 2}px)`;
      avatarInnerRing.style.transform = `translate(${x}px, ${y - 2}px)`;
      avatarImage.style.transform = `translate(${x}px, ${y - 2}px)`;
    });
  });
  
  heroGraphic.addEventListener('mouseleave', () => {
    // Reset all avatar elements to original position
    avatarRing.style.transform = 'translate(0, 0)';
    avatarInnerRing.style.transform = 'translate(0, 0)';
    avatarImage.style.transform = 'translate(0, 0)';
  });
}

// Reveal-in animation for skill cards
(() => {
  const cards = document.querySelectorAll('.sc-card.reveal');
  if(!cards.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.25});
  cards.forEach(c=>io.observe(c));
})();
