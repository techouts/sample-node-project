import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { loaderStateHandler } from "../../recoilstore";

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

function Loader({ isOpen = true, style = {} }: any) {
  const [isLoaderEnable, _] = useRecoilState(loaderStateHandler);

  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    import('./loader.json').then(setAnimationData);
  }, []);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => 99999, ...style }}
      open={isOpen || isLoaderEnable }>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 150, height: 150 }}
      />
    </Backdrop>
  );
}

export default Loader;
