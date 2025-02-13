import { useRecoilState } from "recoil";
import { SSBLogos } from "../recoilstore";

export const AppIcons = (image: string) => {
  const [SSBeautyLogos] = useRecoilState(SSBLogos);

  const imageIcon = SSBeautyLogos?.appLogos?.find(
    (item: any) => item?.name == image
  );
  return imageIcon;
};
