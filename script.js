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
    "Theo hadn't planned on being in the library that afternoon. He hated how the florescent lights flickered like they were on their last breath, and the scratchy chair beneath him made it hard to concentrate.",
    "But his essay deadline loomed, and avoidance could only carry him so far. He leaned back in his chair in frustration, rubbing his temple, when a familiar title caught his eye on the shelf in front of him."
];

let currentDialogueIndex = 0; // Tracks the current dialogue
let currentCharIndex = 0; // Tracks the current character being revealed
let isRevealingText = false; // Tracks if text is still being revealed
let revealInterval; // Holds the interval ID for text reveal

// HTML references
const charDialogueContainer = document.querySelector('.charDialouge-container');
const charDialogue = document.querySelector('.charDialouge');

// Function to reveal text with animation
function revealText() {
    if (isRevealingText) return; // Prevent multiple intervals
    isRevealingText = true;

    const fullText = dialogues[currentDialogueIndex];
    charDialogue.textContent = ""; // Clear previous text
    currentCharIndex = 0;

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
        charDialogue.textContent = dialogues[currentDialogueIndex];
        isRevealingText = false;
    } else {
        // If fully revealed, move to the next dialogue
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            revealText();
        } else {
            console.log("End of dialogues"); // Handle end of dialogues here
        }
    }
}

// Add click listener to the screen
document.body.addEventListener('click', onScreenClick);

// Start the first dialogue
revealText();
