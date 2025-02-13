import React, { useState } from "react";
import Smallbox from "./Smallbox";
import {
  AmtTypography,
  CheckTypography,
  AddBalButton,
  WalletTypography,
  marginSize,
  GridAftrVerify,
  gridBeforeVerify,
  MywalletAdvantagesSubtitle,
  SmallBoxStmtFontsize,
  ActivateWalletButton,
} from "./MyWalletStyles";
import {useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Mywallet from "./Mywallet";
import MyWalletVerify from "./MyWalletVerify";
import TotalBalance from "./TotalBalance";
import { useMobileCheck } from "../../utility/isMobile";
import ActivateSSWallet from "../../HOC/ActivateWallet/ActivateSSWallet";
import { event_type, widget_type } from "../../utility/GAConstants";
import { callEventBeautyProfileMyWallet } from "../BeautyProfile/BeautyProfileMyWallet";
import { Add_Wallet } from "../Profile/constant";
import { cartState } from "../../recoilstore";
import { useRecoilState } from "recoil";

function MyWalletAdvantages({
  data,
  bucketDataa,
  walletUser,
  setRefreshAfterCreate,
  props,
  getWalletBalan,
}: any) {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const { cartItems } = cartStore;
  const showCurrBal = false
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

  function noData(index: string) {
    if (typeof bucketDataa?.buckets == "undefined" || !bucketDataa?.buckets) {
      return 0;
    } else {
      try {
        let amtBkt = bucketDataa?.buckets.filter(
          (bucket: any) => bucket.type == index
        );
        return amtBkt[0].amount;
      } catch (err) {
        return 0;
      }
    }
  }

  let isCheck = useMobileCheck();
  function component() {
    return (
      <>
        <Grid
          container
          sx={marginSize}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={12} sm={12}>
            {isCheck ? (
              <CheckTypography>
                {data?.data?.checkecardorgift}
                <br /> {data?.data?.checkecardorgiftEGift}{" "}
              </CheckTypography>
            ) : (
              <CheckTypography>{data?.data?.checkGift} </CheckTypography>
            )}
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <AmtTypography>{data?.data?.amt}</AmtTypography>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
          </Grid>
          {walletUser ? (
            <Grid item xs={12} md={12} sm={12}>
              <AddBalButton
                onClick={() => {

                  callEventBeautyProfileMyWallet(
                    event_type,
                    widget_type,
                    data?.addNewGiftOrCheck,
                    Add_Wallet,
                    "",
                    "",
                    "",
                    cartItems
                  );
                }}
              >
                {Add_Wallet}
              </AddBalButton>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </>
    );
  }
  const [walletActivateState, setWalletActivateState] = useState(false);
  const [ChangeState, setChangeState] = useState(false);
  const [userWalletBalance, setUserWalletBalance] = useState(0);
  const userWalletActivate = () => {
    callEventBeautyProfileMyWallet(
      event_type,
      widget_type,
      data?.data?.walletAdvantages,
      data?.data?.activateWalletButton,
      "",
      "",
      data?.data?.walletAdvantagesDetails?.walletAdvantagesStatement,
      cartItems
    );
    setWalletActivateState(true);
  };
  const walletAdvantagesUI = () => {
    return (
      <Grid
        container
        alignItems="flex-start"
        sx={gridBeforeVerify}
        direction="row"
        justifyContent="space-evenly"
      >
        <Grid item xs={12} md={12} sm={12} justifyContent="center">
          <WalletTypography
            dcolor="#231F20"
            dfontweight="500"
            dfontsize="20px"
            dlineheight="24px"
            mfontsize="12px"
            mlineheight="14.65px"
            paddingBottom={{ xs: "7px", sm: "26px" }}
          >
            {props.title}
          </WalletTypography>
        </Grid>
        <Grid item xs={6} md={3} sm={6} justifyContent="center">
          <Smallbox
            image={props.items[0].icon}
            title={props.items[0].text.split("/")[0] + "/"}
            mainTitle={props.title}
            afterSlash={props.items[0].text.split("/")[1]}
          ></Smallbox>
        </Grid>
        <Grid item xs={6} md={3} sm={6}>
          <Smallbox
            image={props.items[1].icon}
            title={props.items[1].text}
            wid={"150px"}
            mainTitle={props.title}
          ></Smallbox>
        </Grid>
        <Grid item xs={6} md={3} sm={6}>
          <Smallbox
            image={props.items[2].icon}
            title={props.items[2].text.split("/")[0] + "/"}
            afterSlash={props.items[2].text.split("/")[1]}
            mainTitle={props.title}
          ></Smallbox>
        </Grid>
        <Grid item xs={6} md={3} sm={6}>
          <Smallbox
            image={props.items[3].icon}
            title={props.items[3].text}
            wid={"150px"}
            mainTitle={props.title}
          ></Smallbox>
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          {isLarge ? (
            <>
              <WalletTypography
                dcolor="#231F20"
                dfontweight="400"
                dfontsize="14px"
                dlineheight="17px"
                mfontsize="11px"
                mlineheight="13.12px"
                paddingTop={{ xs: "17px", sm: "23px" }}
              >
                {props.quote}
              </WalletTypography>

              <ActivateWalletButton
                onClick={() => {
                  userWalletActivate();
                  setChangeState(!ChangeState);
                }}
              >
                ACTIVATE WALLET
              </ActivateWalletButton>
              {walletActivateState && (
                <ActivateSSWallet
                  setUserWalletBalance={setUserWalletBalance}
                  userWalletActivate={userWalletActivate}
                  setChangeState={ChangeState}
                  setRefreshAfterCreate={setRefreshAfterCreate}
                />
              )}
            </>
          ) : (
            <>
              <ActivateWalletButton
                onClick={() => {
                  userWalletActivate();
                  setChangeState(!ChangeState);
                }}
              >
                {props.walletButton}
              </ActivateWalletButton>
              {walletActivateState && (
                <ActivateSSWallet
                  setRefreshAfterCreate={setRefreshAfterCreate}
                  setUserWalletBalance={setUserWalletBalance}
                  userWalletActivate={userWalletActivate}
                  setChangeState={ChangeState}
                />
              )}
              <p style={SmallBoxStmtFontsize}>{props.quote}</p>
            </>
          )}
        </Grid>
      </Grid>
    )
  }
  const activeWalletUI = () => {
    return (
      <>
        <TotalBalance consolidatedBal={bucketDataa?.wallet}></TotalBalance>
        <Grid
          sx={{
            ...GridAftrVerify,
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {isCheck ? (
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              justifyContent="center"
              paddingBottom={isCheck ? "30px" : "36px"}
            >
              <span style={MywalletAdvantagesSubtitle}>{props?.title}</span>
            </Grid>
          ) : (
            ""
          )}
          <Grid
            item
            xs={6}
            md={3}
            sm={6}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: isCheck ? "140px" : "190px",
              textAlign: "center",
            }}
          >
            <Smallbox
              block={false}
              wid={isCheck ? "140px" : "190px"}
              bckgrnd="white"
              heigh={isCheck ? "154px" : "195px"}
              textAlin="center"
              amt={noData("CUSTOMER")}
              image={props.items[0].icon}
              title={props.items[0].text.split("/")[0] + "/"}
              afterSlash={props.items[0].text.split("/")[1]}
            ></Smallbox>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            sm={6}
            sx={{
              width: isCheck ? "140px" : "190px",
            }}
          >
            <Smallbox
              block={true}
              wid={isCheck ? "140px" : "190px"}
              bckgrnd="white"
              heigh={isCheck ? "154px" : "195px"}
              textAlin="center"
              noSlashLineHeight="10px"
              amt={noData("CREDIT")}
              image={props.items[1].icon}
              title={props.items[1].text}
            ></Smallbox>
          </Grid>
          <Grid item xs={6} md={3} sm={6}>
            <Smallbox
              block={false}
              wid={isCheck ? "140px" : "190px"}
              bckgrnd="white"
              heigh={isCheck ? "154px" : "195px"}
              textAlin="center"
              amt={noData("PROMOTION")}
              image={props.items[2].icon}
              title={props.items[2].text.split("/")[0]}
            ></Smallbox>
          </Grid>
          <Grid item xs={6} md={3} sm={6}>
            <Smallbox
              wid={isCheck ? "140px" : "190px"}
              bckgrnd="white"
              heigh={isCheck ? "154px" : "195px"}
              textAlin="center"
              image={props.items[3].icon}
              amt={noData("CASH")}
              block={true}
              title={props.items[2].text.split("/")[1]}
            ></Smallbox>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            sx={{ paddingTop: isCheck ? "12px" : "18px" }}
          >
            <Typography sx={{ fontSize: isCheck ? "11px" : "16px" }}>
              {props.quote}
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  }
  return (
    <>
      {walletUser ? <>{activeWalletUI()}</> : <>{walletAdvantagesUI()}</>}
     
      {
        walletUser ? (
          <Mywallet
            setRefreshAfterCreate={setRefreshAfterCreate}
            titleOne={data?.data?.checkGift}
            titleTwo={data?.data?.activateWalletNote}
            getWalletBalan={getWalletBalan}
            typoit={true}
            cartItems={cartItems}
            props={props}
          ></Mywallet>
        ) : (
          <MyWalletVerify
            setRefreshAfterCreate={setRefreshAfterCreate}
            titleOne={data?.data?.addNewGiftOrCheck}
            getWalletBalan={getWalletBalan}
            cartItems={cartItems}
          ></MyWalletVerify>
        )
      }
      {
        walletUser ? (
          ""
        ) : (
          <>
          </>
        )
      }
    </>
  );
}
export default MyWalletAdvantages;
