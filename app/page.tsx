"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
// import { generateSolvedMatrix } from "@/utils/generate-matrix.util";
import {
  IMappingMatrix,
  generateRandomSudokuMatrix,
  mappingMatrix,
  removeExtremeMode,
} from "@/utils/generate-matrix.util";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";

export default function Home() {
  const [solvedMatrix, setSolvedMatrix] = useState<number[][]>();
  const [extremeMatrix, setExtremeMatrix] = useState<IMappingMatrix[][]>();

  const [selectedIndex, setSelectedIndex] = useState<number[]>();

  const handleClickCell = (
    cell: IMappingMatrix,
    rowIndex: number,
    colIndex: number
  ) => {
    // add background color for cell
    setSelectedIndex([rowIndex, colIndex]);

    // highlight value in cell and same value in another cells
    if (!cell.value) {
      return;
    }
  };

  useEffect(() => {
    const generateMatrix = generateRandomSudokuMatrix();
    const extremeMode = removeExtremeMode(cloneDeep(generateMatrix));
    const mappingExtremeMatrix = mappingMatrix(cloneDeep(extremeMode));

    setTimeout(() => {
      setSolvedMatrix(generateMatrix);
      setExtremeMatrix(mappingExtremeMatrix);
    }, 1000);
  }, []);

  if (!extremeMatrix) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="grid grid-cols-9 grid-rows-9 border-2 border-gray-500">
        {extremeMatrix.map((it, rowIndex) => (
          <div key={rowIndex}>
            {it.map((cell, colIndex) => (
              <div
                className={`w-16 h-16 flex flex-col justify-center items-center border border-sky-300 text-3xl text-neutral-700 cursor-pointer relative ${
                  selectedIndex?.[0] === rowIndex &&
                  selectedIndex[1] === colIndex &&
                  "bg-blue-200 text-red-500"
                }`}
                key={colIndex}
                onClick={() => handleClickCell(cell, rowIndex, colIndex)}
              >
                {cell.value !== 0 && cell.value}

                {/* line  to separate 3x3 */}
                {[3, 6].includes(rowIndex + 1) && (
                  <div className="absolute w-16 h-16 top-0 border-r-2 border-gray-500 z-10" />
                )}
                {[3, 6].includes(colIndex + 1) && (
                  <div className="absolute w-16 h-16 top-0 border-b-2 border-gray-500 z-10" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
