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

  useEffect(() => {
    const generateMatrix = generateRandomSudokuMatrix();
    console.log(1232, generateMatrix);
    const extremeMode = removeExtremeMode(cloneDeep(generateMatrix));
    const mappingExtremeMatrix = mappingMatrix(cloneDeep(extremeMode));

    setTimeout(() => {
      setSolvedMatrix(generateMatrix);
      setExtremeMatrix(mappingExtremeMatrix);
    }, 0);
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
        {extremeMatrix.map((it, idx) => (
          <div className={`sudoku-row`} key={idx}>
            {it.map((cell, index) => (
              <div
                className={`sudoku-cell w-16 h-16 flex flex-col justify-center items-center border border-sky-300 text-3xl cursor-pointer `}
                key={index}
              >
                {cell.value !== 0 && cell.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
