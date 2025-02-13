type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type BUTTON = {
  ctaLabel: string; // type: string  (button label)
  disable: boolean; // type: boolean  (true || false) to disable button
  primaryTextColor: RGB | RGBA | HEX; // type: hex   ( hex color code) text color
  secondaryTextColor: RGB | RGBA | HEX; // type: hex   ( hex color code) text color
  primaryColor: RGB | RGBA | HEX; // type: hex   ( hex color code) button bg color
  secondaryColor: RGB | RGBA | HEX; // type: hex   ( hex color code) button bg color
  primaryEndIcon: string; // type: string (image path/url) to append any icon to the button
  primaryStartIcon: string; // type: string (image path/url) to append any icon to the button
  secondaryEndIcon: string; // type: string (image path/url) to append any icon to the button
  secondaryStartIcon: string; // type: string (image path/url) to append any icon to the button
  secondaryButtonLabel: string; // type: string  (button label)
  dualButtonDirection: "column" | "row"; //type: string (row || column) to align buttons in row/column
  buttonAllignment: string; //type: string (right || left || center) to align buttons to right/left/center
  secondaryButtonDisable: false; // type: boolean  (true || false) to disable button
  secondaryButtonDisplayIcon: false; // type: boolean  (true || false) to append any icon to the button
  secondaryButtonIconPosition: string; // type: string (image path/url) to append any icon to the button
  primaryVariant: "contained" | "text" | "outlined"; //type: string || text || outlined || contained
  secondaryVariant: "contained" | "text" | "outlined"; //type: string || text || outlined || contained
  size: "small" | "medium" | "large"; //type: string "small" | "medium" | "large"
  handleButtonClick: Function;
};

export default interface ButtomInterface {
  type: string;
  interface: BUTTON;
}
