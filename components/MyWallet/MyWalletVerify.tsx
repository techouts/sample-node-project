import React from "react";
import Mywallet from "./Mywallet";

type proptype = {
  titleOne: string;
  setRefreshAfterCreate: () => any;
  getWalletBalan: any;
  cartItems:any;
};
function MyWalletVerify(props: proptype) {
  return (
    <Mywallet
      titleOne={props?.titleOne}
      titleTwo=""
      setRefreshAfterCreate={props.setRefreshAfterCreate}
      typoit={true}
      cartItems={props?.cartItems}
    ></Mywallet>
  );
}

export default MyWalletVerify;
