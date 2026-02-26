// --- Menú Hamburguesa ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

if (hamburgerBtn && dropdownMenu) {
    hamburgerBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    const menuLinks = dropdownMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    });
}

// --- Dark Mode Toggle ---
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            root.removeAttribute('data-theme');
            themeBtn.textContent = '☀️ Modo Claro';
        } else {
            root.setAttribute('data-theme', 'dark');
            themeBtn.textContent = '🌙 Modo Oscuro';
        }
    });
}

// --- Accordion Logic ---
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (!content || !content.classList.contains('accordion-content')) return;

        const isOpen = content.classList.contains('show');

        // Cerrar todos los demás del mismo padre
        btn.parentElement.querySelectorAll('.accordion-content.show').forEach(sib => {
            sib.classList.remove('show');
        });
        btn.parentElement.querySelectorAll('.accordion-btn.active').forEach(b => {
            b.classList.remove('active');
        });

        // Abrir el actual si estaba cerrado
        if (!isOpen) {
            content.classList.add('show');
            btn.classList.add('active');
        }
    });
});

// --- Sobre Mí Toggle ---
const tituloSobreMi = document.querySelector('.text-box h2');
const detalleSobreMi = document.querySelector('.text-box p');

if (tituloSobreMi && detalleSobreMi) {
    tituloSobreMi.addEventListener('click', () => {
        if (detalleSobreMi.style.display === 'none' || detalleSobreMi.style.display === '') {
            detalleSobreMi.style.display = 'block';
        } else {
            detalleSobreMi.style.display = 'none';
        }
    });
}

// --- Botón Volver Arriba ---
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- Carrusel de Tipografías ---
const headerName = document.getElementById('header-name');
if (headerName) {
    const fonts = [
        { family: "'Inter', sans-serif", weight: "900", spacing: "0px", style: "normal" },
        { family: "'Playfair Display', serif", weight: "900", spacing: "2px", style: "italic" },
        { family: "'Montserrat', sans-serif", weight: "900", spacing: "-1px", style: "normal" },
        { family: "'Dancing Script', cursive", weight: "700", spacing: "3px", style: "normal" },
        { family: "'Abril Fatface', serif", weight: "400", spacing: "1px", style: "normal" },
        { family: "'Roboto Mono', monospace", weight: "700", spacing: "-2px", style: "normal" },
        { family: "'Pacifico', cursive", weight: "400", spacing: "2px", style: "normal" }
    ];
    let currentFontIndex = 0;

    setInterval(() => {
        currentFontIndex = (currentFontIndex + 1) % fonts.length;
        const nextFont = fonts[currentFontIndex];
        headerName.style.fontFamily = nextFont.family;
        headerName.style.fontWeight = nextFont.weight;
        headerName.style.letterSpacing = nextFont.spacing;
        headerName.style.fontStyle = nextFont.style;

        // Efecto de "pop"
        headerName.style.transform = "scale(1.02)";
        setTimeout(() => {
            headerName.style.transform = "scale(1)";
        }, 200);
    }, 800);
}

// --- Animaciones de Revelado al Scroll ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: dejar de observar una vez revelado
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
    rootMargin: "0px 0px -80px 0px" // Más margen para que la animación sea más notoria
});

document.querySelectorAll('.reveal, .scale-reveal').forEach(el => {
    revealObserver.observe(el);
});

// --- Forzar Inicio en Superior al Cargar/Recargar ---
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// También al iniciar el script por si 'load' ya pasó o para navegadores rápidos
window.scrollTo(0, 0);