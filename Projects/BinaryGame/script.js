const gridSize = 6;
const gridEl = document.getElementById('grid');
const statusEl = document.getElementById('status');
const scoreEl = document.getElementById('scoreboard');
let selectedRow = 0;
let selectedCol = 0;
let targetRow = 0;
let targetCol = 0;
let gridData = [];
let gameStarted = false;
let score = 0;

const binaryVal = [32, 16, 8, 4, 2, 1];

function generateNewTarget() {
    targetRow = Math.floor(Math.random() * 63) + 1;
    targetCol = Math.floor(Math.random() * 63) + 1;
}

function generateGridData() {
    generateNewTarget();
    gridData = [];

    const activeRows = Array(gridSize).fill(false);
    const activeCols = Array(gridSize).fill(false);

    for (let i = 0; i < gridSize; i++) {
        if ((targetRow & binaryVal[i]) !== 0) activeRows[i] = true;
        if ((targetCol & binaryVal[i]) !== 0) activeCols[i] = true;
    }

    for (let r = 0; r < gridSize; r++) {
        const row = [];
        for (let c = 0; c < gridSize; c++) {
            row.push(activeRows[r] && activeCols[c]);
        }
        gridData.push(row);
    }
    document.getElementById('row-target').textContent =
    `Row Target: ${targetRow}`;
document.getElementById('col-target').textContent =
    `Col Target: ${targetCol}`;

}
function initTitleScreen() {

}
function initGrid() {
    gridEl.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.classList.add('deselected');

            gridEl.appendChild(cell);
        }
    }
    updateSelectionHighlight();
    
}

function resetGame() {
    score = 0;
    selectedRow = 0;
    selectedCol = 0;
    generateGridData();
    gameStarted = true;
    initGrid();
    updateSelectionHighlight();
    updateBitLabels();
    statusEl.textContent = '';
}

function handleMovement(e) {
    if (!gameStarted) return;

    switch (e.key) {
        case 'ArrowUp':
            if (selectedRow > 0) selectedRow--;
            break;
        case 'ArrowDown':
            if (selectedRow < gridSize - 1) selectedRow++;
            break;
        case 'ArrowLeft':
            if (selectedCol > 0) selectedCol--;
            break;
        case 'ArrowRight':
            if (selectedCol < gridSize - 1) selectedCol++;
            break;
        case 'Enter':
        case ' ':
            checkSelection();
            break;
    }
    updateSelectionHighlight();
}

function updateSelectionHighlight() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('selected');
        // Remove inline styling and enforce class-based styling
        if (!cell.classList.contains('active')) {
            cell.classList.add('deselected');
        }
    });

    const selector = `.cell[data-row="${selectedRow}"][data-col="${selectedCol}"]`;
    const selected = document.querySelector(selector);
    if (selected) {
        selected.classList.remove('deselected');
        selected.classList.add('selected');
    }
}

function checkSelection() {
    if (gridData[selectedRow][selectedCol]) {
        score += 10;
        scoreEl.textContent = `Score: ${score}`;
        statusEl.textContent = "Correct! +10 points";


        // Reveal all active (red) cells
        document.querySelectorAll('.cell').forEach(cell => {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            if (gridData[r][c]) {
                console.log("reavealing active cell.")
                cell.classList.remove('deselected');
                cell.classList.add('active');
            }
        });

        setTimeout(() => {
            generateGridData();
            initGrid();
            updateSelectionHighlight();
        }, 2000);
    } else {
        statusEl.textContent = "Try again :(";
    }
}


function updateBitLabels() {
    const colBitsEl = document.getElementById('col-bits');
    const rowBitsEl = document.getElementById('row-bits');
  
    // Clear old labels
    colBitsEl.innerHTML = '';
    rowBitsEl.innerHTML = '';
  
    // Show the fixed bits from binaryVal (which is [32,16,8,4,2,1])
    for (let i = 0; i < gridSize; i++) {
      // Column bits (horizontal)
      const colLabel = document.createElement('div');
      colLabel.textContent = binaryVal[i];
      colLabel.style.width = '50px';
      colLabel.style.height = '50px';
      colLabel.style.display = 'flex';
      colLabel.style.alignItems = 'center';
      colLabel.style.justifyContent = 'center';
      colBitsEl.appendChild(colLabel);
  
      // Row bits (vertical)
      const rowLabel = document.createElement('div');
        rowLabel.textContent = binaryVal[i];
        rowLabel.style.width = '50px';
        rowLabel.style.height = '50px';
        rowLabel.style.display = 'flex';
        rowLabel.style.alignItems = 'center';
        rowLabel.style.justifyContent = 'center';
        rowBitsEl.appendChild(rowLabel);
    }
  }
  

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-ui').style.display = 'flex';
    resetGame();
})
document.addEventListener("keydown", handleMovement);
window.onload = resetGame;

