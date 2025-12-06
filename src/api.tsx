//import { useState, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/game";

// --------- INPUT JSON OBJECTS ---------
// Data transferred from Client to Server via JSON
// API prefix indicates JSON data, do not use outside of API

// interface ApiNewGame {
//     name: string,
//     piece_count: number,
// }

// interface ApiNewPlayer {
//     name: string,
// }

// interface ApiRemotePlayerRef {
//     player_number: number,
// }

// interface ApiPieceRef {
//     piece_number: number,
// }

// --------- OUTPUT JSON OBJECTS ---------
// Data returned to Client from Server via JSON
// API prefix indicates JSON data, do not use outside of API

export interface ApiSlotIndexes {
    home: number,
    start: number,
    end: number,
    finish: number,
}

export interface ApiPlayerDetails {
    number: number,
    name: string,
    indexes: ApiSlotIndexes,
    is_computer: boolean,
}

export interface ApiTokenRef {
    player_number: number,
    piece_number: number,
}

export interface ApiTokenPosition {
    slot_index: number,
    token: ApiTokenRef,
}

interface ApiGameDetails {
    game_id: string,
    client_id: string,
    piece_count: number,
}

export interface ApiLobby {
    waiting: boolean,
    names: string[],
}

export interface ApiGameStart {
    player_turn: number,
    player_details: ApiPlayerDetails[],
}

export interface ApiGameState {
    still_going: boolean,
    player_turn: number,
    token_positions: ApiTokenPosition[],
}

export interface ApiPlayerRef {
    player_id: String,
    player_number: number,
}

export interface ApiMoveDetails {
    token: ApiTokenRef,
    dice_value: number,
    //occupied: Option<ApiTokenRef>,
    occupied: ApiTokenRef,
}

export const [gameDetails, setGameDetails] = useState<ApiGameDetails | null>(null);
export const [lobby, setLobby] = useState<ApiLobby | null>(null);
export const [playerRef, setPlayerRef] = useState<ApiPlayerRef | null>(null);
export const [gameStart, setGameStart] = useState<ApiGameStart | null>(null);
export const [gameState, setGameState] = useState<ApiGameState | null>(null);
export const [diceRoll, setDiceRoll] = useState<number | null>(null);
export const [moveOptions, setMoveOptions] = useState<number[] | null>(null);
export const [moveDetails, setMoveDetails] = useState<ApiMoveDetails | null>(null);
export const [standings, setStandings]  = useState<number[] | null>(null);

const apiHeaders = () => {
    if (gameDetails === undefined) {
        throw new Error("Game Details (game_id/client_id) has not been defined");
    }
    else if (! gameDetails) {
        throw new Error("Game Details (game_id/client_id) have not been set");
    }
    return { headers: { game_id: gameDetails.game_id, client_id: gameDetails.client_id } };
};

/// post "/new-game" ApiNewGame ApiGameDetails
export const apiNewGame = async (game_name: string, piece_count: number) => {
    try {
        const response = await axios.post<ApiGameDetails>(`${API_URL}/new-game`, { game_name, piece_count });
        if (response.data && response.data.game_id !== undefined) {
            setGameDetails(response.data);
        } else {
            console.error("Unexpected response structure for new-game", response.data);
        }
    } catch (error) {
        console.error("Error creating new game '" + game_name + "'", error);
    }
};

/// get "/join-game/\<game-name\>" ApiGameDetails
export const apiJoinGame = async (game_name: string) => {
    try {
        const response = await axios.get<ApiGameDetails>(`${API_URL}/join-game/` + game_name);
        if (response.data && response.data.game_id !== undefined) {
            setGameDetails(response.data);
        } else {
            console.error("Unexpected response structure for join-game", response.data);
        }
    } catch (error) {
        console.error("Error joining game '" + game_name + "'", error);
    }
};

/// get "/lobby" [ game_id / client_id ] ApiLobby
export const apiLobby = async (game_name: string): Promise<ApiLobby> => {
    let lobby: ApiLobby = { waiting: false, names: [] };
    try {
        const response = await axios.get<ApiLobby>(`${API_URL}/lobby/` + game_name, apiHeaders());
        if (response.data && response.data.waiting !== undefined) {
            lobby = response.data;
            //setLobby(response.data);
        } else {
            console.error("Unexpected response structure for lobby", response.data);
        }
    } catch (error) {
        console.error("Error getting Lobby for game '" + game_name + "'", error);
    }
    return lobby;
};

