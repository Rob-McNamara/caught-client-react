import { useState, useEffect } from "react";

export default function Lobby() {
 const [players, setPlayers] = useState<string[]>([]);
 const [playerName, setPlayerName] = useState("");
 const [lobbyId, setLobbyId] = useState<string | null>(null);

 useEffect(() => {
   if (lobbyId) {
     const fetchPlayers = async () => {
       const response = await fetch(`http://localhost:4000/lobby/${lobbyId}`);
       const data = await response.json();
       setPlayers(data.players);
     };

     fetchPlayers();
     const interval = setInterval(fetchPlayers, 3000);
     return () => clearInterval(interval);
   }
 }, [lobbyId]);

 const register = async () => {
   if (playerName) {
     const response = await fetch("http://localhost:4000/register", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name: playerName }),
     });
     const data = await response.json();
     setLobbyId(data.lobbyId);
     setPlayers(data.players);
   }
 };

 return (
   <div className="p-4">
     <h1 className="text-xl font-bold">Game Lobby</h1>
     {!lobbyId ? (
       <div>
         <input
           type="text"
           placeholder="Enter your name"
           value={playerName}
           onChange={(e) => setPlayerName(e.target.value)}
           className="border p-2"
         />
         <button onClick={register} className="ml-2 p-2 bg-blue-500 text-white">
           Register
         </button>
       </div>
     ) : (
       <div>
         <h2>Lobby ID: {lobbyId}</h2>
         <h3>Players:</h3>
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
