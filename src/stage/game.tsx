// Game Play

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/game";

interface Player {
  pieces: number[];
}

interface GameState {
  players: Player[];
}

interface RollResponse {
  dice: number;
}

export default function PlayGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await axios.get<GameState>(`${API_URL}/state`);
      setGameState(response.data);
    } catch (error) {
      console.error("Error fetching game state", error);
    }
  };

  const rollDice = async () => {
    try {
      const response = await axios.post<RollResponse>(`${API_URL}/roll`);
      if (response.data && response.data.dice !== undefined) {
        setDiceRoll(response.data.dice);
      } else {
        console.error("Unexpected response structure", response.data);
      }
    } catch (error) {
      console.error("Error rolling dice", error);
    }
  };

  const movePiece = async (player: number, piece: number) => {
    try {
      const response = await axios.put<GameState>(`${API_URL}/move`, {
        player,
        piece,
      });
      setGameState(response.data);
    } catch (error) {
      console.error("Error moving piece", error);
    }
  };

  return (
    <div>
      <button onClick={rollDice} className="mt-2">
        Roll Dice
      </button>
      {diceRoll !== null && <p className="mt-2">Rolled: {diceRoll}</p>}
      {gameState && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Caught</h2>
          {gameState.players.map((player, index) => (
            <div key={index} className="mt-2">
              <h3 className="font-semibold">Player {index + 1}</h3>
              <div className="flex gap-2">
                {player.pieces.map((position, pieceIndex) => (
                  <button
                    key={pieceIndex}
                    onClick={() => movePiece(index, pieceIndex)}
                    className="p-2 border rounded-md"
                  >
                    Piece {pieceIndex + 1}: {position}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
