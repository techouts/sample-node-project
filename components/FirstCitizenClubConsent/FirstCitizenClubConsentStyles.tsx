import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";
import { Stack } from "@mui/material";
interface Responsive {
  isMobile?: boolean;
}
export const BoxWrapper = styled(Box)(({ isMobile }: Responsive) => ({
  border: "1px solid #EAEAEA",
  width: "100%",
}));
export const ConsentDetails = styled(Stack)(({ isMobile }: Responsive) => ({
  borderBottom: "1px solid #EAEAEA",
  padding: "20px",
}));
export const ConsentDescription = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    padding: "20px",
    width: "100%",
  })
);
export const ConsentDetailsTitle = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "19.2px",
  })
);
export const ConsentDetailsSubtitle = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "18px",
    textTransform: "uppercase",
    color: "#171717",
  })
);
export const ConsentDetailsPriceText = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "18px",
    color: "#B91C1C",
  })
);
