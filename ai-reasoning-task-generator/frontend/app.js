const generateBtn = document.getElementById('generateBtn');
const puzzleCard = document.getElementById('puzzleCard');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const explanationText = document.getElementById('explanationText');

const API_URL = 'http://localhost:3000/api/generate-puzzle';

generateBtn.addEventListener('click', generatePuzzle);

async function generatePuzzle() {
  // Hide previous results and errors
  puzzleCard.classList.add('hidden');
  errorMessage.classList.add('hidden');

  // Show loading spinner
  loadingSpinner.classList.remove('hidden');
  generateBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // Display the puzzle
    questionText.textContent = data.question;
    answerText.textContent = data.answer;
    explanationText.textContent = data.explanation;

    // Hide spinner and show puzzle card
    loadingSpinner.classList.add('hidden');
    puzzleCard.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching puzzle:', error);

    // Hide spinner
    loadingSpinner.classList.add('hidden');

    // Show error message
    errorMessage.textContent = `Failed to generate puzzle: ${error.message}. Make sure the server is running and your API key is configured.`;
    errorMessage.classList.remove('hidden');
  } finally {
    generateBtn.disabled = false;
  }
}
