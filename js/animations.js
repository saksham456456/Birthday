// 1. STAR FIELD GENERATOR
function createStarField() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Random twinkle animation
        gsap.to(star, {
            opacity: Math.random(),
            duration: 1 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        container.appendChild(star);
    }
}

// 2. PARALLAX EFFECT
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        const elements = document.querySelectorAll('.parallax');
        elements.forEach(el => {
            gsap.to(el, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
}

// 3. BACKGROUND NOISE / GRAIN
// (Implemented via CSS for performance)

document.addEventListener('DOMContentLoaded', () => {
    createStarField();
    initParallax();
});
