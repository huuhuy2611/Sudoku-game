const n = 9; // Size of the Sudoku grid (9x9)

export function generateRandomSudokuMatrix(): number[][] {
  const matrix: number[][] = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(0));

  // Helper function to check if it's safe to place a number in a cell
  function isSafe(row: number, col: number, num: number): boolean {
    // Check if the number is not already present in the row and column
    for (let i = 0; i < n; i++) {
      if (matrix[row][i] === num || matrix[i][col] === num) {
        return false;
      }
    }

    // Check if the number is not already present in the 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (matrix[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  // Helper function to generate a random permutation of numbers from 1 to 9
  function shuffleNumbers(): number[] {
    const numbers = [...Array(n)].map((_, index) => index + 1);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }

  // Fill the diagonal subgrids (3x3) with random numbers
  for (let i = 0; i < n; i += 3) {
    const randomPermutation = shuffleNumbers();
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        matrix[i + j][i + k] = randomPermutation[j * 3 + k];
      }
    }
  }

  // Fill the remaining cells of the Sudoku grid
  function fillRemainingCells(row: number, col: number): boolean {
    if (row === n - 1 && col === n) {
      return true; // Sudoku is filled
    }

    if (col === n) {
      row++;
      col = 0;
    }

    // Skip cells that are already filled
    if (matrix[row][col] !== 0) {
      return fillRemainingCells(row, col + 1);
    }

    // Generate a random permutation of numbers from 1 to 9
    const numbers = shuffleNumbers();

    for (const num of numbers) {
      if (isSafe(row, col, num)) {
        matrix[row][col] = num;
        if (fillRemainingCells(row, col + 1)) {
          return true;
        }
        matrix[row][col] = 0; // Backtrack
      }
    }

    return false; // No valid number can be placed
  }

  fillRemainingCells(0, 0); // Fill the remaining cells

  return matrix;
}

// Remove cells to create an extreme Sudoku puzzle
export const removeExtremeMode = (matrix: number[][]) => {
  const numberOfEmptyCells = Math.floor(Math.random() * 5) + 50;
  for (let i = 0; i < numberOfEmptyCells; i++) {
    while (true) {
      const row = Math.floor(Math.random() * n);
      const col = Math.floor(Math.random() * n);
      if (matrix[row][col] !== 0) {
        matrix[row][col] = 0;
        break;
      }
    }
  }

  return matrix;
};

export interface IMappingMatrix {
  value: number;
  notes: number[];
  isNoting: boolean;
  isDefault: boolean;
}

export const mappingMatrix = (matrix: number[][]): IMappingMatrix[][] =>
  matrix.map((items) =>
    items.map((item) => ({
      value: item,
      notes: [],
      isNoting: false,
      isDefault: !!(item !== 0),
    }))
  );
