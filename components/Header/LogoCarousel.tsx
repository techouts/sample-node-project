import React from "react";

type LogoCarouselProps = {
  isCartPage?: boolean,
};

const LogoCarousel: React.FC<LogoCarouselProps> = ({ isCartPage }) => {
  function handleLogoCarouselClick() {
    window.location.assign('/home');
  }

  return (
    <div
      style={{
        height: "40px", // Height of the visible area
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleLogoCarouselClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "160px", // Total height for three logos plus the duplicate
          animation: "scrollImages 6s linear infinite",
        }}
      >
        {/* Set of images */}
        <img
          src="/ssb logo new.svg"
          alt="Image 1"
          style={{
            width: isCartPage ? "60%" : "100%",
            height: "40px",
            objectFit: "contain",
          }}
        />
        <img
          src="/ssb store logo.svg"
          alt="Image 2"
          style={{
            width: isCartPage ? "60%" : "100%",
            height: "40px",
            objectFit: "contain",
          }}
        />
        <img
          src="/ssb logo new.svg"
          alt="Image 3"
          style={{
            width: isCartPage ? "60%" : "100%",
            height: "40px",
            objectFit: "contain",
          }}
        />
        {/* Duplicate the first image for a seamless loop */}
        <img
          src="/ssb logo new.svg"
          alt="Image 1 (duplicate)"
          style={{
            width: isCartPage ? "60%" : "100%",
            height: "40px",
            objectFit: "contain",
          }}
        />
      </div>

      <style>
        {`
          @keyframes scrollImages {
            0% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(0); /* Show the first logo */
            }
            45% {
              transform: translateY(-40px); /* Show the second logo */
            }

            55% {
              transform: translateY(-40px); /* Show the second logo */
            }

            75% {
              transform: translateY(-80px); /* Show the third logo */
            }
            100% {
              transform: translateY(-80px); /* End at the last logo */
            }
          }
        `}
      </style>
    </div>
  );
};

export default LogoCarousel;
