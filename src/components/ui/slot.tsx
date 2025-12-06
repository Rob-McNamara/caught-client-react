// Slot is a area on the board that can be occupied by pieces/tokens
// There are several types of slots
// - home slots: where a player's tokens start (specific to a player colour)
// - finish slots: target destination for player tokens
// - path slots: the slots between home and finish (can be captured on these slots)
// - start slots: first path slot after home (different start slot for each player)
// - end slots: last path slot before finish (different start slot for each player)
// - mid slots: mid paths slot, not yet implemented

import Token, { TokenDetails, tokenEmpty } from "./token";
import Coords, { getCoord } from "../coords";
import { colourBackGround } from "../colour";
import Indexes from "../indexes";

export enum SlotType {
  home,
  start,
  path,
  end,
  finish,
}

export interface SlotDetails {
  index: number;
  type: SlotType;
  coords: Coords;
  occupied: TokenDetails;
  isMoveValid: boolean;
}

const slotNew = (
  slot_index: number,
  slot_type: SlotType,
  slot_coords: Coords
): SlotDetails => {
  let slot: SlotDetails = {
    index: slot_index,
    type: slot_type,
    coords: slot_coords,
    occupied: tokenEmpty,
    isMoveValid: false,
  };
  return slot;
};

export const buildSlotList = (
  indexes: Indexes[],
  piece_count: number
): SlotDetails[] => {
  let slots = [];
  let player_count = indexes.length;
  let coords = { x: 0, y: 0 };
  let path_len = indexes[1].start - indexes[0].start;

  for (let i = 0; i < player_count; i++) {
    for (let j = 0; j < piece_count; j++) {
      coords = getCoord(SlotType.home, i, j);
      slots.push(slotNew(indexes[i].home + j, SlotType.home, coords));
      coords = getCoord(SlotType.finish, i, j);
      slots.push(slotNew(indexes[i].finish + j, SlotType.finish, coords));
    }

    let index = indexes[i].start;
    for (let k = 0; k < path_len; k++) {
      coords = getCoord(SlotType.path, i, k);
      slots.push(slotNew(index, SlotType.path, coords));
    }
  }
  return slots;
};

const Slot = (slot: SlotDetails) => {
  // maybe different shape for different slot types
  if (slot.type == SlotType.home) {
  } else if (slot.type == SlotType.start) {
  } else if (slot.type == SlotType.end) {
  } else if (slot.type == SlotType.finish) {
  } else {
    // (slot.type == SlotType.path)
  }

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${colourBackGround(
        slot.occupied.colour
      )}`}
      style={{ gridColumn: slot.coords.y + 1, gridRow: slot.coords.x + 1 }}
      {...Token(slot.occupied)}
    />
  );
};

export default Slot;
