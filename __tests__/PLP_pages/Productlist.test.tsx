import { render } from "@testing-library/react";
import { ProductsList } from "../../HOC/ProductList/ProductList";

const data = {
  data: {
    products: {
      total_count: 20,
      items: [
        {
          name: "Sugar Seal The Show Lip Primer 1.4 gm-Value Set-blue",
          type_id: "simple",
          media_gallery: [],
          sku: "8906090496-Value Set-blue",
          short_description: {
            html: "<p>High-drama volume and curl in the blink of an eye. The jumbo brush fans and pushes lashes up and out, while the rich, carbon-black formula helps thickens, curls, and lifts lashes for an ultimate eye-opening effect.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "0",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/static/version1656930468/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/image.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 899,
                currency: "INR",
              },
              final_price: {
                value: 899,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Sugar Seal The Show Lip Primer 1.4 gm",
          type_id: "configurable",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/5/1/51ay2jurhal._sy355__2.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/3/5/352317e7ae326d6a8cfb549ef857d95c--bb-cream-reviews-makeup-primer_2.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/1/0/10-best-loreal-products-we-all-need-right-now-_-our-top-picks-for-2019_2.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagesefwef_1.jpg",
            },
          ],
          sku: "8906090496",
          short_description: {
            html: "<p>High-drama volume and curl in the blink of an eye. The jumbo brush fans and pushes lashes up and out, while the rich, carbon-black formula helps thickens, curls, and lifts lashes for an ultimate eye-opening effect.</p>",
          },
          review_count: 3,
          rating_summary: 2.65,
          reviews: {
            items: [
              {
                review_id: "10",
                average_rating: 20,
                nickname: "sai teja",
                ratings_breakdown: [
                  {
                    value: "1",
                  },
                ],
                created_at: "2022-06-01 06:45:04",
                review_likes_count: 26,
                review_images: "",
                summary: "worst product",
                text: "waste of money",
              },
              {
                review_id: "9",
                average_rating: 80,
                nickname: "teja",
                ratings_breakdown: [
                  {
                    value: "4",
                  },
                ],
                created_at: "2022-06-01 06:44:15",
                review_likes_count: 5,
                review_images: "",
                summary: "Nice Product",
                text: "Better Quality",
              },
              {
                review_id: "8",
                average_rating: 60,
                nickname: "sai",
                ratings_breakdown: [
                  {
                    value: "3",
                  },
                ],
                created_at: "2022-06-01 06:41:09",
                review_likes_count: 2,
                review_images: "",
                summary: "worth it",
                text: "Good product",
              },
            ],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 1,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/5/1/51ay2jurhal._sy355__2.jpg",
          },
          configurable_options: [
            {
              id: 7,
              attribute_id_v2: 93,
              label: "Color",
              position: 1,
              use_default: false,
              attribute_code: "color",
              values: [
                {
                  value_index: 861,
                  label: "blue",
                },
                {
                  value_index: 862,
                  label: "yellow",
                },
              ],
              product_id: 48,
            },
            {
              id: 4,
              attribute_id_v2: 142,
              label: "Size",
              position: 0,
              use_default: false,
              attribute_code: "size",
              values: [
                {
                  value_index: 44,
                  label: "Mini",
                },
                {
                  value_index: 45,
                  label: "Value Set",
                },
                {
                  value_index: 47,
                  label: "Gift Set",
                },
              ],
              product_id: 48,
            },
          ],
          variants: [
            {
              product: {
                id: 53,
                name: "Sugar Seal The Show Lip Primer 1.4 gm-Mini-blue",
                sku: "8906090496-Mini-blue",
                price_range: {
                  minimum_price: {
                    regular_price: {
                      value: 999,
                      currency: "INR",
                    },
                    final_price: {
                      value: 300,
                    },
                    discount: {
                      amount_off: 699,
                      percent_off: 69.97,
                    },
                  },
                },
                attribute_set_id: 9,
                weight: 500,
              },
            },
            {
              product: {
                id: 54,
                name: "Sugar Seal The Show Lip Primer 1.4 gm-Mini-yellow",
                sku: "8906090496-Mini-yellow",
                price_range: {
                  minimum_price: {
                    regular_price: {
                      value: 999,
                      currency: "INR",
                    },
                    final_price: {
                      value: 999,
                    },
                    discount: {
                      amount_off: 0,
                      percent_off: 0,
                    },
                  },
                },
                attribute_set_id: 9,
                weight: 500,
              },
            },
            {
              product: {
                id: 55,
                name: "Sugar Seal The Show Lip Primer 1.4 gm-Value Set-blue",
                sku: "8906090496-Value Set-blue",
                price_range: {
                  minimum_price: {
                    regular_price: {
                      value: 899,
                      currency: "INR",
                    },
                    final_price: {
                      value: 899,
                    },
                    discount: {
                      amount_off: 0,
                      percent_off: 0,
                    },
                  },
                },
                attribute_set_id: 9,
                weight: 500,
              },
            },
            {
              product: {
                id: 56,
                name: "Sugar Seal The Show Lip Primer 1.4 gm-Value Set-yellow",
                sku: "8906090496-Value Set-yellow",
                price_range: {
                  minimum_price: {
                    regular_price: {
                      value: 899,
                      currency: "INR",
                    },
                    final_price: {
                      value: 899,
                    },
                    discount: {
                      amount_off: 0,
                      percent_off: 0,
                    },
                  },
                },
                attribute_set_id: 9,
                weight: 500,
              },
            },
            {
              product: {
                id: 57,
                name: "Sugar Seal The Show Lip Primer 1.4 gm-Gift Set-blue",
                sku: "8906090496-Gift Set-blue",
                price_range: {
                  minimum_price: {
                    regular_price: {
                      value: 799,
                      currency: "INR",
                    },
                    final_price: {
                      value: 799,
                    },
                    discount: {
                      amount_off: 0,
                      percent_off: 0,
                    },
                  },
                },
                attribute_set_id: 9,
                weight: 500,
              },
            },
            {
              product: {
                id: 58,
                name: "Sugar Seal The Show Lip Primer 1.4 gm-Gift Set-yellow",
                sku: "8906090496-Gift Set-yellow",
                price_range: {
                  minimum_price: {
                    regular_price: {
                      value: 799,
                      currency: "INR",
                    },
                    final_price: {
                      value: 799,
                    },
                    discount: {
                      amount_off: 0,
                      percent_off: 0,
                    },
                  },
                },
                attribute_set_id: 9,
                weight: 500,
              },
            },
          ],
          price_range: {
            minimum_price: {
              regular_price: {
                value: 999,
                currency: "INR",
              },
              final_price: {
                value: 300,
              },
              discount: {
                amount_off: 699,
                percent_off: 69.97,
              },
            },
          },
        },
        {
          name: "Lotus Herbals Organics Ultra Matt Mineral Sunscreen SPF40 100 gm",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagessdfdsfvsdv.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/l/o/lotus-organics_.jpg",
            },
          ],
          sku: "A21LOTUS0002599",
          short_description: {
            html: "<p>Lotus Organics+ Ultra Matte Mineral Sunscreen, with its unique SPF 40 &amp; PA+++ formula is made with 100% certified organic Cranberries that provides protection from all forms of sun-induced damage. This physical no chemical sunscreen reveals your natural radiance while adding a universally flattering tint to minimize imperfections.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 389,
          pro_type: 310,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagessdfdsfvsdv.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 699,
                currency: "INR",
              },
              final_price: {
                value: 699,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Estee Lauder Unisex Gwp Skincare Kit",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/s/-/s-l300_sdhd.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/s/-/s-l300.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/l/a/laudmacy030922.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/e/s/estee-lauder-smooth--glow-set-2058-404-0000_1.jpg",
            },
          ],
          sku: "EL-PTT690",
          short_description: {
            html: "<p>A Limited Edition Kit With Advanced Night Repair, Our #1 Serum To Powerfully Fight The Look Of Multiple Signs Of Aging And An Advanced Night Repair Eye Supercharged Complex That Repairs, Brightens Dark Circles And Hydrates.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 387,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/s/-/s-l300_sdhd.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 999,
                currency: "INR",
              },
              final_price: {
                value: 999,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Lotus Herbals Safe Sun Ultraprotect Sun Block SPF100 50 gm",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/l/o/lotus-professional-phyto-rx-sunblock-mist-spf-50-pa-100ml_1.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/6/1/61gh8xwisel._sl1200_.jpg",
            },
          ],
          sku: "A21LOTUS0000014",
          short_description: {
            html: "<p>Sun can be bad for your skin. Apart from the obviously, messy tan and sunburns, the UV rays of the sun harm your sin, cause wrinkles, premature ageing! Lotus Herbals Safe Sun Anti Ageing Anti Tan Ultra Sunblock SPF-100+ PA+++ is packed with natural ingredients like thyme, soy protein and licorice which not only protect your skin but also boost production of collagen to improve skin elasticity and delay visible signs of ageing.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 389,
          pro_type: 310,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/l/o/lotus-professional-phyto-rx-sunblock-mist-spf-50-pa-100ml_1.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 999,
                currency: "INR",
              },
              final_price: {
                value: 999,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Caudalie Anti-Dark Spot Solution 95 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagesdacsdc.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/v/i/vinoperfectweb1.jpg",
            },
          ],
          sku: "A21CAUD0028178",
          short_description: {
            html: "<p>A complexion correcting gift set for dark-spot reduction and radiance. Both effective and gentle on the skin, each product in this set sweeps away dead skin cells that cause the complexion to appear dull, reviving the skin's natural radiance.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 387,
          pro_type: 298,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagesdacsdc.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 699,
                currency: "INR",
              },
              final_price: {
                value: 699,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Clinique Even Better Clinical Radical Dark Spot Corrector + Interrupter 30 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/1/4/14845927-1-nocolour.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagessdvsdv.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/1/2/12732789-5204838642360454_1.jpg",
            },
          ],
          sku: "206798839",
          short_description: {
            html: "<p>A powerful brightening serum that helps visibly correct discoloration and acne scars, while interrupting future dark spots. See a -39% reduction in dark spots and acne scars in 12 weeks.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 409,
          pro_type: 298,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/1/4/14845927-1-nocolour.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 699,
                currency: "INR",
              },
              final_price: {
                value: 699,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Clinique Even Better Clinical Radical Dark Spot Corrector + Interrupter 50 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/4/1/41nvnd77obl._ac_ss450_.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/1/2/12732789-5204838642360454.jpg",
            },
          ],
          sku: "206798840",
          short_description: {
            html: "<p>A powerful brightening serum that helps visibly correct discoloration and acne scars, while interrupting future dark spots. See a -39% reduction in dark spots and acne scars in 12 weeks.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 409,
          pro_type: 298,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/4/1/41nvnd77obl._ac_ss450_.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 699,
                currency: "INR",
              },
              final_price: {
                value: 699,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Lotus Herbals Safe Sun Sun Block Cream SPF30 100 gm",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imageswfgrfs.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/6/1/61rhnfk4yjl._ac_ss450_.jpg",
            },
          ],
          sku: "A21LOTUS0341001",
          short_description: {
            html: "<p>The Lotus Herbals Safe Sun Sunscreen Cream SPF 30 is a unique sunscreen cream with PARSOL 1789 that protects your skin against harmful UVA/UVB rays and reduces the chances of tanning and premature ageing after exposure to environmental aggressors. The sweat-proof and non-greasy formulation of the sunscreen blends smoothly into the skin, ensuring smooth and supple skin.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 389,
          pro_type: 310,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imageswfgrfs.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 599,
                currency: "INR",
              },
              final_price: {
                value: 599,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Kama Ayurveda Natural Sun Protection SPF21 60 gm",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagesdacdc.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imageswcsd.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/6/1/61caaqiwqgl._sl1000_.jpg",
            },
          ],
          sku: "202785956",
          short_description: {
            html: "<p>A non-chemical daily-use natural sunscreen that provides full-spectrum sun protection and a boost of hydration to keep skin healthy and even-toned.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 310,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/i/m/imagesdacdc.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Bobbi Brown Extra Repair Serum 30ml/1oz",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/b/e/best-products-of-2019-1571933772_4.png",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/d/e/depositphotos_35710919-stock-photo-beauty-girl-portrait-with-colorful_3.jpg",
            },
          ],
          sku: "7867029",
          short_description: {
            html: "<p>Luxurious and milky, this concentrated repair serum comforts skin as it firms and moisturizes</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 387,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/b/e/best-products-of-2019-1571933772_4.png",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 800,
                currency: "INR",
              },
              final_price: {
                value: 800,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Bvlgari Omnia Coral Landia Collection Eau De Toilette 65 ml (21-2-50%)",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/7/1/71-h3f0yvul._sy450_.jpg",
            },
          ],
          sku: "FS0BVL0410871",
          short_description: {
            html: "<p>Inspired by the shimmering hues of precious red coral, Omnia Coral combines the fragrant luminosity of floral notes with the fresh transparency of juicy fruit, reminiscent of summer, sun, resplendent nature and far-off oceans.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/7/1/71-h3f0yvul._sy450_.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Carolina Herrera Very Good Girl Eau De Parfum 50 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/p/2/p2101765-2101765_-1_-1_63307.jpg",
            },
          ],
          sku: "A21CARO65166510",
          short_description: {
            html: "<p>Very Good Girl takes you on a surprising olfactive journey, starting with top notes of playfully mischievous redcurrant and exotic lychee, leading to a seductive heart of rose. Vetiver and vanilla base notes provide a surprising and contemporary finish.</p>\r\n<p>The iconic Good Girl Stiletto conquers new heights with a stunning red-lacquered interior—a signature house shade and a symbol of passion, sophistication and beauty.</p>",
          },
          review_count: 3,
          rating_summary: 4,
          reviews: {
            items: [
              {
                review_id: "20",
                average_rating: 100,
                nickname: "Sana",
                ratings_breakdown: [
                  {
                    value: "5",
                  },
                ],
                created_at: "2022-06-21 10:20:06",
                review_likes_count: 1,
                review_images: "",
                summary: "Excellent Product",
                text: "Amazing product! I found it extremely hydrating and moisturising.\r\nIt is perfect for people with dry or normal to dry skin. I will definitely purchase again.",
              },
              {
                review_id: "19",
                average_rating: 60,
                nickname: "Mehek ",
                ratings_breakdown: [
                  {
                    value: "3",
                  },
                ],
                created_at: "2022-06-21 10:18:31",
                review_likes_count: 1,
                review_images: "",
                summary: "worth it",
                text: "Good product! I found it extremely hydrating and moisturising.\r\nIt is perfect for people with dry or normal to dry skin.",
              },
              {
                review_id: "18",
                average_rating: 80,
                nickname: "Mehek Mehta",
                ratings_breakdown: [
                  {
                    value: "4",
                  },
                ],
                created_at: "2022-06-21 10:17:54",
                review_likes_count: 1,
                review_images: "",
                summary: "good product",
                text: "Amazing product! I found it extremely hydrating and moisturising.\r\nIt is perfect for people with dry or normal to dry skin. I will definitely purchase again.",
              },
            ],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 1,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/p/2/p2101765-2101765_-1_-1_63307.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Dunhill Mens Desire Blue Ocean Eau De Toilette 100ml (19-5-60%)",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/d/u/dunhill-desire-blue-ocean-edt-for-men.jpg",
            },
          ],
          sku: "205508196",
          short_description: {
            html: "<p>Dunhill Desire Blue Ocean Eau De Toilette is the fragrance of a man who feels most alive when he’s outdoors or near the water. Whether he’s sailing or golfing above it, or swimming below it, he knows that’s where he belongs. He is continually amazed by the beauty of mother nature whether it be hues of beautiful blue tides or a crisp blue sky, he has a deep desire to discover all that the world around him has to offer.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/d/u/dunhill-desire-blue-ocean-edt-for-men.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Ajmal Womens Aretha Eau De Parfum 100 ml (18-3-30%)",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/p/u/purffff.jpg",
            },
          ],
          sku: "FS0AJMAL312595",
          short_description: {
            html: "<p>Ajmal Aretha Eau de Parfum is a perfect blend of floral and fruity aroma, harmonized with light rosy and woody notes. This perfume was brilliantly executed by incorporating a touch of natural softness and sophistication which can't be overlooked. Highly rich ingredients have been used to give the perfume a stunning, elegant and charming fragrance.</p>\r\n<p>The top note of the perfume has an uplifting and effusive combination of peach, bergamot, and pear. Then it shifts towards the heart note which consists of floral tones achieved by blending rose, lily and jasmine. The base offers a balanced, clean and long-lasting finish with the notes of musk, cedarwood, and vetiver. This perfume is a delightful blend for women to wear at parties or social events.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/p/u/purffff.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Playboy Mens Generation M Eau De Toilette Deodorant Set (17-2-20%)",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/6/1/61n60gogoal._sl1000_.jpg",
            },
          ],
          sku: "203096527",
          short_description: {
            html: "<p>With the Playboy Generation gift set, engagement is your aim and no aim is too high. Playboy Generation Eau De Toilette is a warm aromatic scent which starts with energising flavours. Playboy Skin Touch Generation Deodorant has intense, sensual, and masculine fragrance keeping you fresh and rejuvenated</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 201,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/6/1/61n60gogoal._sl1000_.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 999,
                currency: "INR",
              },
              final_price: {
                value: 999,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Carolina Herrera Very Good Girl Eau De Parfum 30 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/c/a/carolinaherrera.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/c/a/carher.jpeg",
            },
          ],
          sku: "A21CARO65166511",
          short_description: {
            html: "<p>Very Good Girl takes you on a surprising olfactive journey, starting with top notes of playfully mischievous redcurrant and exotic lychee, leading to a seductive heart of rose. Vetiver and vanilla base notes provide a surprising and contemporary finish.</p>\r\n<p>The iconic Good Girl Stiletto conquers new heights with a stunning red-lacquered interior—a signature house shade and a symbol of passion, sophistication and beauty.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/c/a/carolinaherrera.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Thierry Mugler Womens Eau De Parfum Shooting Star Spray 50 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/t/h/thirreymugler.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/m/u/mugler.jpg",
            },
          ],
          sku: "3038244",
          short_description: {
            html: "<p>The Angel woman dares to live up to her dreams with her blue star as her guide. Confident and seductive, she fascinates those who cross her path. Between power and pleasure, she uses her ultra-femininity as a signature. Between heaven and earth, she makes her dreams a reality. Angel Eau de Parfum is the first Gourmand perfume in the world of fragrance.</p>\r\n<p>Angel, wilder than dreams.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/t/h/thirreymugler.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 500,
                currency: "INR",
              },
              final_price: {
                value: 500,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Mocesma Womens Celeb Aqua Pour Femme Eau De Parfum 110 m",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/h/q/hqdefault_1.jpg",
            },
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/m/o/mocemsa.jpg",
            },
          ],
          sku: "A21MOCEMS920226",
          short_description: {
            html: "<p>Inspired by a star-studded night on the beach among sand and gigantic waves, Celeb Aqua Pour Femme Eau De Parfum starts off fruitily with juicy golden apple, but transforms into a floral bouquet bursting with white and yellow roses and jasmine concrete paired with base notes of white musk and amber with an aqua touch!</p>\r\n<p>Far sweeter than your memory of feeling &amp; smelling surreal like a celebrity, this classic fragrance is all about the sparkle in this dreamy world and more. It's exactly what you'd expect Mocemsa exclusive scents to smell like - divine.</p>\r\n<p>This might be your signature scent - lightweight, long-lasting, and incredibly versatile. Whether you spritz it on for a day of running errands or load up for date night, it adds a touch of sophistication nevertheless.</p>",
          },
          review_count: 0,
          rating_summary: 0,
          reviews: {
            items: [],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 0,
            },
          },
          formulation: 21,
          pro_type: 199,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/h/q/hqdefault_1.jpg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 999,
                currency: "INR",
              },
              final_price: {
                value: 999,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
        {
          name: "Superdry Sport Re: Vive Body Spray 200 ml",
          type_id: "simple",
          media_gallery: [
            {
              url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/m/a/makeup-and-beauty-products-vector-456671_3.jpeg",
            },
          ],
          sku: "A21SUPERD129225",
          short_description: {
            html: "<p>Instantly revive with this everyday active body spray fuelled with fresh fragrance notes of cardamom and lemon.</p>",
          },
          review_count: 2,
          rating_summary: 4,
          reviews: {
            items: [
              {
                review_id: "22",
                average_rating: 100,
                nickname: "Sana",
                ratings_breakdown: [
                  {
                    value: "5",
                  },
                ],
                created_at: "2022-06-21 10:30:26",
                review_likes_count: 1,
                review_images: "",
                summary: "excellent product",
                text: "Amazing product! I found it extremely hydrating and moisturising.\r\nIt is perfect for people with dry or normal to dry skin. I will definitely purchase again.",
              },
              {
                review_id: "21",
                average_rating: 60,
                nickname: "Mehek ",
                ratings_breakdown: [
                  {
                    value: "3",
                  },
                ],
                created_at: "2022-06-21 10:29:44",
                review_likes_count: 1,
                review_images: "",
                summary: "worth it",
                text: "Worthable product! I found it extremely hydrating and moisturising.\r\n",
              },
            ],
            page_info: {
              current_page: 1,
              page_size: 3,
              total_pages: 1,
            },
          },
          formulation: 21,
          pro_type: 200,
          is_featured_checkbox: 1,
          gift_message_available: "2",
          is_express_deliverable_checkbox: 1,
          is_best_seller_checkbox: 1,
          image: {
            url: "https://magento.dev.shopper-stop.in:3443/media/catalog/product/cache/4f4d769eb7f86ac843d14266dcce992b/m/a/makeup-and-beauty-products-vector-456671_3.jpeg",
          },
          price_range: {
            minimum_price: {
              regular_price: {
                value: 1200,
                currency: "INR",
              },
              final_price: {
                value: 1200,
              },
              discount: {
                amount_off: 0,
                percent_off: 0,
              },
            },
          },
        },
      ],
    },
  },
};

describe("Products List", () => {
  it("renders a products list", () => {
    render(<ProductsList {...data} />);
  });
});
