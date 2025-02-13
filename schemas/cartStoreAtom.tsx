export default interface CartStoreInterface {
  cartItems: any;
  storeId: any;
  standardDeliveryDate: any;
  expressDeliveryDate: any;
  currentDeliveryMode: any;
  userAddresses: any;
  userDeliveryAddress: UserDeliveryAddressInterface;
  serviceabilityStores: any;
  serviceability: ServiceableInterface;
  serviceableProducts: ServiceableProducts;
  previousCartCount: number;
  isCartUpdated: boolean;
}

export interface ServiceableInterface {
  sd: Boolean | undefined;
  cc: Boolean | undefined;
  ed: Boolean | undefined;
}

export interface UserDeliveryAddressInterface {
  sd: DeliveryAddress;
  cc: DeliveryAddress;
  ed: DeliveryAddress;
}

export interface DeliveryAddress {
  billingAddress: any;
  shippingAddress?: any;
}

export interface ServiceableProducts {
  cc: any;
  non_cc: any;
}
