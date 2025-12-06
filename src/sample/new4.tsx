import React from "react";

type Piece = {
  id: number;
  row: number;
  col: number;
};

const generateDiamondBorder = (): Piece[] => {
  let pieces: Piece[] = [];
  let id = 1;
  let size = 7;
  let mid = Math.floor(size / 2);

  // Generate border pieces for a diamond shape
  for (let i = 0; i < size; i++) {
    //let start = Math.abs(mid - i);
    if (i <= mid) {
      pieces.push({ id: id++, row: i, col: mid - i }); // Left edge
      pieces.push({ id: id++, row: i, col: mid + i }); // Right edge
    } else {
      pieces.push({ id: id++, row: i, col: i - mid }); // Left edge
      pieces.push({ id: id++, row: i, col: size - 1 - (i - mid) }); // Right edge
    }
  }

  for (let i = 1; i < size - 1; i++) {
    let start = Math.abs(mid - i);
    //let end = size - start - 1;
    pieces.push({ id: id++, row: mid - start, col: i }); // Top edge
    pieces.push({ id: id++, row: mid + start, col: i }); // Bottom edge
  }

  return pieces;
};

const pieces = generateDiamondBorder();

const BoardGame: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="relative grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(7, 50px)`,
          gridTemplateRows: `repeat(7, 50px)`,
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
