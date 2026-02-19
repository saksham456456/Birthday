const CONFIG = {
  name: "Alex",
  birthdayDate: "2025-12-31T00:00:00", // Change to recipient's birthday
  theme: "starlit",

  // Assets (Direct links to the provided Google Drive videos)
  heroVideo: "https://drive.google.com/uc?export=download&id=1gOQSDUQiFAgkDiVzXbv1EXEVnf0qmX5N",
  midAdventureVideo: "https://drive.google.com/uc?export=download&id=1RqQW78Hd1-JDLhx2zCCgcGtDOJyhvhZe",
  revealVideo: "https://drive.google.com/uc?export=download&id=1CJA-2zzma4Z76HI8jZl-gt1REJRKHLzw",
  backgroundMusic: "assets/music.mp3", // Place your mp3 in assets folder

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
    { url: "assets/gallery/2.jpg", caption: "Memories made" },
    { url: "assets/gallery/3.jpg", caption: "Laughs shared" },
    { url: "assets/gallery/4.jpg", caption: "The journey so far" },
    { url: "assets/gallery/5.jpg", caption: "Golden moments" },
    { url: "assets/gallery/6.jpg", caption: "To many more" }
  ],

  revealLink: "https://example.com/gift",
  unlockTime: "2025-12-31T00:00:00"
};

window.CONFIG = CONFIG;
