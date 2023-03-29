import { SHEET_ID } from './config.js';

// Fetch a random proverb from the API
async function fetchRandomProverb() {
  const response = await fetch('https://www.sefaria.org/api/texts/Proverbs.1-31');
  const data = await response.json();

  const chapterCount = data.text.length;
  const randomChapterIndex = Math.floor(Math.random() * chapterCount);
  const randomChapter = data.text[randomChapterIndex];

  const verseCount = randomChapter.length;
  const randomVerseIndex = Math.floor(Math.random() * verseCount);
  const randomVerse = randomChapter[randomVerseIndex];

  return `${randomChapterIndex + 1}:${randomVerseIndex + 1} ${removeHTMLTags(randomVerse)}`;
}

// Helper function to remove HTML tags from a string
function removeHTMLTags(text) {
  return text.replace(/(<([^>]+)>)/gi, ' ');
}

// Display a random proverb in the popup
async function displayRandomProverb() {
  const verseElement = document.getElementById('verse');
  const randomProverb = await fetchRandomProverb();
  verseElement.textContent = randomProverb;
}

// Call the displayRandomProverb function to display a random proverb when the popup is loaded
displayRandomProverb();

// Authenticate with Google Sheets API
async function authenticate() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(token);
      }
    });
  });
}

// Append the user's input to a Google Sheet
async function appendDataToSheet(sheetId, data) {
  const token = await authenticate();
  const sheetsApi = 'https://sheets.googleapis.com/v4/spreadsheets';
  const range = 'CurrentSheet!A:B';
  const url = `${sheetsApi}/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const body = JSON.stringify({
    values: [[new Date().toISOString(), data]]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  });

  return response.json();
}

// Handle the form submission
document.getElementById('submit').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const sheetId = SHEET_ID; // Replace with your Google Sheet ID

  try {
    await appendDataToSheet(sheetId, userInput);
    document.getElementById('userInput').value = '';
    window.close(); // Close the popup window
  } catch (error) {
    console.error(error);
    alert('Error saving the response. Please try again.');
  }
});
