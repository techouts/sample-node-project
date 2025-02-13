export type CITY_LIST = {
  id: number;
  cityName: string;
  storeAddress?: PARTICULAR_STORE_ADDRESS[];
};

export type PARTICULAR_STORE_ADDRESS = {
  id?: number;
  particularStoreTitle?: string;
  storeName?: string;
  village?: string;
  streetName?: string;
  platName?: string;
  storePincode?: string;
  phoneNumber?: string;
};

export default interface MACServiceLocationSchema {
  searchImage: string;
  expandMoreImage: string;
  locationTitle: string;
  listOfCities: CITY_LIST[];
}
