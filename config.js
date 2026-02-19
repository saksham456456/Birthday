const CONFIG = {
  name: "Alex",
  birthdayDate: "2028-12-31T00:00:00", // Way in the future
  theme: "starlit",

  // Assets (Recommended to use local files for production)
  // Provided video links:
  // Hero Video: https://drive.google.com/file/d/1gOQSDUQiFAgkDiVzXbv1EXEVnf0qmX5N/view?usp=sharing
  // Story Video: https://drive.google.com/file/d/1RqQW78Hd1-JDLhx2zCCgcGtDOJyhvhZe/view?usp=sharing
  // Reveal Video: https://drive.google.com/file/d/1CJA-2zzma4Z76HI8jZl-gt1REJRKHLzw/view?usp=sharing

  heroVideo: "assets/hero.mp4",
  midAdventureVideo: "assets/story.mp4",
  revealVideo: "assets/reveal.mp4",
  backgroundMusic: "assets/music.mp3",

  quiz: [
    {
      question: "What is your ultimate dream destination?",
      options: ["Tokyo", "Paris", "Iceland", "New York"],
      correct: 2
    },
    {
      question: "Which superpower would you choose?",
      options: ["Time Travel", "Flying", "Teleportation", "Invisibility"],
      correct: 0
    },
    {
      question: "The perfect birthday cake is...",
      options: ["Chocolate", "Red Velvet", "Cheesecake", "Fruit Tart"],
      correct: 1
    }
  ],

  gallery: [
    { url: "assets/gallery/1.jpg", caption: "Adventure awaits" },
    { url: "assets/gallery/2.jpg", caption: "Memories made" }
  ],

  revealLink: "https://example.com/gift",
  unlockTime: "2028-12-31T00:00:00"
};

window.CONFIG = CONFIG;
