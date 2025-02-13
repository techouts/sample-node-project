export type FIND_NEAR_STORES = {
  id: number;
  storeName: string;
};

export type STORE_ADDRESS = {
  id: number;
  particularStoreTitle: string;
  storeName: string;
  village: string;
  streetName: string;
  platName: string;
  storePincode: string;
  phoneNumber: number | string;
};

export default interface MACServiceNearStoreSchema {
  filterImage: string;
  filterText: string;
  findNearStoreTitle: string;
  findNearStores: FIND_NEAR_STORES[];
  StoreAddress: STORE_ADDRESS[];
}
