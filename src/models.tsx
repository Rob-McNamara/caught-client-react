//! # Models
//! 
//! Objects used by the Client application for the Caught Game

/// **Token object**
/// - *(player_index, piece_index)*
/// - identifies both the piece and the player it belongs to.
/// - struggled to think of a better name (than token)
/// - stores the values as indexes (zero based)
/// - contains functions to return the number (one based) equivalents
export interface Token {
    player_index: number,
    piece_index: number,
}

/// **Token Position Object***
/// - contains the token and a slot index position
/// - the slot index could relate to current or future position
export interface TokenPos {
    slot_index: number,
    token: Token,
}

/// **Enum to identify the occupancy state of the slot**
/// - Occupied states will also include token details
/// - A Token contains *(player_index, piece_index)*
// export enum SlotState {
//     Vacant,
//     Occupied(Token),
// }

/// **Move Details Object**
/// - desribes the last move
/// - designed so that the server can record the details
/// - and the client can display the details
/// - implemented as a tuple
export interface MoveDetails{
    token: Token,
    dice_value: number,
    occupied?: Token,
//    slot_state: SlotState,
}

/// **Slot Indexes Object**
/// - A group (tuple) of slot indexes specific to an individual player
/// - Identifies the first home, start, end and first finish slots
export interface Indexes{
    home: number,
    start: number,
    end: number,
    finish: number,
}



/// **Player Object**
/// - the player details on the Client side
/// - Server side object is called PlayerS
/// - Player numbers/indexes should be consistent between Server and Client
/// - if 'local' is false, then player is controlled by a different client
export interface Player {
    id: string,
    number: number,
    name: string,
    colour: Colour,
    is_local: boolean,
    is_computer: boolean,
}