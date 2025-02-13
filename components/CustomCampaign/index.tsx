import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    useMediaQuery,
    Box,
  } from "@mui/material";
  import { useState } from "react";
  import InputAdornment from "@mui/material/InputAdornment";
  import SSLogo from "../../public/Logo-Black.svg";
  import Pujo from "../../public/Pujo-Pujo.svg";
  import UploadIcon from "@mui/icons-material/Upload";
  import { styled } from "@mui/system";
  import Head from "next/head";
  import { toast } from "../../utility/Toast";
  import client from "../../apollo-client";
  import { Cookies } from "react-cookie";
  import WeekendFashion from "../../public/Logo.png";
  import BackgroundImage from "../../public/4x6.png";
  import { createQRCodeCustomer } from "../../graphQLQueries/CampaignQuery";
import { SubHeaderNavBox } from "../Header/HeaderStyle";
  
  export default function CustomCampaign(props: any) {
    const cookie = new Cookies();
    cookie.set("promotionStore", props.store, {
      path: "/",
      sameSite: true,
      secure: true,
    });
    cookie.set("promotionCity", props.city, {
      path: "/",
      sameSite: true,
      secure: true,
    });
  
    console.log("check props", props);
    console.log(
      "check store,city",
      cookie.get("promotionStore"),
      cookie.get("promotionCity")
    );
  
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:960px)");
  
    const imageWidth = isMobile ? "100%" : isTablet ? "50%" : "30%";
  
    const Input = styled("input")({
      display: "none",
    });
  
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      image: null,
      consent: false,
    });
  
    const [errors, setErrors] = useState({
      name: "",
      phone: "",
      email: "",
      image: "",
      consent: "",
    });
  
    const [fileName, setFileName] = useState("");
    let promotionCity = cookie.get("promotionCity");
  
    const validate = () => {
      const newErrors: any = {};
  
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
  
      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits and start with 6-9";
      }
  
      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
  
      // Image validation
      if (!formData.image) {
        newErrors.image = "Image file is required";
      }
  
      // Consent validation
      if (!formData.consent) {
        newErrors.consent = "You must consent to the T&C";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (e: any) => {
      const { name, value, type, checked } = e.target;
  
      if (name === "phone") {
        // Only allow digits and limit to 10 characters
        if (/^[6-9]\d{0,9}$/.test(value) || value === "") {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      }
    };
  
    const handleClick = () => {
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
  
      if (fileInput) {
        fileInput.click();
  
        fileInput.addEventListener(
          "change",
          (event) => {
            const file = (event?.target as HTMLInputElement).files?.[0];
  
            if (file) {
              const reader = new FileReader();
  
              reader.onloadend = () => {
                const base64String = reader.result as string;
                // Remove the `data:image/png;base64,` part
                const base64Image = base64String.replace(
                  /^data:image\/[a-zA-Z]+;base64,/,
                  ""
                );
  
                setFormData((formData) => ({
                  ...formData,
                  image: base64Image,
                }));
              };
  
              reader.readAsDataURL(file);
              setFileName(file.name);
            }
          },
          { once: true }
        );
      }
    };
  
    const handleImageChange = (e: any) => {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
  
      const file = e?.target?.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64String = reader.result as string;
        };
        setFileName(file.name);
      }
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      if (validate()) {
        console.log("submit data", formData);
        const { name, phone, email, image, consent } = formData;
        client
          .mutate({
            mutation: createQRCodeCustomer,
            variables: {
              name: name,
              mobilenumber: phone,
              email: email,
              image: image,
              tcFlag: consent === true ? 1 : 0,
              store: cookie.get("promotionStore"),
              city: cookie.get("promotionCity"),
              region:"north"
            },
          })
          .then((response: any) => {
            console.log(
              "variables check",
              formData.name,
              formData.phone,
              formData.email,
              formData.image,
              formData.consent === true ? 1 : 0,
              props.store,
              props.city
            );
            setFormData({
              name: "",
              phone: "",
              email: "",
              image: null,
              consent: false,
            });
            setFileName("");
            toast.success(response?.data?.createQRCodeCustomer?.msg);
          })
          .catch((err) => {
            console.log(
              "variables check",
              formData.name,
              formData.phone,
              formData.email,
              formData.image,
              formData.consent === true ? 1 : 0,
              props.store,
              props.city
            );
            const errMessage = JSON.parse(JSON.stringify(err));
            console.log("error check", errMessage?.message);
            toast.error(errMessage?.message);
          });
      }
    };
    
  
    return (
      <>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          flexDirection: "column",
          backgroundImage: `url(/Yellow-Bg.avif)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: isMobile ? "#ffa100" : "#ff7f00",
        }}
      >
        <Head>
          <title>Shoppers Stop Campaign Form</title>
        </Head>
        <Grid
          item
          sx={{
            textAlign: "center",
            color: "#000000",
            marginBottom: 4,
          }}
        >
          <Grid container justifyContent="center">
            <img
              src={SSLogo.src}
              alt="Shoppers Stop Logo"
              style={{
                width: imageWidth,
                height: "45px",
                objectFit: "cover",
                marginTop: "40px",
              }}
            />
          </Grid>
          <Grid container justifyContent="center">
            <img
              src={Pujo.src}
              alt="Campaign Tagline"
              style={{
                width: "230px",
                objectFit: "cover",
                height: "120px",
              }}
            />
          </Grid>
   
          <Typography
            variant="body2"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              marginBottom: 4,
              margin: "15px",
              fontSize: "18px",
            }}
          >
            Send us the most fashionable photo of your family
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{
              margin: "15px",
              fontSize: isMobile ? "24px" : "28px",
            }}
          >
            WIN REWARDS WORTH UP TO ₹1 LAKH
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          style={{
            padding: "0px 8%",
          }}
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid
            item
            component="form"
            // onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: 1,
            }}
          >
            <TextField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              placeholder="Name*"
              InputProps={{
                sx: {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "25px",
                  "& input": {
                    textAlign: "center",
                  },
                },
                inputProps: {
                  pattern: "[A-Za-z ]*", // Allows only alphabetic characters and spaces
                  maxLength: 70, // Restrict input length to 12 characters
                },
              }}
              onKeyDown={(e) => {
                if (
                  !/^[A-Za-z\s]$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault(); // Prevents numbers or other unwanted characters
                }
              }}
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.name ? "red" : "transparent",
                    borderWidth: errors.name ? "3px" : "1px",
                  },
                },
              }}
            />
  
            <TextField
              name="phone"
              type="tel"
              placeholder="Contact*"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              error={!!errors.phone}
              InputProps={{
                sx: {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "25px",
                  "& input": {
                    textAlign: "center",
                    MozAppearance: "textfield",
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                  },
                },
                inputProps: {
                  maxLength: 10, // Restrict input length to 10 digits
                  pattern: "[0-9]*", // Accept only numbers
                },
              }}
              onKeyDown={(e) => {
                // Allow only numbers, Backspace, and Tab
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault(); // Prevent unwanted characters
                }
                // Restrict input length to 10 digits
                if (
                  formData.phone.length >= 10 &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault(); // Prevent further input if length is 10
                }
              }}
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.phone ? "red" : "transparent",
                    borderWidth: errors.phone ? "3px" : "1px",
                  },
                },
              }}
            />
  
            <TextField
              name="email"
              type="email"
              placeholder="Email ID*"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              InputProps={{
                sx: {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "25px",
                  "& input": {
                    textAlign: "center",
                  },
                },
              }}
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.email ? "red" : "transparent",
                    borderWidth: errors.email ? "3px" : "1px",
                  },
                },
              }}
            />
  
            <Box display="flex" alignItems="center" width="100%" sx={{ mb: 2 }}>
              <Input
                id="file-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="file-upload" style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  error={!!errors.image}
                  InputProps={{
                    readOnly: true,
                    sx: {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "25px",
                      borderColor: "transparent",
                      cursor: "pointer",
                      "& input": {
                        textAlign: "center",
                      },
                      color: "#cccccc",
                    },
                  }}
                  sx={{
                    marginBottom: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.image ? "red" : "transparent",
                        borderWidth: errors.image ? "3px" : "1px",
                      },
                    },
                  }}
                  value={fileName || "Upload File*"}
                  onClick={handleClick}
                />
              </label>
            </Box>
            {(errors.name || errors.phone || errors.email || errors.image) && (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "red",
                  textAlign: "center",
                  marginBottom: 1,
                }}
              >
                Please ensure all required fields are filled in correctly to
                proceed
              </Typography>
            )}
  
            <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    sx={{
                      color: "#FFFFFF",
                      "&.Mui-checked": {
                        color: "#000000",
                      },
                      "& .MuiSvgIcon-root": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "4px",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "10px" }}>
                    I agree to receive marketing communication via WhatsApp and
                    SMS from Shoppers Stop. I have read and accept the Privacy
                    Policy and Terms and Conditions.*
                  </Typography>
                }
                sx={{ marginBottom: 2, fontSize: "10px" }}
              />
            </Grid>
            {errors.consent && (
              <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                {errors.consent}
              </Typography>
            )}
  
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#FFFFFF",
                  color: "#000000",
                  textTransform: "none",
                  width: "150px",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  marginBottom: 2,
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        </>
      );
    }
