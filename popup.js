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

function removeHTMLTags(text) {
  return text.replace(/(<([^>]+)>)/gi, ' ');
}

async function displayRandomProverb() {
  const verseElement = document.getElementById('verse');
  const randomProverb = await fetchRandomProverb();
  verseElement.textContent = randomProverb;
}

displayRandomProverb();
