const showKeyboardBtn = document.getElementById('showkeyboard');
const mapKeysBtn = document.getElementById('mapkeys');
const solveBtn = document.getElementById('solve');

showKeyboardBtn.addEventListener('click', handleShowKeyboardClicked);
mapKeysBtn.addEventListener('click', handleMapkeysClicked);
solveBtn.addEventListener('click', handleSolveClicked);

mapKeysBtn.hidden = localStorage.getItem('keyboardVisible') ? true : false;

async function handleShowKeyboardClicked(e) {
  const [tab] = await chrome.tabs.query({ active: true });
  const response = await chrome.tabs.sendMessage(tab.id, { action: 'switchKeyboard' });
  if (response) {
    showKeyboardBtn.textContent = 'Show keyboard';
    mapKeysBtn.hidden = true;
  } else {
    showKeyboardBtn.textContent = 'Hide keyboard';
    mapKeysBtn.hidden = false;
  }
}

async function handleMapkeysClicked(e) {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.tabs.sendMessage(tab.id, { action: 'mapKeys' });
}

async function handleSolveClicked(e) {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.tabs.sendMessage(tab.id, { action: 'solve' });
}
