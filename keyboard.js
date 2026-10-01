/* ============================================================
   Reusable Virtual Keyboard
   Extracted from the original app.js and now loaded by index.html
   before app.js (it exposes the global `VirtualKeyboard` class).
   ============================================================ */

const KB_ROWS = [
  {
    offset: 2,
    keys: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  },
  {
    offset: 2,
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  },
  {
    offset: 3,
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  },
  {
    offset: 5,
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    shifts: true,
  },
];

const SHIFT_MAP = {
  '`': '~',
  '1': '!',
  '2': '@',
  '3': '#',
  '4': '$',
  '5': '%',
  '6': '^',
  '7': '&',
  '8': '*',
  '9': '(',
  '0': ')',
  '-': '_',
  '=': '+',
  '[': '{',
  ']': '}',
  '\\': '|',
  ';': ':',
  "'": '"',
  ',': '<',
  '.': '>',
  '/': '?',
};

const FINGER = {
  '`': 'pinky',
  '1': 'pinky',
  q: 'pinky',
  a: 'pinky',
  z: 'pinky',

  '2': 'ring',
  w: 'ring',
  s: 'ring',
  x: 'ring',

  '3': 'middle',
  e: 'middle',
  d: 'middle',
  c: 'middle',

  '4': 'index',
  '5': 'index',
  r: 'index',
  t: 'index',
  f: 'index',
  g: 'index',
  v: 'index',
  b: 'index',

  '6': 'index',
  '7': 'index',
  y: 'index',
  u: 'index',
  h: 'index',
  j: 'index',
  n: 'index',
  m: 'index',

  '8': 'middle',
  i: 'middle',
  k: 'middle',
  ',': 'middle',

  '9': 'ring',
  o: 'ring',
  l: 'ring',
  '.': 'ring',

  '0': 'pinky',
  '-': 'pinky',
  '=': 'pinky',
  p: 'pinky',
  '[': 'pinky',
  ']': 'pinky',
  '\\': 'pinky',
  ';': 'pinky',
  "'": 'pinky',
  '/': 'pinky',

  ' ': 'thumb',
  shift: 'pinky',
};

const LEFT_HAND = new Set('`12345qwertasdfgzxcvb'.split(''));

const CHAR_KEY = new Map();

KB_ROWS.forEach((row) => {
  row.keys.forEach((key) => {
    // Normal key
    CHAR_KEY.set(key, {
      key,
      shift: false,
    });

    // Shifted symbol
    if (SHIFT_MAP[key]) {
      CHAR_KEY.set(SHIFT_MAP[key], {
        key,
        shift: true,
      });
    }

    // Uppercase letters
    if (/^[a-z]$/.test(key)) {
      CHAR_KEY.set(key.toUpperCase(), {
        key,
        shift: true,
      });
    }
  });
});

// Space
CHAR_KEY.set(' ', {
  key: ' ',
  shift: false,
});


/* ============================================================
   Virtual Keyboard Class
   ============================================================ */

class VirtualKeyboard {
  constructor(container) {
    if (!container) {
      throw new Error('VirtualKeyboard: container is required');
    }

    this.container = container;

    this.keyEls = new Map();

    this.shiftEls = {
      left: null,
      right: null,
    };

    this.build();
  }


  /* ----------------------------------------------------------
     Build keyboard
     ---------------------------------------------------------- */

  build() {
    this.container.innerHTML = '';

    this.keyEls.clear();

    this.shiftEls = {
      left: null,
      right: null,
    };

    KB_ROWS.forEach((row) => {
      // Add Shift keys on bottom row
      if (row.shifts) {
        const leftShift = this.makeKey('shift', 1, 3, 'shift');

        const rightShift = this.makeKey('shift', 26, 3, 'shift');

        this.shiftEls.left = leftShift;
        this.shiftEls.right = rightShift;
      }

      // Add normal keys
      row.keys.forEach((key, index) => {
        const start = row.offset + 1 + index * 2;

        this.makeKey(key, start, 2, FINGER[key] || 'index');
      });
    });

    // Space
    const space = document.createElement('div');

    space.className = 'key';
    space.dataset.finger = 'thumb';
    space.style.gridColumn = '9 / span 14';
    space.textContent = 'space';

    this.container.appendChild(space);

    this.keyEls.set(' ', space);
  }


  /* ----------------------------------------------------------
     Create one key
     ---------------------------------------------------------- */

  makeKey(label, start, span, finger) {
    const node = document.createElement('div');

    node.className = 'key';

    node.dataset.finger = finger;

    // "start / span N" so the CSS grid places the key in its column.
    node.style.gridColumn = start + ' / span ' + span;

    node.textContent = label === 'shift' ? '⇧' : label;

    this.container.appendChild(node);

    if (label !== 'shift') {
      this.keyEls.set(label, node);
    }

    return node;
  }


  /* ----------------------------------------------------------
     Highlight a character
     ---------------------------------------------------------- */

  highlight(char) {
    // Always clear first: char may be undefined once the run is finished.
    this.clearNext();

    const info = CHAR_KEY.get(char);

    if (!info) {
      return;
    }

    // Highlight actual key
    const key = this.keyEls.get(info.key);

    if (key) {
      key.classList.add('is-next');
    }

    // Highlight opposite-hand Shift
    if (info.shift) {
      const oppositeShift = LEFT_HAND.has(info.key)
        ? this.shiftEls.right
        : this.shiftEls.left;

      if (oppositeShift) {
        oppositeShift.classList.add('is-next');
      }
    }
  }


  /* ----------------------------------------------------------
     Clear "next key" highlighting
     ---------------------------------------------------------- */

  clearNext() {
    this.keyEls.forEach((node) => {
      node.classList.remove('is-next');
    });

    if (this.shiftEls.left) {
      this.shiftEls.left.classList.remove('is-next');
    }

    if (this.shiftEls.right) {
      this.shiftEls.right.classList.remove('is-next');
    }
  }


  /* ----------------------------------------------------------
     Show a physical keypress

     Each key clears itself with its own timer, so a stuck highlight
     is impossible even when keys are pressed faster than 110ms.
     ---------------------------------------------------------- */

  press(char) {
    const info = CHAR_KEY.get(char);

    if (!info) {
      return;
    }

    const key = this.keyEls.get(info.key);

    if (!key) {
      return;
    }

    key.classList.add('is-pressed');

    window.clearTimeout(key._pressTimer);
    key._pressTimer = window.setTimeout(() => {
      key.classList.remove('is-pressed');
      key._pressTimer = 0;
    }, 110);
  }


  /* ----------------------------------------------------------
     Handle a real keyboard event
     ---------------------------------------------------------- */

  handleKeyDown(event) {
    this.press(event.key);
  }
}