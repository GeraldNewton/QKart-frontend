import Header from "../header";
import Footer from "../footer";
import CartsCard from "../carts_card";
import {
  Stack,
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import getCart from "../../apicall/getCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getCartCost } from "../products_page";
import checkout from "./index.module.css";
import PlaceOrder from "../../apicall/placeOrder";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  // !to store cart array
  const [cart_arr, set_cart_arr] = useState([]);
  // !to show dialog box on changing address
  const [dialog, setDialog] = useState(false);
  // ! to check if ddress is set or not
  const [address, setAddress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = async () => {
      let cart = await getCart();
      if (cart) set_cart_arr(cart);
    };
    if (localStorage.getItem("address") !== "Not Set") {
      setAddress(true);
    }
    cart();
  }, []);

  const handleOrder = async (event) => {
    event.preventDefault();
    let order = await PlaceOrder(event.target[0].value);
    if (order) {
      localStorage.setItem("walletmoney", order.data.wallet_money);
      enqueueSnackbar("Order placed Sucessfully", {
        variant: "success",
      });
      enqueueSnackbar("Enjoy Shopping more!", {
        variant: "success",
      });
      navigate(-1);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasAuthButtons />
      <Stack
        direction={{ md: "column", lg: "row" }}
        gap="3rem"
        margin="10rem auto"
        width="90%"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* start of setting userinfo */}
        <Box className={checkout.info}>
          <Typography fontSize="5rem">Checkout</Typography>
          <Divider
            component="div"
            sx={{
              backgroundColor: "white",
              height: "0.1rem",
              margin: "2rem 0rem 4rem 0rem",
            }}
          />
          <Typography fontSize="3rem">
            Order will be delivered to the following address
          </Typography>
          {address ? (
            <>
              <Stack alignItems="flex-end" margin="5rem 0rem 7rem 0rem">
                <Typography
                  className={checkout.add}
                  fontSize="2.4rem"
                  fullWidth
                >
                  {localStorage.getItem("address")}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "support",
                    color: "black",
                    padding: "0.5rem 1rem",
                    marginTop: "4rem",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                    "&:hover": {
                      backgroundColor: "error.dark",
                      color: "support",
                    },
                  }}
                  onClick={() => navigate("../userPage")}
                >
                  <HomeRoundedIcon
                    sx={{ marginRight: "0.5rem", fontSize: "2rem" }}
                  />
                  Change Address
                </Button>
              </Stack>
              {localStorage.getItem("walletmoney") >= getCartCost(cart_arr) ? (
                <>
                  <Typography fontSize="2.2rem">
                    Pay{" "}
                    <Typography
                      className={checkout.amount}
                      fontWeight="600"
                      fontSize="2.3rem"
                      component="span"
                    >
                      ₹{getCartCost(cart_arr)}
                    </Typography>{" "}
                    of available{" "}
                    <Typography
                      className={checkout.amount}
                      fontWeight="600"
                      fontSize="2.3rem"
                      component="span"
                    >
                      ₹{localStorage.getItem("walletmoney")}
                    </Typography>
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setDialog((val) => !val);
                    }}
                    sx={{
                      backgroundColor: "secondary.light",
                      color: "black",
                      fontSize: "1.5rem",
                      padding: "0.5rem 1rem",
                      fontWeight: "600",
                      marginTop: "4rem",
                      "&:hover": {
                        backgroundColor: "error.dark",
                        color: "support",
                      },
                    }}
                  >
                    <PaymentsIcon
                      sx={{ marginRight: "0.5rem", fontSize: "2rem" }}
                    />
                    Place Order
                  </Button>
                </>
              ) : (
                // !to show wallet money is less
                <Typography
                  className={checkout.lowamount}
                  fontWeight="600"
                  fontSize="2.3rem"
                >
                  CANNOT PLACE ORDER DUE TO LOW WALLETMONEY
                </Typography>
              )}
            </>
          ) : (
            <>
              <Box
                width="90%"
                marginTop="3rem"
                backgroundColor="error.dark"
                border="0.5rem solid yellow"
                borderRadius="2rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="20rem"
                fontSize="4rem"
                fontWeight="600"
              >
                SET AN ADDRESS BEFORE PLACING AN ORDER
              </Box>
              <Button
                variant="contained"
                sx={{
                  marginTop: "2rem",
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  backgroundColor: "support",
                  "&:hover": { backgroundColor: "secondary.mid" },
                }}
                onClick={() => navigate("../userPage")}
              >
                add address
              </Button>
            </>
          )}
        </Box>
        {/* end of setting userinfo */}

        {/* start of setting carts card */}
        <Box className={checkout.cart}>
          <Box fontSize="4rem">cart</Box>
          {cart_arr.map((prod) => (
            <CartsCard prod={prod} />
          ))}
        </Box>
        {/* end of setting carts card */}
      </Stack>

      {/* start of setting dialog box to come when we place an order to take password from user */}
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog((val) => !val);
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleOrder(event);
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "2.5rem" }}>Make an Order</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "2rem" }}>
            To Place an order please provide your login Password.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            sx={{
              backgroundColor: "support",
              "& .MuiInputBase-input": {
                color: "primary.main",
                padding: "1rem 1.3rem",
                fontSize: "2rem",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "2rem",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setDialog((val) => !val);
            }}
            sx={{
              fontSize: "1.5rem",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: "1.5rem",
            }}
          >
            Order
          </Button>
        </DialogActions>
      </Dialog>
      {/* end of setting dialog box to come when we place an order to take password from user */}

      <Footer />
    </Box>
  );
};

export default CheckOut;
