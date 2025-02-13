export default interface UserInfoInterface {
  userWishListCount: number;
  userCartCount: number;
  customerName: string;
  primaryCardNumber: string;
  tier: string;
  walletNumber: string;
  productQAIndex: string;
  city: string;
  pincode: string;
  geoLat: number;
  geoLong: number;
  profileImage: string;
  userEmail: string;
  tierText: string;
  tierLogo: string;
  state: string;
  dob: string;
  cardValidDate: any;
  storeMode: boolean;
  storeName: string;
  storePath: string;
  storeCode: string;
  storeModeType: string;
  storeAddress: string;
  // isStoreModeAddToCartInitial:boolean;
  storeCords?: {
    lat: number;
    long: number;
  };
  storePincode?:number;
  acceptFCCConsent: boolean;
}
