const showKeyboardBtn = document.getElementById('showkeyboard');
const mapKeysBtn = document.getElementById('mapkeys');

showKeyboardBtn.addEventListener('click', handleShowKeyboardClicked);
mapKeysBtn.addEventListener('click', handleMapkeysClicked);

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
