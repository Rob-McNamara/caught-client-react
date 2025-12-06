import { Player, MoveDetails } from "./models";

export interface GameState {
    players: Player[],
    next_player_number: number, // next player on client (maybe behind server)
    current_player_number: number, // current player on server
    dice_value: number,
    moves: MoveDetails[],
}

const isPlayerNew = (game_state: GameState, player_number: number) => {
    const found = game_state.players.find((player) => {
        return player.number === player_number;
    });
    if (found) {
        return false;
    } else {
        return true;
    }
};

const currentPlayer = (game_state: GameState) => {
    if (game_state.current_player_number <= 0 || game_state.current_player_number > game_state.players.length) {
        throw new Error("Invalid current_player_number in GameState");
    }
    return game_state.players[game_state.current_player_number];
};

export const isLocalTurn = (game_state: GameState) => {
    let player = currentPlayer(game_state);
    if (game_state.current_player_number === game_state.next_player_number && player.is_local) {
        return true
    }
    else {
        return false
    }
};

export const recordStartList = (game_state: GameState, first_player_number: number, players: Player[]) => {
    game_state.current_player_number = first_player_number;
    // filter out existing players
    const new_players = players.filter((player) => {
        return isPlayerNew(game_state, player.number);
    });
    // add new players
    new_players.forEach((player, _) => {
        game_state.players.push(player);
    });
    // re-sort the array (by player number) now that we have added remote players
    game_state.players.sort((a, b) => a.number - b.number);
};

export const updateTurn = (game_state: GameState, player_turn: number) => {
    game_state.current_player_number = player_turn;
    if (game_state.next_player_number === 0) {
        game_state.next_player_number = game_state.current_player_number;
    }
    else if (game_state.next_player_number > game_state.players.length) {
        game_state.next_player_number = 1;
    }
    else {
        game_state.next_player_number++;
    }
};

export const recordMove = (game_state: GameState, move_details: MoveDetails) => {
    game_state.dice_value = move_details.dice_value;
    game_state.moves.push(move_details);
};

export const clearOldMoves = (game_state: GameState) => {
    const move_count = game_state.moves.length;
    const player_count = game_state.players.length;
    if (move_count > player_count) {
        for (let i = 0; i < move_count - player_count; i++) {
            game_state.players.shift;
        }
    }
};



