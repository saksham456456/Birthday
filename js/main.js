document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 1,
                onComplete: () => preloader.style.display = 'none'
            });
        });
    }

    // 2. CURSOR LIGHT
    const cursorLight = document.querySelector('.cursor-light');
    if (cursorLight) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursorLight, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }

    // 3. NAVIGATION ORB
    const navOrb = document.getElementById('nav-orb-btn');
    const mainNav = document.getElementById('main-nav');
    if (navOrb && mainNav) {
        navOrb.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navOrb.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });
    }

    // 4. PAGE TRANSITION (Exit)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const href = item.getAttribute('href');
            if (window.location.pathname.endsWith(href)) return;

            const transition = document.querySelector('.page-transition');
            gsap.to(transition, {
                y: 0,
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => window.location.href = href
            });
        });
    });

    // 5. PAGE TRANSITION (Entrance)
    const transition = document.querySelector('.page-transition');
    if (transition) {
        gsap.set(transition, { y: 0 });
        gsap.to(transition, {
            y: "-100%",
            duration: 1,
            ease: "power4.inOut"
        });
    }
});
