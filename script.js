/* ==========================================================================
   VRINDAVAN BIRTHDAY QUEST — script
   Easy-edit zone is right below. Everything else can be left alone.
   ========================================================================== */

const CONFIG = {
  friendName: "SNEHA",      // <-- replace with her real name, e.g. "SNEHA"
  totalLevels: 5,
  diyaGridSize: 12,          // how many diyas in the level-2 grid
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("friendNameSlot").textContent = CONFIG.friendName;

  setupPhotoFallbacks();
  setupParticles();
  setupIntro();
  setupTrail();
  setupLevel1();
  setupLevel2();
  setupLevel3();
  setupLevel4();
  setupLevel5();
  setupGate();
  setupFinale();
  setupMontageTap();
  setupMusic();
  setupScrollReveal();
  setupKrishnaCompanion();
});

/* ==========================================================================
   PROGRESS STATE
   ========================================================================== */

const completedLevels = new Set();

function markLevelComplete(levelNum) {
  completedLevels.add(levelNum);
  const diya = document.querySelector(`.trail__diya[data-level="${levelNum}"]`);
  if (diya) diya.classList.add("is-lit");
  updateGate();
}

function updateGate() {
  const btn = document.getElementById("unlockBtn");
  const hint = document.getElementById("gateHint");
  const done = completedLevels.size >= CONFIG.totalLevels;
  btn.disabled = !done;
  hint.style.display = done ? "none" : "block";
  if (done) {
    hint.textContent = "";
  }
}

function setupTrail() {
  updateGate();
}

/* ==========================================================================
   PHOTO FALLBACKS — if a placeholder photoN.jpg is missing, keep the
   pretty gradient frame instead of a broken image icon.
   ========================================================================== */

function setupPhotoFallbacks() {
  document.querySelectorAll("figure.photo-frame").forEach((fig) => {
    const src = fig.getAttribute("data-src");
    const img = fig.querySelector("img");
    if (!src || !img) return;
    img.addEventListener("error", () => {
      img.removeAttribute("src");
    }, { once: true });
    img.src = src;
  });
}

/* ==========================================================================
   PARTICLES — diyas / petals / feathers drifting down the whole page
   ========================================================================== */

function setupParticles() {
  const field = document.getElementById("particleField");
  const glyphs = [
    { char: "🌸", cls: "particle--petal" },
    { char: "🌺", cls: "particle--petal" },
    { char: "🪶", cls: "particle--feather" },
  ];
  const count = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const isSpark = Math.random() < 0.25;
    if (isSpark) {
      el.className = "particle particle--spark";
    } else {
      const g = glyphs[Math.floor(Math.random() * glyphs.length)];
      el.className = `particle ${g.cls}`;
      el.textContent = g.char;
    }
    const left = Math.random() * 100;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * -30;
    const drift = (Math.random() * 120 - 60).toFixed(0) + "px";
    const spin = (Math.random() * 360).toFixed(0) + "deg";

    el.style.left = left + "vw";
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
    el.style.setProperty("--drift", drift);
    el.style.setProperty("--spin", spin);

    field.appendChild(el);
  }
}

/* ==========================================================================
   INTRO
   ========================================================================== */

function setupIntro() {
  const btn = document.getElementById("startBtn");
  btn.addEventListener("click", () => {
    document.getElementById("level1").scrollIntoView({ behavior: "smooth" });
  });
}

/* ==========================================================================
   LEVEL 1 — MCQ (peacock feather)
   ========================================================================== */

function setupLevel1() {
  wireMCQ("level1", 1, {
    correctMsg: "✨ Pehla raaz mil gaya…",
    wrongMsg: "Thoda aur socho… Krishna ji ke mukut mein kuch khaas lagta hai 🦚",
  });
}

/* ==========================================================================
   LEVEL 3 — MCQ (tuition memory)
   ========================================================================== */

function setupLevel3() {
  wireMCQ("level3", 3, {
    correctMsg: "Bilkul! Kuch yaadein chhoti hoti hain, par yaad reh jaati hain. ✨",
    wrongMsg: "Nahi nahi… zara aur yaad karo 😄",
  });
}

