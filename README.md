# BunnyPunch 🐰👊

## Why I Built This

I wanted to build something playful and interactive that pushed me beyond standard frontend work.

BunnyPunch became a fun way to experiment with:

- real-time hand tracking
- browser APIs
- game-like interactions
- React performance
- `useRef` and stale closures

---

## Features

- Live webcam hand tracking
- Real-time index finger cursor
- Bunny hit detection
- Score tracking
- Bunny state changes when hit
- Sound effects on impact
- Arcade-style interactive gameplay
- Built with React and Google MediaPipe

---

## Tech Stack

- **React**
- **JavaScript**
- **Google MediaPipe Hand Landmarker**
- **Howler.js** for sound effects
- **CSS / Tailwind** depending on your setup
- **Webcam API** via `navigator.mediaDevices.getUserMedia`

---

## How It Works

1. The app asks for webcam access
2. Google MediaPipe detects the user’s hand landmarks in real time
3. The index finger tip is converted into screen pixel coordinates
4. A custom cursor moves across the game area based on that finger position
5. The app compares the cursor/hand position against the bunny position
6. If the hand is close enough, the bunny is marked as hit, sound plays, and the score updates
7. A new bunny position can then be generated

---

## What I Learned

Building BunnyPunch helped me understand a few important frontend concepts much more deeply:

- **Stale closures in React**  
  A running detection loop was reading old bunny position values from an earlier render

- **Why `useRef` matters**  
  `useRef` made it possible for the ongoing detection loop to always read the latest bunny position without depending on stale closed-over values

- **React performance in real-time apps**  
  Updating fast-changing hand coordinates through state caused too many re-renders and introduced lag

- **When to use refs instead of state**  
  For values that change extremely quickly and do not always need a React re-render, refs can be a much better fit

---

## Future Improvements

- Add a start screen and game over screen
- Add a timer
- Add difficulty levels
- Add multiple bunny states and animations
- Improve arcade-style UI and visual polish
- Add gesture-based interactions
- Improve mobile responsiveness
- Add sound controls
- Add score persistence

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/bunnypunch.git
```

Go into the project folder:

```bash
cd bunnypunch
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## MediaPipe Setup

This project uses Google MediaPipe Hand Landmarker.

Make sure the hand landmarker model file is available in the correct public path, for example:

```bash
/public/models/hand_landmarker.task
```

Project Structure

src/
features/
game/
components/
hooks/
context/
App.jsx
