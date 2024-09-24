document.addEventListener('DOMContentLoaded', () => {
    // Select all the cells in the Tic-Tac-Toe grid
    const cells = document.querySelectorAll('[data-cell]');
    // Select the reset button element
    const resetButton = document.getElementById('reset-game');
    // Select the elements displaying player scores
    const playerXScore = document.getElementById('playerX-score');
    const playerOScore = document.getElementById('playerO-score');
    const drawsScore = document.getElementById('draws-score');
  
    // Initialize the game state variables
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    // Function to handle cell clicks
    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = Array.from(cells).indexOf(cell);
  
      if (gameState[cellIndex] !== '' || !gameActive) return;
  
      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
  
      checkResult();
    }
  
    // Function to check the game result
    function checkResult() {
      const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        gameActive = false;
        if (currentPlayer === 'X') {
          playerXScore.textContent = parseInt(playerXScore.textContent) + 1;
        } else {
          playerOScore.textContent = parseInt(playerOScore.textContent) + 1;
        }
        return;
      }
  
      if (!gameState.includes('')) {
        gameActive = false;
        drawsScore.textContent = parseInt(drawsScore.textContent) + 1;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    // Function to reset the game
    function resetGame() {
      gameState = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => cell.textContent = '');
      currentPlayer = 'X';
      gameActive = true;
    }
  
    // Add event listeners to each cell
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    // Add event listener to the reset button
    resetButton.addEventListener('click', resetGame);
  });
  