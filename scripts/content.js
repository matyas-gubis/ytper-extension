// document.body.style.backgroundColor = 'red'
let keyboard = document.getElementById('Y-keyboard');
let originalKeymap = 'qwertyuiopasdfghjklzxcvbnm';
let mappedKeymap = '';
let keymapIndex = 0;
let stage = 1;
let fruit = document.getElementById('fruit').textContent;
let shouldSolve = false;
let BACKSPACE_DELAY = 50;
let MIN_SEND_DELAY = 100;
let MAX_SEND_DELAY = 600;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender);
  if (request.action === 'switchKeyboard') {
    handleKeyboardVisibilitySwitch();
    sendResponse(keyboard.hidden);
  }
  if (request.action === 'mapKeys') {
    mapKeys();
  }
  if (request.action === 'solve') {
    handleSolve();
  }
});

if (localStorage.getItem('keyboardVisible') === 'true') {
  keyboard ? (keyboard.hidden = true) : createKeyboard();
}

const socket = io();

socket.on('update_word', ({ current_word }) => {
  handleReceivedWord(current_word);
});

socket.on('stage_success', ({ next_stage, next_fruit }) => {
  stage = next_stage;
  fruit = next_fruit;
  mappedKeymap = '';
  keymapIndex = 0;
});

function handleReceivedWord(receivedWord) {
  // console.log('update_word', receivedWord, keymapIndex, receivedWord.length, mappedKeymap, mappedKeymap.length);
  if (keymapIndex < 3 && receivedWord.length === 9) {
    mappedKeymap += receivedWord;
    console.log(`letters '${mappedKeymap}' mapped`);
    setTimeout(() => {
      keymapIndex++;
      console.log('mapping keys', keymapIndex);
      mapKeys();
    }, (1 + receivedWord.length) * BACKSPACE_DELAY);
    deleteWord(receivedWord);
  } else if (keymapIndex === 2 && receivedWord.length === 8) {
    deleteWord(receivedWord);
    mappedKeymap += receivedWord;
    keymapIndex++;
    console.log('keyboard fully mapped');
    originalKeymap.split('').forEach((letter, i) => {
      document.getElementById(`Y-keycap-${letter}`).textContent = mappedKeymap.charAt(i);
    });
  } else if (
    keymapIndex >= 3 &&
    shouldSolve &&
    mappedKeymap.length !== originalKeymap.length &&
    receivedWord.length !== 0 &&
    fruit.slice(0, receivedWord.length) !== receivedWord
  ) {
    console.log('remove:', receivedWord);
    setTimeout(() => {
      sendLetter('backspace');
    }, BACKSPACE_DELAY);
  } else if (shouldSolve && receivedWord.length === 0 && mappedKeymap.length === originalKeymap.length) {
    console.log(
      'send solution:',
      fruit,
      fruit
        .split('')
        .map((l) => mappedKeymap.charAt(originalKeymap.indexOf(l)))
        .join('')
    );
    sendSolution();
  }
}

function sendSolution() {
  let previousDelay = getDelay();
  fruit.split('').forEach((letter, i) => {
    setTimeout(() => {
      console.log('sending letter', letter);
      sendLetter(originalKeymap.charAt(mappedKeymap.indexOf(letter)));
    }, previousDelay);
    previousDelay += getDelay();
  });
}

function mapKeys() {
  let lastDelay = MIN_SEND_DELAY;
  originalKeymap
    .slice(keymapIndex * 9, keymapIndex * 9 + 9)
    .split('')
    .forEach((letter) => {
      setTimeout(() => {
        sendLetter(letter);
      }, lastDelay);
      lastDelay += getDelay();
    });
}

function handleKeyboardVisibilitySwitch() {
  if (!keyboard) {
    createKeyboard();
    localStorage.setItem('keyboardVisible', 'true');
  } else {
    keyboard.hidden = !keyboard.hidden;
    localStorage.setItem('keyboardVisible', !keyboard.hidden + '');
  }
}

function createKeyboard() {
  const kb = document.createElement('div');
  kb.classList.add('Y-keyboard', 'Y-base');
  kb.id = 'Y-keyboard';
  document.body.appendChild(kb);
  ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].forEach((row, rowindex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('Y-keyboard-row', 'Y-base');
    row.split('').forEach((letter) => {
      const button = document.createElement('div');
      button.classList.add('Y-keycap', 'Y-base');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      span1.textContent = letter;
      span1.classList.add('small');
      span2.id = `Y-keycap-${letter}`;
      span2.textContent = letter;
      button.appendChild(span1);
      button.appendChild(span2);
      rowElement.appendChild(button);
    });
    kb.appendChild(rowElement);
  });
  keyboard = document.getElementById('Y-keyboard');
}

function handleSolve() {
  console.log('solve');
  shouldSolve = true;
  if (mappedKeymap.length === originalKeymap.length) {
    sendSolution();
  } else {
    mapKeys();
  }
}

function getDelay() {
  return Math.floor(Math.random() * MAX_SEND_DELAY - MIN_SEND_DELAY) + MIN_SEND_DELAY;
}

function sendLetter(letter) {
  socket.emit('character_input', {
    char: letter,
    stage: stage,
  });
}

function deleteWord(current_word) {
  current_word.split('').forEach((_, i) => {
    setTimeout(() => {
      sendLetter('backspace');
    }, i * BACKSPACE_DELAY);
  });
}
