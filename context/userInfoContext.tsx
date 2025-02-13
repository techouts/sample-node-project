import { createContext, useContext, useState } from "react";
import { Cookies } from "react-cookie";


export type userInfoContextType = {
  contextData: {
    contextUserWishListCount: number;
    contextUserCartCount: number;
    contextCustomer_Name: string;
    openSSO:boolean;
  };
  updateContextData: Function;
};

export const UserInfoContext = createContext<userInfoContextType | any>(null);

export function ContextAppWrapper({ children }: any) {
  const cookie = new Cookies();
  const [contextData, setContextData] = useState({
    contextUserWishListCount: cookie.get("userWishListCount") ? cookie.get("userWishListCount") : 0,
    contextUserCartCount: cookie.get("userCartCount") ? cookie.get("userCartCount") : 0,
    contextCustomer_Name: cookie.get("customer_Name") ? cookie.get("customer_Name") : "",
    openSSO:false,
  });
  const updateContextData = (currentData: any) => {
    setContextData((prvData) => ({
      ...prvData,
      ...currentData,
    }));
  };

  return (
    <UserInfoContext.Provider value={{ contextData, updateContextData }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useAppContext() {
  return useContext(UserInfoContext);
}
