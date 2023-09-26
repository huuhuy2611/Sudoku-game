import { shuffle } from "lodash";

export const initGrid = Array(9)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    items: Array(9)
      .fill(0)
      .map((_, subindex) => ({
        subId: `${index + 1}-${subindex + 1}`,
        value: 0,
        notes: [],
      })),
  }));

export const generateSolvedMatrix = () => {
  const initMatrix = [...initGrid];
  const array1to9 = Array(9)
    .fill(0)
    .map((_, index) => index + 1);

  // generate independent rows & columns in matrix (block 1,5,9)
  const independentBlock = [1, 5, 9];
  initMatrix.map(({ id, items }) => {
    if (independentBlock.includes(id)) {
      const shuffle1to9 = shuffle(array1to9);
      items.map((item, index) => {
        item.value = shuffle1to9[index];
      });
    }
  });

  //generate another cells in matrix based on the independentBlock above
  // initMatrix.map(({ id, items }) => {
  //   if (!independentBlock.includes(id)) {
  //     const shuffle1to9 = shuffle(array1to9);

  //     if ()

  //     items.map((item, index) => {
  //       item.value = shuffle1to9[index];
  //     });
  //   }
  // });

  return initMatrix;
};
