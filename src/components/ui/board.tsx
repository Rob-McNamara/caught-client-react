//import { TokenDetails } from "./token";
//import {GameState} from "../../game-state";
import { DiceDetails } from "./dice";
import { SlotDetails, buildSlotList } from "./slot";
import { apiMovePiece } from "../../api";
import Indexes from "../indexes";
//import {TokenDetails} from "./token";

// this should be in game_state
const movePiece = async (slot: SlotDetails, dice_value: number) => {

  apiMovePiece(slot.occupied.piece_number);
};

export interface BoardDetails {
  dice: DiceDetails;
  slots: SlotDetails[];
}

export const InitBoard = (
  indexes: Indexes[],
  piece_count: number
): BoardDetails => {
  let board: BoardDetails = {
    dice: { dice_value: 0 },
    slots: buildSlotList(indexes, piece_count),
  };
  return board;
};

const Board = (board: BoardDetails) => {
  return (
    <>
      {board.slots.map((slot) => (
        // determine moveable (moveDetails)
        <button
          key={slot.index}
          onClick={() => movePiece(slot, board.dice.dice_value)}
          className="p-2 border rounded-md"
        >
          Slot(slot)
        </button>
      ))}
    </>
  );
};

export default Board;
