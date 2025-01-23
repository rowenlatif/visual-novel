let gameState = 'menu';
let customFont;

function preload() {
    customFont = loadFont('assets/Daydream.ttf'); // Load custom font
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textFont(customFont);

    // Attach functionality to HTML buttons
    setupMenuButtons();
}

function draw() {
    clear();

    if (gameState === 'menu') {
        select('canvas').style('display', 'none'); // Hide canvas for the menu
    } else {
        select('canvas').style('display', 'block'); // Show canvas for other states

        if (gameState === 'game') {
            playGame();
        } else if (gameState === 'load') {
            loadGame();
        } else if (gameState === 'exit') {
            exitGame();
        }
    }
}

function setupMenuButtons() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => playGame());
}

function playGame() {
    window.location.href = 'startGame.html';
}

document.addEventListener('DOMContentLoaded', setupMenuButtons);

function setGameState(state) {
    gameState = state;

    // Show or hide the menu container
    const menuContainer = select('.menu-container');
    if (menuContainer) {
        menuContainer.style('display', state === 'menu' ? 'flex' : 'none');
    }
}

function playGame() {
    window.location.href = 'startGame.html';
}

function loadGame() {
    fill(0);
    textSize(50);
    text('Load Game - Coming Soon!', width / 2, height / 2);
}

function exitGame() {
    fill(0);
    textSize(50);
    text('Exit - Placeholder!', width / 2, height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// ---------
// START GAME
// ---------
// Dialogue data
const dialogues = [
    {
        character: "Theo",
        emotion: "Neutral",
        text: "Theo hadn't planned on being in the library that afternoon. He hated how the florescent lights flickered like they were on their last breath, and the scratchy chair beneath him made it hard to concentrate.",
    },
    {
        character: "Theo",
        emotion: "Thoughtful",
        text: "But his essay deadline loomed, and avoidance could only carry him so far. He leaned back in his chair in frustration, rubbing his temple, when a familiar title caught his eye on the shelf in front of him."
    },
    {
        character: "Theo",
        emotion: "",
        text: "It was impossible."
    },
    {
        character: "Theo",
        emotion: "",
        text: "He'd seen that book a thousand times before--in her hands, on her bedside table, in the passenger seat of his car."
    },
    {
        character: "Theo",
        emotion: "",
        text: "Theo reached for the spine, the title unmistakable in bold serif. He froze as his fingers brushed against the worn cover. Her favorite book. The one she couldn't stop talking about."
    },
    {
        character: "Theo",
        emotion: "",
        text: "Sha had given him a copy once, her own, with little underlines and scribbles in the margins. 'You'll love it,' she'd once said to him, handing it over with that kniwing smile. He told himself he didn't have time, but the truth was harder to admit."
    },
    {
        character: "Theo",
        emotion: "",
        text: "He wasn't sure if he wanted to see himself reflected in it the way she did."
    },
    {
        character: "Theo",
        emotion: "",
        text: "The title stared back at him, mocking in its familiarity. A flutter of warmth rose in Theo's chest before sinking like a stone. It had been two years since he last saw her, but the weight of that felt heavier now, pressing against his ribs."
    }
];

let currentDialogueIndex = 0; // Tracks the current dialogue
let isRevealingText = false; // Tracks if text is still being revealed
let revealInterval; // Holds the interval ID for text reveal

// HTML references
const charDialogue = document.querySelector('.charDialouge'); // Dialogue text
const charTitle = document.querySelector('.char-title'); // Character name
const charSprite = document.querySelector('.char-sprite'); // Character sprite

// Function to reveal text with animation
function revealText() {
    if (isRevealingText) return; // Prevent multiple intervals
    isRevealingText = true;

    const currentDialogue = dialogues[currentDialogueIndex];
    const fullText = currentDialogue.text;
    charDialogue.textContent = ""; // Clear previous text
    currentCharIndex = 0;

    // Update character name
    charTitle.textContent = currentDialogue.character || ""; // If no character, leave blank

    // Update sprite emotion
    if (currentDialogue.character === "Theo") {
        const emotion = currentDialogue.emotion || "neutral";
        charSprite.src = `assets/characters/theoSprites/theo${capitalize(emotion)}.PNG`;
    }

    // Reveal text one character at a time
    revealInterval = setInterval(() => {
        charDialogue.textContent += fullText[currentCharIndex];
        currentCharIndex++;

        // Stop the interval when all characters are revealed
        if (currentCharIndex >= fullText.length) {
            clearInterval(revealInterval);
            isRevealingText = false;
        }
    }, 50); // Adjust speed by changing the interval time
}

// Function to handle screen clicks
function onScreenClick() {
    if (isRevealingText) {
        // If still revealing, instantly show the full dialogue
        clearInterval(revealInterval);
        charDialogue.textContent = dialogues[currentDialogueIndex].text;
        isRevealingText = false;
    } else {
        // If fully revealed, move to the next dialogue
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            revealText();
        } else {
            console.log("End of dialogues."); // Handle end of dialogues here
        }
    }
}

// Utility: Capitalize first letter of emotion
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add click listener to the screen
document.body.addEventListener('click', onScreenClick);

// Start the first dialogue
revealText();