function wireMCQ(sectionId, levelNum, msgs) {
  const section = document.getElementById(sectionId);
  const wrap = section.querySelector(".options");
  const feedback = section.querySelector(".level-card__feedback");
  const answer = wrap.getAttribute("data-answer");
  let solved = false;

  wrap.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (solved) return;
      const key = btn.getAttribute("data-key");
      if (key === answer) {
        solved = true;
        btn.classList.add("is-correct");
        feedback.textContent = msgs.correctMsg;
        wrap.querySelectorAll(".option").forEach((b) => (b.disabled = true));
        markLevelComplete(levelNum);
      } else {
        btn.classList.add("is-wrong");
        feedback.textContent = msgs.wrongMsg;
        setTimeout(() => btn.classList.remove("is-wrong"), 500);
      }
    });
  });
}

/* ==========================================================================
   LEVEL 2 — hidden diya grid
   ========================================================================== */

function setupLevel2() {
  const grid = document.getElementById("diyaGrid");
  const section = document.getElementById("level2");
  const feedback = section.querySelector(".level-card__feedback");
  const targetIndex = Math.floor(Math.random() * CONFIG.diyaGridSize);
  let solved = false;

  for (let i = 0; i < CONFIG.diyaGridSize; i++) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "diya-cell";
    cell.textContent = "🪔";
    if (i === targetIndex) cell.classList.add("is-target");

    cell.addEventListener("click", () => {
      if (solved) return;
      if (i === targetIndex) {
        solved = true;
        cell.classList.add("is-found");
        feedback.textContent = "🪔 Mil gaya! Chalo aage…";
        grid.querySelectorAll(".diya-cell").forEach((c) => (c.style.pointerEvents = "none"));
        markLevelComplete(2);
      } else {
        feedback.textContent = "Kanha keh rahe hain… thoda aur dhyaan se dekho 😄";
        cell.style.transform = "scale(0.92)";
        setTimeout(() => (cell.style.transform = ""), 200);
      }
    });

    grid.appendChild(cell);
  }
}

/* ==========================================================================
   LEVEL 4 — emoji puzzle (text input)
   ========================================================================== */

function setupLevel4() {
  const form = document.getElementById("level4Form");
  const input = document.getElementById("level4Input");
  const section = document.getElementById("level4");
  const feedback = section.querySelector(".level-card__feedback");
  let solved = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (solved) return;
    const val = input.value.trim().toLowerCase();
    if (val.includes("krishna") || val.includes("kanha") || val.includes("kishan")) {
      solved = true;
      feedback.textContent = "🎵 Bansuri ki dhun ne agla raasta dikha diya…";
      input.disabled = true;
      form.querySelector("button").disabled = true;
      markLevelComplete(4);
    } else {
      feedback.textContent = "Aur ek baar socho… peacock, flute, lotus 🤔";
    }
  });
}

/* ==========================================================================
   LEVEL 5 — final lock (text input)
   ========================================================================== */

function setupLevel5() {
  const form = document.getElementById("level5Form");
  const input = document.getElementById("level5Input");
  const section = document.getElementById("level5");
  const feedback = section.querySelector(".level-card__feedback");
  const door = section.querySelector(".temple-door");
  let solved = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (solved) return;
    const val = input.value.trim().toLowerCase();
    if (val.includes("birthday") || val.includes("bday") || val.includes("janamdin")) {
      solved = true;
      feedback.textContent = "🎂 YOUR BIRTHDAY";
      input.disabled = true;
      form.querySelector("button").disabled = true;
      door.querySelector(".temple-door__leaf--l").style.transform = "translateX(-14px) rotate(-4deg)";
      door.querySelector(".temple-door__leaf--r").style.transform = "translateX(14px) rotate(4deg)";
      markLevelComplete(5);
      setTimeout(() => {
        document.getElementById("gate").scrollIntoView({ behavior: "smooth" });
      }, 900);
    } else {
      feedback.textContent = "Sochke dekho… 4 September ki date mein kya khaas hai? 😊";
    }
  });
}

/* ==========================================================================
   GATE — unlock button leads to finale
   ========================================================================== */

function setupGate() {
  const btn = document.getElementById("unlockBtn");
  btn.addEventListener("click", () => {
    if (completedLevels.size < CONFIG.totalLevels) return;
    document.getElementById("finale").scrollIntoView({ behavior: "smooth" });
    openFinaleDoors();
  });
}

/* ==========================================================================
   FINALE — temple doors open + message reveal
   ========================================================================== */

let finaleOpened = false;

function openFinaleDoors() {
  if (finaleOpened) return;
  finaleOpened = true;
  const doors = document.getElementById("finaleDoors");
  const content = document.getElementById("finaleContent");
  doors.classList.add("is-open");
  setTimeout(() => content.classList.add("is-visible"), 700);
  burstParticles();
}

