import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/signup_page";
import Login from "./components/login_page";
import Products from "./components/products_page";
import Checkout from "./components/checkout_page";
import UserPage from "./components/user_page";

import {
  SnackbarProvider,
  closeSnackbar,
  MaterialDesignContent,
} from "notistack";
import { styled } from "@mui/system";
import "./App.css";

const theme = createTheme({ 
  palette: {
    primary: {
      main: "rgb(138, 43, 226)",
    },
    secondary:{
      main:"rgb(36, 171, 3)",
      light:"rgb(158, 247, 99)",
      mid:"rgb(125, 224, 2)"
    },
    error:{
      main:"rgb(242, 56, 31)",
      dark:"rgb(252, 3, 3)"
    },
    background: {
      default: "rgb(237, 255, 255)",
    },
    support:"rgb(252, 252, 252)"
  },
});

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent": {
    fontSize: "2rem",
  },
}));

const route = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/userPage",
    element: <UserPage />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        action={(snackbarId) => (
          <button className="button" onClick={() => closeSnackbar(snackbarId)}>
            Dismiss
          </button>
        )}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
        }}
      >
        <CssBaseline />
        {/* The CssBaseline component in Material-UI resets the default CSS 
        styles for the browser and applies theme-specific global styles. 
        When you define background.default in the palette, that value is 
        applied to the <body> element through CssBaseline. Without CssBaseline, 
        Material-UI does not automatically inject those global styles, and 
        therefore the background color won't be applied. */}
        <RouterProvider router={route} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
