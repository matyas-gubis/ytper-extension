const container = document.getElementById('container')
const wrongpage = document.getElementById('wrongpage')

const showKeyboardCheckbox = document.getElementById("showkeyboard");
const autoMapKeysCheckbox = document.getElementById("mapkeys");
const mapKeysBtn = document.getElementById("mapkeys");
const solveBtn = document.getElementById("solve");

showKeyboardCheckbox.addEventListener("click", handleShowKeyboardChanged);
autoMapKeysCheckbox.addEventListener("click", handleMapkeysClicked);
solveBtn.addEventListener("click", handleSolveClicked);

// mapKeysBtn.hidden = localStorage.getItem('keyboardVisible') ? true : false;

chrome.tabs.query({active: true}).then(([tab])=> {
  if(tab.url.includes('ytper.com/play')){
    container.hidden = false
    wrongpage.hidden = true
  }else{
    container.hidden = true
    wrongpage.hidden = false
  }
})

chrome.storage.sync.get(["keyboardVisible"]).then(({ keyboardVisible }) => {
  showKeyboardCheckbox.checked = keyboardVisible;
  mapKeysBtn.disabled = !keyboardVisible;
});

async function handleShowKeyboardChanged(e) {
  chrome.storage.sync.set({keyboardVisible: e.target.checked}).then()
}

async function handleMapkeysClicked(e) {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.tabs.sendMessage(tab.id, { action: "mapKeys" });
}

async function handleSolveClicked(e) {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.tabs.sendMessage(tab.id, { action: "solve" });
}
