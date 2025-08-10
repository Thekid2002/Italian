let flashcards = {};
let currentCategory = "";
let currentIndex = 0;

async function loadFlashcards() {
    const res = await fetch('flashcards.json');
    flashcards = await res.json();

    const select = document.getElementById('category');
    for (let category in flashcards) {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    }

    select.addEventListener('change', () => {
        currentCategory = select.value;
        showAllCards();
    });

    // Default load
    select.value = Object.keys(flashcards)[0];
    currentCategory = select.value;
    showAllCards();
}

function showAllCards() {
    if (!currentCategory) return;
    const container = document.getElementById('card');
    container.innerHTML = '';
    flashcards[currentCategory].forEach((card, idx) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'flashcard';
        cardDiv.style.display = 'inline-block';
        cardDiv.style.margin = '10px';
        cardDiv.style.padding = '20px';
        cardDiv.style.border = '1px solid #ccc';
        cardDiv.style.borderRadius = '8px';
        cardDiv.style.color = '#000000ff';
        cardDiv.style.cursor = 'pointer';
        cardDiv.style.minWidth = '120px';
        cardDiv.style.textAlign = 'center';
        cardDiv.textContent = card.front;
        cardDiv.dataset.side = 'front';
        cardDiv.onclick = function() {
            if (cardDiv.dataset.side === 'front') {
                cardDiv.textContent = card.back;
                cardDiv.style.background = '#4caf50'; // green for back
                cardDiv.color = '#000000ff';
                cardDiv.dataset.side = 'back';
            } else {
                cardDiv.textContent = card.front;
                cardDiv.style.background = '#fff';
                cardDiv.style.color = '#000000ff';
                cardDiv.dataset.side = 'front';
            }
        };
        container.appendChild(cardDiv);
    });
}

// Remove lastCard and nextCard, not needed for showing all cards

loadFlashcards();
