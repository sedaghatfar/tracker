# Tracker

Chrome Extension made with help fromChatGPT. I've used a few different trackers in the past, toggl was great but I forgot to update sometimes and would have to update at the end of each day.

Every 30 minutes a prompt will ask "What are you working on?" and display a random verse from proverbs

The data is stored in google sheets, stored using the id in config.js, in our sample that would be `1a84DKDVBMfimx3uNF7THWWhISO9sNFI_LuWNVztq7HE`
[sample sheet](https://docs.google.com/spreadsheets/d/1a84DKDVBMfimx3uNF7THWWhISO9sNFI_LuWNVztq7HE/edit?usp=sharing)

and in the manifest.json one would need to add in your oauth2 client id type: Chrome App, see [Googe Console ](https://console.cloud.google.com/apis/credentials)

Another benefit over this is that the extension is < 1MB and, and runs on an unpacked extension - [chrome://extensions/](chrome://extensions/)

An idea for the future would be to auto populate the columns in CDE, but having to manuallhy oull them down is a good way to review the day. 
Another is that for each task it should be `-` delimited and I can do a `=SPLIT()` to make columns for the task and subtask.



