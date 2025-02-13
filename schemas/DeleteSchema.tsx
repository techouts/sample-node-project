type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface DeleteInterface {
  _component: string;
  _id: number;
  bgPadding: string;
  bgColor: RGB | RGBA | HEX | string;
  delete: {
    deleteTitle: string;
    deleteSave: string;
    deleteCancel: string;
  };
}
