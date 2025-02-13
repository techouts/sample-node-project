type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;


export default interface BreadcrumbSchema {
    __component: string;
    id: string;
      bgColor: RGB | RGBA | HEX | string;
      bgPadding: string;
      levelOneText:string;
      levelTwoText:string; 
      levelThreeText:string;
      levelFourText:string;
      levelOnePath:string | URL;
      levelTwoPath:string | URL;
      levelThreePath:string | URL;
      levelFourPath:string | URL;
      isBlog: Boolean;

}