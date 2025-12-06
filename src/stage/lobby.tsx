// Wait in the Lobby for more players to join
// - must have already registered (and have Game ID)
// - already have local player name for this Client
// The lobby displays all players as they join
// - Master client can choose to start game
// - Missing player spots will be filled by computer
// - TODO: auto start once we have a full board of players

import { useState, useEffect } from "react";
import { gameId } from "./register";
import { apiLobby, lobby } from "../api";

export const [isStartGame, setStartGame] = useState<boolean>(false);

export default function WaitInLobby() {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (gameId != "") {
      const fetchPlayers = async () => {
        apiLobby(gameId);
        if (lobby) {
          setPlayers(lobby.names);
        }
      };
      fetchPlayers();
      if (lobby && lobby.waiting) {
        const interval = setInterval(fetchPlayers, 1000);
        return () => clearInterval(interval);
      } else {
        setStartGame(true);
        return;
      }
    }
  }, [gameId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Game Lobby</h2>
      <div>
        <h3>Game Name: {gameId}</h3>
        <h4>Players:</h4>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
        <p>Waiting for more players...</p>
      </div>
    </div>
  );
}
