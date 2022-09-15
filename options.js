// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Mark the button as selected
  let deviceName = document.getElementById('device-name').value.trim();
  if (deviceName) {
    chrome.storage.local.set({ deviceName });
    console.log('New Device Name: ', deviceName);
  }
  else {
    alert('Device name should not be empty');
  }
}

document.querySelector('#buttonDiv').addEventListener('click', handleButtonClick);

async function init () {
  let deviceName = await chrome.storage.local.get('deviceName')?.deviceName || await chrome.instanceID.getID();
  console.log(deviceName);
  chrome.storage.local.set({ deviceName });
  document.getElementById('device-name').value = deviceName;
}

init();
