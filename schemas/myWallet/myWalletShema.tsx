type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export default  interface MyWalletSchema {
  data:{
  _component: string,
  id: number,
  bgColor: string,
  bgPadding: string,
  data: {
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    images: [
      {
        imageUrl:  string ;
      }
    ]
  
    imageCards: {
      imageUrl: string | URL;
      path: URL;
    };
    walletAdvantages:  string ,
    checkecardorgift:string,
    
    walletAdvantagesDetails: string,
    walletAdvantagesStatement:string ,
     activateWalletButton : string ,
     cardNumberText : string ,
     enterCardNo : string ,
     customercareamt : string ,
     refundamt : string ,
     cashbackamt : string ,
     checkGift : string ,
     amt:string,
     expDate:string,
     image1:string,
     image2:string,
     image3:string,
     image4:string,
     voucheramt:string,
     activateWalletNote:string,
     addNewGiftOrCheck:string,
     tAndC:string,
     faqQuestions:[],
     faqAns:string
    easyIcon: {
      imageUrl: string | URL;
      text: string;
    };
   
}
    
  }
  
}