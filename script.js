/* -------------------------------------------------------
   Lourdes Shrine Youth — Summer Slam & Grace Gala 2026
   Vanilla JS: render cards + animated modal with rules
-------------------------------------------------------- */

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScneLN2uMTTeSghGFLb9hEyUiGOfLbb0O1FRbbVXJeOlunH1Q/viewform?usp=publish-editor";

// Set your event date/time here (used only for the on-page countdown).
const EVENT_DATE = new Date("2026-05-15T09:00:00"); // local time

/**
 * Data model:
 * - id: stable key
 * - category: "Sports" | "Cultural"
 * - section: "Summer Slam" | "Grace Gala"
 * - icon: emoji
 * - name: string
 * - rules: string[]
 * - instructions: string[]
 */
const EVENTS = [
  // -------------------- Summer Slam (Sports) --------------------
  {
    id: "sports-100m",
    category: "Sports",
    section: "Summer Slam",
    icon: "🏃‍♂️",
    name: "100m Race",
    rules: [
      "Reporting time is mandatory; late arrivals may be disqualified.",
      "One false start will lead to disqualification (as per organizer decision).",
      "Stay in your lane throughout the race.",
      "Pushing, blocking, or unsportsmanlike conduct leads to disqualification.",
      "Final decision of judges is binding.",
    ],
    instructions: [
      "Wear comfortable running shoes and appropriate sportswear.",
      "Listen to the starter commands: On your marks → Set → Go.",
      "Warm up before your heat; hydrate responsibly.",
    ],
  },
  {
    id: "sports-200m",
    category: "Sports",
    section: "Summer Slam",
    icon: "⚡",
    name: "200m Race",
    rules: [
      "Participants must run in their allotted lane on the curve.",
      "Lane infringement can lead to disqualification.",
      "False start rules apply as per organizer decision.",
      "No obstruction of other runners.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Arrive early for bib/heat announcements.",
      "Maintain control on the curve to avoid lane violations.",
      "Cool down after your race.",
    ],
  },
  {
    id: "sports-400m",
    category: "Sports",
    section: "Summer Slam",
    icon: "🏁",
    name: "400m Race",
    rules: [
      "Run in the assigned lanes (organizer will announce if/when break is allowed).",
      "Do not impede other runners during any phase.",
      "False start rules apply.",
      "Track etiquette must be followed at all times.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Pace yourself; 400m is a sprint-endurance event.",
      "Follow marshal instructions for staging and line-up.",
      "Bring water; avoid heavy meals right before your heat.",
    ],
  },
  {
    id: "sports-relay",
    category: "Sports",
    section: "Summer Slam",
    icon: "🤝",
    name: "Relay Race",
    rules: [
      "Teams must run with the assigned baton; baton drop must be recovered by the runner who dropped it.",
      "Baton exchange must occur within the designated exchange zone.",
      "Lane rules apply as per organizer briefing.",
      "Any interference with another team leads to disqualification.",
      "Team composition once submitted cannot be changed after check-in (unless permitted by organizers).",
    ],
    instructions: [
      "Practice handoffs to avoid drops.",
      "Confirm runner order during check-in.",
      "Arrive with your full team before reporting time.",
    ],
  },
  {
    id: "sports-longjump",
    category: "Sports",
    section: "Summer Slam",
    icon: "🦘",
    name: "Long Jump",
    rules: [
      "Take-off must be from behind the foul line; stepping over counts as a foul attempt.",
      "Participants will get a fixed number of attempts as announced on-site.",
      "Measurement is from the take-off line to the nearest mark in the sand made by the body.",
      "Leave the pit from the front; do not walk back through the landing area.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Use proper footwear for grip on the runway.",
      "Wait for the official signal before starting your attempt.",
      "Warm up and do practice runs if allowed.",
    ],
  },
  {
    id: "sports-shotput",
    category: "Sports",
    section: "Summer Slam",
    icon: "🧱",
    name: "Shot Put",
    rules: [
      "Shot must be put (pushed), not thrown.",
      "Release must be within the circle; stepping on/over the rim is a foul.",
      "Participants must exit from the back half of the circle after the throw lands.",
      "A fixed number of attempts will be provided as announced.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Use the provided shot put; personal equipment may not be allowed.",
      "Keep the shot near the neck/shoulder before release.",
      "Wait for the official’s clearance before retrieving equipment.",
    ],
  },
  {
    id: "sports-javelin",
    category: "Sports",
    section: "Summer Slam",
    icon: "🎯",
    name: "Javelin Throw",
    rules: [
      "Throw must be overhand; javelin must land tip-first for a valid throw.",
      "Do not cross the foul line; crossing counts as a foul.",
      "Only throw when the sector is clear and official permits.",
      "A fixed number of attempts will be given as announced.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Maintain safe distance from the runway/sector unless you are the active participant.",
      "Follow all safety instructions strictly.",
      "Warm up shoulders/arms properly to avoid injury.",
    ],
  },
  {
    id: "sports-football",
    category: "Sports",
    section: "Summer Slam",
    icon: "⚽",
    name: "Football (Boys)",
    rules: [
      "Team size, match duration, and substitutions will be announced by organizers.",
      "Fouls and misconduct will be penalized by the referee.",
      "No abusive language; maintain sportsmanship.",
      "Matches may be knockout/league based on registrations.",
      "Referee and organizers’ decisions are final.",
    ],
    instructions: [
      "Bring proper footwear (studs only if ground permits).",
      "Arrive with team roster and captain for toss/check-in.",
      "Keep hydration and first-aid readiness in mind.",
    ],
  },
  {
    id: "sports-throwball",
    category: "Sports",
    section: "Summer Slam",
    icon: "🏐",
    name: "Throwball (Girls)",
    rules: [
      "Team size and match format will be announced on-site.",
      "Ball must be caught and thrown; no carrying beyond allowed time as per referee.",
      "Service and court rules will follow standard throwball guidelines.",
      "Unsportsmanlike behavior leads to penalties/disqualification.",
      "Referee decision is final.",
    ],
    instructions: [
      "Wear comfortable shoes; knee pads optional.",
      "Confirm rotations and serving order with the captain.",
      "Warm up shoulders and wrists before matches.",
    ],
  },
  {
    id: "sports-carrom",
    category: "Sports",
    section: "Summer Slam",
    icon: "🎯",
    name: "Carrom",
    rules: [
      "Standard carrom rules apply unless otherwise announced.",
      "Striker must be placed within the baseline; improper placement is a foul.",
      "Pocketing the queen requires a cover as per rules.",
      "Any deliberate disturbance of the board leads to penalty.",
      "Organizers’ decision is final.",
    ],
    instructions: [
      "Keep turns within the allotted time if a timer is used.",
      "Handle coins/board carefully.",
      "Be present when your round is called.",
    ],
  },
  {
    id: "sports-chess",
    category: "Sports",
    section: "Summer Slam",
    icon: "♟️",
    name: "Chess",
    rules: [
      "Standard chess rules apply.",
      "Touch-move rule applies if enforced by arbiters.",
      "If clocks are used, time controls will be announced.",
      "Any illegal move will be handled as per arbiter decision.",
      "Arbiter/organizer decision is final.",
    ],
    instructions: [
      "Maintain silence and fair play.",
      "Do not use phones or external assistance.",
      "Report results immediately after the game ends.",
    ],
  },
  {
    id: "sports-cricket",
    category: "Sports",
    section: "Summer Slam",
    icon: "🏏",
    name: "Cricket",
    rules: [
      "Match format (overs, team size, rules) will be announced based on registrations.",
      "No-ball/wide/leg-bye rules as per umpire briefing.",
      "Players must respect umpire decisions; disputes may lead to penalties.",
      "Equipment safety rules apply (pads/guards recommended).",
      "Organizers’ decision is final.",
    ],
    instructions: [
      "Bring your team on time for toss and line-up.",
      "Warm up before batting/bowling.",
      "Follow field safety—stay alert for hard-hit balls.",
    ],
  },

  // -------------------- Grace Gala (Cultural) --------------------
  {
    id: "cultural-solo-dance",
    category: "Cultural",
    section: "Grace Gala",
    icon: "💃",
    name: "Solo Dance",
    rules: [
      "Time limit and judging criteria will be announced at the venue.",
      "Song choice must be appropriate for a family audience.",
      "Props are allowed only if safe and quick to set up.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Carry your audio track in a phone + backup (USB/second phone).",
      "Report early for sound check if provided.",
      "Costumes should allow safe movement.",
    ],
  },
  {
    id: "cultural-group-dance",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🕺",
    name: "Group Dance",
    rules: [
      "Team size and time limit will be announced on-site.",
      "Props are allowed if safe and cleared with coordinators.",
      "Any vulgarity/offensive content results in disqualification.",
      "Judges’ decision is final.",
    ],
    instructions: [
      "Ensure coordinated entry/exit to keep setup time minimal.",
      "Bring a backup audio file.",
      "Arrive with your full group for check-in.",
    ],
  },
  {
    id: "cultural-solo-singing",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🎤",
    name: "Solo Singing",
    rules: [
      "Time limit will be announced by organizers.",
      "Lyrics must be appropriate for all ages.",
      "Participants may sing with/without karaoke track (as allowed).",
      "Judges’ decision is final.",
    ],
    instructions: ["Carry karaoke track + backup if using one.", "Maintain mic etiquette and stage discipline."],
  },
  {
    id: "cultural-group-singing",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🎶",
    name: "Group Singing",
    rules: [
      "Team size and time limit will be announced.",
      "No offensive content.",
      "Harmony/coordination will be considered in judging.",
      "Judges’ decision is final.",
    ],
    instructions: ["Arrive early for mic arrangement.", "Carry track + backup if required."],
  },
  {
    id: "cultural-skit",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🎭",
    name: "Skit",
    rules: [
      "Time limit will be announced.",
      "Content must be appropriate for a family audience.",
      "Props are allowed if safe and quick to set up.",
      "Judges’ decision is final.",
    ],
    instructions: ["Keep stage setup minimal.", "Coordinate with the backstage team for entry/exit."],
  },
  {
    id: "cultural-mime",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🤫",
    name: "Mime",
    rules: [
      "Time limit will be announced.",
      "No spoken dialogue during performance.",
      "Music/soundtrack (if used) must be submitted/ready as per instructions.",
      "Judges’ decision is final.",
    ],
    instructions: ["Use clear expressions and coordinated movements.", "Bring soundtrack + backup if using one."],
  },
  {
    id: "cultural-drawing",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🖍️",
    name: "Drawing",
    rules: [
      "Theme and time limit will be announced at the venue.",
      "Only allowed materials can be used (as specified).",
      "No copied artwork; originality is required.",
      "Judges’ decision is final.",
    ],
    instructions: ["Carry basic stationery (pencils, eraser, sharpener).", "Label your sheet if required."],
  },
  {
    id: "cultural-rangoli",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🌸",
    name: "Rangoli",
    rules: [
      "Theme/size/time limit will be announced.",
      "Only permitted materials may be used.",
      "Keep the area clean; no damage to venue property.",
      "Judges’ decision is final.",
    ],
    instructions: ["Bring materials if required (colors, petals, etc.).", "Finish within the time limit."],
  },
  {
    id: "cultural-mehndi",
    category: "Cultural",
    section: "Grace Gala",
    icon: "🪷",
    name: "Mehndi",
    rules: [
      "Time limit and design guidelines will be announced.",
      "Only mehndi cones allowed; no harmful chemicals.",
      "Judging based on neatness, creativity, and coverage.",
      "Judges’ decision is final.",
    ],
    instructions: ["Bring mehndi cones + tissues.", "Participants should be seated before start time."],
  },
  {
    id: "cultural-best-out-of-waste",
    category: "Cultural",
    section: "Grace Gala",
    icon: "♻️",
    name: "Best out of Waste",
    rules: [
      "Time limit and theme will be announced.",
      "Use mostly recyclable/used materials.",
      "No dangerous items (glass shards, open flames, etc.).",
      "Judges’ decision is final.",
    ],
    instructions: ["Bring materials and basic tools (glue/tape/scissors) if allowed.", "Keep your workspace clean."],
  },
];

