import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useMobileCheck } from "../../utility/isMobile";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import {
    ViewAllButton
  } from "../OffersGrid/OffersGridStyles";
function BannerTimer ({
    id,
    __component,
    componentName,
    imageName,
    backgroundColour,
    backgroundSpacing,
    timerTitle,
    startTime,
    endTime,
    webImageUrl,
    mobileImageUrl,
    title,
    subTitle,
    ctaLabel,
    ctaLabelUrl,
    visibility,
    display,
    viewport,
    titleColour,
    subTitleColour,
    dealEndsColour,
    titleColourMobile,
    subTitleColourMobile,
    dealEndsColourMobile
}: any) {

    const router = useRouter();
    const isMobile = useMobileCheck();
    const [loading, setLoading] = useState<boolean>(false);

  // Helper function to convert GMT to IST
  const convertGMTToIST = (dateStr: string) => {
    const date = new Date(Date.parse(dateStr));
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateStr);
      return null;
    }
    // Convert the date to IST time zone
    return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  };

  // Convert start and end time to IST
  const offerStartDate = convertGMTToIST(startTime);
  const offerEndDate = convertGMTToIST(endTime);

  if (!offerStartDate || !offerEndDate) {
    return null;
  }

    const [timeLeft, setTimeLeft] = useState<string>('');
    const [timeLeftHour, setTimeLeftHour] = useState<string>('');
    const [timeLeftMinute, setTimeLeftMinute] = useState<string>('');
    const [timeLeftSecond, setTimeLeftSecond] = useState<string>('');
    const [bannerVisible, setBannerVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            if (now >= offerStartDate && now <= offerEndDate) {
                setBannerVisible(true);
                const difference = offerEndDate.getTime() - now.getTime();
                const hours = Math.floor(difference / (1000 * 60 * 60)).toString().padStart(2, '0');
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                const seconds = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0');
                setTimeLeft(`${hours}: ${minutes}: ${seconds}`);
                setTimeLeftHour(`${hours}h`);
                setTimeLeftMinute(`${minutes}m`);
                setTimeLeftSecond(`${seconds}s`);
            } else {
                setBannerVisible(false);
            }

            if (now > offerEndDate) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [offerStartDate, offerEndDate]);

    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(false);
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        router.events.on('routeChangeError', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            router.events.off('routeChangeError', handleRouteChange);
        };
    }, [router.events]);

    return (
      <Grid item xs={12} md={12} style={{ position: "relative" }}>
        {bannerVisible && (
          <>
            <Box
              sx={{
                position: "relative",
                backgroundColor: backgroundColour,
                p: isMobile ? 1 : 3,
              }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  fontSize: isMobile ? "20px" : "40px",
                  textAlign: "center",
                  fontWeight: 600,
                  mb: isMobile ? 1 : 2,
                  color: isMobile ? titleColourMobile : titleColour,
                }}
              >
                {title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    fontSize: isMobile ? "16px" : "24px",
                    textAlign: "center",
                    mb: isMobile ? 1 : 0,
                    width: isMobile ? "100%" : "50%",
                    color: isMobile ? subTitleColourMobile : subTitleColour,
                  }}
                >
                  {subTitle}
                </Box>
                <Box
                  sx={{
                    mx: isMobile ? 1 : 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: isMobile ? "20px" : "38px",
                      mr: 1,
                      color: isMobile ? dealEndsColourMobile : dealEndsColour,
                    }}
                  >
                    Deal Ends In{" "}
                  </Typography>
                  <Typography
                    className={
                      isMobile
                        ? "banner-time-left-mobile"
                        : "banner-time-left-desktop"
                    }
                    sx={{ mx: 0.5 }}
                  >
                    {timeLeftHour}
                  </Typography>
                  <Typography sx={{ mx: 0.5 }}>:</Typography>
                  <Typography
                    className={
                      isMobile
                        ? "banner-time-left-mobile"
                        : "banner-time-left-desktop"
                    }
                    sx={{ mx: 0.5 }}
                  >
                    {timeLeftMinute}
                  </Typography>
                  <Typography sx={{ mx: 0.5 }}>:</Typography>
                  <Typography
                    className={
                      isMobile
                        ? "banner-time-left-mobile"
                        : "banner-time-left-desktop"
                    }
                    sx={{ mx: 0.5 }}
                  >
                    {timeLeftSecond}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {isMobile && mobileImageUrl && (
              <Box
                component="img"
                alt="offer banner"
                src={mobileImageUrl}
                sx={{
                  width: "100%",
                  height: "auto",
                  cursor: ctaLabelUrl ? "pointer" : "default",
                }}
                onClick={() => {
                  if (ctaLabelUrl) {
                    router.push(ctaLabelUrl);
                  }
                }}
              />
            )}
            {!isMobile && webImageUrl && (
              <Box
                component="img"
                alt="offer banner"
                src={webImageUrl}
                sx={{
                  width: "100%",
                  height: "auto",
                  cursor: ctaLabelUrl ? "pointer" : "default",
                }}
                onClick={() => {
                  if (ctaLabelUrl) {
                    window.open(ctaLabelUrl, "_blank");
                  }
                }}
              />
            )}

            {ctaLabel && ctaLabelUrl && (
              <ViewAllButton
                $backColor="#0000"
                onClick={() => {
                  window.open(ctaLabelUrl, "_blank");
                }}
              >
                {ctaLabel}
              </ViewAllButton>
            )}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Loader />
              </Box>
            )}
          </>
        )}
      </Grid>
    );
};

export default BannerTimer;
