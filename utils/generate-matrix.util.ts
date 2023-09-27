import { shuffle } from "lodash";

const INDEPENDENT_BLOCK = [1, 5, 9];
const DEPENDENT_COLUMNS = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];
const DEPENDENT_ROWS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

interface IMatrixData {
  id: number;
  items: {
    cellId: string;
    value: number;
    notes: number[];
  }[];
}

export const initGrid: IMatrixData[] = Array(9)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    items: Array(9)
      .fill(0)
      .map((_, subindex) => ({
        cellId: `${index + 1}-${subindex + 1}`,
        value: 0,
        notes: [],
      })),
  }));

export const isValidColumn = ({
  matrix,
  cellId,
  value,
}: {
  matrix: IMatrixData[];
  cellId: string;
  value: number;
}) => {
  const [first, second] = cellId.split("-");
  const dependentColumnFirst =
    DEPENDENT_COLUMNS.find((dependentColumn) =>
      dependentColumn.includes(+first)
    ) || [];
  const dependentColumnSecond =
    DEPENDENT_COLUMNS.find((dependentColumn) =>
      dependentColumn.includes(+second)
    ) || [];

  const columnCellIds = dependentColumnFirst
    .map((tempFirst) =>
      dependentColumnSecond.map((tempSecond) => `${tempFirst}-${tempSecond}`)
    )
    .flat()
    .filter((tempCellId) => tempCellId !== cellId);

  const cells = [...matrix].map((it) => it.items).flat();

  let isValid = true;
  cells.forEach((it) => {
    if (it.value === 0) return;

    if (columnCellIds.includes(it.cellId) && it.value === value) {
      isValid = false;
      return;
    }
  });

  return isValid;
};

export const isValidRow = ({
  matrix,
  cellId,
  value,
}: {
  matrix: IMatrixData[];
  cellId: string;
  value: number;
}) => {
  const [first, second] = cellId.split("-");
  const dependentRowFirst =
    DEPENDENT_ROWS.find((dependentRow) => dependentRow.includes(+first)) || [];
  const dependentRowSecond =
    DEPENDENT_ROWS.find((dependentRow) => dependentRow.includes(+second)) || [];
  const rowCellIds = dependentRowFirst
    .map((tempFirst) =>
      dependentRowSecond.map((tempSecond) => `${tempFirst}-${tempSecond}`)
    )
    .flat()
    .filter((tempCellId) => tempCellId !== cellId);

  const cells = [...matrix].map((it) => it.items).flat();

  let isValid = true;
  cells.forEach((it) => {
    if (it.value === 0) return;

    if (rowCellIds.includes(it.cellId) && it.value === value) {
      isValid = false;
      return;
    }
  });

  return isValid;
};

/**
 * IDEA:
 * matrix have 81 cells and 9 blocks (count from top left => right => bottom)
 * Step 1: Create independent cells in block [1 5 9]
 * Step 2: Create a array shuffle 1 to 9 and use BACKTRACKING algorithm to assign cells of each block
 * Step 3: Repeat on each next block and fill all cells with shuffle numbers 1 to 9
 *
 * BACKTRACKING algorithm:
 * assign number to cell,
 *      if valid (col, row and block) => assign and remove this number from the shuffle array & remove this number to list valid on cell
 *      if invalid (col, row and block) => back to previous step and assign another number to cell
 * repeat above condition to the end.
 */
export const generateSolvedMatrix = () => {
  const matrix = [...initGrid];
  const array1to9 = Array(9)
    .fill(0)
    .map((_, index) => index + 1);

  // generate independent rows & columns in matrix (block 1,5,9)
  matrix.map(({ id, items }) => {
    if (!INDEPENDENT_BLOCK.includes(id)) return;

    const shuffle1to9 = shuffle(array1to9);
    items.map((item, index) => {
      item.value = shuffle1to9[index];
    });
  });

  // generate notes allowable to cells in matrix based on the INDEPENDENT_BLOCK above
  matrix.map(({ id, items }) => {
    if (INDEPENDENT_BLOCK.includes(id)) return;

    let shuffle1to9 = shuffle(array1to9);

    items.map((item) => {
      const validValues = shuffle1to9.filter((it) => {
        return (
          isValidColumn({
            matrix: [...matrix],
            cellId: item.cellId,
            value: it,
          }) &&
          isValidRow({ matrix: [...matrix], cellId: item.cellId, value: it })
        );
      });

      if (!validValues) {
        alert("ERROR!!!!!!!!!!!!!!!!!!!!!!!!");
        return;
      }
      item.notes = validValues;
    });
  });

  return matrix;
};
