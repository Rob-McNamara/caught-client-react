// Token is a player's piece

//import Colour, {colourBackGround} from "../../models/colour"
import Colour from "../colour";

export interface TokenDetails {
  player_number: number;
  piece_number: number;
  slot_index: number;
  colour: Colour;
}

export const tokenEmpty: TokenDetails = {
  player_number: 0,
  piece_number: 0,
  slot_index: 0,
  colour: Colour.Grey,
};

export function isTokenEmpty({
  player_number,
  piece_number,
  slot_index,
  colour,
}: TokenDetails) {
  return (
    player_number === tokenEmpty.player_number &&
    piece_number === tokenEmpty.piece_number &&
    slot_index === tokenEmpty.slot_index &&
    colour === tokenEmpty.colour
  );
}

// Ideally 'occupied' tokens should have an inner circle (colour of token)
const Token = (token: TokenDetails) => {
  return (
    <>
      {isTokenEmpty(token) && ""}
      {!isTokenEmpty(token) && token.piece_number}
    </>
  );
};

export default Token;
