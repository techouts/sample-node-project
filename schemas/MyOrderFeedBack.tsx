export default interface MyOrderFeedBackInterface {
    __component : string;
    id : number;
    CourierPartner : string;
    RateyourDeliveryExperience : string;
    WhatWentWrong : string;
    Describeyourexperience : string;
    submit : string;
    DelayedDelivery : string;
    AssociateBehaviour : string;
    ProductNotDelivered : string;
    Others : string;
    AboutYourExperience : string;
    ShareYourExperience : string;
    AboutYourOrderExperience : string;
    Notlikely : string;
    Likely : string;
    Buttons: [
        {button : string;}
    ];
}