import React from "react";

type Piece = {
  id: number;
  row: number;
  col: number;
};

const generateDiamondBorder = (size: number): Piece[] => {
  let pieces: Piece[] = [];
  let id = 1;
  //let mid = Math.floor(size / 2);
  //let coords = new Set<string>();

  // Top side
  for (let i = 0; i < size; i++) {
    pieces.push({ id: id++, row: 0, col: i });
  }

  // Right side
  for (let i = 1; i < size; i++) {
    pieces.push({ id: id++, row: i, col: size - 1 });
  }

  // Bottom side
  for (let i = size - 2; i >= 0; i--) {
    pieces.push({ id: id++, row: size - 1, col: i });
  }

  // Left side
  for (let i = size - 2; i > 0; i--) {
    pieces.push({ id: id++, row: i, col: 0 });
  }

  return pieces;
};

const size = 7;
const pieces = generateDiamondBorder(size);

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
