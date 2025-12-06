import { GiDiceSixFacesSix, GiDiceSixFacesFive, GiDiceSixFacesFour, GiDiceSixFacesThree, GiDiceSixFacesTwo, GiDiceSixFacesOne } from "react-icons/gi";

export interface DiceDetails {
  dice_value: number;
}

function Dice({ dice_value }: DiceDetails) {
  return <div>
    {dice_value == 6 && <GiDiceSixFacesSix />}
    {dice_value == 5 && <GiDiceSixFacesFive />}
    {dice_value == 4 && <GiDiceSixFacesFour />}
    {dice_value == 3 && <GiDiceSixFacesThree />}
    {dice_value == 2 && <GiDiceSixFacesTwo />}
    {dice_value == 1 && <GiDiceSixFacesOne />}
  </div>
}

export default Dice