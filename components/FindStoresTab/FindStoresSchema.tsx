import { ColorType } from "../../utility/ColorType";

export type CITY_LIST = {
  id: number;
  cityName: string;
};

export default interface FindStoresSchema {
  noStoresImgUrl: string;
  consultationButtonPath: string;
  noStoresTitle: string;
  noStoresSubTitle: string;
  storeTitle: string;
  storeTimingTitleText: string;
  directionText: string;
  searchImage: string;
  setSelectedStore: Function;
  expandMoreImage: string;
  listOfCities: CITY_LIST[];
  bgColor:ColorType;
  bgPadding:string;
  title:string;
  __component:string;
  position:number;
  id:number;
  setLoader:any;
  setSignInOpen:any;
  stateCityData:any
  displayLoader:boolean
}
