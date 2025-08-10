let flashcards = {};
let currentCard = null;

async function loadFlashcards() {
    const res = await fetch('/flashcards.json');
    flashcards = await res.json();
    showRandomCard();
}

function showRandomCard() {
    // Flatten all cards into one array
    const allCards = Object.values(flashcards).flat();
    currentCard = allCards[Math.floor(Math.random() * allCards.length)];
    document.getElementById('danish').textContent = currentCard.back;
    document.getElementById('italian-input').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkTranslation() {
    const userInput = document.getElementById('italian-input').value.trim();
    if (userInput.toLowerCase() === currentCard.front.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Correct!';
    } else {
        document.getElementById('feedback').textContent = `Incorrect. The correct answer is: ${currentCard.front}`;
    }
    setTimeout(showRandomCard, 1500);
}

document.getElementById('check-btn').addEventListener('click', checkTranslation);

loadFlashcards();
