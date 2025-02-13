import React, { useEffect, useState } from "react";
import MyWalletAdvantages from "./MyWalletAdvantages";
import datainfo from "../../JSON/Mywallet/Mywallet.json";
import { MywalletBalance } from "../../graphQLQueries/MywalletQuery";
import { useMobileCheck } from "../../utility/isMobile";
import graphql from "../../middleware-graphql";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import Loader from "../../HOC/Loader/Loader";
import client from "../../apollo-client";
import { FETCH_CUSTOMER_WALLET } from "../../graphQLQueries/MyProfileQuery";
import handleErrorResponse from "../../utility/ErrorHandling";

function MyMainWallet(props: any) {
  const [bucketData, setBucketData] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [hasWallet, setHasWallet] = useState(true);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [refreshAfterCreate, setRefreshAfterCreate] = useState(true);
  const handle = () => {
    setHasWallet(false);
  };

  const fetchCustomerWalletQuery = async () => {
    client
      .query({
        query: FETCH_CUSTOMER_WALLET,
        fetchPolicy: "no-cache",
      })
      .then((response: any) => {
        setIsLoaded(false);
        setUserDataItems({
          ...userDataItems,
          walletNumber: response?.data?.customer?.wallet_number,
        });
        if (
          response?.data?.customer?.wallet_number &&
          response?.data?.customer?.wallet_number !== "na"
        ) {
          setHasWallet(true);
          getWalletBalan();
        } else {
          setHasWallet(false);
        }
      })
      .catch((error: any) => {
        setIsLoaded(false);
        console.log(error);
      });
  };

  const getWalletBalan = async () => {
    await graphql
      .query({
        query: MywalletBalance,
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        console.log(res?.data);
        setIsLoaded(false);
        setBucketData({
          ...JSON.parse(JSON.stringify(res?.data?.getWalletBalance)),
        });
      })
      .catch((err) => {
        setIsLoaded(false);
        setHasWallet(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (
      userDataItems?.walletNumber &&
      userDataItems?.walletNumber != "na" &&
      typeof JSON.parse(userDataItems?.walletNumber) != "undefined" &&
      userDataItems?.walletNumber.length > 5
    ) {
      setHasWallet(true);
      getWalletBalan();
    } else {
      fetchCustomerWalletQuery();
    }
  }, [refreshAfterCreate]);
  const isMobile = useMobileCheck();
  return (
    <>
      {isLoaded && <Loader />}
      {isMobile ? (
        <div style={{ padding: "5px 16px 20px 16px" }}>
          <MyWalletAdvantages
            props={props}
            data={datainfo}
            getWalletBalan={getWalletBalan}
            bucketDataa={bucketData}
            setRefreshAfterCreate={setRefreshAfterCreate}
            walletUser={hasWallet}
            handleWallet={handle}
          />
        </div>
      ) : (
        <div>
          <MyWalletAdvantages
            props={props}
            data={datainfo}
            bucketDataa={bucketData}
            getWalletBalan={getWalletBalan}
            setRefreshAfterCreate={setRefreshAfterCreate}
            walletUser={hasWallet}
            handleWallet={handle}
          />
        </div>
      )}
    </>
  );
}

export default MyMainWallet;