// -------------------- DOM helpers --------------------
const $ = (sel, root = document) => root.querySelector(sel);

// Controls
const searchInput = $("#searchInput");
const visibleCount = $("#visibleCount");
const chips = Array.from(document.querySelectorAll(".chip"));

let activeFilter = "all"; // all | sports | cultural
let query = "";

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function matches(event) {
  if (activeFilter === "sports" && event.section !== "Summer Slam") return false;
  if (activeFilter === "cultural" && event.section !== "Grace Gala") return false;

  if (!query) return true;
  const hay = normalize(`${event.name} ${event.section} ${event.category}`);
  return hay.includes(query);
}

function createCard(event) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card";
  btn.setAttribute("role", "listitem");
  btn.setAttribute("data-event-id", event.id);
  btn.setAttribute("aria-label", `${event.name} details`);

  const hint = event.section === "Summer Slam" ? "View rules & register" : "View details & register";

  btn.innerHTML = `
    <div class="card__top">
      <div class="card__icon" aria-hidden="true">${escapeHtml(event.icon)}</div>
      <div>
        <h3 class="card__name">${escapeHtml(event.name)}</h3>
        <p class="card__hint">${escapeHtml(hint)}</p>
      </div>
    </div>
  `.trim();

  btn.addEventListener("click", () => openModal(event.id));
  addCardTilt(btn);
  return btn;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return c;
    }
  });
}

