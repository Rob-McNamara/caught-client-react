// Coordinates
// x = row, y = column
import { SlotType } from "./ui/slot";

interface Coords {
  x: number;
  y: number;
}

type CoordsList = Coords[];

const coordsPath1: CoordsList = [
  { x: 12, y: 5 }, // red start
  { x: 15, y: 4 },
  { x: 19, y: 3 },
  { x: 23, y: 3 },
  { x: 27, y: 3 },
  { x: 31, y: 4 },
  { x: 31, y: 5 }, // green end
];

const coordsPath2: CoordsList = [
  { x: 36, y: 6 }, // green start
  { x: 38, y: 7 },
  { x: 39, y: 9 },
  { x: 40, y: 11 },
  { x: 39, y: 13 },
  { x: 38, y: 15 },
  { x: 36, y: 16 }, // blue end
];

const coordsPath3: CoordsList = [
  { x: 34, y: 17 }, // blue start
  { x: 31, y: 18 },
  { x: 27, y: 19 },
  { x: 23, y: 19 },
  { x: 19, y: 19 },
  { x: 15, y: 18 },
  { x: 12, y: 17 }, // yellow end
];

const coordsPath4: CoordsList = [
  { x: 10, y: 16 }, // yellow start
  { x: 8, y: 15 },
  { x: 7, y: 13 },
  { x: 6, y: 11 },
  { x: 7, y: 9 },
  { x: 8, y: 7 },
  { x: 10, y: 6 }, // red end
];

const coordsPath: CoordsList[] = [
  coordsPath1,
  coordsPath2,
  coordsPath3,
  coordsPath4,
];

const coordsHome1: CoordsList = [
  // Red
  { x: 6, y: 6 },
  { x: 7, y: 5 },
  { x: 9, y: 4 },
  { x: 11, y: 3 },
];

const coordsHome2: CoordsList = [
  // Green
  { x: 35, y: 3 },
  { x: 37, y: 4 },
  { x: 39, y: 5 },
  { x: 41, y: 6 },
];

const coordsHome3: CoordsList = [
  // Blue
  { x: 41, y: 16 },
  { x: 39, y: 17 },
  { x: 37, y: 18 },
  { x: 35, y: 19 },
];

const coordsHome4: CoordsList = [
  // Yellow
  { x: 11, y: 19 },
  { x: 9, y: 18 },
  { x: 7, y: 17 },
  { x: 5, y: 16 },
];

const coordsHome: CoordsList[] = [
  coordsHome1,
  coordsHome2,
  coordsHome3,
  coordsHome4,
];

const coordsFinish1: CoordsList = [
  // Red
  { x: 13, y: 6 },
  { x: 15, y: 7 },
  { x: 17, y: 8 },
  { x: 19, y: 9 },
];

const coordsFinish2: CoordsList = [
  // Green
  { x: 33, y: 6 },
  { x: 31, y: 7 },
  { x: 29, y: 8 },
  { x: 27, y: 9 },
];

const coordsFinish3: CoordsList = [
  // Blue
  { x: 33, y: 16 },
  { x: 31, y: 15 },
  { x: 29, y: 14 },
  { x: 27, y: 13 },
];

const coordsFinish4: CoordsList = [
  // Yellow
  { x: 19, y: 13 },
  { x: 17, y: 14 },
  { x: 15, y: 15 },
  { x: 13, y: 16 },
];

const coordsFinish: CoordsList[] = [
  coordsFinish1,
  coordsFinish2,
  coordsFinish3,
  coordsFinish4,
];

export const getCoord = (slot_type: SlotType, player: number, pos: number) => {
  let coordsList = [];

  if (slot_type == SlotType.home) {
    coordsList = coordsHome[player];
  } else if (slot_type == SlotType.finish) {
    coordsList = coordsFinish[player];
  } else {
    // slot_type in (SlotType.path, SlotType.start, SlotType.end)
    coordsList = coordsPath[player];
  }
  return coordsList[pos];
};

export default Coords;
