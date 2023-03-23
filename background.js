chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("workReminder", {
    delayInMinutes: 30,
    periodInMinutes: 30
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "workReminder") {
    chrome.notifications.create("workReminderNotification", {
      type: "basic",
      iconUrl: "icon.png",
      title: "Work Reminder",
      message: "What are you working on?"
    });
  }
});
