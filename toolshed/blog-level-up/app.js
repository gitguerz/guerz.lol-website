/* Level Up Your Blog — app.js */
/* Original work by Guerz, CC BY-NC-SA 4.0. Every line is commented so future-you can read it. */

(() => { // wrap everything in a function so nothing leaks into the global scope
  'use strict'; // turn on stricter, safer JavaScript rules

  /* 1. References: grab the page pieces once and reuse them. */
  const STORAGE_KEY = 'level-up-your-blog-v1'; // the one localStorage key this page uses
  const $ = (selector) => document.querySelector(selector); // shortcut: first match
  const $$ = (selector) => Array.from(document.querySelectorAll(selector)); // shortcut: all matches as a real array
  const taskBoxes = $$('.task input[type="checkbox"]'); // every level task checkbox
  const testBoxes = $$('.test-check'); // every boss-check checkbox
  const stations = $$('.station'); // every level card
  const routeInputs = $$('input[name="blog-route"]'); // the three route radio buttons
  const noteBoxes = $$('textarea'); // both field-note boxes
  const xpNumber = $('#xp-number'); // big XP number
  const meter = $('#progress-meter'); // native progress bar
  const progressText = $('#progress-text'); // "x of y tasks" line
  const bossText = $('#boss-text'); // "Boss checks" line
  const rankTitle = $('#rank-title'); // current rank name
  const nextTask = $('#next-task'); // next-move box
  const routeResult = $('#route-result'); // route advice box
  const toast = $('#toast'); // pop-up message
  const filter = $('#station-filter'); // level filter dropdown
  const focusToggle = $('#focus-toggle'); // focus mode button
  const XP_PER_TASK = 10; // each task is worth 10 XP
  const XP_PER_BOSS = 5; // each boss check is worth 5 XP
  let toastTimer; // remembers the toast timeout so it can be reset
  let focusEnabled = false; // tracks whether focus mode is on

  /* 2. Ranks: the title changes as total XP grows. Thresholds are lowest XP for each title. */
  const RANKS = [ // list of [minimum XP, title], low to high
    [0, 'Curious reader'], [50, 'Idea collector'], [110, 'Draft writer'],
    [180, 'Published'], [250, 'Archive builder'], [320, 'Open for visitors'], [385, 'Keeper of the blog']
  ];

  /* 3. Guard: if the page is missing parts, say so in the console instead of half working. */
  if (!taskBoxes.length || !xpNumber || !meter || !progressText || !nextTask || !routeResult) { // any key piece missing?
    console.error('Level Up init failed: expected controls are missing.'); // tell the developer
    return; // stop here
  }

  /* 4. Toast: short feedback message that fades out on its own. */
  function showToast(message) { // takes the text to show
    window.clearTimeout(toastTimer); // cancel any earlier hide timer
    toast.textContent = message; // set the message
    toast.classList.add('show'); // make it visible
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800); // hide after 2.8 seconds
  }

  /* 5. Read saved state: bad or blocked storage becomes a harmless blank start. */
  function readState() { // returns the saved object
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}'); } // parse saved JSON text
    catch (error) { console.warn('Could not read saved state.', error); return {}; } // storage blocked or corrupt
  }

  /* 6. Save state: checkboxes, route, and notes only. Nothing leaves this browser. */
  function saveState() { // writes everything to localStorage
    const state = { // build the object to save
      tasks: Object.fromEntries(taskBoxes.map((box) => [box.id, box.checked])), // task id -> true/false
      tests: Object.fromEntries(testBoxes.map((box, index) => [index, box.checked])), // boss index -> true/false
      route: (routeInputs.find((input) => input.checked) || {}).value || 'hosted', // chosen route
      notes: Object.fromEntries(noteBoxes.map((box) => [box.id, box.value])) // note id -> text
    };
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } // store as text
    catch (error) { console.warn('Could not save.', error); showToast('Could not save here. Export your log.'); } // warn the user
  }

  /* 7. Progress renderer: recompute XP, rank, bar, and text from the checkboxes. */
  function renderProgress() { // call after any checkbox changes
    const done = taskBoxes.filter((box) => box.checked).length; // finished tasks
    const total = taskBoxes.length; // all tasks
    const bossDone = testBoxes.filter((box) => box.checked).length; // finished boss checks
    const xp = done * XP_PER_TASK + bossDone * XP_PER_BOSS; // total experience
    const percent = total ? Math.round((done / total) * 100) : 0; // percent of tasks done
    let rank = RANKS[0][1]; // start at the lowest rank
    RANKS.forEach(([min, title]) => { if (xp >= min) rank = title; }); // keep the highest rank reached
    xpNumber.textContent = String(xp); // show XP
    meter.value = percent; // fill the progress bar
    meter.setAttribute('aria-valuenow', String(percent)); // tell screen readers the percent
    progressText.textContent = `${done} of ${total} tasks complete`; // task count line
    bossText.textContent = `Boss checks: ${bossDone} of ${testBoxes.length}`; // boss count line
    rankTitle.textContent = rank; // show rank
  }

  /* 8. Route explainer: advice changes with the chosen way to build the blog. */
  function renderRoute() { // updates the box under the route cards
    const selected = (routeInputs.find((input) => input.checked) || {}).value || 'hosted'; // current choice
    const messages = { // advice for each route
      hosted: '<strong>Hosted platform selected.</strong> Check the current plan limits, export options, and domain ownership before you commit. Your first wins are the editor, a few pages, a menu, and account recovery. Skip the extra add-ons for now.',
      'self-hosted': '<strong>Self-hosted selected.</strong> Hosting, domain, backups, updates, and security are yours to run. Start small: one maintained theme, very few add-ons, a written backup location, and a way to roll back before bigger changes.',
      'hand-built': '<strong>Hand-built selected.</strong> You own every page, and there is no editor safety net. Start with one page and one post template, keep files in Git, and write down how you publish and how you restore from a copy.'
    };
    routeResult.innerHTML = messages[selected] || messages.hosted; // show the advice (static text, safe to insert)
  }

  /* 9. Restore: put saved values back onto the page. */
  function restoreState() { // runs once at startup
    const state = readState(); // load saved data
    taskBoxes.forEach((box) => { box.checked = Boolean(state.tasks && state.tasks[box.id]); }); // tasks
    testBoxes.forEach((box, index) => { box.checked = Boolean(state.tests && state.tests[index]); }); // boss checks
    const savedRoute = routeInputs.find((input) => input.value === state.route); // saved route radio
    if (savedRoute) savedRoute.checked = true; // select it
    noteBoxes.forEach((box) => { box.value = (state.notes && state.notes[box.id]) || ''; }); // notes
    renderRoute(); // draw route advice
    renderProgress(); // draw progress
  }

  /* 10. Next move: pick the first unfinished task, open its tips, scroll, and focus it. */
  function pickNextTask() { // button handler
    const visible = taskBoxes.filter((box) => !box.checked && !box.closest('.station').hidden); // unfinished, in visible levels
    const selected = visible[0] || taskBoxes.find((box) => !box.checked); // fall back to any unfinished task
    if (!selected) { // everything is done
      nextTask.textContent = 'All six levels are clear. Write your next post, check your backup, and keep going.'; // message
      showToast('All levels clear. Nice work.'); // celebrate
      return; // stop
    }
    const station = selected.closest('.station'); // the level it belongs to
    const title = selected.parentElement.querySelector('strong').textContent; // task title
    station.querySelectorAll('details').forEach((d) => { d.open = true; }); // open that level's tips
    nextTask.innerHTML = ''; // clear old text
    const heading = document.createElement('strong'); // level name
    heading.textContent = station.dataset.title; // use text so nothing is parsed as HTML
    nextTask.append(heading, document.createElement('br'), document.createTextNode(title)); // level + task
    station.scrollIntoView({ behavior: 'smooth', block: 'center' }); // scroll to the level
    window.setTimeout(() => selected.focus({ preventScroll: true }), 420); // focus the checkbox after the scroll
  }

  /* 11. Filter: show a group of levels. Never touches saved progress. */
  function applyFilter() { // dropdown handler
    const group = filter.value; // chosen group
    stations.forEach((station) => { station.hidden = group !== 'all' && station.dataset.group !== group; }); // hide non-matching levels
    focusEnabled = false; // filtering switches focus mode off
    document.body.classList.remove('focused'); // remove focus styling
    stations.forEach((station) => station.classList.remove('focus-station')); // clear the focus target
    focusToggle.setAttribute('aria-pressed', 'false'); // update button state
    focusToggle.textContent = 'Focus mode: off'; // update button text
    showToast(group === 'all' ? 'Showing all levels.' : 'Levels filtered.'); // feedback
  }

  /* 12. Focus mode: show only the first visible level that still has unfinished tasks. */
  function toggleFocus() { // button handler
    focusEnabled = !focusEnabled; // flip the state
    const visible = stations.filter((station) => !station.hidden); // levels not filtered out
    const target = visible.find((s) => s.querySelector('.task input:not(:checked)')) || visible[0]; // first unfinished level
    stations.forEach((station) => station.classList.toggle('focus-station', focusEnabled && station === target)); // mark the target
    document.body.classList.toggle('focused', focusEnabled); // switch the CSS rule on or off
    focusToggle.setAttribute('aria-pressed', String(focusEnabled)); // screen-reader state
    focusToggle.textContent = focusEnabled ? 'Focus mode: on' : 'Focus mode: off'; // button text
    if (focusEnabled && target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); // bring it into view
    showToast(focusEnabled ? 'One level at a time. The rest is tucked away.' : 'All levels back.'); // feedback
  }

  /* 13. Tips controller: open or close every tips panel at once. */
  function setAllDetails(open) { $$('details').forEach((d) => { d.open = open; }); } // loop through all panels

  /* 14. Markdown export: builds a note you can drop into Obsidian or any notes app. */
  function exportLog() { // button handler
    const route = (routeInputs.find((input) => input.checked) || {}).value || 'hosted'; // chosen route
    const tasks = taskBoxes.map((box) => `- [${box.checked ? 'x' : ' '}] ${box.parentElement.querySelector('strong').textContent}`); // task lines
    const tests = testBoxes.map((box) => `- [${box.checked ? 'x' : ' '}] ${box.parentElement.textContent.trim()}`); // boss lines
    const notes = noteBoxes.map((box) => `### ${box.previousElementSibling ? box.previousElementSibling.textContent : box.id}\n${box.value || '(empty)'}`); // note sections
    const markdown = [ // join the file together with line breaks
      '---', 'title: "Level Up Your Blog log"', `updated: "${new Date().toISOString().slice(0, 10)}"`, `route: "${route}"`, `xp: ${xpNumber.textContent}`, `rank: "${rankTitle.textContent}"`, 'license: "CC BY-NC-SA 4.0"', '---', '',
      '# Level Up Your Blog log', '', '## Route', route, '', '## Tasks', ...tasks, '', '## Boss checks', ...tests, '', '## Field notes', ...notes, '',
      '## Credit', 'Original writing, structure, and design by Guerz, shared under CC BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/', 'Built by directing AI: research and first drafts by Plexi (Perplexity), build and checks by Bonnie (Claude).', ''
    ].join('\n');
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' })); // make a temporary file in memory
    const link = document.createElement('a'); // invisible download link
    link.href = url; // point at the file
    link.download = 'level-up-your-blog-log.md'; // suggested file name
    document.body.appendChild(link); // add it so click works in every browser
    link.click(); // start the download
    link.remove(); // clean up the link
    window.setTimeout(() => URL.revokeObjectURL(url), 1000); // free the memory a second later
    showToast('Log exported as Markdown.'); // feedback
  }

  /* 15. Reset: asks first, then clears checkboxes, notes, and the saved copy. */
  function resetProgress() { // button handler
    if (!window.confirm('Reset all marks and notes in this browser? Export first if you want a record.')) return; // cancel keeps everything
    try { window.localStorage.removeItem(STORAGE_KEY); } // delete the saved copy
    catch (error) { console.warn('Could not clear saved state.', error); } // storage blocked
    taskBoxes.concat(testBoxes).forEach((box) => { box.checked = false; }); // uncheck everything
    noteBoxes.forEach((box) => { box.value = ''; }); // clear notes
    routeInputs[0].checked = true; // back to the first route
    renderRoute(); // redraw route advice
    renderProgress(); // redraw progress
    showToast('Reset done. Fresh page.'); // feedback
  }

  /* 16. Theme toggle: flip between light and dark token sets. */
  function toggleTheme() { // button handler
    const root = document.documentElement; // the <html> element holds data-theme
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; // swap
    showToast(root.dataset.theme === 'dark' ? 'Dark theme on.' : 'Light theme on.'); // feedback
  }

  /* 17. Event wiring: each control gets one clear behavior. */
  taskBoxes.concat(testBoxes).forEach((box) => box.addEventListener('change', () => { saveState(); renderProgress(); })); // checkbox change
  routeInputs.forEach((input) => input.addEventListener('change', () => { saveState(); renderRoute(); })); // route change
  noteBoxes.forEach((box) => box.addEventListener('input', saveState)); // save notes as you type
  $('#pick-next-task').addEventListener('click', pickNextTask); // next move button
  $('#export-progress').addEventListener('click', exportLog); // export button
  focusToggle.addEventListener('click', toggleFocus); // focus button
  $('#open-all-details').addEventListener('click', () => setAllDetails(true)); // open tips
  $('#close-all-details').addEventListener('click', () => setAllDetails(false)); // close tips
  $('#reset-progress').addEventListener('click', resetProgress); // reset button
  filter.addEventListener('change', applyFilter); // filter dropdown
  $('#theme-toggle').addEventListener('click', toggleTheme); // theme button

  /* 18. Startup: restore saved state after everything is wired. */
  restoreState(); // runs once when the page loads
})();
