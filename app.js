/* =============================================================================
 * TypeCS - app.js
 * A self-contained typing trainer wrapped around a Computer Science
 * Fundamentals curriculum. No dependencies, no build step: open index.html
 * and type.
 *
 * Loads after: keyboard.js (VirtualKeyboard class), grammar-data.js
 * (GRAMMAR_LEVELS) and book-data.js (BOOK_SECTION, optional).
 * ========================================================================== */

(function () {
  'use strict';

  /* ── Guard: the data file must have loaded ──────────────────────────── */
  if (typeof GRAMMAR_LEVELS === 'undefined' || !Array.isArray(GRAMMAR_LEVELS) || !GRAMMAR_LEVELS.length) {
    document.body.innerHTML =
      '<p style="font:16px system-ui;padding:3rem;text-align:center">' +
      'Could not load <code>grammar-data.js</code>. Make sure it sits next to <code>index.html</code>.' +
      '</p>';
    return;
  }

  /* ── Tiny helpers ───────────────────────────────────────────────────── */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  function formatClock(seconds) {
    const s = Math.max(0, Math.ceil(seconds));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  /* Cosmetic renderers must never be able to break the typing engine, so any
     failure is logged loudly and then ignored. */
  function safe(label, fn) {
    try {
      fn();
    } catch (err) {
      if (window.console && window.console.error) {
        window.console.error('[TypeCS] ' + label + ' failed:', err);
      }
    }
  }

  function debounce(fn, wait) {
    let id = 0;
    return function () {
      const args = arguments;
      clearTimeout(id);
      id = setTimeout(() => fn.apply(null, args), wait);
    };
  }

  /* ── Element lookups ────────────────────────────────────────────────── */
  const el = {
    html: document.documentElement,
    levelList: $('#levelList'),
    searchInput: $('#searchInput'),
    searchClear: $('#searchClear'),
    sidebar: $('#sidebar'),
    backdrop: $('#backdrop'),
    menuToggle: $('#menuToggle'),
    progressDone: $('#progressDone'),
    progressTotal: $('#progressTotal'),
    progressChip: $('#progressChip'),
    sidebarProgressBar: $('#sidebarProgressBar'),
    sidebarPercent: $('#sidebarPercent'),

    lessonLevel: $('#lessonLevel'),
    lessonDifficulty: $('#lessonDifficulty'),
    lessonTitle: $('#lessonTitle'),
    lessonTagline: $('#lessonTagline'),
    lessonDone: $('#lessonDone'),
    doneFlagText: $('#doneFlagText'),

    bookBar: $('#bookBar'),
    bookBarTitle: $('#bookBarTitle'),
    prevPage: $('#prevPage'),
    nextPage: $('#nextPage'),
    pageDots: $('#pageDots'),
    pageLabel: $('#pageLabel'),

    lockedCard: $('#lockedCard'),
    lockedBar: $('#lockedBar'),
    lockedCount: $('#lockedCount'),
    lockedTotal: $('#lockedTotal'),
    lockedLeft: $('#lockedLeft'),
    lockedCta: $('#lockedCta'),

    typingCard: $('#typingCard'),
    typingWrap: $('#typingWrap'),
    typingText: $('#typingText'),
    typingInput: $('#typingInput'),
    focusOverlay: $('#focusOverlay'),
    overlayTitle: $('#overlayTitle'),
    overlayHint: $('#overlayHint'),
    pausedOverlay: $('#pausedOverlay'),
    capsWarning: $('#capsWarning'),

    statWpm: $('#statWpm'),
    statAcc: $('#statAcc'),
    statTime: $('#statTime'),
    statTimerLabel: $('#statTimerLabel'),
    statErrors: $('#statErrors'),
    statBest: $('#statBest'),
    progressBar: $('#progressBar'),

    modeGroup: $('#modeGroup'),
    restartBtn: $('#restartBtn'),
    keyboard: $('#keyboard'),
    keyboardLegend: $('#keyboardLegend'),
    keyboardToggle: $('#keyboardToggle'),
    soundToggle: $('#soundToggle'),
    themeToggle: $('#themeToggle'),
    resetProgress: $('#resetProgress'),
    brandLink: $('#brandLink'),

    refCard: $('#referenceCard'),
    refToggle: $('#referenceToggle'),
    referenceBody: $('#referenceBody'),

    resultsCard: $('#resultsCard'),
    resultsEyebrow: $('#resultsEyebrow'),
    resultsTitle: $('#resultsTitle'),
    resultsSub: $('#resultsSub'),
    resultsNote: $('#resultsNote'),
    resultWpm: $('#resultWpm'),
    resultRaw: $('#resultRaw'),
    resultAcc: $('#resultAcc'),
    resultErrors: $('#resultErrors'),
    resultConsistency: $('#resultConsistency'),
    resultTime: $('#resultTime'),
    retryBtn: $('#retryBtn'),
    nextBtn: $('#nextBtn'),
    nextLabel: $('#nextLabel'),
    chart: $('#chart'),
    toastStack: $('#toastStack'),
  };

  /* ── Curriculum index ───────────────────────────────────────────────── */
  const FLAT = [];
  GRAMMAR_LEVELS.forEach((level, li) => {
    level.lessons.forEach((lesson, i) => {
      FLAT.push({ level: level, lesson: lesson, li: li, i: i, index: FLAT.length });
    });
  });
  const TOTAL = FLAT.length;
  const LEVEL_COUNT = GRAMMAR_LEVELS.length;

  /* ── The CS Handbook (book section) index ───────────────────────────── */
  const BOOK = typeof BOOK_SECTION !== 'undefined' && BOOK_SECTION && BOOK_SECTION.parts
    ? BOOK_SECTION
    : null;

  const BOOK_PAGES = [];
  if (BOOK) {
    BOOK.parts.forEach((part, ci) => {
      part.pages.forEach((pageData, pi) => {
        BOOK_PAGES.push({ part: part, page: pageData, ci: ci, pi: pi });
      });
    });
  }
  const BOOK_TOTAL = BOOK_PAGES.length;
  /* The handbook is always the last level, so number it after the last one
     instead of trusting BOOK.icon (which used to collide with level 07). */
  const BOOK_LEVEL_NUM = String(LEVEL_COUNT + 1).padStart(2, '0');

  /* ── Persisted preferences & progress ───────────────────────────────── */
  const STORAGE_KEY = 'typecs.v1';
  const defaults = {
    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
    sound: false,
    keyboard: true,
    refOpen: true,
    best: {},
    done: {},
    bookBest: {},
    bookRead: {},
    last: { section: 'lesson', li: 0, i: 0, ci: 0, pi: 0 },
  };

  let store = Object.assign({}, defaults);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      store = Object.assign({}, defaults, parsed || {});
      store.best = Object.assign({}, parsed && parsed.best);
      store.done = Object.assign({}, parsed && parsed.done);
      store.bookBest = Object.assign({}, parsed && parsed.bookBest);
      store.bookRead = Object.assign({}, parsed && parsed.bookRead);
      store.last = Object.assign({}, defaults.last, parsed && parsed.last);
    }
  } catch (err) {
    /* private mode or corrupt data: fall back to defaults */
  }

  /* Debounced save … */
  const save = debounce(writeStore, 120);

  function writeStore() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (err) {
      /* ignore quota / privacy errors */
    }
  }

  /* … plus a hard flush, so closing or hiding the tab never loses a score
     that the debounce window had not reached yet. */
  window.addEventListener('pagehide', writeStore);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) writeStore();
  });

  /* ── The virtual keyboard (built by keyboard.js) ────────────────────── */
  let kb = null;

  function createKeyboard() {
    if (typeof VirtualKeyboard === 'undefined') {
      throw new Error('keyboard.js did not load');
    }
    kb = new VirtualKeyboard(el.keyboard);
  }

  function updateKeyboardNext() {
    if (!kb) return;
    /* highlight() clears first, so a finished run simply drops the hint. */
    kb.highlight(state.target[state.typed.length]);
  }

  function pressKeyFeedback(key) {
    if (kb) kb.press(key);
  }

  /* ── Application state ──────────────────────────────────────────────── */
  const state = {
    section: 'lesson',
    li: 0,
    i: 0,
    ci: 0,
    pi: 0,
    lesson: null,
    level: null,
    bookPart: null,
    bookPage: null,
    lockedView: false,
    target: '',
    typed: '',
    spans: [],
    caretSpan: null,
    mode: 'lesson',
    custom: false,
    started: false,
    finished: false,
    paused: false,
    pausedTotal: 0,
    startTime: 0,
    endTime: 0,
    inserted: 0,
    wrongInserted: 0,
    samples: [],
    lastSampleSecond: -1,
    lastErrCount: 0,
    ticker: 0,
    idleTimer: 0,
    pauseStart: 0,
    baseText: '',
  };

  /* ══════════════════════════════════════════════════════════════════════
   * SIDEBAR
   * ════════════════════════════════════════════════════════════════════ */

  const openLevels = new Set([0]);

  function lessonMatches(lesson, q) {
    if (!q) return true;
    const haystack = [
      lesson.title,
      lesson.tagline,
      lesson.definition,
      (lesson.rules || []).join(' '),
      (lesson.examples || []).map((e) => e.text).join(' '),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(q) !== -1;
  }

  function highlightTitle(title, q) {
    if (!q) return escapeHtml(title);
    const at = title.toLowerCase().indexOf(q);
    if (at === -1) return escapeHtml(title);
    return (
      escapeHtml(title.slice(0, at)) +
      '<mark>' + escapeHtml(title.slice(at, at + q.length)) + '</mark>' +
      escapeHtml(title.slice(at + q.length))
    );
  }

  function renderSidebar() {
    const q = (el.searchInput.value || '').trim().toLowerCase();
    el.levelList.innerHTML = '';
    let shown = 0;

    GRAMMAR_LEVELS.forEach((level, li) => {
      const lessons = level.lessons.filter((lesson) => lessonMatches(lesson, q));
      if (!lessons.length) return;
      shown += lessons.length;

      const wrap = document.createElement('div');
      wrap.className = 'level' + (openLevels.has(li) ? ' is-open' : '');

      const head = document.createElement('button');
      head.type = 'button';
      head.className = 'level-head';
      head.setAttribute('aria-expanded', openLevels.has(li) ? 'true' : 'false');
      head.innerHTML =
        '<span class="level-num">' + escapeHtml(level.icon) + '</span>' +
        '<span class="level-meta"><strong>' + escapeHtml(level.name) + '</strong>' +
        '<small>' + escapeHtml(level.subtitle) + '</small></span>' +
        '<span class="level-count">' + lessons.length + '</span>' +
        '<svg class="level-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
      head.addEventListener('click', () => {
        if (openLevels.has(li)) openLevels.delete(li);
        else openLevels.add(li);
        wrap.classList.toggle('is-open', openLevels.has(li));
        head.setAttribute('aria-expanded', openLevels.has(li) ? 'true' : 'false');
      });

      const body = document.createElement('div');
      body.className = 'level-body';
      const inner = document.createElement('div');
      inner.className = 'level-body-inner';

      lessons.forEach((lesson) => {
        const i = level.lessons.indexOf(lesson);
        const isActive = li === state.li && i === state.i;
        const isDone = !!store.done[lesson.id];
        const best = store.best[lesson.id];

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lesson-btn' + (isActive ? ' is-active' : '') + (isDone ? ' is-done' : '');
        btn.dataset.li = String(li);
        btn.dataset.i = String(i);
        if (isActive) btn.setAttribute('aria-current', 'true');
        btn.innerHTML =
          '<span class="lesson-name"><span>' + highlightTitle(lesson.title, q) + '</span></span>' +
          (best ? '<span class="lesson-best" title="Personal best">' + best.wpm + ' wpm</span>' : '') +
          '<svg class="lesson-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
        btn.addEventListener('click', () => {
          selectLesson(li, i);
          closeSidebar();
        });
        inner.appendChild(btn);
      });

      body.appendChild(inner);
      wrap.appendChild(head);
      wrap.appendChild(body);
      el.levelList.appendChild(wrap);
    });

    const bookShown = renderBookNav(q);

    if (!shown && !bookShown) {
      const empty = document.createElement('p');
      empty.className = 'no-results';
      empty.textContent = 'No topic matches "' + el.searchInput.value.trim() + '".';
      el.levelList.appendChild(empty);
    }

    updateProgressMeter();
  }

  /* ── The CS Handbook in the sidebar ─────────────────────────────────── */

  let bookOpen = true;

  /* Only IDs that still exist in the current curriculum count towards the
     unlock: stale IDs left in localStorage from an older data file must not
     unlock the handbook early (e.g. after a curriculum revision). */
  function lessonsDone() {
    let n = 0;
    for (let k = 0; k < FLAT.length; k++) {
      if (store.done[FLAT[k].lesson.id]) n++;
    }
    return n;
  }

  function bookUnlocked() {
    return TOTAL > 0 && lessonsDone() >= TOTAL;
  }

  function partReadCount(part) {
    let read = 0;
    part.pages.forEach((pageData) => {
      if (store.bookRead[pageData.id]) read++;
    });
    return read;
  }

  function renderBookNav(q) {
    if (!BOOK) return 0;
    const unlocked = bookUnlocked();

    const entries = BOOK.parts
      .map((part, ci) => ({ part: part, ci: ci }))
      .filter((entry) => {
        if (!q) return true;
        const hay = [
          entry.part.title,
          entry.part.subtitle,
          entry.part.summary,
          entry.part.pages.map((p) => p.text + ' ' + p.focus).join(' '),
        ]
          .join(' ')
          .toLowerCase();
        return hay.indexOf(q) !== -1;
      });

    if (!entries.length) return 0;

    const wrap = document.createElement('div');
    wrap.className =
      'level is-book' + (unlocked ? '' : ' is-locked') + (bookOpen ? ' is-open' : '');

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'level-head';
    head.setAttribute('aria-expanded', bookOpen ? 'true' : 'false');
    head.innerHTML =
      '<span class="level-num">' + BOOK_LEVEL_NUM + '</span>' +
      '<span class="level-meta"><strong>' + escapeHtml(BOOK.name) + '</strong>' +
      '<small>' + escapeHtml(BOOK.title) + '</small></span>' +
      '<span class="level-count">' + BOOK_TOTAL + '</span>' +
      (unlocked
        ? '<svg class="level-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>'
        : '<svg class="level-lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>');
    head.addEventListener('click', () => {
      bookOpen = !bookOpen;
      wrap.classList.toggle('is-open', bookOpen);
      head.setAttribute('aria-expanded', bookOpen ? 'true' : 'false');
    });

    const body = document.createElement('div');
    body.className = 'level-body';
    const inner = document.createElement('div');
    inner.className = 'level-body-inner';

    if (!unlocked) {
      const done = lessonsDone();
      const note = document.createElement('div');
      note.className = 'locked-note';
      note.innerHTML =
        '<b>' + done + ' / ' + TOTAL + '</b> lessons done' +
        '<div class="mini-progress-bar"><span style="width:' +
        Math.round((done / TOTAL) * 100) +
        '%"></span></div>' +
        'Finish every lesson to open the handbook.';
      inner.appendChild(note);
    }

    entries.forEach((entry) => {
      const part = entry.part;
      const read = partReadCount(part);
      const complete = read === part.pages.length;
      const isActive = state.section === 'book' && state.ci === entry.ci;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'lesson-btn is-book' +
        (complete ? ' is-done' : '') +
        (isActive ? ' is-active' : '');
      if (isActive) btn.setAttribute('aria-current', 'true');
      btn.innerHTML =
        '<span class="lesson-name"><span>' + highlightTitle(part.title, q) + '</span></span>' +
        '<span class="page-count">' + read + '/' + part.pages.length + '</span>' +
        '<svg class="lesson-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      btn.addEventListener('click', () => {
        const firstUnread = part.pages.findIndex((p) => !store.bookRead[p.id]);
        selectBookPage(entry.ci, firstUnread === -1 ? 0 : firstUnread);
        if (window.innerWidth <= 1024) closeSidebar();
      });
      inner.appendChild(btn);
    });

    body.appendChild(inner);
    wrap.appendChild(head);
    wrap.appendChild(body);
    el.levelList.appendChild(wrap);
    return entries.length;
  }

  function scrollActiveIntoView() {
    const active = el.levelList.querySelector('.lesson-btn.is-active');
    if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest' });
  }

  function updateProgressMeter() {
    const done = lessonsDone();
    const pct = TOTAL ? Math.round((done / TOTAL) * 100) : 0;
    el.progressDone.textContent = String(done);
    el.progressTotal.textContent = String(TOTAL);
    el.sidebarPercent.textContent = pct + '%';
    el.sidebarProgressBar.style.width = pct + '%';

    if (!BOOK) return;
    el.lockedTotal.textContent = String(TOTAL);
    el.lockedCount.textContent = String(done);
    el.lockedLeft.textContent = String(Math.max(0, TOTAL - done));
    el.lockedBar.style.width = pct + '%';
  }

  /* ── Locked panel for The CS Handbook ───────────────────────────────── */

  function showLocked() {
    if (!BOOK) return;
    state.lockedView = true;
    updateProgressMeter();
    el.lockedCard.hidden = false;
    el.resultsCard.hidden = true;
    el.typingCard.hidden = true;
    safe('locked reference', renderReference);
  }

  function hideLocked() {
    state.lockedView = false;
    el.lockedCard.hidden = true;
    el.typingCard.hidden = false;
  }

  /* Header shown when a locked part is previewed. */
  function renderLockedHeader(part) {
    const index = BOOK.parts.indexOf(part);
    el.lessonLevel.textContent = 'Level ' + (LEVEL_COUNT + 1) + ' \u00b7 ' + BOOK.name;
    el.lessonDifficulty.textContent = 'Book';
    el.lessonDifficulty.dataset.level = 'hard';
    el.lessonTitle.textContent = part.title;
    el.lessonTagline.textContent =
      'Part ' + (index + 1) + ' of ' + BOOK.parts.length + ' \u00b7 ' + part.subtitle +
      ' \u00b7 locked';
    el.doneFlagText.textContent = 'Page read';
    el.lessonDone.hidden = true;
    el.statBest.textContent = '\u2014';
    document.title = part.title + ' \u2014 ' + BOOK.name + ' \u2014 TypeCS';
  }

  function firstUnfinishedLesson() {
    for (let n = 0; n < FLAT.length; n++) {
      if (!store.done[FLAT[n].lesson.id]) return FLAT[n];
    }
    return FLAT[0];
  }

  /* ══════════════════════════════════════════════════════════════════════
   * LESSON LOADING
   * ════════════════════════════════════════════════════════════════════ */

  function selectLesson(li, i, opts) {
    const level = GRAMMAR_LEVELS[li];
    if (!level || !level.lessons[i]) return;

    state.section = 'lesson';
    state.li = li;
    state.i = i;
    state.level = level;
    state.lesson = level.lessons[i];
    state.custom = false;

    openLevels.add(li);
    store.last = { section: 'lesson', li: li, i: i, ci: state.ci, pi: state.pi };
    save();

    hideLocked();
    renderLessonHeader();
    renderReference();
    renderBookBar();
    renderSidebar();
    scrollActiveIntoView();
    state.baseText = state.lesson.drill;
    loadForMode(false);
    if (!(opts && opts.keepResults)) hideResults();
  }

  /* ── The CS Handbook: page loading ──────────────────────────────────── */

  function selectBookPage(ci, pi, opts) {
    if (!BOOK) return;
    const part = BOOK.parts[ci];
    if (!part || !part.pages[pi]) return;

    if (!bookUnlocked()) {
      renderLockedHeader(part);
      showLocked();
      toast('The CS Handbook opens when all ' + TOTAL + ' lessons are complete', 'warn');
      return;
    }

    state.section = 'book';
    state.ci = ci;
    state.pi = pi;
    state.bookPart = part;
    state.bookPage = part.pages[pi];
    state.custom = false;

    bookOpen = true;
    store.last = { section: 'book', li: state.li, i: state.i, ci: ci, pi: pi };
    save();

    hideLocked();
    renderLessonHeader();
    renderReference();
    renderBookBar();
    renderSidebar();
    scrollActiveIntoView();
    state.baseText = state.bookPage.text;
    loadForMode(false);
    if (!(opts && opts.keepResults)) hideResults();
  }

  function renderBookBar() {
    const isBook = state.section === 'book';
    el.bookBar.hidden = !isBook;
    if (!isBook) return;

    const part = state.bookPart;
    el.bookBarTitle.textContent =
      'Part ' + (state.ci + 1) + ' of ' + BOOK.parts.length + ' \u00b7 ' + part.title;
    el.pageLabel.textContent = 'Page ' + (state.pi + 1) + ' of ' + part.pages.length;
    el.prevPage.disabled = state.pi === 0;
    el.nextPage.disabled = state.pi === part.pages.length - 1;

    el.pageDots.innerHTML = '';
    part.pages.forEach((pageData, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className =
        'page-dot' +
        (store.bookRead[pageData.id] ? ' is-read' : '') +
        (idx === state.pi ? ' is-current' : '');
      dot.title = 'Page ' + (idx + 1);
      dot.setAttribute('aria-label', 'Go to page ' + (idx + 1));
      dot.addEventListener('click', () => selectBookPage(state.ci, idx));
      el.pageDots.appendChild(dot);
    });
  }

  function renderLessonHeader() {
    if (state.section === 'book' && state.bookPart && state.bookPage) {
      const part = state.bookPart;
      const page = state.bookPage;
      el.lessonLevel.textContent = 'Level ' + (LEVEL_COUNT + 1) + ' \u00b7 ' + BOOK.name;
      el.lessonDifficulty.textContent = 'Book';
      el.lessonDifficulty.dataset.level = 'hard';
      el.lessonTitle.textContent = part.title;
      el.lessonTagline.textContent =
        'Page ' + (state.pi + 1) + ' of ' + part.pages.length + ' \u00b7 ' + part.subtitle;
      el.doneFlagText.textContent = 'Page read';
      el.lessonDone.hidden = !store.bookRead[page.id];
      document.title = part.title + ' \u2014 ' + BOOK.name + ' \u2014 TypeCS';
      updateBestLabel();
      return;
    }

    const lesson = state.lesson;
    const level = state.level;
    el.lessonLevel.textContent = 'Level ' + (state.li + 1) + ' \u00b7 ' + level.name;
    el.lessonDifficulty.textContent = level.difficulty;
    el.lessonDifficulty.dataset.level = level.difficulty.toLowerCase();
    el.lessonTitle.textContent = lesson.title;
    el.lessonTagline.textContent = lesson.tagline;
    el.doneFlagText.textContent = 'Completed';
    el.lessonDone.hidden = !store.done[lesson.id];
    document.title = lesson.title + ' \u2014 TypeCS';
    updateBestLabel();
  }

  function updateBestLabel() {
    const best =
      state.section === 'book' && state.bookPage
        ? store.bookBest[state.bookPage.id]
        : store.best[state.lesson.id];
    el.statBest.textContent = best ? best.wpm + ' wpm' : '\u2014';
  }

  function refBlock(title, hint) {
    const block = document.createElement('div');
    block.className = 'ref-block';
    const head = document.createElement('h3');
    head.textContent = title;
    if (hint) {
      const span = document.createElement('span');
      span.className = 'ref-hint';
      span.textContent = hint;
      head.appendChild(span);
    }
    block.appendChild(head);
    return block;
  }

  function renderReference() {
    el.referenceBody.innerHTML = '';
    if (state.lockedView && BOOK) renderLockedReference();
    else if (state.section === 'book' && state.bookPage) renderBookReference();
    else renderLessonReference();
  }

  /* What The CS Handbook contains, shown while it is still locked. */
  function renderLockedReference() {
    const aboutBlock = refBlock('What is the CS Handbook?');
    const about = document.createElement('p');
    about.textContent = BOOK.blurb;
    aboutBlock.appendChild(about);
    el.referenceBody.appendChild(aboutBlock);

    const partsBlock = refBlock('The parts', BOOK.parts.length + ' parts');
    const list = document.createElement('ul');
    list.className = 'rule-list';
    BOOK.parts.forEach((part) => {
      const li = document.createElement('li');
      li.textContent = part.title + ' (' + part.pages.length + ' pages) \u2014 ' + part.summary;
      list.appendChild(li);
    });
    partsBlock.appendChild(list);
    el.referenceBody.appendChild(partsBlock);

    appendSource();
  }

  /* Lesson view: definition, key concepts, examples, drill. */
  function renderLessonReference() {
    const lesson = state.lesson;

    const defBlock = refBlock('Definition');
    const def = document.createElement('p');
    def.textContent = lesson.definition;
    defBlock.appendChild(def);
    el.referenceBody.appendChild(defBlock);

    const rulesBlock = refBlock('Key concepts');
    const rules = document.createElement('ul');
    rules.className = 'rule-list';
    (lesson.rules || []).forEach((rule) => {
      const li = document.createElement('li');
      li.textContent = rule;
      rules.appendChild(li);
    });
    rulesBlock.appendChild(rules);
    el.referenceBody.appendChild(rulesBlock);

    const exBlock = refBlock('Examples', 'tap one to type it');
    const examples = document.createElement('ul');
    examples.className = 'example-list';
    (lesson.examples || []).forEach((example) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.title = 'Practice this example';
      const text = document.createElement('span');
      text.className = 'ex-text';
      text.textContent = example.text;
      const note = document.createElement('span');
      note.className = 'ex-note';
      note.textContent = example.note;
      btn.appendChild(text);
      btn.appendChild(note);
      btn.addEventListener('click', () => {
        state.baseText = example.text;
        loadForMode(true);
        focusInput();
        toast('Example loaded \u2014 press Tab to repeat it as often as you like', 'ok');
      });
      li.appendChild(btn);
      examples.appendChild(li);
    });
    exBlock.appendChild(examples);
    el.referenceBody.appendChild(exBlock);

    const drillBlock = refBlock('Your drill');
    const drill = document.createElement('p');
    drill.className = 'drill-preview';
    drill.textContent = lesson.drill;
    drillBlock.appendChild(drill);
    el.referenceBody.appendChild(drillBlock);
  }

  /* Handbook view: the focus of the page, the concepts it uses, and the text. */
  function renderBookReference() {
    const part = state.bookPart;
    const page = state.bookPage;

    const focusBlock = refBlock('Page focus');
    const focus = document.createElement('span');
    focus.className = 'page-focus';
    focus.textContent = page.focus;
    focusBlock.appendChild(focus);
    el.referenceBody.appendChild(focusBlock);

    const notesBlock = refBlock('Key concepts on this page', page.notes.length + ' terms');
    const notes = document.createElement('ul');
    notes.className = 'note-list';
    page.notes.forEach((note) => {
      const li = document.createElement('li');
      const term = document.createElement('span');
      term.className = 'note-term';
      term.textContent = note.term;
      const def = document.createElement('span');
      def.className = 'note-def';
      def.textContent = note.definition;
      const ex = document.createElement('span');
      ex.className = 'note-ex';
      ex.textContent = '"' + note.example + '"';
      li.appendChild(term);
      li.appendChild(def);
      li.appendChild(ex);
      notes.appendChild(li);
    });
    notesBlock.appendChild(notes);
    el.referenceBody.appendChild(notesBlock);

    const textBlock = refBlock('Your page', page.text.length + ' characters');
    const preview = document.createElement('p');
    preview.className = 'drill-preview';
    preview.textContent = page.text;
    textBlock.appendChild(preview);
    el.referenceBody.appendChild(textBlock);

    appendSource(part);
  }

  /* Source line, only when the data file actually provides a link. */
  function appendSource(part) {
    const source = document.createElement('p');
    source.className = 'ref-source';
    source.innerHTML =
      (part
        ? 'Part ' + (state.ci + 1) + ' of ' + BOOK.parts.length + ' \u00b7 ' +
          escapeHtml(part.subtitle) + '<br>'
        : '') +
      'From <b>' + escapeHtml(BOOK.title) + '</b> by ' + escapeHtml(BOOK.author) +
      ' (' + BOOK.year + '), ' + escapeHtml(BOOK.source) +
      (BOOK.sourceUrl
        ? '. <a href="' + escapeHtml(BOOK.sourceUrl) + '" target="_blank" rel="noopener">Read the original</a>'
        : '.');
    el.referenceBody.appendChild(source);
  }

  /* ══════════════════════════════════════════════════════════════════════
   * TYPING ENGINE
   * ════════════════════════════════════════════════════════════════════ */

  /* The passage currently being practised: either the lesson drill or an
     example the learner picked from the reference panel. */
  function targetForMode(mode) {
    const base = state.baseText || state.lesson.drill;
    if (mode === 'endurance') return base + ' ' + base + ' ' + base;
    return base;
  }

  function loadForMode(isCustom) {
    state.mode = currentMode();
    loadTarget(targetForMode(state.mode), isCustom);
  }

  function loadTarget(text, isCustom) {
    state.mode = currentMode();
    state.custom = !!isCustom;
    state.target = text;
    state.typed = '';
    state.started = false;
    state.finished = false;
    state.paused = false;
    state.pausedTotal = 0;
    state.startTime = 0;
    state.endTime = 0;
    state.inserted = 0;
    state.wrongInserted = 0;
    state.samples = [];
    state.lastSampleSecond = -1;
    state.lastErrCount = 0;
    stopTicker();

    if (el.typingInput) el.typingInput.value = '';
    el.pausedOverlay.hidden = true;
    el.typingCard.classList.remove('is-started');
    el.typingCard.classList.remove('is-finished');
    el.typingWrap.classList.add('is-idle');
    el.resultsCard.hidden = true;

    buildSpans();
    syncRange(0, state.target.length);
    safe('live stats', resetLiveStats);
    safe('progress bar', updateProgressBar);

    /* Overlay wording follows what is actually loaded: a handbook page, a
       practised example, or a lesson drill. Writing it here means it can
       never be clobbered afterwards by renderLessonHeader(). */
    if (state.section === 'book' && state.bookPage) {
      el.overlayTitle.textContent = 'Click here and type the page';
      el.overlayHint.textContent = 'Key concepts are listed beside the page';
    } else if (isCustom) {
      el.overlayTitle.textContent = 'Click to practice this example';
      el.overlayHint.textContent = 'Press Tab to repeat it as often as you like';
    } else {
      el.overlayTitle.textContent = 'Click here and start typing';
      el.overlayHint.textContent = 'A physical keyboard gives the best experience';
    }
    safe('keyboard guide', updateKeyboardNext);
  }

  function buildSpans() {
    el.typingText.innerHTML = '';
    state.spans = [];
    const frag = document.createDocumentFragment();

    for (let i = 0; i < state.target.length; i++) {
      const span = document.createElement('span');
      span.className = 'c c-pending';
      span.textContent = state.target[i];
      frag.appendChild(span);
      state.spans.push(span);
    }

    const caret = document.createElement('span');
    caret.className = 'c';
    frag.appendChild(caret);
    state.caretSpan = caret;

    el.typingText.appendChild(frag);
  }

  function appendSpans(from, to) {
    const frag = document.createDocumentFragment();
    for (let i = from; i < to; i++) {
      const span = document.createElement('span');
      span.className = 'c c-pending';
      span.textContent = state.target[i];
      frag.appendChild(span);
      state.spans.push(span);
    }
    el.typingText.insertBefore(frag, state.caretSpan);
  }

  function syncChar(i) {
    const span = state.spans[i];
    if (!span) return;
    const target = state.target[i];

    if (i < state.typed.length) {
      const ok = state.typed[i] === target;
      span.textContent = ok ? target : state.typed[i];
      span.className = 'c ' + (ok ? 'c-correct' : 'c-wrong');
    } else {
      span.textContent = target;
      span.className = 'c c-pending';
      if (i === state.typed.length && !state.finished) span.classList.add('c-active');
    }
  }

  function syncRange(from, to) {
    const start = clamp(from, 0, state.spans.length);
    const end = clamp(to, 0, state.spans.length);
    for (let i = start; i < end; i++) syncChar(i);
  }

  function syncCaret() {
    if (state.finished) {
      if (state.caretSpan) state.caretSpan.className = 'c';
      return;
    }
    if (state.caretSpan) {
      state.caretSpan.className = 'c' + (state.typed.length >= state.target.length ? ' c-active' : '');
    }
  }

  function extendTargetIfNeeded() {
    if (state.mode !== '30' && state.mode !== '60') return;
    if (state.typed.length < state.target.length) return;
    if (state.target.length > 6000) return;
    const from = state.target.length;
    state.target += ' ' + (state.baseText || state.lesson.drill);
    appendSpans(from, state.target.length);
    syncRange(from, state.target.length);
  }

  /* ── Measurement ────────────────────────────────────────────────────── */

  function elapsed() {
    if (!state.started) return 0;
    const end = state.finished ? state.endTime : performance.now();
    return Math.max(0, (end - state.startTime - state.pausedTotal) / 1000);
  }

  function computeStats() {
    const n = state.typed.length;
    let correct = 0;
    for (let i = 0; i < n; i++) if (state.typed[i] === state.target[i]) correct++;
    const seconds = elapsed();
    const minutes = seconds / 60;
    /* Ignore the first fraction of a second, where a single character would
       otherwise read as thousands of words per minute. */
    const usable = seconds > 0.25 && minutes > 0;
    const raw = usable ? n / 5 / minutes : 0;
    const wpm = usable ? correct / 5 / minutes : 0;
    const acc = state.inserted ? ((state.inserted - state.wrongInserted) / state.inserted) * 100 : 100;
    return { typed: n, correct: correct, raw: raw, wpm: wpm, acc: clamp(acc, 0, 100), seconds: seconds };
  }

  function consistency() {
    const values = state.samples.map((s) => s.raw).filter((v) => v > 0);
    if (values.length < 2) return 100;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    if (!mean) return 100;
    const variance = values.reduce((a, b) => a + (b - mean) * (b - mean), 0) / values.length;
    const cv = Math.sqrt(variance) / mean;
    return clamp(Math.round((1 - cv) * 100), 0, 100);
  }

  function resetLiveStats() {
    el.statWpm.textContent = '0';
    el.statAcc.textContent = '100%';
    el.statTime.textContent = state.mode === 'lesson' || state.mode === 'endurance' ? '0:00' : formatClock(modeDuration());
    el.statTimerLabel.textContent = state.mode === 'lesson' || state.mode === 'endurance' ? 'time' : 'left';
    el.statErrors.textContent = '0';
    el.statWpm.classList.remove('is-dirty');
    el.statAcc.classList.remove('is-dirty');
  }

  function updateLiveStats() {
    const stats = computeStats();
    el.statWpm.textContent = String(Math.round(stats.wpm));
    el.statAcc.textContent = Math.round(stats.acc) + '%';
    el.statErrors.textContent = String(state.wrongInserted);
    el.statAcc.classList.toggle('is-dirty', stats.acc < 95);
    el.statWpm.classList.toggle('is-dirty', stats.wpm === 0 && state.typed.length > 0);

    if (state.mode === 'lesson' || state.mode === 'endurance') {
      el.statTime.textContent = formatTime(stats.seconds);
      el.statTimerLabel.textContent = 'time';
    } else {
      const left = Math.max(0, modeDuration() - stats.seconds);
      el.statTime.textContent = formatClock(left);
      el.statTimerLabel.textContent = 'left';
    }
  }

  function modeDuration() {
    if (state.mode === '30') return 30;
    if (state.mode === '60') return 60;
    return Infinity;
  }

  function currentMode() {
    const active = el.modeGroup.querySelector('.seg.is-active');
    return active ? active.dataset.mode : 'lesson';
  }

  function updateProgressBar() {
    const span = el.progressBar;
    if (state.mode === '30' || state.mode === '60') {
      const left = Math.max(0, modeDuration() - elapsed());
      span.style.width = (modeDuration() - left) / modeDuration() * 100 + '%';
    } else {
      const pct = state.target.length ? (state.typed.length / state.target.length) * 100 : 0;
      span.style.width = clamp(pct, 0, 100) + '%';
    }
  }

  /* ── Timer ──────────────────────────────────────────────────────────── */

  function startTicker() {
    if (state.ticker) return;
    state.ticker = window.setInterval(tick, 100);
  }
  function stopTicker() {
    if (state.ticker) {
      window.clearInterval(state.ticker);
      state.ticker = 0;
    }
  }

  function tick() {
    if (!state.started || state.finished || state.paused) return;
    const seconds = elapsed();

    if ((state.mode === '30' || state.mode === '60') && seconds >= modeDuration()) {
      finish('time');
      return;
    }

    const whole = Math.floor(seconds);
    if (whole > state.lastSampleSecond && whole > 0) {
      const stats = computeStats();
      const errDelta = state.wrongInserted - state.lastErrCount;
      state.lastErrCount = state.wrongInserted;
      state.samples.push({ t: whole, raw: stats.raw, wpm: stats.wpm, err: errDelta });
      state.lastSampleSecond = whole;
    }

    safe('live stats', updateLiveStats);
    safe('progress bar', updateProgressBar);
  }

  function pause() {
    if (!state.started || state.finished || state.paused) return;
    state.paused = true;
    state.pauseStart = performance.now();
    stopTicker();
  }

  function resume() {
    if (!state.paused) return;
    state.pausedTotal += performance.now() - state.pauseStart;
    state.paused = false;
    startTicker();
  }

  /* ── Input handling ─────────────────────────────────────────────────── */

  function onInput() {
    if (state.finished) {
      el.typingInput.value = state.typed;
      return;
    }

    let value = el.typingInput.value.replace(/[\r\n\t]/g, '');
    if (value.length > state.target.length) value = value.slice(0, state.target.length);

    const before = state.typed.length;
    const after = value.length;

    /* Count keystrokes for accuracy: only insertions count as keystrokes. */
    if (after > before) {
      for (let i = before; i < after; i++) {
        state.inserted++;
        if (value[i] !== state.target[i]) {
          state.wrongInserted++;
          flashError();
          playClick(true);
        } else {
          playClick(false);
        }
      }
    }

    state.typed = value;
    if (el.typingInput.value !== value) el.typingInput.value = value;

    /* When the learner pauses, the caret settles into a gentle pulse. */
    el.typingWrap.classList.remove('is-idle');
    window.clearTimeout(state.idleTimer);
    state.idleTimer = window.setTimeout(() => el.typingWrap.classList.add('is-idle'), 2500);

    syncRange(Math.min(before, after), Math.max(before, after) + 1);
    syncCaret();
    safe('keyboard guide', updateKeyboardNext);

    /* The clock starts on the first character actually inserted, not on a
       stray backspace or a programmatic value reset. */
    if (!state.started && after > before) {
      state.started = true;
      state.startTime = performance.now();
      state.pausedTotal = 0;
      el.typingCard.classList.add('is-started');
      startTicker();
    }

    extendTargetIfNeeded();
    safe('live stats', updateLiveStats);
    safe('progress bar', updateProgressBar);

    if (state.mode === 'lesson' || state.mode === 'endurance') {
      if (state.typed.length >= state.target.length) finish('complete');
    }
  }

  function flashError() {
    el.typingWrap.classList.remove('is-shaking');
    /* force a reflow so the animation can retrigger on rapid errors */
    void el.typingWrap.offsetWidth;
    el.typingWrap.classList.add('is-shaking');
    window.setTimeout(() => el.typingWrap.classList.remove('is-shaking'), 280);
  }

  function onKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      restart();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      el.typingInput.blur();
      applyFocusState(false);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      return;
    }
    updateCapsWarning(event);
    pressKeyFeedback(event.key);
  }

  function updateCapsWarning(event) {
    let on = false;
    if (typeof event.getModifierState === 'function') {
      try { on = event.getModifierState('CapsLock'); } catch (err) { on = false; }
    }
    el.capsWarning.hidden = !on;
  }

  /* ── Finishing ──────────────────────────────────────────────────────── */

  function finish(reason) {
    if (state.finished) return;
    state.finished = true;
    state.endTime = performance.now();
    stopTicker();
    el.typingCard.classList.remove('is-started');
    el.typingCard.classList.add('is-finished');
    el.pausedOverlay.hidden = true;
    syncCaret();
    safe('keyboard guide', updateKeyboardNext);

    const stats = computeStats();
    showResults(stats, reason);
  }

  /* Lesson scoring: personal best, then mastery at 90% accuracy. */
  function scoreLesson(wpm, acc, errors) {
    const id = state.lesson.id;
    const prev = store.best[id];
    const mastered = acc >= 90 && errors / Math.max(1, state.inserted) < 0.1;
    let note = '';

    if (!prev || wpm > prev.wpm) {
      store.best[id] = { wpm: wpm, acc: acc };
      note += prev
        ? 'New personal best for this lesson: <b>' + wpm + ' wpm</b> (was ' + prev.wpm + '). '
        : 'First score recorded: <b>' + wpm + ' wpm</b>. ';
    } else {
      note += 'Personal best stays at <b>' + prev.wpm + ' wpm</b>. ';
    }

    if (mastered && !store.done[id]) {
      store.done[id] = true;
      note += 'Lesson marked complete at ' + acc + '% accuracy. ';
      el.lessonDone.hidden = false;
      toast('Lesson complete \u2014 ' + state.lesson.title, 'ok');
    } else if (!mastered) {
      note += 'Reach <b>90% accuracy</b> to mark this lesson complete. ';
    }

    note +=
      wpm < 30
        ? 'Aim to type the sentence as one smooth phrase rather than word by word. '
        : wpm < 55
          ? 'You can push toward ' + (wpm + 8) + ' wpm while keeping accuracy above 97%. '
          : 'Excellent pace - now make it a habit at this speed. ';

    const tip = (state.lesson.rules && state.lesson.rules[0]) || '';
    if (tip) note += '<br><b>Key concept:</b> ' + escapeHtml(tip);

    save();
    renderSidebar();
    updateBestLabel();
    return note;
  }

  /* Handbook scoring: a best score per page, pages read, and part completion. */
  function scoreBookPage(wpm, acc) {
    const page = state.bookPage;
    const part = state.bookPart;
    let note = '';

    const prev = store.bookBest[page.id];
    if (!prev || wpm > prev.wpm) {
      store.bookBest[page.id] = { wpm: wpm, acc: acc };
      note += prev
        ? 'New best for this page: <b>' + wpm + ' wpm</b> (was ' + prev.wpm + '). '
        : 'Page recorded at <b>' + wpm + ' wpm</b>. ';
    } else {
      note += 'Best for this page stays at <b>' + prev.wpm + ' wpm</b>. ';
    }

    const firstRead = !store.bookRead[page.id];
    store.bookRead[page.id] = true;
    if (firstRead) note += 'Page marked as read. ';

    const read = partReadCount(part);
    if (read === part.pages.length) {
      note +=
        '<b>' + escapeHtml(part.title) + '</b> is finished \u2014 all ' +
        part.pages.length + ' pages read. ';
    } else {
      note += read + ' of ' + part.pages.length + ' pages in this part read. ';
    }

    const firstNote = page.notes && page.notes[0];
    if (firstNote) {
      note +=
        '<br><b>Key concepts on this page:</b> ' + escapeHtml(firstNote.term) + ' \u2014 ' +
        escapeHtml(firstNote.definition);
    }

    save();
    renderSidebar();
    renderBookBar();
    updateBestLabel();
    el.lessonDone.hidden = false;
    return note;
  }

  function showResults(stats, reason) {
    const wpm = Math.round(stats.wpm);
    const acc = Math.round(stats.acc);
    const cons = consistency();
    const errors = state.wrongInserted;
    const isBook = state.section === 'book' && !!state.bookPage;
    const doneBefore = lessonsDone();

    el.resultWpm.textContent = String(wpm);
    el.resultRaw.textContent = String(Math.round(stats.raw));
    el.resultAcc.textContent = acc + '%';
    el.resultErrors.textContent = String(errors);
    el.resultConsistency.textContent = cons + '%';
    el.resultTime.textContent = formatTime(stats.seconds);

    el.resultsEyebrow.textContent =
      reason === 'time'
        ? 'Time is up'
        : isBook
          ? 'Page complete'
          : state.custom
            ? 'Example complete'
            : 'Lesson complete';

    let title;
    if (acc >= 99 && wpm >= 50) title = 'Flawless and fast';
    else if (acc >= 97) title = 'Beautifully clean run';
    else if (acc >= 90) title = 'Solid work';
    else if (acc >= 80) title = 'Good effort - slow down a little';
    else title = 'Accuracy first, speed second';
    el.resultsTitle.textContent = title;

    el.resultsSub.textContent = isBook
      ? 'Page ' + (state.pi + 1) + ' of ' + state.bookPart.pages.length + ' of "' +
        state.bookPart.title + '" typed in ' + formatTime(stats.seconds) + '.'
      : state.custom
        ? 'You practised an example from ' + state.lesson.title + '.'
        : 'You typed the ' + state.lesson.title + ' drill in ' + formatTime(stats.seconds) + '.';

    /* Scoring. Only a passage typed all the way through records a score, so a
       30 or 60 second run can never fake a personal best or a completion. */
    const scored = reason === 'complete';
    let note = '';
    if (!scored) {
      note =
        'A timed run never changes your record. Type the whole passage to save a score' +
        (isBook ? ' and mark the page as read. ' : ' and complete the lesson. ');
      if (isBook) {
        const firstNote = state.bookPage.notes && state.bookPage.notes[0];
        if (firstNote) {
          note += '<br><b>Key concepts on this page:</b> ' + escapeHtml(firstNote.term) + ' \u2014 ' +
            escapeHtml(firstNote.definition);
        }
      } else if (!state.custom) {
        const tip = (state.lesson.rules && state.lesson.rules[0]) || '';
        if (tip) note += '<br><b>Key concept:</b> ' + escapeHtml(tip);
      }
    } else if (isBook) {
      note = scoreBookPage(wpm, acc);
    } else if (!state.custom) {
      note = scoreLesson(wpm, acc, errors);
    } else {
      note = 'Example practice is not scored, so your lesson record stays untouched. ';
      note += '<b>Key concept:</b> ' + escapeHtml((state.lesson.rules && state.lesson.rules[0]) || '');
    }

    /* The moment the whole curriculum is finished, the handbook opens. */
    const justUnlocked = lessonsDone() > doneBefore && lessonsDone() >= TOTAL;
    if (justUnlocked) {
      toast('The CS Handbook is unlocked \u2014 it is open in the sidebar', 'ok');
      note +=
        '<br><b>The CS Handbook is open.</b> Every lesson is complete, so the handbook pages are now ' +
        'waiting for you in the sidebar.';
    }

    el.resultsNote.innerHTML = note;

    /* What comes next */
    let hasNext = false;
    let label = 'Next lesson';
    if (isBook) {
      const morePages = state.pi + 1 < state.bookPart.pages.length;
      const moreParts = state.ci + 1 < BOOK.parts.length;
      hasNext = morePages || moreParts;
      label = morePages ? 'Next page' : moreParts ? 'Next part' : 'All pages read';
    } else {
      const pos = FLAT.findIndex((f) => f.li === state.li && f.i === state.i);
      hasNext = pos !== -1 && pos + 1 < FLAT.length;
    }
    el.nextLabel.textContent = label;
    el.nextBtn.disabled = !hasNext;
    el.nextBtn.style.opacity = hasNext ? '' : '.5';
    el.nextBtn.style.pointerEvents = hasNext ? '' : 'none';
    el.nextBtn.title = hasNext
      ? ''
      : isBook
        ? 'That was the last page of the handbook'
        : 'You reached the end of the curriculum';

    el.resultsCard.hidden = false;
    safe('chart', () => drawChart(true));
    el.resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideResults() {
    el.resultsCard.hidden = true;
  }

  /* ── Restart ────────────────────────────────────────────────────────── */

  function restart() {
    loadForMode(state.custom);
    focusInput();
  }

  function setMode(mode) {
    state.mode = mode;
    Array.prototype.forEach.call(el.modeGroup.querySelectorAll('.seg'), (b) => {
      const active = b.dataset.mode === mode;
      b.classList.toggle('is-active', active);
      /* Keep the ARIA state in sync so screen readers announce the change. */
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    loadForMode(state.custom);
    focusInput();
  }

  function nextLesson() {
    if (state.section === 'book' && state.bookPart) {
      const part = state.bookPart;
      if (state.pi + 1 < part.pages.length) {
        selectBookPage(state.ci, state.pi + 1);
        focusInput();
        return;
      }
      if (state.ci + 1 < BOOK.parts.length) {
        selectBookPage(state.ci + 1, 0);
        focusInput();
        return;
      }
      toast('That was the last page of the handbook \u2014 beautifully done', 'ok');
      return;
    }

    const pos = FLAT.findIndex((f) => f.li === state.li && f.i === state.i);
    if (pos === -1 || pos + 1 >= FLAT.length) return;
    const next = FLAT[pos + 1];
    selectLesson(next.li, next.i);
    focusInput();
  }

  /* ══════════════════════════════════════════════════════════════════════
   * RESULTS CHART
   * ════════════════════════════════════════════════════════════════════ */

  function cssVar(name) {
    return getComputedStyle(el.html).getPropertyValue(name).trim() || '#888';
  }

  function drawChart(animate) {
    const canvas = el.chart;
    if (!canvas || canvas.offsetParent === null) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const host = canvas.parentElement;
    const width = Math.max(280, host.clientWidth || 600);
    const height = 190;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const pad = { l: 40, r: 12, t: 14, b: 24 };
    const plotW = width - pad.l - pad.r;
    const plotH = height - pad.t - pad.b;

    const samples = state.samples.length ? state.samples : [{ t: 1, raw: 0, wpm: 0, err: 0 }];
    const maxValue = Math.max(10, Math.ceil(Math.max.apply(null, samples.map((s) => Math.max(s.raw, s.wpm))) / 10) * 10);

    const line = cssVar('--line');
    const textFaint = cssVar('--text-faint');
    const accent = cssVar('--accent-2');
    const wrong = cssVar('--wrong');

    /* grid */
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = textFaint;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let g = 0; g <= 4; g++) {
      const value = (maxValue / 4) * g;
      const y = pad.t + plotH - (g / 4) * plotH;
      ctx.beginPath();
      ctx.moveTo(pad.l, Math.round(y) + 0.5);
      ctx.lineTo(pad.l + plotW, Math.round(y) + 0.5);
      ctx.stroke();
      ctx.fillText(String(Math.round(value)), pad.l - 8, y);
    }

    const n = samples.length;
    const xAt = (index) => (n <= 1 ? pad.l + plotW / 2 : pad.l + (index / (n - 1)) * plotW);
    const yAt = (value) => pad.t + plotH - clamp(value / maxValue, 0, 1) * plotH;

    /* per-second errors as small red bars */
    ctx.fillStyle = wrong;
    const maxErr = Math.max(1, Math.max.apply(null, samples.map((s) => s.err)));
    samples.forEach((s, index) => {
      if (!s.err) return;
      const barH = clamp((s.err / maxErr) * 22, 3, 24);
      ctx.globalAlpha = 0.5;
      ctx.fillRect(xAt(index) - 1.5, pad.t + plotH - barH, 3, barH);
      ctx.globalAlpha = 1;
    });

    const drawLine = (key, color, dashed) => {
      ctx.beginPath();
      samples.forEach((s, index) => {
        const x = xAt(index);
        const y = yAt(s[key]);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.setLineDash(dashed ? [4, 4] : []);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    /* soft fill under the wpm line */
    ctx.beginPath();
    samples.forEach((s, index) => {
      const x = xAt(index);
      const y = yAt(s.wpm);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(xAt(n - 1), pad.t + plotH);
    ctx.lineTo(xAt(0), pad.t + plotH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + plotH);
    grad.addColorStop(0, hexToRgba(accent, 0.28));
    grad.addColorStop(1, hexToRgba(accent, 0));
    ctx.fillStyle = grad;
    ctx.fill();

    drawLine('raw', textFaint, true);
    drawLine('wpm', accent, false);

    /* mark the final value so a one-second run is still readable */
    ctx.beginPath();
    ctx.arc(xAt(n - 1), yAt(samples[n - 1].wpm), 3.4, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();

    /* x axis labels */
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = textFaint;
    const step = Math.max(1, Math.ceil(n / 8));
    samples.forEach((s, index) => {
      if (index % step !== 0 && index !== n - 1) return;
      ctx.fillText(s.t + 's', xAt(index), pad.t + plotH + 7);
    });

    if (animate) {
      canvas.style.transition = 'none';
      canvas.style.opacity = '0';
      requestAnimationFrame(() => {
        canvas.style.transition = 'opacity 420ms ease';
        canvas.style.opacity = '1';
      });
    }
  }

  function hexToRgba(color, alpha) {
    const m = String(color).trim();
    if (m.charAt(0) === '#') {
      let hex = m.slice(1);
      if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
      const num = parseInt(hex, 16);
      if (!isNaN(num)) {
        return 'rgba(' + ((num >> 16) & 255) + ',' + ((num >> 8) & 255) + ',' + (num & 255) + ',' + alpha + ')';
      }
    }
    const rgb = m.match(/rgba?\(([^)]+)\)/);
    if (rgb) {
      const parts = rgb[1].split(',').map((p) => p.trim());
      return 'rgba(' + parts[0] + ',' + parts[1] + ',' + parts[2] + ',' + alpha + ')';
    }
    return 'rgba(99,102,241,' + alpha + ')';
  }

  /* ══════════════════════════════════════════════════════════════════════
   * UI PLUMBING
   * ════════════════════════════════════════════════════════════════════ */

  function toast(message, kind) {
    const node = document.createElement('div');
    node.className = 'toast ' + (kind || 'ok');
    const icon =
      kind === 'warn'
        ? '<svg viewBox="0 0 24 24"><path d="M12 8v5M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>';
    node.innerHTML = icon + '<span>' + escapeHtml(message) + '</span>';
    el.toastStack.appendChild(node);
    window.setTimeout(() => {
      node.classList.add('is-out');
      window.setTimeout(() => node.remove(), 220);
    }, 3000);
  }

  function focusInput() {
    if (!el.typingInput) return;
    try {
      el.typingInput.focus({ preventScroll: true });
    } catch (err) {
      el.typingInput.focus();
    }
    /* Reflect the focused state immediately instead of waiting for the focus
       event, which some embedded webviews deliver late or not at all. */
    applyFocusState(true);
  }

  function applyFocusState(focused) {
    el.typingCard.classList.toggle('is-focused', focused);
    el.typingWrap.classList.toggle('is-focused', focused);
    if (!focused) {
      if (state.started && !state.finished) {
        pause();
        el.pausedOverlay.hidden = false;
      }
    } else {
      resume();
      el.pausedOverlay.hidden = true;
    }
  }

  function openSidebar() {
    el.sidebar.classList.add('is-open');
    el.backdrop.hidden = false;
    el.menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    el.sidebar.classList.remove('is-open');
    el.backdrop.hidden = true;
    el.menuToggle.setAttribute('aria-expanded', 'false');
  }

  function applyTheme(theme) {
    el.html.setAttribute('data-theme', theme);
    store.theme = theme;
    save();
    if (!el.resultsCard.hidden) window.setTimeout(() => drawChart(false), 30);
  }

  function applyKeyboardVisibility(visible) {
    el.keyboard.hidden = !visible;
    el.keyboardLegend.hidden = !visible;
    el.keyboardToggle.setAttribute('aria-pressed', visible ? 'true' : 'false');
    store.keyboard = visible;
    save();
  }

  function applySound(enabled) {
    el.soundToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    store.sound = enabled;
    save();
  }

  function applyReference(open) {
    el.refCard.classList.toggle('is-collapsed', !open);
    el.refToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    store.refOpen = open;
    save();
  }

  /* ── Sound ──────────────────────────────────────────────────────────── */

  let audioCtx = null;
  function playClick(wrong) {
    if (!store.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = wrong ? 180 : 720;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(wrong ? 0.06 : 0.03, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + (wrong ? 0.13 : 0.05));
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } catch (err) {
      /* sound is optional - never break typing because of it */
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
   * WIRING
   * ════════════════════════════════════════════════════════════════════ */

  function wireEvents() {
    /* Typing surface */
    el.typingWrap.addEventListener('mousedown', (event) => {
      event.preventDefault();
      focusInput();
    });
    el.typingWrap.addEventListener('touchstart', () => focusInput(), { passive: true });
    el.typingInput.addEventListener('input', onInput);
    el.typingInput.addEventListener('keydown', onKeyDown);
    el.typingInput.addEventListener('focus', () => applyFocusState(true));
    el.typingInput.addEventListener('blur', () => applyFocusState(false));
    el.typingInput.addEventListener('paste', (e) => {
      e.preventDefault();
      toast('Pasting is disabled - this is a typing trainer', 'warn');
    });
    el.typingInput.addEventListener('drop', (e) => e.preventDefault());

    /* Toolbar */
    el.modeGroup.addEventListener('click', (event) => {
      const btn = event.target.closest('.seg');
      if (!btn) return;
      setMode(btn.dataset.mode);
    });
    el.restartBtn.addEventListener('click', () => restart());
    el.retryBtn.addEventListener('click', () => {
      hideResults();
      restart();
    });
    el.nextBtn.addEventListener('click', () => nextLesson());

    /* The CS Handbook */
    el.prevPage.addEventListener('click', () => {
      if (state.section === 'book' && state.pi > 0) {
        selectBookPage(state.ci, state.pi - 1);
        focusInput();
      }
    });
    el.nextPage.addEventListener('click', () => {
      if (state.section === 'book' && state.pi + 1 < state.bookPart.pages.length) {
        selectBookPage(state.ci, state.pi + 1);
        focusInput();
      }
    });
    el.lockedCta.addEventListener('click', () => {
      const target = firstUnfinishedLesson();
      selectLesson(target.li, target.i);
      focusInput();
      toast(lessonsDone() + ' of ' + TOTAL + ' lessons complete \u2014 keep going', 'warn');
    });

    /* Sidebar */
    el.searchInput.addEventListener('input', () => {
      el.searchClear.hidden = !el.searchInput.value;
      renderSidebar();
    });
    el.searchClear.addEventListener('click', () => {
      el.searchInput.value = '';
      el.searchClear.hidden = true;
      renderSidebar();
      el.searchInput.focus();
    });
    el.menuToggle.addEventListener('click', () => {
      if (el.sidebar.classList.contains('is-open')) closeSidebar();
      else openSidebar();
    });
    el.backdrop.addEventListener('click', closeSidebar);
    el.sidebar.addEventListener('click', (event) => {
      if (event.target.closest('.lesson-btn') && window.innerWidth <= 1024) closeSidebar();
    });

    /* Prefs */
    el.themeToggle.addEventListener('click', () => {
      applyTheme(el.html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    el.keyboardToggle.addEventListener('click', () => applyKeyboardVisibility(el.keyboard.hidden));
    el.soundToggle.addEventListener('click', () => {
      applySound(!store.sound);
      if (store.sound) playClick(false);
    });
    el.refToggle.addEventListener('click', () => applyReference(el.refCard.classList.contains('is-collapsed')));
    el.resetProgress.addEventListener('click', () => {
      const ok = window.confirm('Reset every score and completed lesson? This cannot be undone.');
      if (!ok) return;
      store.best = {};
      store.done = {};
      store.bookBest = {};
      store.bookRead = {};
      save();
      el.lessonDone.hidden = true;
      if (state.section === 'book') {
        selectLesson(0, 0);
      } else {
        updateBestLabel();
        renderSidebar();
        renderBookBar();
      }
      updateProgressMeter();
      toast('Progress reset \u2014 the handbook is locked again', 'warn');
    });
    el.brandLink.addEventListener('click', (event) => {
      event.preventDefault();
      selectLesson(0, 0);
      focusInput();
    });

    /* Global keys (work even when the textarea lost focus by accident) */
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || document.activeElement === el.typingInput) return;
      const target = event.target;
      const insideControl =
        target && typeof target.closest === 'function' &&
        target.closest('input, textarea, button, a, select, [contenteditable]');
      if (insideControl) return;
      event.preventDefault();
      focusInput();
      restart();
    });

    /* Pause when the tab or the window loses visibility */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state.started && !state.finished) {
        pause();
        el.pausedOverlay.hidden = false;
      } else if (!document.hidden && document.activeElement === el.typingInput) {
        resume();
        el.pausedOverlay.hidden = true;
      }
    });

    /* Redraw the chart when the layout changes */
    window.addEventListener('resize', debounce(() => {
      if (!el.resultsCard.hidden) drawChart(false);
      if (window.innerWidth > 1024) closeSidebar();
    }, 150));
  }

  /* ══════════════════════════════════════════════════════════════════════
   * BOOT
   * ════════════════════════════════════════════════════════════════════ */

  function boot() {
    el.progressTotal.textContent = String(TOTAL);
    el.searchInput.placeholder =
      'Search ' + TOTAL + ' lessons' + (BOOK ? ' and the handbook' : '') + '\u2026';

    applyTheme(store.theme === 'light' ? 'light' : 'dark');
    applyKeyboardVisibility(store.keyboard !== false);
    applySound(!!store.sound);
    applyReference(store.refOpen !== false);

    safe('keyboard build', createKeyboard);
    wireEvents();

    const last = store.last || {};
    const canOpenBook =
      last.section === 'book' && bookUnlocked() && BOOK &&
      BOOK.parts[last.ci] && BOOK.parts[last.ci].pages[last.pi];

    if (canOpenBook) {
      safe('last handbook page', () => selectBookPage(last.ci, last.pi));
    } else {
      const li = GRAMMAR_LEVELS[last.li] ? last.li : 0;
      const i = GRAMMAR_LEVELS[li].lessons[last.i] ? last.i : 0;
      safe('first lesson', () => selectLesson(li, i));
    }

    /* The active level should be expanded, but the sidebar must not be
       scrolled away from the top on first paint. */
    window.setTimeout(scrollActiveIntoView, 60);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();