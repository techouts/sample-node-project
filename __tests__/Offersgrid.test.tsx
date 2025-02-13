import { render } from "@testing-library/react";
import GridCards from "../components/OffersGrid/OffersGrid";

const data =  {
    "id": 1,
    "__component": "widget.offers-grid",
    "bgColor": "#ffffff",
    "bgPadding": "2% 5%",
    "title": "OFFERS BY TOP BRANDS",
    "showTextOnHover": false,
    "showGradient": true,
    "itemBackgroundSpacing": "18px",
    "cardBorder": false,
    "itemPaddingBottom": "12px",
    "itemPaddingX": "12px",
    "titleColor": "#1c191a",
    "desktopColumns": 3,
    "viewMore": "VIEW ALL",
    "viewMoreLink": null,
    "mobileColumns": "2",
    "topViewMore": null,
    "display": null,
    "isBgColor": null,
    "items": [
        {
            "id": 1,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Kiehls_2ebf8a1721.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "/products?category_id=139,79",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 2,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Murad_75ea72f27e.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "/brand/faces-canada",
            "isNewTab": false,
            "subTextColor": "#7B7979"
        },
        {
            "id": 3,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Loreal_bf541193e6.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "#",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 4,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Pen_734621ca08.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "#",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 5,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Tresemme_41f52fdd90.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "#",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 6,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Simple_47efbe743c.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "#",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        }
    ],
    "mobileItems": [
        {
            "id": 7,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Kiehls_2ebf8a1721.png",
            "text": "Flat 50% Discount\"",
            "textColor": "#AD184C",
            "offerBackground": "#FFFFFF",
            "subText": "on selected products",
            "path": "/products?category_id=139",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 8,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Murad_75ea72f27e.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "/brand/faces-canada",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 9,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Loreal_bf541193e6.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "#",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        },
        {
            "id": 10,
            "imageUrl": "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com/Brands_Pen_734621ca08.png",
            "text": "Flat 50% Discount",
            "textColor": "#AD184C",
            "offerBackground": "#ffffff",
            "subText": "on selected products",
            "path": "#",
            "isNewTab": null,
            "subTextColor": "#7B7979"
        }
    ]
}

describe('Home', () => {
    it('renders a Footer', () => {
      render(<GridCards {...data} />)
    })
  })
  