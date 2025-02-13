import { render } from "@testing-library/react";
import Filters from "../../components/Filters/Filters";

const data = {
  data: {
    products: {
      aggregations: [
        {
          attribute_code: "price",
          count: 3,
          label: "Price",
          options: [
            {
              count: 1,
              label: "0-500",
              value: "0_500",
            },
            {
              count: 10,
              label: "500-800",
              value: "500_800",
            },
            {
              count: 5,
              label: "800-999",
              value: "800_999",
            },
          ],
        },
        {
          attribute_code: "category_id",
          count: 7,
          label: "Category",
          options: [
            {
              count: 11,
              label: "FRAGRANCE",
              value: "139",
            },
            {
              count: 9,
              label: "SKIN",
              value: "73",
            },
            {
              count: 6,
              label: "WOMEN",
              value: "140",
            },
            {
              count: 4,
              label: "MASKS & TREATMENTS",
              value: "97",
            },
            {
              count: 4,
              label: "SUN CARE",
              value: "111",
            },
            {
              count: 2,
              label: "MEN",
              value: "141",
            },
            {
              count: 1,
              label: "MOISTURIZERS",
              value: "83",
            },
          ],
        },
        {
          attribute_code: "easy_exchange_return",
          count: 2,
          label: "Easy Exchange & Return",
          options: [
            {
              count: 19,
              label: "1",
              value: "1",
            },
            {
              count: 2,
              label: "0",
              value: "0",
            },
          ],
        },
        {
          attribute_code: "authentic_product",
          count: 2,
          label: "Authentic Product",
          options: [
            {
              count: 19,
              label: "1",
              value: "1",
            },
            {
              count: 2,
              label: "0",
              value: "0",
            },
          ],
        },
        {
          attribute_code: "product_highlighter",
          count: 4,
          label: "Product Highlight",
          options: [
            {
              count: 15,
              label: "Radiant",
              value: "866",
            },
            {
              count: 14,
              label: "Vegan",
              value: "867",
            },
            {
              count: 13,
              label: "Hydrating",
              value: "868",
            },
            {
              count: 12,
              label: "Dry Skin",
              value: "869",
            },
          ],
        },
        {
          attribute_code: "color",
          count: 2,
          label: "Color",
          options: [
            {
              count: 2,
              label: "blue",
              value: "861",
            },
            {
              count: 1,
              label: "yellow",
              value: "862",
            },
          ],
        },
        {
          attribute_code: "ingredient_preference",
          count: 34,
          label: "Ingredient Preferences",
          options: [
            {
              count: 7,
              label: "Alcohol-free",
              value: "4",
            },
            {
              count: 19,
              label: "Cruelty-free",
              value: "5",
            },
            {
              count: 7,
              label: "Hypoallergenic",
              value: "6",
            },
            {
              count: 7,
              label: "Halal",
              value: "7",
            },
            {
              count: 8,
              label: "Natural",
              value: "8",
            },
            {
              count: 5,
              label: "Allergen-free",
              value: "9",
            },
            {
              count: 4,
              label: "Paraben-free",
              value: "353",
            },
            {
              count: 2,
              label: "Sulphate-free",
              value: "354",
            },
            {
              count: 2,
              label: "Petrochemical-free",
              value: "358",
            },
            {
              count: 1,
              label: "Gluten-free",
              value: "359",
            },
            {
              count: 4,
              label: "Phthalate-free",
              value: "360",
            },
            {
              count: 2,
              label: "Mineral Oil-free",
              value: "361",
            },
            {
              count: 2,
              label: "Formaldehyde-free",
              value: "362",
            },
            {
              count: 4,
              label: "Vegan",
              value: "363",
            },
            {
              count: 4,
              label: "Vegetarian",
              value: "364",
            },
            {
              count: 2,
              label: "Organic",
              value: "365",
            },
            {
              count: 1,
              label: "Herbal",
              value: "366",
            },
            {
              count: 4,
              label: "Keratin",
              value: "367",
            },
            {
              count: 1,
              label: "Vitamins",
              value: "368",
            },
            {
              count: 1,
              label: "Antioxidants",
              value: "372",
            },
            {
              count: 2,
              label: "Water Resistant",
              value: "373",
            },
            {
              count: 10,
              label: "Dermatologically Tested",
              value: "369",
            },
            {
              count: 2,
              label: "Acetone-free",
              value: "374",
            },
            {
              count: 4,
              label: "Non-comedogenic",
              value: "370",
            },
            {
              count: 2,
              label: "DBP-free",
              value: "375",
            },
            {
              count: 1,
              label: "Waterproof",
              value: "371",
            },
            {
              count: 3,
              label: "Toluene-free",
              value: "376",
            },
            {
              count: 3,
              label: "Opthalmologically Tested",
              value: "377",
            },
            {
              count: 1,
              label: "Soap-free",
              value: "378",
            },
            {
              count: 2,
              label: "Clinically Proven",
              value: "379",
            },
            {
              count: 1,
              label: "Sugar-free",
              value: "380",
            },
            {
              count: 1,
              label: "Latex-free",
              value: "383",
            },
            {
              count: 2,
              label: "BPA-free",
              value: "384",
            },
            {
              count: 3,
              label: "Heavy Metal-free",
              value: "385",
            },
          ],
        },
        {
          attribute_code: "occasion",
          count: 11,
          label: "Occasion",
          options: [
            {
              count: 15,
              label: "Casual",
              value: "10",
            },
            {
              count: 15,
              label: "Work",
              value: "11",
            },
            {
              count: 5,
              label: "Party",
              value: "12",
            },
            {
              count: 3,
              label: "Day",
              value: "13",
            },
            {
              count: 7,
              label: "Evening",
              value: "14",
            },
            {
              count: 8,
              label: "Everyday",
              value: "15",
            },
            {
              count: 1,
              label: "Brunch",
              value: "16",
            },
            {
              count: 3,
              label: "Festive/Occasion",
              value: "17",
            },
            {
              count: 4,
              label: "Formal",
              value: "18",
            },
            {
              count: 5,
              label: "Sports",
              value: "19",
            },
            {
              count: 2,
              label: "Travel",
              value: "20",
            },
          ],
        },
        {
          attribute_code: "formulation",
          count: 4,
          label: "Formulation",
          options: [
            {
              count: 12,
              label: "Spray",
              value: "21",
            },
            {
              count: 3,
              label: "Liquid",
              value: "387",
            },
            {
              count: 3,
              label: "Cream",
              value: "389",
            },
            {
              count: 2,
              label: "Lotion",
              value: "409",
            },
          ],
        },
        {
          attribute_code: "fragrance_family",
          count: 9,
          label: "Fragrance Family",
          options: [
            {
              count: 4,
              label: "Floral",
              value: "26",
            },
            {
              count: 6,
              label: "Fruity",
              value: "27",
            },
            {
              count: 4,
              label: "Woody/Earthy",
              value: "28",
            },
            {
              count: 5,
              label: "Spicy",
              value: "29",
            },
            {
              count: 2,
              label: "Citrus",
              value: "30",
            },
            {
              count: 1,
              label: "Chypre",
              value: "31",
            },
            {
              count: 1,
              label: "Aquatic/Fresh",
              value: "33",
            },
            {
              count: 3,
              label: "Fougere",
              value: "34",
            },
            {
              count: 1,
              label: "Aromatic",
              value: "36",
            },
          ],
        },
        {
          attribute_code: "gender",
          count: 3,
          label: "Gender",
          options: [
            {
              count: 13,
              label: "Women",
              value: "37",
            },
            {
              count: 2,
              label: "Men",
              value: "39",
            },
            {
              count: 5,
              label: "Unisex Adults",
              value: "42",
            },
          ],
        },
        {
          attribute_code: "size",
          count: 4,
          label: "Size",
          options: [
            {
              count: 6,
              label: "Mini",
              value: "44",
            },
            {
              count: 6,
              label: "Value Set",
              value: "45",
            },
            {
              count: 4,
              label: "Combo",
              value: "46",
            },
            {
              count: 6,
              label: "Gift Set",
              value: "47",
            },
          ],
        },
        {
          attribute_code: "age",
          count: 7,
          label: "Age Group",
          options: [
            {
              count: 2,
              label: "0-3 months",
              value: "54",
            },
            {
              count: 7,
              label: "Kids",
              value: "55",
            },
            {
              count: 10,
              label: "Teens",
              value: "56",
            },
            {
              count: 20,
              label: "20s",
              value: "57",
            },
            {
              count: 8,
              label: "30s",
              value: "58",
            },
            {
              count: 5,
              label: "40s",
              value: "59",
            },
            {
              count: 2,
              label: "50+",
              value: "60",
            },
          ],
        },
        {
          attribute_code: "size_uom",
          count: 2,
          label: "Size UOM",
          options: [
            {
              count: 9,
              label: "gm",
              value: "61",
            },
            {
              count: 11,
              label: "ml",
              value: "63",
            },
          ],
        },
        {
          attribute_code: "dimensions_uom",
          count: 1,
          label: "Dimensions UOM",
          options: [
            {
              count: 20,
              label: "mm",
              value: "68",
            },
          ],
        },
        {
          attribute_code: "location",
          count: 1,
          label: "Location",
          options: [
            {
              count: 20,
              label: "Store",
              value: "81",
            },
          ],
        },
        {
          attribute_code: "brand_name",
          count: 14,
          label: "BRAND",
          options: [
            {
              count: 1,
              label: "LAKME",
              value: "84",
            },
            {
              count: 2,
              label: "SUGAR",
              value: "85",
            },
            {
              count: 1,
              label: "CHAMBOR",
              value: "86",
            },
            {
              count: 3,
              label: "COLORBAR",
              value: "87",
            },
            {
              count: 1,
              label: "FACES",
              value: "88",
            },
            {
              count: 1,
              label: "RENEE",
              value: "90",
            },
            {
              count: 1,
              label: "ESSENCE",
              value: "92",
            },
            {
              count: 1,
              label: "REVLON",
              value: "93",
            },
            {
              count: 2,
              label: "DEBORAH",
              value: "94",
            },
            {
              count: 1,
              label: "MYGLAMM",
              value: "96",
            },
            {
              count: 1,
              label: "PLUM",
              value: "97",
            },
            {
              count: 2,
              label: "POPXO",
              value: "99",
            },
            {
              count: 2,
              label: "DOT AND KEY",
              value: "101",
            },
            {
              count: 1,
              label: "mamaearth",
              value: "102",
            },
          ],
        },
        {
          attribute_code: "pro_type",
          count: 5,
          label: "Product Type",
          options: [
            {
              count: 11,
              label: "EDT",
              value: "199",
            },
            {
              count: 1,
              label: "EDP",
              value: "200",
            },
            {
              count: 1,
              label: "Deodrants",
              value: "201",
            },
            {
              count: 3,
              label: "Serums & Boosters",
              value: "298",
            },
            {
              count: 4,
              label: "Body Sunscreen",
              value: "310",
            },
          ],
        },
        {
          attribute_code: "recommended_for_concerns",
          count: 4,
          label: "Recommended For/Concerns",
          options: [
            {
              count: 2,
              label: "Hairfall & Thinning",
              value: "425",
            },
            {
              count: 3,
              label: "Dullness",
              value: "429",
            },
            {
              count: 3,
              label: "Dark spots/Pigmentation",
              value: "444",
            },
            {
              count: 1,
              label: "Tanning",
              value: "480",
            },
          ],
        },
        {
          attribute_code: "color_family",
          count: 11,
          label: "Color Family",
          options: [
            {
              count: 10,
              label: "Berry/Maroon",
              value: "621",
            },
            {
              count: 1,
              label: "Red",
              value: "622",
            },
            {
              count: 1,
              label: "Coral",
              value: "624",
            },
            {
              count: 1,
              label: "Brown",
              value: "626",
            },
            {
              count: 1,
              label: "Orange",
              value: "627",
            },
            {
              count: 1,
              label: "Blue",
              value: "630",
            },
            {
              count: 1,
              label: "Gold",
              value: "631",
            },
            {
              count: 1,
              label: "Silver",
              value: "632",
            },
            {
              count: 1,
              label: "Green",
              value: "633",
            },
            {
              count: 1,
              label: "Peach",
              value: "637",
            },
            {
              count: 1,
              label: "Multicolor",
              value: "641",
            },
          ],
        },
        {
          attribute_code: "is_best_seller_checkbox",
          count: 1,
          label: "is_best_seller",
          options: [
            {
              count: 20,
              label: "1",
              value: "1",
            },
          ],
        },
        {
          attribute_code: "is_featured_checkbox",
          count: 1,
          label: "is_featured",
          options: [
            {
              count: 20,
              label: "1",
              value: "1",
            },
          ],
        },
        {
          attribute_code: "is_express_deliverable_checkbox",
          count: 1,
          label: "is_express_deliverable",
          options: [
            {
              count: 20,
              label: "1",
              value: "1",
            },
          ],
        },
      ],
    },
  },
};

describe("Filters", () => {
  it("renders a filters component", () => {
    render(<Filters {...data} />);
  });
});
