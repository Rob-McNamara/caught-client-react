import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Adjust server URL as needed

export default function Lobby() {
 const [players, setPlayers] = useState<string[]>([]);
 const [playerName, setPlayerName] = useState("");
 const [lobbyId, setLobbyId] = useState<string | null>(null);

 useEffect(() => {
   socket.on("lobbyUpdate", (updatedPlayers: string[]) => {
     setPlayers(updatedPlayers);
   });

   return () => {
     socket.off("lobbyUpdate");
   };
 }, []);

 const register = () => {
   if (playerName) {
     socket.emit("register", playerName, (lobby: string, currentPlayers: string[]) => {
       setLobbyId(lobby);
       setPlayers(currentPlayers);
     });
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
