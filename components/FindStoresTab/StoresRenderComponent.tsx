import React, { useEffect, useState } from "react";
import FindStores from "./FindStores";
import ParticularStore from "./ParticularStore";
import Loader from "../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import SignInComponent from "../SigninComponent/SignInComponent";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";

const StoresRenderComponent = (props: any) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [displayLoader, setLoader] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [reRender, setReRender] = useState(false);
  const handleClosed = () => {
    setSignInOpen(false);
  };

  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
  
  return (
    <>
      {displayLoader && <Loader />}
      {selectedStore ? (
        <ParticularStore
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          bgColor={props?.bgColor}
          bgPadding={props?.bgPadding}
          consultationButtonPath={props?.consultationButtonPath}
          setLoader={setLoader} 
          setSignInOpen = {setSignInOpen}
        />
      ) : (
        <FindStores
          {...props}
          setSelectedStore={setSelectedStore}
          setLoader={setLoader}
          setSignInOpen = {setSignInOpen}
          displayLoader={displayLoader}
        />
      )}
       <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleClosed}
      >
        <SignInComponent
          handleClosed={handleClosed}
          initialScreen={true}
          CustomerID={CustomerID}
          setCustomerID={setCustomerID}
          setReRender={setReRender}
          setLoader={setLoader}
        />
      </BootstrapDialog>
    </>
  );
};

export default StoresRenderComponent;
