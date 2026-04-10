# Learning Notes

## Google MediaPipe HandLandmarker

Google MediaPipe Hand Landmarker is a tool from Google that can detect a hand in an image or video and find important points on that hand.

For example, it can find:

fingertip
thumb tip
knuckles
wrist

These points are called landmarks.

## Technical Challenges

### React performance problem

Another issue I noticed was that after some time, the hand movement across the screen became more and more jarring and laggy.

This was not really MediaPipe’s fault. The main issue was how React was handling the updates.

Every time updateHandPosition ran, React state changed.

When React state changes, React recalculates and re-renders the component tree.

That meant React was repeatedly re-rendering large parts of the app, including things like:

the context provider
the game page
the game board
the video
the bunny component

Trying to do that many times per second overloaded the browser and caused visible lag.

The improvement: using refs for fast-changing values

In high-performance React scenarios such as:

games
animations
custom cursors
real-time tracking

it is often better not to store every X/Y coordinate in React state.

Instead, refs can be used for values that need to change very quickly without forcing a re-render every frame.

Using useRef for fast-changing values allowed BunnyPunch to avoid unnecessary React render work and made the interaction much smoother.

### Why the score jumped by 3 or 4

detectHand runs many times every second because of requestAnimationFrame.

That means when my finger touched the bunny, the hit condition could stay true for several frames in a row.

So instead of this happening once:

finger touches bunny
score goes up by 1

this happened:

frame 1: hit
frame 2: still touching, hit again
frame 3: still touching, hit again
frame 4: still touching, hit again

That is why the score jumped by 3 or 4 points.

The game was not really seeing one punch.

It was seeing several frames where the finger was still inside the hit area.

How I solved it

I solved this by stopping the game from counting the same hit multiple times.

A simple way to implement that was to add a small cooldown:

allow one hit
block new hits briefly
then allow hits again after a short delay

#### Why I used canHitRef instead of canHit state

I used canHitRef because this value is only needed inside the fast game loop.

I did not need React to re-render the screen when canHit changed.

I just needed a value that:

can change instantly
can be read inside detectHand
does not cause extra re-renders

That is exactly what useRef is good for.

If state had been used instead
const [canHit, setCanHit] = useState(true);

That would schedule a re-render.

State is useful when the UI needs to update.

The simple rule

Use state when:

the value should affect what the user sees on screen
