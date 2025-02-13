import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { TotalBaltext, TotalBalamt, ExpiryText } from "./MyWalletStyles";
import graphql from "../../middleware-graphql";
import { WALLET_EXPIRY } from "../../graphQLQueries/SSWallet/SSWalletQueries";
import { format } from "date-fns";

type WalletExpiryTypes = {
  expiryDate: string;
  totalAmount: string;
};

function TotalBalance(props: any) {
  const [walletExpiry, setWalletExpiry] = useState<
    WalletExpiryTypes | undefined
  >();

  const walletExpiryDate = () => {
    graphql
      .query({
        query: WALLET_EXPIRY,
      })
      .then((response) => {
        if (response?.data?.walletExpiry) {
          setWalletExpiry(response?.data?.walletExpiry);
        } else {
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    walletExpiryDate();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ textAlign: "center" }}
    >
      <Grid item xs={12} md={12} sm={12}>
        <TotalBaltext>Total Balance</TotalBaltext>
        <TotalBalamt>
          {props?.consolidatedBal?.consolidatedBalance == 0 ? (
            <> {props?.consolidatedBal?.consolidatedBalance}</>
          ) : (
            <> ₹{props?.consolidatedBal?.consolidatedBalance}</>
          )}
        </TotalBalamt>
        {walletExpiry && (
          <ExpiryText>
            {`Rs. ${walletExpiry?.totalAmount} expires on ${format(
              new Date(walletExpiry?.expiryDate),
              "do MMM, yyyy"
            )}`}
          </ExpiryText>
        )}
      </Grid>
    </Grid>
  );
}

export default TotalBalance;
