import { Box } from "@mui/system";
import { useMobileCheck } from "../../utility/isMobile";
import { QuoteTypography } from "./BlogParagraphStyles";
const BlogParagraphQuote = (data: any) => {
  const isMobile = useMobileCheck();
  return (
    <Box p={isMobile ? " 0 6%" : data?.bgPadding}>
      <QuoteTypography isMobile={isMobile}>{data?.text}</QuoteTypography>
    </Box>
  );
};
export default BlogParagraphQuote;
