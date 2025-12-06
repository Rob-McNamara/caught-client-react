// APPLICATION MAIN ENTRY POINT

import WaitInLobby, {isStartGame} from "./stage/lobby";
import Register, {gameId} from "./stage/register";
import PlayGame from "./stage/game";
import FinalStandings, { isStandings } from "./stage/standings";

export default function Caught() {

  const displayGameStage = () => {
    if (gameId == "") {
      return <i>{Register()}</i>
    }
    else if (! isStartGame) {
      return <i>{WaitInLobby()}</i>
    }
    else if (! isStandings) {
      return <i>{PlayGame()}</i>
    }
    else {
      return <i>{FinalStandings()}</i>
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Caught!</h1>
      {displayGameStage()}
    </div>
  );
}