import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const Allproducts = () => {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
          footer {
            display: none;
          }
          navbar {
            display: none;
          }
        `}
      </style>
      <FullLayout>Hello Product</FullLayout>
    </ThemeProvider>
  );
};

export default Allproducts;
