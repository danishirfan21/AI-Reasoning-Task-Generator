
const puzzlesList = document.getElementById('puzzlesList');
const emptyState = document.getElementById('emptyState');
const totalCount = document.getElementById('totalCount');
const clearAllBtn = document.getElementById('clearAllBtn');

let savedPuzzles = [];

// Load puzzles on page load
document.addEventListener('DOMContentLoaded', loadPuzzles);

// Clear all puzzles
clearAllBtn.addEventListener('click', () => {
  if (
    confirm(
      'Are you sure you want to delete all saved puzzles? This cannot be undone.'
    )
  ) {
    localStorage.removeItem('savedPuzzles');
    savedPuzzles = [];
    displayPuzzles();
  }
});

function loadPuzzles() {
  savedPuzzles = JSON.parse(localStorage.getItem('savedPuzzles') || '[]');
  // Sort by most recent first
  savedPuzzles.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  displayPuzzles();
}

function displayPuzzles() {
  // Update count
  totalCount.textContent = savedPuzzles.length;

  // Show empty state or puzzles list
  if (savedPuzzles.length === 0) {
    emptyState.style.display = 'block';
    puzzlesList.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  puzzlesList.style.display = 'grid';

  // Clear existing content
  puzzlesList.innerHTML = '';

  // Create puzzle cards
  savedPuzzles.forEach((puzzle, index) => {
    const card = createPuzzleCard(puzzle, index);
    puzzlesList.appendChild(card);
  });
}

function createPuzzleCard(puzzle, index) {
  const card = document.createElement('div');
  card.className = 'saved-puzzle-card';

  const date = new Date(puzzle.savedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  card.innerHTML = `
        <div class="puzzle-header">
            <span class="puzzle-date">📅 Saved on ${formattedDate}</span>
            <div class="puzzle-actions">
                <button class="icon-btn pdf-btn" onclick="downloadPuzzlePDF(${index})" title="Download PDF">
                    📄
                </button>
                <button class="icon-btn delete-btn" onclick="deletePuzzle(${index})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
        
        <div class="puzzle-content">
            <h3>❓ Question</h3>
            <p>${puzzle.question}</p>
        </div>
        
        <div class="puzzle-content">
            <h3>✅ Answer</h3>
            <p class="puzzle-answer">${puzzle.answer}</p>
        </div>
        
        <div class="puzzle-content">
            <h3>💡 Explanation</h3>
            <p>${puzzle.explanation}</p>
        </div>
    `;

  return card;
}

function deletePuzzle(index) {
  if (confirm('Delete this puzzle?')) {
    savedPuzzles.splice(index, 1);
    localStorage.setItem('savedPuzzles', JSON.stringify(savedPuzzles));
    displayPuzzles();
  }
}

function downloadPuzzlePDF(index) {
  const puzzle = savedPuzzles[index];
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Set up styling
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - 2 * margin;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(102, 126, 234);
  doc.text('Logic Puzzle', margin, 20);

  // Question section
  doc.setFontSize(14);
  doc.setTextColor(102, 126, 234);
  doc.text('Question:', margin, 40);

  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);
  const questionLines = doc.splitTextToSize(puzzle.question, maxWidth);
  doc.text(questionLines, margin, 50);

  // Calculate position for answer section
  const questionHeight = questionLines.length * 7;

  // Answer section
  doc.setFontSize(14);
  doc.setTextColor(102, 126, 234);
  doc.text('Answer:', margin, 60 + questionHeight);

  doc.setFontSize(12);
  doc.setTextColor(45, 55, 72);
  const answerLines = doc.splitTextToSize(puzzle.answer, maxWidth);
  doc.text(answerLines, margin, 70 + questionHeight);

  // Calculate position for explanation section
  const answerHeight = answerLines.length * 7;

  // Explanation section
  doc.setFontSize(14);
  doc.setTextColor(102, 126, 234);
  doc.text('Explanation:', margin, 80 + questionHeight + answerHeight);

  doc.setFontSize(12);
  doc.setTextColor(74, 85, 104);
  const explanationLines = doc.splitTextToSize(puzzle.explanation, maxWidth);
  doc.text(explanationLines, margin, 90 + questionHeight + answerHeight);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(160, 174, 192);
  const savedDate = new Date(puzzle.savedAt).toLocaleDateString();
  doc.text(
    `Saved on ${savedDate}`,
    margin,
    doc.internal.pageSize.getHeight() - 10
  );

  // Download
  const timestamp = new Date().toISOString().split('T')[0];
  doc.save(`logic-puzzle-${timestamp}.pdf`);
}
