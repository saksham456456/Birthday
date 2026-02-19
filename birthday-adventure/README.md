# Birthday Adventure Website

A high-end, interactive, cinematic birthday micro-experience designed to be emotional, surprising, and premium.

## ✨ Features
- **Cinematic Hero**: Full-screen video background with a live countdown.
- **Story-Driven**: Guided journey with interactive challenges.
- **Interactive Challenges**:
  - Birthday Code Unlock (DDMM)
  - Memory Match Game
  - Personal Quiz
- **Story Interlude**: Cinematic video break between challenges.
- **Memory Gallery**: Beautifully animated grid of photos/videos.
- **Guest Wishes Wall**: Persistent messages from loved ones.
- **Final Grand Reveal**: Confetti, music, and the ultimate birthday surprise.

## ⚙️ Customization
Personalizing the website is easy. Open `config.js` and update the following:

```javascript
const CONFIG = {
  name: "Alex",
  birthdayDate: "2025-12-31T00:00:00",
  theme: "starlit",

  // Assets (Place in assets/ folder)
  heroVideo: "assets/hero.mp4",
  midAdventureVideo: "assets/story.mp4",
  revealVideo: "assets/reveal.mp4",
  backgroundMusic: "assets/music.mp3",

  // Quiz Questions
  quiz: [...],

  // Gallery Images
  gallery: [...],

  // Final Reveal Link
  revealLink: "https://example.com/gift"
};
```

## 🚀 Deployment
1. Add your assets to the `assets/` folder.
2. Update `config.js` with the recipient's details.
3. Deploy to any static host (Vercel, Netlify, GitHub Pages).

## 🎨 Design System
The site uses CSS variables for easy theming. Change colors in `styles.css` under the `:root` selector.

## 🛠 Tech Stack
- Vanilla JavaScript
- CSS3 (Flexbox/Grid/Variables)
- GSAP (Animations)
- Canvas-Confetti
