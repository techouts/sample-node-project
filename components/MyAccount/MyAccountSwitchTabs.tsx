import { MyprofileLayout } from "../MyProfileLayout/MyprofileLayout";
import { BeautyProfile } from "../BeautyProfile/BeautyProfile";
import MyMainWallet from "../MyWallet/MyMainWallet";
import MyOrdersLayout from "../MyOrders/MyOrdersLayout";
import RenderComponent from "../../HOC/RenderComponent/RenderComponent";
import Typography from "@mui/material/Typography";
import WishList from "../WishList/WishList";
import SavePayment from "../SavePayment/Savepayment";
import FirstCitizenSignUp from "../FirstCitizenSignUp/FirstCitizenSignUp";
import FirstCitizenQuestions from "../FirstCitizenFAQ/FirstCitizenQuestions";
import ReviewRating from "../ReviewRatingOne/ReviewRating";
import ReviewRatingJsonData from "../ReviewRatingOne/ReviewRatings.json";
import React from "react";
import TransactionLogs from "../TransactionLogs";
import MyServiceRequest from "../MyServiceRequest/MyServiceRequest";

const AccountContentComponent = ({ components }: any) => {
  return (
    <>
      {components?.map((component: any, index: number) => {
        if (component.__component == "widget.beauty-profile") {
          return (
            <RenderComponent
              Component={BeautyProfile}
              data={component}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "widget.orders") {
          return (
            <RenderComponent
              Component={MyOrdersLayout}
              data={component}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "widget.profile") {
          return (
            <RenderComponent
              Component={MyprofileLayout}
              data={component}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "blog-widget.wishlist") {
          return (
            <RenderComponent
              Component={WishList}
              data={component}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "widget.wallet-advantages") {
          return (
            <RenderComponent
              Component={MyMainWallet}
              data={component}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "empty.my-product-reviews") {
          return (
            <RenderComponent
              Component={ReviewRating}
              data={{ ...ReviewRatingJsonData, ...component }}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "widget.fc-data") {
          return (
            <RenderComponent
              Component={FirstCitizenSignUp}
              data={component}
              key={index}
            />
          );
        }
        if (component.__component == "widget.accordion") {
          if (
            component?.title === "Transaction Logs" ||
            "Loyalty Points Transactions"
          ) {
            return (
              <RenderComponent
                Component={TransactionLogs}
                data={component}
                key={index}
              />
            );
          }
          return (
            <RenderComponent
              Component={FirstCitizenQuestions}
              data={component}
              key={index}
            />
          );
        }
        if (component.__component == "widget.saved-payments") {
          return (
            <RenderComponent
              Component={SavePayment}
              data={component}
              key={index}
              position={index}
            />
          );
        }
        if (component.__component == "empty.service-request") {
          return (
            <RenderComponent
              Component={MyServiceRequest}
              data={component}
              key={index}
              position={index}
            />
          );
        } else {
          <Typography>Content View</Typography>;
        }
      })}
    </>
  );
};
export default React.memo(AccountContentComponent);
