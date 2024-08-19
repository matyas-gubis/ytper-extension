// document.body.style.backgroundColor = 'red'
let keyboard = document.getElementById('Y-keyboard');
let originalKeymap = 'qwertyuiopasdfghjklzxcvbnm';
let mappedKeymap = '';
let keymapIndex = 0;
let stage = 1;
let fruit = document.getElementById('fruit').value;

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
  handleMapping(current_word);
});

socket.on('stage_success', ({ next_stage, next_fruit }) => {
  stage = next_stage;
  fruit = next_fruit;
  mappedKeymap = '';
  keymapIndex = 0;
});

function handleMapping(current_word) {
  console.log('update_word', current_word, keymapIndex, current_word.length, mappedKeymap, mappedKeymap.length);
  if (keymapIndex < 3 && current_word.length === 9) {
    mappedKeymap += current_word;
    setTimeout(() => {
      keymapIndex++;
      console.log('mapping keys', keymapIndex);
      mapKeys();
    }, (1 + current_word.length) * 10);
    deleteWord(current_word);
  } else if (keymapIndex === 2 && current_word.length === 8) {
    deleteWord(current_word);
    mappedKeymap += current_word;
    keymapIndex++;
    console.log('keyboard fully mapped');
    originalKeymap.split('').forEach((letter, i) => {
      document.getElementById(`Y-keycap-${letter}`).textContent = mappedKeymap.charAt(i);
    });
  }
}

function deleteWord(current_word) {
  current_word.split('').forEach((_, i) => {
    setTimeout(() => {
      sendLetter('backspace');
    }, i * 10);
  });
}

function mapKeys() {
  let lastDelay = 100;
  originalKeymap
    .slice(keymapIndex * 9, keymapIndex * 9 + 9)
    .split('')
    .forEach((letter) => {
      setTimeout(() => {
        sendLetter(letter);
      }, lastDelay);
      lastDelay += Math.floor(Math.random() * 100) + 100;
    });
}
function sendLetter(letter) {
  socket.emit('character_input', {
    char: letter,
    stage: stage,
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
  if (mappedKeymap.length === originalKeymap.length) {
    fruit.split('').forEach((letter) => sendLetter(originalKeymap.indexOf(mappedKeymap.indexOf(letter))));
  } else {
    mapKeys();
  }
}
