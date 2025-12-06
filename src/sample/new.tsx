import React from "react";

type Piece = {
  id: number;
  row: number;
  col: number;
};

const generateDiamond = (size: number): Piece[] => {
  let pieces: Piece[] = [];
  let id = 1;
  let mid = Math.floor(size / 2);

  for (let i = 0; i < size; i++) {
    let start = Math.abs(mid - i);
    let count = size - 2 * start;
    for (let j = 0; j < count; j++) {
      pieces.push({ id: id++, row: i, col: start + j });
    }
  }
  return pieces;
};

const size = 7;
const pieces = generateDiamond(size);

const BoardGame: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="relative grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gridTemplateRows: `repeat(${size}, 50px)`,
          gap: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
        {...pieces.map((piece) => (
          <div
            key={piece.id}
            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white"
            style={{ gridColumn: piece.col + 1, gridRow: piece.row + 1 }}
          >
            {piece.id}
          </div>
        ))}
      />
    </div>
  );
};

export default BoardGame;
