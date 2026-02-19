document.addEventListener('DOMContentLoaded', () => {
    // 1. STATE MANAGEMENT
    let state = {
        progress: 0, // 0 to 3
        isMuted: true,
        currentQuizIndex: 0,
        memoryFlipped: [],
        memoryMatches: 0,
        isUnlocked: false
    };

    // 2. DOM ELEMENTS
    const elements = {
        loader: document.getElementById('loader'),
        hero: document.getElementById('hero'),
        heroVideo: document.getElementById('hero-video'),
        heroTitle: document.getElementById('hero-title'),
        beginBtn: document.getElementById('begin-btn'),

        intro: document.getElementById('intro'),
        startAdventureBtn: document.getElementById('start-adventure-btn'),
        musicToggle: document.getElementById('music-toggle'),
        musicIcon: document.getElementById('music-icon'),
        bgMusic: document.getElementById('bg-music'),

        adventurePath: document.getElementById('adventure-path'),
        progressFill: document.getElementById('progress-fill'),
        progressText: document.getElementById('progress-text'),

        challenge1: document.getElementById('challenge-1'),
        codeInput: document.getElementById('code-input'),
        submitCode: document.getElementById('submit-code'),
        codeHint: document.getElementById('code-hint'),

        challenge2: document.getElementById('challenge-2'),
        memoryGrid: document.getElementById('memory-grid'),

        challenge3: document.getElementById('challenge-3'),
        quizQuestion: document.getElementById('quiz-question'),
        quizOptions: document.getElementById('quiz-options'),

        storyInterlude: document.getElementById('story-interlude'),
        storyVideo: document.getElementById('story-video'),
        closeStoryBtn: document.getElementById('close-story-btn'),

        gallery: document.getElementById('gallery'),
        galleryGrid: document.getElementById('gallery-grid'),

        wishes: document.getElementById('wishes'),
        wishForm: document.getElementById('wish-form'),
        wishesGrid: document.getElementById('wishes-grid'),

        reveal: document.getElementById('reveal'),
        revealBtn: document.getElementById('reveal-btn'),
        revealModal: document.getElementById('reveal-modal'),
        finalVideo: document.getElementById('final-video'),
        closeModal: document.querySelector('.close-modal'),

        heroFallback: document.getElementById('hero-fallback'),
        storyFallback: document.getElementById('story-video-fallback'),
        finalFallback: document.getElementById('final-video-fallback')
    };

    // 3. INITIALIZATION
    const init = () => {
        // Apply Config
        document.body.dataset.theme = CONFIG.theme || 'starlit';
        elements.heroTitle.innerText = `Hey ${CONFIG.name}... something special is waiting for you.`;

        // Video Loading - Use direct src on video element for better compatibility
        if (CONFIG.heroVideo) {
            elements.heroVideo.src = CONFIG.heroVideo;
            elements.heroVideo.load();
        }

        if (CONFIG.backgroundMusic) {
            elements.bgMusic.src = CONFIG.backgroundMusic;
            elements.bgMusic.load();
        }

        if (CONFIG.midAdventureVideo) {
            elements.storyVideo.src = CONFIG.midAdventureVideo;
            elements.storyVideo.load();
        }

        if (CONFIG.revealVideo) {
            elements.finalVideo.src = CONFIG.revealVideo;
            elements.finalVideo.load();
        }

        setupVideoErrorHandling();

        if (CONFIG.revealLink) {
            const linkContainer = document.getElementById('reveal-link-container');
            const link = document.getElementById('external-reveal-link');
            link.href = CONFIG.revealLink;
            linkContainer.classList.remove('hidden');
        }

        setupCountdown();
        renderGallery();
        renderWishes();

        // Hide loader
        setTimeout(() => {
            elements.loader.style.opacity = '0';
            setTimeout(() => elements.loader.classList.add('hidden'), 500);
            animateHeroEntrances();
        }, 1500);
    };

    // 4. VIDEO ERROR HANDLING
    const setupVideoErrorHandling = () => {
        const handleVideoError = (videoEl, fallbackEl) => {
            console.warn(`Video failed to load: ${videoEl.id}. Switching to fallback.`);
            videoEl.classList.add('hidden');
            fallbackEl.classList.remove('hidden');

            // Set fallback image if available
            const img = fallbackEl.querySelector('img');
            if (img) img.src = CONFIG.heroImage;
            if (videoEl.id === 'hero-video') {
                fallbackEl.style.backgroundImage = `url(${CONFIG.heroImage})`;
            }
        };

        const videos = [
            { video: elements.heroVideo, fallback: elements.heroFallback },
            { video: elements.storyVideo, fallback: elements.storyFallback },
            { video: elements.finalVideo, fallback: elements.finalFallback }
        ];

        videos.forEach(({ video, fallback }) => {
            video.addEventListener('error', () => handleVideoError(video, fallback));
            video.addEventListener('stalled', () => {
                // If stalled for too long, maybe consider it an error?
                // For now just log it.
                console.log(`Video stalled: ${video.id}`);
            });
        });
    };

    // 5. ANIMATIONS (GSAP)
    const setupScrollAnimations = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);

        const sections = ['#adventure-path', '#gallery', '#wishes', '#reveal'];
        sections.forEach(selector => {
            const section = document.querySelector(selector);
            if (!section) return;

            // Animate title
            const title = section.querySelector('h2, h3');
            if (title) {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            // Animate content blocks
            const content = section.querySelector('.container, .challenge-card, .reveal-content');
            if (content) {
                gsap.from(content, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    },
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    delay: 0.2,
                    ease: "power2.out"
                });
            }
        });
    };

    const animateHeroEntrances = () => {
        gsap.from(".reveal-text", {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power4.out"
        });
        gsap.from(".countdown", {
            duration: 1.5,
            opacity: 0,
            delay: 0.5,
            ease: "power3.out"
        });
        gsap.fromTo("#begin-btn",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
        );
    };

    // 5. COUNTDOWN LOGIC
    const setupCountdown = () => {
        const targetDate = new Date(CONFIG.birthdayDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                document.getElementById('countdown').innerHTML = "<h3>The day has arrived!</h3>";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    };

    // 6. EVENT HANDLERS
    elements.beginBtn.addEventListener('click', () => {
        gsap.to(elements.hero, {
            duration: 1,
            opacity: 0,
            y: -50,
            onComplete: () => {
                elements.hero.classList.add('hidden');
                elements.intro.classList.remove('hidden');
                gsap.from(elements.intro.querySelector('.overlay-content'), {
                    duration: 1,
                    scale: 0.9,
                    opacity: 0,
                    ease: "power2.out"
                });
            }
        });
    });

    elements.startAdventureBtn.addEventListener('click', () => {
        elements.intro.classList.add('hidden');
        elements.adventurePath.classList.remove('hidden');
        elements.gallery.classList.remove('hidden');
        elements.wishes.classList.remove('hidden');
        elements.reveal.classList.remove('hidden');

        updateProgress(0); // Start at step 1

        window.scrollTo({ top: elements.adventurePath.offsetTop, behavior: 'smooth' });
    });

    elements.musicToggle.addEventListener('click', () => {
        state.isMuted = !state.isMuted;
        if (state.isMuted) {
            elements.bgMusic.pause();
            elements.musicIcon.innerText = '🔇';
        } else {
            elements.bgMusic.play().catch(e => console.error("Audio play blocked", e));
            elements.musicIcon.innerText = '🔊';
        }
    });

    // 7. CHALLENGE LOGIC
    const updateProgress = (newStep) => {
        state.progress = newStep;
        const percent = ((newStep + 1) / 3) * 100;
        elements.progressFill.style.width = `${percent}%`;
        elements.progressText.innerText = `Step ${newStep + 1} of 3`;
    };

    // Challenge 1: Code
    elements.submitCode.addEventListener('click', () => {
        const val = elements.codeInput.value;
        const bday = new Date(CONFIG.birthdayDate);
        const secret = String(bday.getDate()).padStart(2, '0') + String(bday.getMonth() + 1).padStart(2, '0');

        if (val === secret) {
            completeChallenge(1);
        } else {
            elements.codeInput.classList.add('error-shake');
            setTimeout(() => elements.codeInput.classList.remove('error-shake'), 500);
            elements.codeHint.classList.remove('hidden');
        }
    });

    const completeChallenge = (num) => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8a2be2', '#ff4ecd']
        });

        if (num === 1) {
            gsap.to(elements.challenge1, {
                duration: 0.5,
                opacity: 0,
                x: -50,
                onComplete: () => {
                    elements.challenge1.classList.add('hidden');
                    elements.challenge2.classList.remove('hidden');
                    updateProgress(1);
                    initMemoryGame();
                }
            });
        } else if (num === 2) {
            // Show Story Interlude before Challenge 3
            showStoryInterlude(() => {
                gsap.to(elements.challenge2, {
                    duration: 0.5,
                    opacity: 0,
                    x: -50,
                    onComplete: () => {
                        elements.challenge2.classList.add('hidden');
                        elements.challenge3.classList.remove('hidden');
                        updateProgress(2);
                        initQuiz();
                    }
                });
            });
        } else if (num === 3) {
            gsap.to(elements.challenge3, {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    elements.challenge3.classList.add('hidden');
                    unlockFinalReveal();
                }
            });
        }
    };

    // Challenge 2: Memory Game
    const initMemoryGame = () => {
        const icons = ['❤️', '🎂', '🎁', '✨', '🌟', '🎈'];
        const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);

        elements.memoryGrid.innerHTML = '';
        cards.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.icon = icon;
            card.dataset.index = index;

            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">?</div>
                    <div class="memory-card-back">${icon}</div>
                </div>
            `;

            card.addEventListener('click', onCardClick);
            elements.memoryGrid.appendChild(card);
        });
    };

    function onCardClick() {
        if (state.memoryFlipped.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            state.memoryFlipped.push(this);

            // GSAP Flip Animation
            gsap.to(this.querySelector('.memory-card-inner'), {
                rotationY: 180,
                duration: 0.6,
                ease: "power2.inOut"
            });

            if (state.memoryFlipped.length === 2) {
                setTimeout(checkMemoryMatch, 800);
            }
        }
    }

    function checkMemoryMatch() {
        const [c1, c2] = state.memoryFlipped;
        if (c1.dataset.icon === c2.dataset.icon) {
            state.memoryMatches++;
            if (state.memoryMatches === 6) {
                completeChallenge(2);
            }
        } else {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');

            gsap.to([c1.querySelector('.memory-card-inner'), c2.querySelector('.memory-card-inner')], {
                rotationY: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });
        }
        state.memoryFlipped = [];
    }

    // Story Interlude
    const showStoryInterlude = (callback) => {
        elements.storyInterlude.classList.remove('hidden');
        elements.storyVideo.play();

        elements.storyVideo.onended = () => {
            elements.closeStoryBtn.classList.remove('hidden');
        };

        elements.closeStoryBtn.onclick = () => {
            elements.storyInterlude.classList.add('hidden');
            callback();
        };
    };

    // Challenge 3: Quiz
    const initQuiz = () => {
        renderQuestion();
    };

    const renderQuestion = () => {
        const q = CONFIG.quiz[state.currentQuizIndex];
        elements.quizQuestion.innerText = q.question;
        elements.quizOptions.innerHTML = '';

        q.options.forEach((opt, i) => {
            const btn = document.createElement('div');
            btn.classList.add('quiz-option');
            btn.innerText = opt;
            btn.onclick = () => {
                if (i === q.correct) {
                    state.currentQuizIndex++;
                    if (state.currentQuizIndex >= CONFIG.quiz.length) {
                        completeChallenge(3);
                    } else {
                        renderQuestion();
                    }
                } else {
                    btn.style.borderColor = 'var(--error)';
                    setTimeout(() => btn.style.borderColor = '', 500);
                }
            };
            elements.quizOptions.appendChild(btn);
        });
    };

    // 8. REVEAL LOGIC
    const unlockFinalReveal = () => {
        state.isUnlocked = true;
        elements.reveal.classList.remove('locked');
        elements.revealBtn.innerText = "Open Your Surprise";

        gsap.to(elements.reveal, {
            duration: 1,
            backgroundColor: "rgba(138, 43, 226, 0.1)",
            scale: 1.05,
            yoyo: true,
            repeat: -1
        });

        window.scrollTo({ top: elements.reveal.offsetTop, behavior: 'smooth' });
    };

    elements.revealBtn.addEventListener('click', () => {
        if (!state.isUnlocked) return;

        elements.revealModal.classList.remove('hidden');
        elements.finalVideo.play();

        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
    });

    elements.closeModal.onclick = () => {
        elements.revealModal.classList.add('hidden');
        elements.finalVideo.pause();
    };

    // 9. GALLERY & WISHES
    const renderGallery = () => {
        elements.galleryGrid.innerHTML = '';
        CONFIG.gallery.forEach(item => {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.caption;
            img.classList.add('gallery-item');
            img.loading = 'lazy';
            img.onclick = () => {
                // simple lightbox
                window.open(item.url, '_blank');
            };
            elements.galleryGrid.appendChild(img);
        });

        gsap.from(".gallery-item", {
            duration: 0.8,
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#gallery",
                start: "top 80%"
            }
        });
    };

    const renderWishes = () => {
        const saved = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
        elements.wishesGrid.innerHTML = '';
        saved.forEach(w => {
            const card = document.createElement('div');
            card.classList.add('wish-card');

            const name = document.createElement('h4');
            name.textContent = w.name;

            const message = document.createElement('p');
            message.textContent = w.message;

            card.appendChild(name);
            card.appendChild(message);
            elements.wishesGrid.appendChild(card);
        });

        if (saved.length > 0) {
            gsap.from(".wish-card", {
                duration: 0.8,
                opacity: 0,
                scale: 0.9,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: "#wishes",
                    start: "top 80%"
                }
            });
        }
    };

    elements.wishForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('wish-name').value;
        const message = document.getElementById('wish-message').value;

        const wishes = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
        wishes.push({ name, message });
        localStorage.setItem('birthday_wishes', JSON.stringify(wishes));

        elements.wishForm.reset();
        renderWishes();

        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 }
        });
    };

    // Initialize
    init();
    setupScrollAnimations();
});
