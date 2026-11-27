// ========================
// 1. HABIT TRACKER LOGIC
// ========================
const STORAGE_KEY = "daily-habit-tracker-v1";
const defaultHabits = [
  { id: 1, name: "Drink a glass of water", done: false },
  { id: 2, name: "Take a 10-minute walk", done: false },
  { id: 3, name: "Read for 15 minutes", done: false },
  { id: 4, name: "Study Full Sail", done: false },            // new default habit: Full Sail coursework
  { id: 5, name: "Study freeCodeCamp", done: false },        // new default habit: fCC
  { id: 6, name: "Study frontendmentor.io", done: false }    // new default habit: Frontend Mentor
];

function getDateKey(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("en-CA");
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("Empty");
    const saved = JSON.parse(raw);
    const today = getDateKey(0);
    const yesterday = getDateKey(1);

    if (saved.lastVisitDate !== today) {
      saved.habits.forEach((h) => (h.done = false));
      if (saved.lastCompletedDate !== yesterday && saved.lastCompletedDate !== today) {
        saved.streak = 0;
      }
    }
    return saved;
  } catch {
    return {
      habits: defaultHabits,
      streak: 0,
      lastCompletedDate: null,
      lastVisitDate: getDateKey(0)
    };
  }
}

const state = loadState();
let habits = state.habits;
let streak = state.streak;
let lastCompletedDate = state.lastCompletedDate;
let nextId = Math.max(0, ...habits.map((h) => h.id)) + 1;

const addForm = document.getElementById("add-form");
const habitInput = document.getElementById("habit-input");
const habitListEl = document.getElementById("habit-list");
const progressEl = document.getElementById("progress");
const streakEl = document.getElementById("streak");

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      habits,
      streak,
      lastCompletedDate,
      lastVisitDate: getDateKey(0)
    }));
  } catch {}
}

function checkStreak() {
  const today = getDateKey(0);
  const yesterday = getDateKey(1);
  if (habits.length > 0 && habits.every((h) => h.done) && lastCompletedDate !== today) {
    streak = lastCompletedDate === yesterday ? streak + 1 : 1;
    lastCompletedDate = today;
  }
}

function renderHabits() {
  habitListEl.innerHTML = "";
  habits.forEach((habit) => {
    const li = document.createElement("li");
    li.className = "habit-row";

    const btn = document.createElement("button");
    btn.className = habit.done ? "habit-btn done" : "habit-btn";
    btn.textContent = (habit.done ? "✓ " : "○ ") + habit.name;
    btn.addEventListener("click", () => {
      habit.done = !habit.done;
      checkStreak();
      saveState();
      renderHabits();
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "×";
    delBtn.setAttribute("aria-label", `Delete ${habit.name}`);
    delBtn.addEventListener("click", () => {
      habits = habits.filter((item) => item.id !== habit.id);
      checkStreak();
      saveState();
      renderHabits();
    });

    li.appendChild(btn);
    li.appendChild(delBtn);
    habitListEl.appendChild(li);
  });

  const completed = habits.filter((h) => h.done).length;
  progressEl.textContent = `${completed} of ${habits.length} completed`;
  streakEl.textContent = `Streak: ${streak} ${streak === 1 ? "day" : "days"}`;
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = habitInput.value.trim();
  if (!name) return;
  habits.push({ id: nextId++, name, done: false });
  saveState();
  renderHabits();
  habitInput.value = "";
  habitInput.focus();
});

// ========================
// 2. FOCUS TIMER LOGIC
// ========================
const SESSION_KEY = "focus-sessions-v1";
let currentDuration = 25 * 60;
let secondsLeft = currentDuration;
let timerId = null;
let isFocusSession = true;

function loadFocusSessions() {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
    return saved.date === getDateKey(0) ? saved.count || 0 : 0;
  } catch {
    return 0;
  }
}

let focusSessionsToday = loadFocusSessions();

const timerEl = document.getElementById("timer");
const statusEl = document.getElementById("status");
const sessionCountEl = document.getElementById("session-count");
const focusModeBtn = document.getElementById("focus-mode");
const breakModeBtn = document.getElementById("break-mode");
const longBreakModeBtn = document.getElementById("long-break-mode"); // the new 35-minute long break button
const customForm = document.getElementById("custom-form");
const customMinutesInput = document.getElementById("custom-minutes");

