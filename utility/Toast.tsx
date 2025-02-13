import toast, { Toaster } from "react-hot-toast";
import Box from '@mui/material/Box';
const Toast = () => {
  return (
    <Box>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "lato",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "1px",
          },
          duration: 4000,
        }}
      />
    </Box>
  );
};

export { Toast, toast };