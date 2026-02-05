document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Función para cambiar de pestaña
    function switchTab(targetId) {
        // Ocultar todas las secciones
        tabContents.forEach(section => {
            section.classList.remove('active');
        });

        // Quitar clase active de todos los links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Mostrar la sección seleccionada
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Marcar el link como activo
        const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Event listeners para los clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            switchTab(targetId);
        });
    });

    // Abrir "Inicio" por defecto al cargar la página
    // Primero verificamos si hay un hash en la URL (por si se recarga la página)
    let initialTab = '#inicio-content';
    if (window.location.hash) {
        // Intentar encontrar si el hash coincide con alguno de nuestros contenidos
        // Nota: Los IDs originales como #inicio ahora están dentro de #inicio-content
        // Pero los enlaces tienen href="#inicio-content"
        const hash = window.location.hash;
        if (document.querySelector(hash) && document.querySelector(hash).classList.contains('tab-content')) {
            initialTab = hash;
        }
    }

    switchTab(initialTab);

    // --- CAROUSEL LOGIC ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let autoSlideInterval;

    function showSlide(n) {
        if (slides.length === 0) return;

        // Wrap around
        if (n >= slides.length) slideIndex = 0;
        else if (n < 0) slideIndex = slides.length - 1;
        else slideIndex = n;

        // Hide all
        slides.forEach(slide => slide.classList.remove('active'));

        // Show current
        slides[slideIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    function prevSlide() {
        showSlide(slideIndex - 1);
    }

    // Event Listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (slides.length > 0) {
        startAutoSlide();
    }

    // --- NEWS SCROLLER LOGIC (Horizontal Scroll) ---
    const newsScroller = document.querySelector('.news-scroller');
    const newsPrevBtn = document.getElementById('news-prev');
    const newsNextBtn = document.getElementById('news-next');

    if (newsScroller && newsPrevBtn && newsNextBtn) {
        newsNextBtn.addEventListener('click', () => {
            // Scroll by width of card (300) + gap (20)
            newsScroller.scrollBy({ left: 320, behavior: 'smooth' });
        });

        newsPrevBtn.addEventListener('click', () => {
            newsScroller.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }
});
