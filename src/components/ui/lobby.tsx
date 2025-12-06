import { useState, useEffect } from "react";
import {
  apiNewGame,
  apiJoinGame,
  apiAddPlayer,
  apiLobby,
  lobby,
} from "../../api";

export const [inLobby, setInLobby] = useState<boolean | null>(null);

export default function WaitInLobby() {
  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [gameName, setGameName] = useState("");
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    if (gameId) {
      const fetchPlayers = async () => {
        apiLobby(gameId);
        // const response = await fetch(`http://localhost:4000/lobby/${lobbyId}`);
        // const data = await response.json();
        if (lobby) {
          setPlayers(lobby.names);
        }
      };
      fetchPlayers();
      if (lobby && lobby.waiting) {
        const interval = setInterval(fetchPlayers, 1000);
        return () => clearInterval(interval);
      } else {
        setInLobby(false);
        return;
      }
    }
  }, [gameId]);

  const newGame = async () => {
    if (gameName && playerName) {
      await apiNewGame(gameName, 4);
      await apiAddPlayer(playerName);
      //  const response = await fetch("http://localhost:4000/register", {
      //    method: "POST",
      //    headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify({ name: playerName }),
      //  });
      //  const data = await response.json();
      setGameId(gameName);
      //  setPlayers(data.players);
    }
  };

  const joinGame = async () => {
    if (gameName && playerName) {
      await apiJoinGame(gameName);
      await apiAddPlayer(playerName);
      //     const response = await fetch("http://localhost:4000/register", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ name: playerName }),
      //   });
      //   const data = await response.json();
      setGameId(gameName);
      //   setPlayers(data.players);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Game Lobby</h2>
      {!gameId ? (
        <div>
          <input
            type="text"
            placeholder="Enter game name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border p-2"
          />
          <button onClick={newGame} className="ml-2 p-2 bg-blue-500 text-white">
            New Game
          </button>
          <button
            onClick={joinGame}
            className="ml-2 p-2 bg-blue-500 text-white"
          >
            Join Game
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
