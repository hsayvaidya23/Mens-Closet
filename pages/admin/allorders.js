import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const Orders = () => {
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
      <FullLayout>All Orders</FullLayout>
    </ThemeProvider>
  );
};

export default Orders;
