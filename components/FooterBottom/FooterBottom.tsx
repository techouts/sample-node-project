import { Box } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import { TextDescription, TextTypography } from "./FooterSummaryStyled";

interface FooterBottomInterface {
  items: FooterBottomItems[];
}
interface FooterBottomItems {
  title: string;
  description: string;
}
const FooterBottom = ({ items }: FooterBottomInterface) => {
  const isMobile = useMobileCheck();
  return (
    <Box padding={isMobile ? "25px 16px 0" : "0% 5%"}>
      {items?.map(
        ({ title, description }: FooterBottomItems, index: number) => (
          <Box key={index}>
            <TextTypography  dangerouslySetInnerHTML={{ __html: title }} />
            <TextDescription  dangerouslySetInnerHTML={{ __html: description }} />
          </Box>
        )
      )}
    </Box>
  );
};

export default FooterBottom;
