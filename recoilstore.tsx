import { atom, selector } from "recoil";
import UserInfoInterface from "./schemas/userInfoAtom";
import {
  USER_INFO,
  USER_DATA,
  CART_STORE,
  CART_DATA,
  SSBLOGOS_DATA,
  SSBLOGOS_STORE,
  PLP_BREADCRUMBS,
  PLP_BREADCRUMBS_Store,
  PLP_BREADCRUMBS_BRANDS,
  PLP_BREADCRUMBS_Store_BRANDS,
  PLP_SCHEMAS,
  PLP_SCHEMAS_DATA,
  BEAUTY_PROFILE,
  BEAUTY_PROFILE_STORE,
  SSB_STORE_IMAGES_DATA
} from "./utility/RecoilConstants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
import { Cookies } from "react-cookie";
import CartStoreInterface from "./schemas/cartStoreAtom";
const cookie = new Cookies();

export const userState = atom<UserInfoInterface>({
  key: USER_DATA,
  default: {} as UserInfoInterface,
  effects_UNSTABLE: [persistAtom],
});

export const userInfo = selector<UserInfoInterface>({
  key: USER_INFO,
  get: ({ get }) => ({
    userWishListCount: get(userState).userWishListCount,
    userCartCount: get(userState).userCartCount,
    customerName: get(userState).customerName,
    primaryCardNumber: get(userState).primaryCardNumber,
    tier: get(userState).tier,
    tierLogo: get(userState).tierLogo,
    tierText: get(userState).tierText,
    walletNumber: get(userState).walletNumber,
    productQAIndex: get(userState).productQAIndex,
    city: get(userState).city,
    pincode: get(userState).pincode,
    geoLat: get(userState).geoLat,
    geoLong: get(userState).geoLong,
    profileImage: get(userState).profileImage,
    userEmail: get(userState).userEmail,
    state: get(userState).state,
    dob: get(userState).dob,
    cardValidDate:get(userState).cardValidDate,
    storeMode:get(userState).storeMode,
    storeName: get(userState).storeName,
    storePath: get(userState).storePath,
    storeCode: get(userState).storeCode,
    storeModeType: get(userState).storeModeType,
    storeAddress: get(userState).storeAddress,
    // isStoreModeAddToCartInitial:get(userState).isStoreModeAddToCartInitial,
    storeCords: get(userState).storeCords,
    storePincode:get(userState).storePincode,
    acceptFCCConsent: get(userState).acceptFCCConsent
  }),
});

export const cartState = atom<CartStoreInterface>({
  key: CART_STORE,
  default: {} as CartStoreInterface,
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const cartStateSelector = selector<any>({
  key: CART_DATA,
  get: ({ get }) => {
    cartItems: get(cartState).cartItems;
    storeId: get(cartState).storeId;
    standardDeliveryDate: get(cartState).standardDeliveryDate;
    expressDeliveryDate: get(cartState).expressDeliveryDate;
    currentDeliveryMode: get(cartState).currentDeliveryMode;
    userAddresses: get(cartState).userAddresses;
    userDeliveryAddress: get(cartState).userDeliveryAddress;
    serviceabilityStores: get(cartState).serviceabilityStores;
    serviceability: get(cartState).serviceability;
    serviceableProducts: get(cartState).serviceableProducts;
    previousCartCount: get(cartState).previousCartCount;
    isCartUpdated:get(cartState).isCartUpdated;
  },
});

export const SSBLogos = atom<any>({
  key: SSBLOGOS_DATA,
  default: {} as any,
  effects_UNSTABLE: [persistAtom],
});

export const SSBStoreImages = atom<any>({
  key: SSB_STORE_IMAGES_DATA,
  default: {} as any,
  effects_UNSTABLE: [persistAtom],
});

export const SSBLogosStoreData = selector<any>({
  key: SSBLOGOS_STORE,
  get: ({ get }) => ({
    appLogos: get(SSBLogos).appLogos,
  }),
});

export const beautyProfileData = atom<any>({
  key: BEAUTY_PROFILE,
  default: {} as any,
  effects_UNSTABLE: [persistAtom],
});


export const beautyProfileStoreData = selector<any>({
  key: BEAUTY_PROFILE_STORE,
  get: ({ get }) => ({
    beautyProfile: get(beautyProfileData).beautyProfile,
  }),
});


export const categoriesData = atom<any>({
  key: PLP_BREADCRUMBS,
  default: {} as any,
  effects_UNSTABLE: [persistAtom],
});

export const plpBreadCrumbsData  = selector<any>({
  key: PLP_BREADCRUMBS_Store,
  get: ({ get }) => ({
    categories: get(categoriesData).categories,
  }),
});

export const brandsData = atom<any>({
  key: PLP_BREADCRUMBS_BRANDS,
  default: {} as any,
  effects_UNSTABLE: [persistAtom],
});

export const plpBreadCrumbsbrandData  = selector<any>({
  key: PLP_BREADCRUMBS_Store_BRANDS,
  get: ({ get }) => ({
    brands: get(brandsData).brands,
  }),
});

export const plpSchemaData = atom<any>({
  key: PLP_SCHEMAS,
  default: {} as any,
  effects_UNSTABLE: [persistAtom],
});

export const plpSchemaProductsData  = selector<any>({
  key: PLP_SCHEMAS_DATA,
  get: ({ get }) => ({
    schemaStructureData: get(plpSchemaData).schemaStructureData,
  }),
});

export const storeSelectorModalStateHandler = atom<boolean>({
  key: 'modalState', 
  default: false,
});

export const loaderStateHandler = atom<boolean>({
  key: 'loaderState', 
  default: false,
});