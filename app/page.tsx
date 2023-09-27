"use client";

import { generateSolvedMatrix } from "@/utils/generate-matrix.util";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-3 border-2 border-gray-500">
        {generateSolvedMatrix().map(({ id, items }) => (
          <div
            key={id}
            className="grid grid-cols-3 grid-rows-3 w-40 h-40 border border-gray-500"
          >
            {items.map(({ cellId, value, notes }) => (
              <div
                key={cellId}
                className="flex flex-col justify-center items-center border border-sky-300 text-sm cursor-pointer"
              >
                {value !== 0 && !notes.length && value}
                <div className="text-sm">{notes}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
