import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
interface StyledProps {
  isMobile: boolean;
}
interface WalletAmountStyledProps {
  isMobile: boolean;
  isRedeem: boolean;
}

export const TransactionNumber = styled(Typography)(
  ({ isMobile }: StyledProps) => ({
    color: "#231F20",
    fontWeight: 700,
    size: `${isMobile ? "12px" : "16px"}`,
    lineHeight: `${isMobile ? "14.65px" : "19.54px"}`,
  })
);
export const WalletCustomerTitle = styled(Typography)(
  ({ isMobile }: StyledProps) => ({
    color: "#231F20",
    fontWeight: 700,
    size: `${isMobile ? "12px" : "16px"}`,
    lineHeight: `${isMobile ? "14.65px" : "19.54px"}`,
  })
);
export const AttributeTitle = styled(Typography)(
  ({ isMobile }: StyledProps) => ({
    color: "#231F20",
    size: `${isMobile ? "12px" : "16px"}`,
  })
);
export const WalletUserTitle = styled(Typography)(
  ({ isMobile }: StyledProps) => ({
    color: "#656263",
    fontWeight: 400,
    size: `${isMobile ? "11px" : "16px"}`,
    textAlign: "left",
    lineHeight: `${isMobile ? "13.12px" : "19.09px"}`,
    marginTop: "4px",
  })
);
export const WalletAmount = styled(Typography)(
  ({ isMobile, isRedeem }: WalletAmountStyledProps) => ({
    color: `${isRedeem ? "red" : "green"}`,
    fontWeight: 700,
    size: `${isMobile ? "12px" : "20px"}`,
    lineHeight: `${isMobile ? "14.65px" : "24.42px"}`,
  })
);
export const WalletLogDate = styled(Typography)(
  ({ isMobile }: StyledProps) => ({
    color: "#A7A5A6",
    fontWeight: 400,
    size: `${isMobile ? "11px" : "16px"}`,
    textAlign: "right",
    lineHeight: `${isMobile ? "13.12px" : "19.09px"}`,
    marginTop: "4px",
  })
);
