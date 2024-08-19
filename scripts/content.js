// document.body.style.backgroundColor = 'red'
let keyboard = document.getElementById("Y-keyboard");
let isKeyboardVisible = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender);
  if (request.action === "switchKeyboard") {
    handleKeyboardVisibilitySwitch();
  }
  console.log(request, sender);
  if(request.action === 'mapKeys'){
    mapKeys()
  }
});

function handleKeyboardVisibilitySwitch() {
  if (!keyboard) {
    createKeyboard();
  } else {
    keyboard.hidden = !keyboard.hidden;
  }
}

function createKeyboard() {
  const kb = document.createElement("div");
  kb.classList.add("Y-keyboard", "Y-base");
  kb.id = "Y-keyboard";
  document.body.appendChild(kb);
  ["qwertyuiop", "asdfghjkl", "zxcvbnm"].forEach((row, rowindex) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("Y-keyboard-row", "Y-base");
    row.split("").forEach((letter) => {
      const button = document.createElement("div");
      button.id = `Y-keycap-${letter}`;
      button.classList.add("Y-keycap", "Y-base");
      button.textContent = letter;
      rowElement.appendChild(button);
    });
    kb.appendChild(rowElement);
  });
  keyboard = document.getElementById("Y-keyboard");
}


const socket = io();

let originalKeymap = 'qwertyuiopasdfghjklzxcvbnm'
let mappedKeymap = ''
let keymapIndex = 0;
let stage = 1;

socket.on('update_word', ({current_word})=> {
    if(keymapIndex < 3 && current_word.length === 9){
        mappedKeymap += current_word;
        current_word.split("").forEach(letter => {
            socket.emit('character_input'), {
                char: 'backspace',
                stage: stage
            }
        });
    }
})

function mapKeys(){
    let lastDelay = 0;
    originalKeymap.slice(keymapIndex*9, 9).split('').forEach(letter => {
        setTimeout(()=>{
            socket.emit('character_input', {
                char: letter,
                stage: stage
            })
            lastDelay += Math.floor(Math.random()*300)+ 300
        }, lastDelay)
    });
}