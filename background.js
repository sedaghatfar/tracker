const INTERVAL_MINUTES = 30;
let timeLeft = INTERVAL_MINUTES * 60;

function updateBadge() {
  chrome.action.setBadgeText({ text: String(Math.ceil(timeLeft / 60)) });
}

function createPopup() {
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 400,
    height: 200,
    focused: true
  });
}

function setupAlarm() {
  chrome.alarms.create('reminder', { periodInMinutes: INTERVAL_MINUTES });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'reminder') {
      createPopup();
      timeLeft = INTERVAL_MINUTES * 60;
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  updateBadge();
  setupAlarm();
});

chrome.runtime.onStartup.addListener(() => {
  updateBadge();
  setupAlarm();
});

setInterval(() => {
  timeLeft -= 1;
  updateBadge();
}, 1000);