function burstParticles() {
  const field = document.getElementById("particleField");
  for (let i = 0; i < 24; i++) {
    const el = document.createElement("span");
    el.className = "particle particle--spark";
    el.style.left = 40 + Math.random() * 20 + "vw";
    el.style.top = "45vh";
    el.style.animation = "none";
    el.style.transition = "transform 1.6s ease-out, opacity 1.6s ease-out";
    field.appendChild(el);
    requestAnimationFrame(() => {
      const dx = (Math.random() * 400 - 200).toFixed(0) + "px";
      const dy = (-(200 + Math.random() * 300)).toFixed(0) + "px";
      el.style.transform = `translate(${dx}, ${dy})`;
      el.style.opacity = "0";
    });
    setTimeout(() => el.remove(), 1800);
  }
}

/* also open automatically if user scrolls into finale after unlocking */
function setupFinale() {
  const finale = document.getElementById("finale");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && completedLevels.size >= CONFIG.totalLevels) {
          openFinaleDoors();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(finale);
}

/* ==========================================================================
   PHOTO TAP TO ENLARGE
   ========================================================================== */

function setupMontageTap() {
  document.querySelectorAll(".photo-frame img").forEach((img) => {
    img.addEventListener("click", () => {
      const frame = img.closest(".photo-frame");
      frame.classList.toggle("is-tapped");
    });
  });
}

/* ==========================================================================
   MUSIC TOGGLE
   ========================================================================== */

function setupMusic() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("bgMusic");
  const icon = btn.querySelector(".music-btn__icon");
  const label = btn.querySelector(".music-btn__label");
  let playing = false;

  btn.addEventListener("click", async () => {
    if (!playing) {
      try {
        await audio.play();
        playing = true;
        icon.textContent = "🎵";
        label.textContent = "Music On";
        btn.setAttribute("aria-pressed", "true");
      } catch (err) {
        label.textContent = "Add music.mp3";
      }
    } else {
      audio.pause();
      playing = false;
      icon.textContent = "🔇";
      label.textContent = "Music Off";
      btn.setAttribute("aria-pressed", "false");
    }
  });
}

/* ==========================================================================
   KRISHNA COMPANION — walks alongside the scroll, pauses at each question
   ========================================================================== */

function setupKrishnaCompanion() {
  const companion = document.getElementById("krishnaCompanion");
  const journey = document.getElementById("questJourney");
  if (!companion || !journey) return;

  // optional real PNG art — falls back to the built-in gold SVG if missing
  const img = companion.querySelector(".krishna-companion__img");
  const pngSrc = img.getAttribute("data-src");
  if (pngSrc) {
    img.addEventListener("error", () => img.removeAttribute("src"), { once: true });
    img.src = pngSrc;
  }

  // show/hide the companion for the duration of the quest zone
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        companion.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.02 }
  );
  visibilityObserver.observe(journey);

  // pause (and glow) whenever a question/gate section is centered on screen
  let pausedCount = 0;
  const pauseTargets = journey.querySelectorAll(".scene--level, .scene--gate");
  const pauseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pausedCount++;
        } else {
          pausedCount = Math.max(0, pausedCount - 1);
        }
      });
      companion.classList.toggle("is-paused", pausedCount > 0);
    },
    { threshold: 0.5 }
  );
  pauseTargets.forEach((el) => pauseObserver.observe(el));
}

/* ==========================================================================
   SCROLL REVEAL — photo drift-ins + gentle parallax, GSAP if available
   ========================================================================== */

function setupScrollReveal() {
  const photoFrames = document.querySelectorAll(".scene--photos .photo-frame");

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    photoFrames.forEach((frame, i) => {
      const fromLeft = frame.classList.contains("photo-frame--a") || frame.classList.contains("photo-frame--c");
      gsap.fromTo(
        frame,
        { opacity: 0, x: fromLeft ? -60 : 60, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
          },
        }
      );
    });

    gsap.utils.toArray(".level-card, .note-card, .puppy-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }
      );
    });
  } else {
    // fallback: simple IntersectionObserver fade-in
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translate(0,0)";
          }
        });
      },
      { threshold: 0.2 }
    );
    photoFrames.forEach((f) => {
      f.style.transition = "opacity .8s ease, transform .8s ease";
      io.observe(f);
    });
  }
}