function saveFocusSessions() {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      count: focusSessionsToday,
      date: getDateKey(0)
    }));
  } catch {}
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function renderTimer() {
  timerEl.textContent = formatTime(secondsLeft);
  sessionCountEl.textContent = `Focus sessions today: ${focusSessionsToday}`;
  document.title = "Habit Dashboard"; // tab title stays fixed (the countdown no longer shows in the tab)
}

function playChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {}
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function setDuration(minutes, activeBtn, countsAsFocus) {
  pauseTimer();
  currentDuration = minutes * 60;
  secondsLeft = currentDuration;
  isFocusSession = countsAsFocus;
  statusEl.textContent = "";
  focusModeBtn.classList.toggle("active", activeBtn === focusModeBtn);
  breakModeBtn.classList.toggle("active", activeBtn === breakModeBtn);
  longBreakModeBtn.classList.toggle("active", activeBtn === longBreakModeBtn); // highlight long break when chosen
  renderTimer();
}

document.getElementById("start-btn").addEventListener("click", () => {
  if (timerId !== null) return;
  if (secondsLeft === 0) secondsLeft = currentDuration;
  statusEl.textContent = "";
  timerId = setInterval(() => {
    secondsLeft--;
    renderTimer();
    if (secondsLeft <= 0) {
      pauseTimer();
      playChime();
      if (isFocusSession) {
        focusSessionsToday++;
        saveFocusSessions();
        renderTimer();
      }
      statusEl.textContent = isFocusSession
        ? "Focus session complete! Take a short break."
        : "Break's over—ready for the next round!";
    }
  }, 1000);
});

document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", () => {
  pauseTimer();
  secondsLeft = currentDuration;
  statusEl.textContent = "";
  renderTimer();
});

focusModeBtn.addEventListener("click", () => setDuration(25, focusModeBtn, true));
breakModeBtn.addEventListener("click", () => setDuration(5, breakModeBtn, false));
longBreakModeBtn.addEventListener("click", () => setDuration(35, longBreakModeBtn, false)); // 35 min, not counted as focus

customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mins = Number(customMinutesInput.value);
  if (mins >= 1 && mins <= 120) {
    setDuration(mins, null, true);
    customMinutesInput.value = "";
  }
});

// ========================
// 3. DARK MODE TOGGLE
// ========================
const THEME_KEY = "dashboard-theme";
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
}

try {
  applyTheme(localStorage.getItem(THEME_KEY) === "dark");
} catch {}

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  try {
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  } catch {}
});

// ========================
// 4. COPY TO OBSIDIAN
// ========================
const copyObsidianBtn = document.getElementById("copy-obsidian");

function buildObsidianMarkdown() {
  const today = getDateKey(0);
  const completed = habits.filter((h) => h.done).length;
  const habitLines = habits
    .map((h) => `- [${h.done ? "x" : " "}] ${h.name}`)
    .join("\n");

  const noteText = quickNotesEl.value.trim();                         // the unlogged draft in the textarea
  const logLines = noteLog                                            // each logged note becomes one bullet
    .map((n) => `- ${formatNoteTime(n.time)} — ${n.text.replace(/\n/g, "\n  ")}`) // indent extra lines so the bullet holds together
    .join("\n");                                                      // one bullet per line
  const noteBlock = (noteText || logLines)                            // only add a Notes section if there is something
    ? ["", "### Notes", ...(logLines ? [logLines] : []), ...(noteText ? [noteText] : [])]
    : [];                                                             // otherwise no Notes section

  return [
    `## Daily Check-In — ${today}`,
    `- **Habits:** ${completed}/${habits.length} (Streak: ${streak} ${streak === 1 ? "day" : "days"})`,
    `- **Focus Sessions:** ${focusSessionsToday}`,
    "",
    habitLines || "- *(No habits listed)*",
    ...noteBlock,
    "",
    "#daily-log #habits"
  ].join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }
}

copyObsidianBtn.addEventListener("click", async () => {
  await copyText(buildObsidianMarkdown());
  copyObsidianBtn.textContent = "Copied!";
  setTimeout(() => {
    copyObsidianBtn.textContent = "Copy to Obsidian";
  }, 2000);
});

// ========================
// 5. QUICK NOTES (AUTO-SAVED)
// ========================
const NOTES_KEY = "dashboard-notes-v1";
const quickNotesEl = document.getElementById("quick-notes");
const notesStatusEl = document.getElementById("notes-status");

