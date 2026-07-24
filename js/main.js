document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GESTION DU THEME SOMBRE (DARK MODE & LOCALSTORAGE)
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    // Récupère le thème sauvegardé, ou applique "light" par défaut
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            let newTheme = theme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme); // Persistance lors du rechargement et changement de page
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === "dark") {
                themeIcon.className = "bi bi-sun-fill";
            } else {
                themeIcon.className = "bi bi-moon-fill";
            }
        }
    }

    // ==========================================
    // 2. NAVBAR DYNAMIQUE & BOUTON RETOUR EN HAUT AU SCROLL
    // ==========================================
    const siteHeader = document.querySelector(".site-header");
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        // Changement de couleur de fond et gain d'une ombre portée après 80px
        if (siteHeader) {
            if (scrollPosition > 80) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        }

        // Le bouton "Retour en haut" apparaît après 300px de scroll
        if (backToTopBtn) {
            if (scrollPosition > 300) {
                // CORRECTION : On RETIRE "hidden" pour ENFIN AFFICHER le bouton quand on descend
                backToTopBtn.classList.remove("hidden");
            } else {
                // CORRECTION : On AJOUTE "hidden" pour MASQUER le bouton quand on est en haut
                backToTopBtn.classList.add("hidden");
            }
        }
    });

    // Remonte l'écran en douceur au clic (smooth scroll)
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CONFIGURATION DE L'API INTERSECTION OBSERVER
    // ==========================================
    // Options globales pour déclencher l'animation quand 15% de l'élément est visible
    const observerOptions = {
        root: null, // Utilise la boîte de visualisation du navigateur (viewport)
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Déclenche un peu avant l'entrée complète
    };

    // ==========================================
    // 2. COMPTEURS ANIMÉS AU SCROLL (INDEX.HTML)
    // ==========================================
    const counters = document.querySelectorAll(".js-counter");
    
    if (counters.length > 0) {
        const animateCounters = (entries, observer) => {
            entries.forEach(entry => {
                // Si la section des chiffres clés devient visible à l'écran
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute("data-target");
                    const duration = 2000; // Durée totale de l'animation en millisecondes (2 secondes)
                    const stepTime = Math.max(Math.floor(duration / target), 15);
                    
                    let start = 0;
                    
                    const timer = setInterval(() => {
                        start += Math.ceil(target / (duration / stepTime));
                        if (start >= target) {
                            counter.innerText = target;
                            clearInterval(timer);
                        } else {
                            counter.innerText = start;
                        }
                    }, stepTime);
                    
                    // Désactive l'observation pour ne pas rejouer l'animation inutilement
                    observer.unobserve(counter);
                }
            });
        };

        const counterObserver = new IntersectionObserver(animateCounters, observerOptions);
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // 3. ANIMATIONS FADE-IN / SLIDE-IN DES SECTIONS (INDEX & PROGRAMME)
    // ==========================================
    // Cible les cartes d'arguments, d'intervenants et de sessions possédant la classe d'animation
    const animatedElements = document.querySelectorAll(".scroll-animate, .animate-fade-in");

    if (animatedElements.length > 0) {
        const triggerFadeIn = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ajoute la classe CSS active pour déclencher la transition d'apparition
                    entry.target.classList.add("appeared");
                    // Arrête d'observer l'élément une fois apparu
                    observer.unobserve(entry.target);
                }
            });
        };

        const fadeObserver = new IntersectionObserver(triggerFadeIn, observerOptions);
        animatedElements.forEach(element => fadeObserver.observe(element));
    }
});