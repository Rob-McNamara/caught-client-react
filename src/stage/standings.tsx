// Display Final standings
// - this is the end of the game

import { useState } from "react";
import { apiFinalStandings } from "../api";

export const [isStandings, setStandings] = useState<boolean>(false);

export default function FinalStandings() {
    apiFinalStandings();
    setStandings(false);
    return (<></>);
}