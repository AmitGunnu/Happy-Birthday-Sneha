# Vrindavan Birthday Quest 🪷

A little interactive Janmashtami-themed birthday website. Open `index.html`
in any browser (works fully offline, no build step needed).

## To personalize it (takes 5 minutes)

1. **Her name** — open `script.js`, find `CONFIG.friendName` near the top,
   and change `"DOSTI"` to her name in caps, e.g. `"PRIYA"`.

2. **Photos** — drop her photos into `assets/photos/` named exactly:
   `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`,
   `photo6.jpg`, `photo7.jpg`, `photo8.jpg`.
   If a file is missing, the site quietly shows an elegant gold frame
   instead of a broken image — nothing looks broken either way, but it
   looks best with real photos in place.
   There's also a small closing section with a puppy photo — add that
   one as `assets/photos/puppy.jpg` (if skipped, it shows a small paw
   icon in the frame instead).

3. **Music (optional)** — add a soft flute/instrumental track as
   `assets/music/music.mp3`. Keep it royalty-free / non-copyrighted.
   If you skip this, the music button will just say "Add music.mp3" when
   tapped, and everything else still works fine.

4. **Krishna companion (optional)** — a small gold Krishna-with-flute
   emblem walks alongside her scroll and pauses at each question by
   default (hand-drawn, built into the site, no file needed). If you'd
   rather use real artwork, drop a transparent PNG at
   `assets/decor/krishna.png` and it will automatically replace the
   emblem.

5. **Send it** — zip the whole `vrindavan-birthday` folder and share it,
   or upload the folder to any free static host (Netlify, Vercel, GitHub
   Pages, or even Google Drive with a viewer link) and send the link —
   easiest for opening on her phone.

## How the quest works

She scrolls through 5 small Krishna/Janmashtami challenges. Each solved
level lights up a diya in the progress trail at the top. Once all 5 are
lit, the "Unlock the surprise" button activates, the temple doors open,
and her birthday message + photo montage plays.

## Files

- `index.html` — page structure and all content/copy
- `style.css` — the Vrindavan-night visual theme
- `script.js` — quiz logic, particle effects, animations, audio toggle
- `assets/photos/` — her photos go here
- `assets/music/` — background music goes here
- `assets/icons/`, `assets/decor/` — reserved if you want to add extra
  decorative art later (not required, the site works without them)