/// get "/start-game" [ game_id / client_id ] ApiGameStart
export const apiStartGame = async () => {
    try {
        const response = await axios.get<ApiGameStart>(`${API_URL}/start-game`, apiHeaders());
        if (response.data && response.data.player_turn !== undefined) {
            setGameStart(response.data);
        } else {
            console.error("Unexpected response structure for start-game", response.data);
        }
    } catch (error) {
        console.error("Error getting StartGame", error);
    }
};

/// get "/start-list" [ game_id / client_id ] ApiGameStart
export const apiStartList = async () => {
    try {
        const response = await axios.get<ApiGameStart>(`${API_URL}/start-list`, apiHeaders());
        if (response.data && response.data.player_turn !== undefined) {
            setGameStart(response.data);
        } else {
            console.error("Unexpected response structure for start-list", response.data);
        }
    } catch (error) {
        console.error("Error getting StartList", error);
    }
};

/// get "/game-state" [ game_id / client_id ] ApiGameState
export const apiGameState = async () => {
    try {
        const response = await axios.get<ApiGameState>(`${API_URL}/game-state`, apiHeaders());
        if (response.data && response.data.still_going !== undefined) {
            setGameState(response.data);
        } else {
            console.error("Unexpected response structure for game-state", response.data);
        }
    } catch (error) {
        console.error("Error getting GameState", error);
    }
};

/// post "add-player" [ game_id / client_id ] ApiNewPlayer ApiPlayerRef
export const apiAddPlayer = async (player_name: string) => {
    try {
        const response = await axios.post<ApiPlayerRef>(`${API_URL}/add-player`, { player_name }, apiHeaders());
        if (response.data && response.data.player_id !== undefined) {
            setPlayerRef(response.data);
        } else {
           console.error("Unexpected response structure for add-player", response.data);
        }
    } catch (error) {
        console.error("Error adding new player", error);
    }
};

/// get "/roll-dice" [ game_id / client_id ] usize
export const apiRollDice = async () => {
    try {
        const response = await axios.get<number>(`${API_URL}/roll-dice`, apiHeaders());
        if (response.data && response.data > 0) {
            setDiceRoll(response.data);
        } else {
            console.error("Unexpected response structure for roll-dice", response.data);
        }
    } catch (error) {
        console.error("Error getting RollDice", error);
    }
};

/// get "/move-options" [ game_id / client_id ] Vec<usize>
export const apiMoveOptions = async () => {
    try {
        const response = await axios.get<number[]>(`${API_URL}/move-options`, apiHeaders());
        if (response.data) {
            setMoveOptions(response.data);
        } else {
            console.error("Unexpected response structure for move-options", response.data);
        }
    } catch (error) {
        console.error("Error getting MoveOptions", error);
    }
};

/// put "/move-piece" [ game_id / client_id ] ApiPieceRef Option<MoveDetails>
export const apiMovePiece = async (piece_number: number) => {
    try {
        const response = await axios.put<ApiMoveDetails>(`${API_URL}/move-piece`, {piece_number}, apiHeaders());
        if (response.data) {
            setMoveDetails(response.data);
        } else {
            console.error("Unexpected response structure for move-piece", response.data);
        }
    } catch (error) {
        console.error("Error putting MovePiece", error);
    }
};

/// get "/skip-move" [ game_id / client_id ] <Option<MoveDetails>
export const apiSkipMove = async () => {
    try {
        const response = await axios.get<ApiMoveDetails>(`${API_URL}/skip-move`, apiHeaders());
        if (response.data) {
            setMoveDetails(response.data);
        } else {
            console.error("Unexpected response structure for skip-move", response.data);
        }
    } catch (error) {
        console.error("Error getting SkipMove", error);
    }
};

/// put "/remote-player-move" [ game_id / client_id ] ApiRemotePlayerRef Option<MoveDetails>
export const apiRemotePlayerMove = async (player_number: number) => {
    try {
        const response = await axios.put<ApiMoveDetails>(`${API_URL}/remote-player-move`, {player_number}, apiHeaders());
        if (response.data) {
            setMoveDetails(response.data);
        } else {
            console.error("Unexpected response structure for remote-player-move", response.data);
        }
    } catch (error) {
        console.error("Error RemotePlayerMove", error);
    }
}

/// get "/final-standings" [ game_id / client_id ] Vec<usize>
export const apiFinalStandings = async () => {
    try {
        const response = await axios.get<number[]>(`${API_URL}/final-standings`, apiHeaders());
        if (response.data) {
            setStandings(response.data);
        } else {
            console.error("Unexpected response structure for final-standings", response.data);
        }
    } catch (error) {
        console.error("Error getting FinalStandings", error);
    }
};