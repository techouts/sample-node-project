/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import styles from "./MUIButton.module.css";
import ButtomInterface from "../../schemas/ButtomSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";

function MUIButton(props: ButtomInterface) {
  const {
    ctaLabel,
    disable,
    primaryTextColor,
    secondaryTextColor,
    primaryColor,
    secondaryColor,
    primaryEndIcon,
    primaryStartIcon,
    secondaryEndIcon,
    secondaryStartIcon,
    secondaryButtonLabel,
    dualButtonDirection,
    buttonAllignment,
    secondaryButtonDisable,
    primaryVariant,
    secondaryVariant,
  } = props?.interface;

  const PrimaryButton = styled(Button)(({ theme }) => ({
    color: primaryTextColor,
    backgroundColor: primaryColor,
    "&:hover": {
      backgroundColor: primaryColor,
    },
  }));

  const SecondaryButton = styled(Button)(({ theme }) => ({
    color: secondaryTextColor,
    backgroundColor: secondaryColor,
    "&:hover": {
      backgroundColor: secondaryColor,
    },
  }));

  const handleButtton = (e: any, type: string) => {
    props?.interface?.handleButtonClick &&
      props?.interface?.handleButtonClick(type);
  };

  return (
    <Stack
      spacing={2}
      justifyContent={buttonAllignment}
      alignItems="center"
      direction={dualButtonDirection}
      className={styles?.stack_margin}
    >
      <PrimaryButton
        variant={primaryVariant}
        disabled={disable}
        startIcon={
          primaryStartIcon && (
            <img
              src={`${ReplaceImage(primaryStartIcon)}` || primaryStartIcon}
              alt="icon"
              className={styles?.start_end_icons}
            />
          )
        }
        endIcon={
          primaryEndIcon && (
            <img
              src={`${ReplaceImage(primaryEndIcon)}` || primaryEndIcon}
              alt="icon"
              className={styles?.start_end_icons}
            />
          )
        }
        onClick={(e) => {
          handleButtton(e, "primary");
        }}
      >
        {ctaLabel}
      </PrimaryButton>
      {secondaryButtonLabel && (
        <SecondaryButton
          variant={secondaryVariant}
          disabled={secondaryButtonDisable}
          startIcon={
            secondaryStartIcon && (
              <img
                src={
                  `${ReplaceImage(secondaryStartIcon)}` || secondaryStartIcon
                }
                alt="icon"
                className={styles?.start_end_icons}
              />
            )
          }
          endIcon={
            secondaryEndIcon && (
              <img
                src={`${ReplaceImage(secondaryEndIcon)}` || secondaryEndIcon}
                alt="icon"
                className={styles?.start_end_icons}
              />
            )
          }
          onClick={(e) => {
            handleButtton(e, "secondary");
          }}
        >
          {secondaryButtonLabel}
        </SecondaryButton>
      )}
    </Stack>
  );
}

export default MUIButton;
