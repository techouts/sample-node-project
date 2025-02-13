import { useState } from "react";
import { GiftCardSchema } from "../../schemas/GiftCard";
import Mywallet from "../MyWallet/Mywallet";
import GiftCardForms from "./GiftCardForm/GiftCardForms";
import GiftCardOccasions from "./GiftCardOccasions";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";

import { Box } from "@mui/material";
import Loader from "../../HOC/Loader/Loader";

const BeautyGiftCards = (props: GiftCardSchema) => {
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [iswalletNumber, setIsWalletNumber] = useRecoilState<any>(userState);

  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader && <Loader />}
      <Box p="0% 5%">
        {/* OccasionComponent 24 */}

        <GiftCardOccasions
          {...props}
          setOpen={setOpen}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setEditModal={setEditModal}
          editModal={editModal}
          setCroppedImage={setCroppedImage}
          croppedImage={croppedImage}
        />

        <GiftCardForms
          {...props}
          setOpen={setOpen}
          open={open}
          selectedImage={selectedImage}
          setLoader={setLoader}
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
        />

        {/* Gift CheckBalance Form Component */}
        <Mywallet
          giftCard={true}
          typoit={iswalletNumber.walletNumber ? true : false}
        ></Mywallet>
      </Box>
    </>
  );
};

export default BeautyGiftCards;
