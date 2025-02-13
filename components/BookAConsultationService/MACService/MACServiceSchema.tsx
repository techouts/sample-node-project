export type SERVICES_LIST = {
  id: number;
  serviceType: string;
};

export default interface MACServiceSchema {
  expandMoreImage: string;
  titleTextMAC: string;
  listOfServices: SERVICES_LIST[];
}