try {
  quickNotesEl.value = localStorage.getItem(NOTES_KEY) || "";
} catch {}

quickNotesEl.addEventListener("input", () => {
  try {
    localStorage.setItem(NOTES_KEY, quickNotesEl.value);
    notesStatusEl.textContent = "Saved";
  } catch {
    notesStatusEl.textContent = "Not saved";
  }
});

// ========================
// 6. NOTE LOG (ADD + DELETE)
// ========================
const NOTE_LOG_KEY = "dashboard-note-log-v1";                 // localStorage key for the log
const logNoteBtn = document.getElementById("log-note-btn");   // the "Log note" button
const noteLogEl = document.getElementById("note-log");        // the <ul> that holds logged notes
const noteLogEmptyEl = document.getElementById("note-log-empty"); // the "No logged notes yet." line

function loadNoteLog() {                                      // read the saved log
  try {                                                       // storage can throw (private mode etc.)
    const saved = JSON.parse(localStorage.getItem(NOTE_LOG_KEY) || "[]"); // parse saved JSON, default empty
    return Array.isArray(saved) ? saved : [];                 // guard against bad data
  } catch {
    return [];                                                // fall back to an empty log
  }
}

let noteLog = loadNoteLog();                                  // the log in memory: [{ id, text, time }]
let nextNoteId = Math.max(0, ...noteLog.map((n) => n.id)) + 1; // next unused id

function saveNoteLog() {                                      // write the log back to storage
  try {
    localStorage.setItem(NOTE_LOG_KEY, JSON.stringify(noteLog)); // save as JSON
  } catch {}                                                  // ignore storage errors
}

function formatNoteTime(iso) {                                // "2026-11-27 04:05" style stamp
  const d = new Date(iso);                                    // turn the saved string into a Date
  const date = d.toLocaleDateString("en-CA");                 // YYYY-MM-DD
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); // 4:05 AM
  return `${date} ${time}`;                                   // combine the two
}

function renderNoteLog() {                                    // redraw the whole list
  noteLogEl.innerHTML = "";                                   // clear old rows
  noteLogEmptyEl.hidden = noteLog.length > 0;                 // show the empty message only when no notes
  [...noteLog].reverse().forEach((note) => {                  // newest first
    const li = document.createElement("li");                  // one row per note
    li.className = "note-row";                                // styled by style.css

    const body = document.createElement("div");               // holds the time + text
    body.className = "note-body";                             // styled by style.css

    const time = document.createElement("time");              // semantic timestamp
    time.className = "note-time";                             // styled by style.css
    time.dateTime = note.time;                                // machine-readable time
    time.textContent = formatNoteTime(note.time);             // human-readable time

    const text = document.createElement("p");                 // the note text
    text.className = "note-text";                             // styled by style.css (keeps line breaks)
    text.textContent = note.text;                             // textContent so pasted HTML can't run

    const del = document.createElement("button");             // delete button
    del.className = "delete-btn";                             // reuse the habit × style
    del.type = "button";                                      // never submits a form
    del.textContent = "×";                                    // the × symbol
    del.setAttribute("aria-label", `Delete note from ${formatNoteTime(note.time)}`); // screen-reader label
    del.addEventListener("click", () => {                     // delete handler
      noteLog = noteLog.filter((n) => n.id !== note.id);      // drop this note
      saveNoteLog();                                          // persist
      renderNoteLog();                                        // redraw
    });

    body.appendChild(time);                                   // time goes first
    body.appendChild(text);                                   // then the text
    li.appendChild(body);                                     // body on the left
    li.appendChild(del);                                      // delete on the right
    noteLogEl.appendChild(li);                                // add the row to the list
  });
}

logNoteBtn.addEventListener("click", () => {                  // "Log note" clicked
  const text = quickNotesEl.value.trim();                     // take the textarea text
  if (!text) return;                                          // ignore empty notes
  noteLog.push({ id: nextNoteId++, text, time: new Date().toISOString() }); // add with a timestamp
  saveNoteLog();                                              // persist the log
  quickNotesEl.value = "";                                    // clear the textarea
  try { localStorage.setItem(NOTES_KEY, ""); } catch {}       // clear the saved draft too
  notesStatusEl.textContent = "Logged";                       // tiny confirmation
  renderNoteLog();                                            // redraw the list
  quickNotesEl.focus();                                       // ready for the next note
});

renderNoteLog();                                              // draw saved notes on page load

saveState();
renderHabits();
renderTimer();