// Subtle 3D tilt effect (skips when reduced motion is enabled)
function addCardTilt(cardEl) {
  if (!(cardEl instanceof HTMLElement)) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

  const max = 6; // degrees
  const onMove = (ev) => {
    const rect = cardEl.getBoundingClientRect();
    const px = (ev.clientX - rect.left) / rect.width;
    const py = (ev.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -max;
    const ry = (px - 0.5) * max;
    cardEl.style.transform = `translateY(-3px) scale(1.02) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    cardEl.style.transform = "";
  };
  cardEl.addEventListener("mousemove", onMove);
  cardEl.addEventListener("mouseleave", onLeave);
}

// -------------------- Render sections --------------------
function render() {
  const sportsGrid = $("#sports-grid");
  const culturalGrid = $("#cultural-grid");
  if (!sportsGrid || !culturalGrid) return;

  sportsGrid.textContent = "";
  culturalGrid.textContent = "";

  const sports = EVENTS.filter((e) => e.section === "Summer Slam" && matches(e));
  const cultural = EVENTS.filter((e) => e.section === "Grace Gala" && matches(e));

  for (const e of sports) sportsGrid.appendChild(createCard(e));
  for (const e of cultural) culturalGrid.appendChild(createCard(e));

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const count = sports.length + cultural.length;
  if (visibleCount) visibleCount.textContent = String(count);
}

// -------------------- Modal behavior --------------------
const overlay = $("#modalOverlay");
const modal = $("#modal");
const closeBtn = $("#modalClose");
const titleEl = $("#modalTitle");
const metaEl = $("#modalMeta");
const iconEl = $("#modalIcon");
const rulesEl = $("#modalRules");
const instrEl = $("#modalInstructions");
const registerBtn = $("#registerBtn");

let lastFocusedEl = null;
let activeEventId = null;

function setListItems(ul, items) {
  if (!ul) return;
  ul.textContent = "";
  for (const text of items) {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  }
}

function openModal(eventId) {
  const event = EVENTS.find((e) => e.id === eventId);
  if (!event || !overlay || !modal) return;

  activeEventId = eventId;
  lastFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  if (titleEl) titleEl.textContent = event.name;
  if (metaEl) metaEl.textContent = `${event.section} • Rules & Instructions`;
  if (iconEl) iconEl.textContent = event.icon;
  if (registerBtn) registerBtn.href = REGISTER_URL;

  setListItems(rulesEl, event.rules || []);
  setListItems(instrEl, event.instructions || []);

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Focus modal for accessibility
  setTimeout(() => modal.focus(), 0);
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeEventId = null;

  if (lastFocusedEl) lastFocusedEl.focus();
  lastFocusedEl = null;
}

// Close on overlay click (but not when clicking inside modal)
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

closeBtn?.addEventListener("click", closeModal);

// Escape to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay?.classList.contains("is-open")) closeModal();

  // Basic focus trap when modal is open
  if (e.key === "Tab" && overlay?.classList.contains("is-open") && modal) {
    const focusables = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter((el) => el instanceof HTMLElement && !el.hasAttribute("disabled"));
    if (list.length === 0) return;

    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement;

    if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    }
  }
});

function setActiveChip(next) {
  activeFilter = next;
  for (const c of chips) {
    const on = c.dataset.filter === next;
    c.classList.toggle("is-active", on);
    c.setAttribute("aria-selected", on ? "true" : "false");
  }
  render();
}

chips.forEach((c) => {
  c.addEventListener("click", () => setActiveChip(c.dataset.filter || "all"));
});

searchInput?.addEventListener("input", () => {
  query = normalize(searchInput.value);
  render();
});

// Keyboard shortcut: press "/" to focus search
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !overlay?.classList.contains("is-open")) {
    const active = document.activeElement;
    const typing =
      active instanceof HTMLInputElement ||
      active instanceof HTMLTextAreaElement ||
      (active instanceof HTMLElement && active.isContentEditable);
    if (!typing) {
      e.preventDefault();
      searchInput?.focus();
    }
  }
});

// Countdown widget
const countdownEl = $("#countdown");
function tickCountdown() {
  if (!countdownEl || !(EVENT_DATE instanceof Date) || Number.isNaN(EVENT_DATE.getTime())) return;
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) {
    countdownEl.textContent = "Happening now";
    return;
  }

  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  countdownEl.textContent = `${d}d ${h}h ${m}m to go`;
}

// Init
setActiveChip("all");
render();
tickCountdown();
setInterval(tickCountdown, 30_000);

