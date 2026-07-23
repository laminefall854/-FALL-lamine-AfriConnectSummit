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