// ===== FADE IN ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== ACCORDION =====
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordion = header.parentElement;
        document.querySelectorAll('.accordion.open').forEach(a => {
            if (a !== accordion) a.classList.remove('open');
        });
        accordion.classList.toggle('open');
    });
});

// ===== THEME TOGGLE =====
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleText();
}

function updateToggleText() {
    const btns = document.querySelectorAll('.theme-toggle');
    const theme = document.documentElement.getAttribute('data-theme');
    btns.forEach(btn => btn.textContent = theme === 'light' ? '🌙' : '☀️');
}

// Load saved theme
(function() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    setTimeout(updateToggleText, 0);
})();

// ===== NAV SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        nav.style.padding = '0.5rem 2rem';
    } else {
        nav.style.padding = '0.8rem 2rem';
    }
    lastScroll = currentScroll;
}, { passive: true });

// ===== STAGGER CHILDREN (for grids) =====
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
                child.style.transitionDelay = (i * 0.08) + 's';
                child.classList.add('visible');
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));
