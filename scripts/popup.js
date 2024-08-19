const showKeyboardBtn = document.getElementById("showkeyboard");

showKeyboardBtn.addEventListener("click", handleShowKeyboardClicked);

async function handleShowKeyboardClicked() {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.tabs.sendMessage(tab.id, { action: "switchKeyboard" });
}

const mapKeysBtn = document.getElementById("mapkeys");

showKeyboardBtn.addEventListener("click", handleMapkeysClicked);

async function handleMapkeysClicked() {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.tabs.sendMessage(tab.id, { action: "mapKeys" });
}
