// Colour Enumeration
// - represents Player and Slot colours
// - grey is an independant colour not associated with any player

// list of colours
enum Colour {
  Red,
  Green,
  Blue,
  Yellow,
  Grey,
}

// text (in string format) of the colour name
export const colourText = (colour: Colour): string => {
  let text = "grey"; // default
  if (colour == Colour.Red) {
    text = "red";
  } else if (colour == Colour.Green) {
    text = "grean";
  } else if (colour == Colour.Blue) {
    text = "blue";
  } else if (colour == Colour.Yellow) {
    text = "yellow";
  }
  return text;
};

// gets the colour name and converts it into a background colour code
export const colourBackGround = (colour: Colour): string => {
  let text: string = colourText(colour);
  return "bg-${text}-500";
};

export default Colour;
