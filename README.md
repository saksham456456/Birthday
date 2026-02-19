# 🌌 The Birthday Universe Ecosystem

A high-end, cinematic, multi-page interactive adventure built for one special person.

## 🚀 The Architecture
This is not a single landing page. It is a **7-page immersive ecosystem**:
1.  **Portal (`index.html`)**: The entry point. A starlit gateway.
2.  **Timeline Galaxy (`timeline.html`)**: A vertical journey through time using GSAP ScrollTrigger.
3.  **Memory Vault (`memories.html`)**: A 3D-feeling gallery of moments.
4.  **Challenge Realm (`challenges.html`)**: Interactive puzzles (Secret Date Code & Quiz).
5.  **Letter Chamber (`letter.html`)**: A cinematic typewriter-effect emotional message.
6.  **Wishes from Stars (`wishes.html`)**: A community wall with persistent storage.
7.  **Final Reveal (`finale.html`)**: The grand payoff with confetti and a final video.

## ⚙️ Configuration
All personalization is handled in `js/config.js`. Change the name, dates, and assets there to reuse the entire universe.

## 🎬 The "Video Hack" (For Google Drive)
Google Drive links often break in `<video>` tags because of virus-scan warnings for large files.

**The Best Hack for Production:**
1.  **Don't use Google Drive for streaming.**
2.  **The GitHub Hack (Recommended):**
    - Upload your videos (`hero.mp4`, etc.) to a public GitHub repository.
    - Use the URL format: `https://github.com/USERNAME/REPO/raw/main/assets/video.mp4`
    - This serves the raw file directly and is extremely reliable for static sites.
3.  **The Cloudinary Hack:**
    - Upload to Cloudinary (Free).
    - Use their "Optimized" delivery URL.

If you *must* use Google Drive, use this format for smaller files:
`https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`

## 🛠 Tech Stack
- **Engine**: Vanilla JavaScript (ES6+)
- **Animation**: GSAP (GreenSock) + ScrollTrigger
- **Styling**: Modern CSS (Glassmorphism, Flex/Grid)
- **Icons**: FontAwesome (included via CDN)
- **Deployment**: Optimized for Vercel, Netlify, or GitHub Pages.

## 🔒 Security & Performance
- All user input (Wishes) is sanitized using `textContent` to prevent XSS.
- Video fallback system: If a video fails to load, a beautiful image fallback is automatically applied from the config.
- Mobile-first responsive design.

---
*Created with care for an unforgettable birthday experience.*
