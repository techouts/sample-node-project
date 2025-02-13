import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {
  TabSelect,
  MainTabs,
  TypographyCard,
  TypographyEmpty,
  TypographyCardChild,
  AddButton,
  TypographyCardHolder,
  TypographyCardData,
  TypographyDate,
  TypographyBoth,
  BoxSelection,
  TypographyDefault,
  BoxOption,
  BoxAdd,
  TypographyUpiAdd,
  FirstAppBar,
} from "./SavePaymentStyles";
import { useMobileCheck } from "../../utility/isMobile";
import SavePaymentInterface from "../../schemas/SavePaymentSchema";
import BasicModal from "../../HOC/Modal/ModalBlock";
import UpiDetails from "./Upi/UpiDetails";
import UpiData from "./Upi/UpiData.json";
import deleteDataJson from "./Delete/DeleteData.json";
import client from "../../apollo-client";
import { SAVED_CARD_PAYMENTS } from "../../graphQLQueries/SavedPayments";
import Loader from "../../HOC/Loader/Loader";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import DeleteUpiId from "./Delete/DeleteUpiId";
import DeleteCardDetails from "./Delete/DeleteCardDetails";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AMEX, DINERS, MASTERCARD, RUPAY, VISA } from "./constants";
import { AppIcons } from "../../utility/AppIconsConstant";
import { DELETE_ICON } from "../../utility/AppIcons";
import { toast } from "../../utility/Toast";
import handleErrorResponse from "../../utility/ErrorHandling";
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const isMobile = useMobileCheck();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: isMobile ? 1 : 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function Savepayment(saveData: SavePaymentInterface) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [upiData, setUpiData] = useState([]);
  const [deleteData, setDeleteData] = useState(false);
  const [upideleteData, setUpideleteData] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [selectedUpiDelete, setSelectedUpiDelete] = useState({});
  const [selectDeleteCard, setSelectDelectCard] = useState({});
  const [toggle, setToggle] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [cardsData, setCardsData] = useState([]);
  const { cartItems } = cartStore;
  const Delete_icon = AppIcons(DELETE_ICON);

  const brandLogo = (brandLogoName: string) => {
    let imgSrc = "";
    switch (brandLogoName?.toLowerCase()) {
      case "visa":
        imgSrc = VISA;
        break;
      case "rupay":
        imgSrc = RUPAY;
        break;
      case "diners":
        imgSrc = DINERS;
        break;
      case "mastercard":
        imgSrc = MASTERCARD;
        break;
      case "amex":
        imgSrc = AMEX;
        break;
    }
    return imgSrc;
  };

  const ToggleHandler = () => {
    setToggle(!toggle);
  };

  const HandleSnackBar = (message: string) => {
    setSnackBarOpen(true);
    setSnackMessage(message);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setDisplayLoader(true);
    client
      .mutate({
        mutation: SAVED_CARD_PAYMENTS,
        variables: {},
      })
      .then((resp) => {
       
        setUpiData(resp?.data?.savedPaymentMethod?.UpiIds);
        setCardsData(resp?.data?.savedPaymentMethod?.cards);
        setDisplayLoader(false);
        handleDefaultValueFalse();
        scrollUp();
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log("err=====>", err);
      })
      .finally(() => {
        setDisplayLoader(false);
      });
  }, [toggle]);

  //upiData
  const handleDefaultValue = () => {
    setIsDefault(true);
  };
  const handleDefaultValueFalse = () => {
    setIsDefault(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [upi, setUpi] = useState(false);
  const UpihandleOpen = () => {
    setUpi(true);
  };
  const UpihandleClose = () => {
    setUpi(false);
    handleDefaultValueFalse();
  };

  const deletehandleOpen = () => {
    setDeleteData(true);
  };
  const deletehandleClose = () => setDeleteData(false);

  const upideletehandleOpen = () => {
    setUpideleteData(true);
  };
  const upideletehandleClose = () => setUpideleteData(false);

  const isMobile = useMobileCheck();

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <Grid
          container
          bgcolor={saveData?.bgColor}
          sx={{
            background: "#F7F6F9",
            padding: isMobile ? "5px 16px 20px 16px" : "30px 30px",
          }}
        >
          <CustomSnackBar
            snackBarOpen={snackBarOpen}
            setSnackBarOpen={setSnackBarOpen}
            snackMessage={snackMessage}
          />

          <Grid
            sx={{ background: "#F7F6F9", padding: "25px 0px" }}
            item
            lg={12}
            md={12}
            xs={12}
            sm={12}
            p={saveData?.bgPadding}
            bgcolor={saveData?.bgColor}
          >
            <FirstAppBar position="static">
              <MainTabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <TabSelect
                  label={saveData?.categories[0]?.title}
                  {...a11yProps(0)}
                />

                <TabSelect
                  label={saveData?.categories[1]?.title}
                  {...a11yProps(2)}
                />
              </MainTabs>
            </FirstAppBar>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Box
              sx={{
                backgroundColor: "white",
                position: "relative",
                width: "100%",
              }}
            >
              <TabPanel value={value} index={0} dir={theme?.direction}>
                {cardsData?.length == 0 ? (
                  <TypographyEmpty>
                    {saveData?.categories[0]?.subCategories[0]?.errorMessage}
                  </TypographyEmpty>
                ) : (
                  <Grid container>
                    {cardsData?.map((option: any) => (
                      <>
                        <Grid
                          item
                          lg={6}
                          md={8}
                          sm={12}
                          xs={12}
                          sx={{
                            position: "relative",
                            padding: "10px",
                          }}
                        >
                          <Typography>
                            <img
                              src={
                                saveData?.categories[0]?.subCategories[0]
                                  ?.imgUrl
                              }
                              alt="card_items"
                              width="100%"
                            />
                          </Typography>
                          <Typography
                            sx={{
                              position: "absolute",
                              top: "20px",
                              right: "28px",
                            }}
                          >
                            <img
                              src={brandLogo(option?.card_brand)}
                              alt="logo"
                            />
                          </Typography>
                          <TypographyCard>Card Number</TypographyCard>
                          <TypographyCardChild>
                            {"**** **** **** " + option?.card_number.substr(option?.card_number?.length - 4)}
                          </TypographyCardChild>
                          <TypographyCardHolder>
                            Card Holder
                          </TypographyCardHolder>
                          <Typography>
                            <TypographyCardData>
                              {option?.name_on_card?.toUpperCase()}
                            </TypographyCardData>
                            <TypographyDate>EXP. DATE</TypographyDate>
                            <TypographyBoth>
                              {option?.card_exp_month}/{option?.card_exp_year}
                            </TypographyBoth>
                          </Typography>
                          <BoxSelection>
                            <BoxOption sx={{ justifyContent: "flex-end" }}>
                              <Typography
                                onClick={() => {
                                  deletehandleOpen();
                                  setSelectDelectCard(option?.card_token);
                                }}
                              >
                                <img
                                  src={`${ReplaceImage(Delete_icon?.url)}`}
                                  alt="delete"
                                />
                              </Typography>
                            </BoxOption>
                          </BoxSelection>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                )}
                {/* //Card delete popup */}
                <BasicModal
                  height={isMobile ? "175px" : "260px"}
                  width={isMobile ? "310px" : "570px"}
                  top="50%"
                  left="50%"
                  handleOpen={deletehandleOpen}
                  handleClose={deletehandleClose}
                  open={deleteData}
                  Component={
                    <DeleteCardDetails
                      ToggleHandler={ToggleHandler}
                      deleteData={deleteDataJson}
                      deletehandleClose={deletehandleClose}
                      DeleteCardId={selectDeleteCard}
                      HandleSnackBar={HandleSnackBar}
                    />
                  }
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {upiData?.length == 0 ? (
                  <TypographyEmpty>
                    {saveData?.categories?.[1]?.subCategories[0]?.errorMessage}
                  </TypographyEmpty>
                ) : (
                  <Grid container>
                    {upiData?.map((upiData: any, index: number) => (
                      <Grid item lg={12} md={12} sm={12} xs={12} key={index}>
                        <BoxAdd>
                          <TypographyUpiAdd sx={{ display: "flex" }}>
                            {upiData?.upi_id}
                            {upiData?.is_default && (
                              <TypographyDefault>Default</TypographyDefault>
                            )}
                          </TypographyUpiAdd>

                          <Typography
                            onClick={() => {
                              upideletehandleOpen();
                              setSelectedUpiDelete(upiData?.upi_id);
                            }}
                          >
                            <img
                              src={`${ReplaceImage(Delete_icon?.url)}`}
                              alt="delete"
                            />
                          </Typography>
                        </BoxAdd>
                        <Divider />
                        {/* //Upi pop up for delete option */}
                        <BasicModal
                          height={isMobile ? "175px" : "260px"}
                          width={isMobile ? "310px" : "570px"}
                          top="50%"
                          left="50%"
                          overflowData="auto"
                          handleOpen={upideletehandleOpen}
                          handleClose={upideletehandleClose}
                          open={upideleteData}
                          Component={
                            <DeleteUpiId
                              upiData={upiData}
                              ToggleHandler={ToggleHandler}
                              upiValue={selectedUpiDelete}
                              deleteData={deleteDataJson}
                              deletehandleClose={upideletehandleClose}
                              HandleSnackBar={HandleSnackBar}
                            />
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
                <AddButton variant="contained" onClick={UpihandleOpen}>
                  {saveData?.categories[1]?.subCategories[0]?.buttonText}
                </AddButton>
                {/* // modal pop up for upi */}
                <BasicModal
                  top={"50%"}
                  left={"50%"}
                  height={isMobile ? "100%" : "auto"}
                  width={isMobile ? "100%" : "auto"}
                  overflowData={"auto"}
                  pdpPopup={isMobile ? false : true}
                  handleOpen={UpihandleOpen}
                  handleClose={UpihandleClose}
                  open={upi}
                  Component={
                    <UpiDetails
                      data={UpiData}
                      UpihandleClose={UpihandleClose}
                      logo={saveData?.categories[1]?.subCategories[0].imgUrl}
                      handleDefaultValue={handleDefaultValue}
                      isDefault={isDefault}
                      handleDefaultValueFalse={handleDefaultValueFalse}
                      ToggleHandler={ToggleHandler}
                      HandleSnackBar={HandleSnackBar}
                      length={saveData?.categories[1]?.subCategories?.length}
                      cartItems={cartItems}
                    />
                  }
                />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
