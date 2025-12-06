// Register with Game Server (and get a Game ID)
// - Enter player name
// - Either create New game or Join an existing game
// - If new game, then this client becomes Master

import { useState } from "react";
import { apiNewGame, apiJoinGame, apiAddPlayer } from "../api";

export const [isMaster, setAsMaster] = useState<boolean>(false);
export const [gameId, setGameId] = useState<string>(""); 

export default function Register() {
  //const [playerName, setPlayerName] = useState("");
  //const [gameName, setGameName] = useState("");

  let playerName: string = "";
  let gameName: string = "";

  const newGame = async () => {
    if (gameName != "" && playerName != "") {
      await apiNewGame(gameName, 4);
      await apiAddPlayer(playerName);
      setGameId(gameName);
      setAsMaster(true);
    }
  };

  const joinGame = async () => {
    if (gameName != "" && playerName != "") {
      await apiJoinGame(gameName);
      await apiAddPlayer(playerName);
      setGameId(gameName);
      setAsMaster(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Game Lobby</h2>
      <div>
        <input
          type="text"
          placeholder="Enter game name"
          value={gameName}
          //onChange={(e) => setGameName(e.target.value)}
          onChange={(e) => gameName = e.target.value}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => playerName = e.target.value}
          className="border p-2"
        />
        <button onClick={newGame} className="ml-2 p-2 bg-blue-500 text-white">
          New Game
        </button>
        <button onClick={joinGame} className="ml-2 p-2 bg-blue-500 text-white">
          Join Game
        </button>
      </div>
    </div>
  );
}
