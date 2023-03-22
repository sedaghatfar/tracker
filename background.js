function showNotification() {
  chrome.notifications.create('workTrackerNotification', {
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Work Tracker',
    message: 'What are you working on?'
  });
}

// Set the interval to show the notification every 30 minutes (1800000 milliseconds)
setInterval(showNotification, 1800000);
