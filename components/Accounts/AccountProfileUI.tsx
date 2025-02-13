import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import {
  AvatarView,
  InfoTextTypo,
  LocalizationProviders,
  MakeChangesTypography,
  ParentGrid,
  TierTextTypo,
  fontsiznocol,
  photo_height,
  radio_button,
  stylefordesk,
  stylesfont,
} from "./AccountStyles";
import TextFieldHOC from "../../HOC/TextField/TextField";
import DatePicker from "../SigninComponent/Registrationcompo/DatePicker";
import {
  EMAIL_ID,
  FEMALE,
  FIRST_NAME,
  GENDER,
  INFO_TEXT,
  MAKE_CHANGES,
  MALE,
  MOBILE_NO,
  NAME_FIELD_TEXT,
  OTHER,
} from "./constants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { Camera_ICON, EDIT_IMAGE_ICON, Error_Image } from "../../utility/AppIcons";
import { MyprofileUploadDataImage } from "../PdpCardComponent/Constants";
import { onImageError } from "../../utility/onImageError";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const AccountProfileUI = (props: any) => {
  const {
    fileUploadManager,
    image,
    isMobile,
    values,
    userTierName,
    tierData,
    onClear,
    handleKeyRestrictions,
    handleInputChange,
    error,
    controlProps,
    helperText,
    dob,
    data,
    setDob,
    anniversary,
    setAnniversary,
    dateAnniversary,
    handleMakeChanges,
    finalacceptance,
  } = props;
  const EDIT_IMAGE = AppIcons(EDIT_IMAGE_ICON);
  const Camera_icon = AppIcons(Camera_ICON);
  const errorImage = AppIcons(Error_Image)
  const commonFunction = (condition: any, value1: any, value2: any) => {
    if (condition) {
      return value1;
    } else {
      return value2;
    }
  };

  return (
    <Box>
      <ParentGrid container spacing={2}>
        <Grid item xs={12} md={3} sm={12} sx={photo_height}>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={(e) => {
              fileUploadManager(e);
            }}
          />
          <label htmlFor="upload-button">
            {!image.preview && (
              <>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Avatar
                      src={
                        isMobile
                          ? `${ReplaceImage(EDIT_IMAGE?.url)}`
                          : `${ReplaceImage(Camera_icon?.url)}`
                      }
                      sx={{
                        width: commonFunction(isMobile, "35px", "42px"),
                        height: commonFunction(isMobile, "35px", "42px"),
                        padding: commonFunction(isMobile, "7px", null),
                        border: commonFunction(
                          isMobile,
                          "1px solid #A7A5A6",
                          null
                        ),
                        backgroundColor: commonFunction(
                          isMobile,
                          "#FFFFFF",
                          null
                        ),
                      }}
                    />
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <AvatarView
                    profileImage={values?.profileImage}
                    src={
                      values?.profileImage ||
                      `${ReplaceImage(MyprofileUploadDataImage)}`
                    }
                  />
                </Badge>
              </>
            )}

            {image.preview && (
              <>
                <Typography
                  sx={{
                    "@media(max-width:900px)": {
                      display: "flex",
                      margin: " 0px auto",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <img
                    src={image.preview}
                    alt="dummy"
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                    onError={(e: any) => onImageError(e, errorImage)}
                  />
                </Typography>
              </>
            )}
          </label>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: isMobile ? "5% 20%" : "5% 5%",
              wordWrap: "break-word",
            }}
          >
            <TierTextTypo>{tierData && userTierName}</TierTextTypo>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sm={12}
          justifyContent="flex-start"
          spacing={2}
          sx={{ marginTop: commonFunction(isMobile, "20px", "") }}
        >
          <Box
            sx={{ maxWidth: "505px" }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Box>
              <TextFieldHOC
                size="small"
                value={values?.firstName}
                name="firstName"
                showClear={true}
                label={FIRST_NAME}
                onClear={onClear}
                variant="outlined"
                onKeyDown={handleKeyRestrictions}
                InputLabelPropsColor="black"
                error={error}
                isColor={true}
                helperText={commonFunction(
                  values?.firstName == "",
                  "Invalid name",
                  ""
                )}
                onChange={handleInputChange}
              />
              <InfoTextTypo>{NAME_FIELD_TEXT}</InfoTextTypo>
            </Box>

            <Box sx={{ width: "100%" }}>
              <FormControl
                sx={{
                  marginTop: commonFunction(isMobile, "10px", "20px"),
                  width: "100%",
                }}
              >
                <Box
                  style={{ fontSize: commonFunction(isMobile, "12px", "14px") }}
                >
                  {GENDER}
                </Box>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  onChange={handleInputChange}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      sm={4}
                      lg={3}
                      justifyContent="flex-start"
                      sx={{
                        fontSize: commonFunction(isMobile, "12px", "14px"),
                        // marginRight: isMobile ? "0px" : "42px",
                      }}
                    >
                      <FormControlLabel
                        color="secondary"
                        value="Female"
                        control={
                          <Radio
                            {...controlProps("Female")}
                            size="small"
                            sx={radio_button}
                            checked={values.gender === "Female"}
                          />
                        }
                        label={<Box style={fontsiznocol}>{FEMALE}</Box>}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      sm={4}
                      lg={3}
                      justifyContent="flex-start"
                    // sx={{ marginRight: isMobile ? "" : "27px" }}
                    >
                      <FormControlLabel
                        value="Male"
                        control={
                          <Radio
                            {...controlProps("Male")}
                            size="small"
                            sx={radio_button}
                            checked={values.gender === "Male"}
                          />
                        }
                        label={<Box style={fontsiznocol}>{MALE}</Box>}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      sm={4}
                      lg={3}
                      justifyContent="flex-start"
                    >
                      <FormControlLabel
                        value="Other"
                        control={
                          <Radio
                            {...controlProps("Other")}
                            size="small"
                            required={true}
                            sx={radio_button}
                            checked={values.gender === "Other"}
                          />
                        }
                        label={<Box style={fontsiznocol}>{OTHER}</Box>}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ marginTop: "28px" }}>
              <TextFieldHOC
                disabled={true}
                name="emailChange"
                onChange={handleInputChange}
                size="small"
                id="outlined-basic"
                error={error}
                value={values.emailChange}
                helperText={error && helperText}
                defaultValue={values.emailChange}
                label={EMAIL_ID}
                isColor={true}
                InputLabelPropsColor="black"
                variant="outlined"
                sx={{
                  maxWidth: "505px",
                }}
              />
            </Box>

            <Box sx={{ marginTop: commonFunction(isMobile, "17px", "28px") }}>
              <TextFieldHOC
                disabled={true}
                border="unset"
                name="mobile"
                isColor={true}
                onChange={handleInputChange}
                size="small"
                id="outlined-basic"
                value={values.mobile}
                defaultValue={values.mobile}
                label={MOBILE_NO}
                variant="outlined"
                InputLabelPropsColor="black"
                sx={{
                  maxWidth: "505px",
                }}
              />
            </Box>
            <Box sx={{ marginTop: isMobile ? "17px" : "28px" }}>
              <DatePicker
                isonClick={dob ? true : false}
                date={dob}
                profileDate={data?.dob ? true : false}
                setDate={setDob}
                label={"Date Of Birth"}
                dateFormatSize="large"
                maxDate={new Date((new Date().getFullYear() - 12).toString())}
              />
            </Box>
            <Box sx={{ marginTop: commonFunction(isMobile, "17px", "28px") }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  isonClick={anniversary ? true : false}
                  date={anniversary}
                  setDate={setAnniversary}
                  profileDate={data?.anniversary ? true : false}
                  label={"Anniversary"}
                  dateFormatSize="large"
                />
              </LocalizationProvider>
              <InfoTextTypo>{INFO_TEXT}</InfoTextTypo>
            </Box>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              sx={{ textAlign: "center", width: isMobile ? "100%" : "96%" }}
            >
              {isMobile ? (
                <Button
                  className="button"
                  style={stylefordesk}
                  onClick={(event) => {
                    handleMakeChanges(event);
                  }}
                  sx={{
                    opacity: finalacceptance ? "0.9" : "0.1",
                    borderRadius: "0px",
                    margin: "20px 0px 40px 0px",
                  }}
                >
                  <MakeChangesTypography>{MAKE_CHANGES}</MakeChangesTypography>
                </Button>
              ) : (
                <Button
                  className="Button"
                  style={stylesfont}
                  type="submit"
                  onClick={(event) => {
                    handleMakeChanges(event);
                  }}
                  disabled={finalacceptance ? false : true}
                  sx={{
                    opacity: finalacceptance ? "0.9" : "0.1",
                    borderRadius: "0px",
                    margin: "20px 0px 10px 0px",
                  }}
                >
                  <MakeChangesTypography>{MAKE_CHANGES}</MakeChangesTypography>
                </Button>
              )}
            </Grid>
          </Box>
        </Grid>
      </ParentGrid>
    </Box>
  );
};

export default AccountProfileUI;
