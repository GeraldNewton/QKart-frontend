import { useLocation } from 'react-router-dom';
import styles from "./index.module.css";
import Header from "../header";
import hero from "../../assests/hero.png";
import { Box, Grid, TextField, InputAdornment, Button } from "@mui/material";
import clock_gif from "../../assests/clock_gif.gif";
import { enqueueSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getProducts from "../../apicall/getProducts";
import getCart from "../../apicall/getCart";
import setCart from "../../apicall/setCart";
import ProductCard from "../products_card";
import Footer from "../footer";
import CartsCard from "../carts_card";
import SearchIcon from "@mui/icons-material/Search";

export const getCartCost = (cart_arr) =>
  cart_arr.reduce((acc, obj) => acc + obj.quantity * obj.product.cost, 0);

const Products = () => {
  // ! contains cart array
  const [cart_arr, set_cart_arr] = useState([]);
  // ! contains product array
  const [prod_arr, set_prod_arr] = useState([]);
  // ! contains search text
  const [search_txt, set_search_txt] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  // ! implementing debounce search
  useEffect(() => {
    let id = setTimeout(() => {
      let wrapper = async () => await getSearchProducts(search_txt);
      wrapper();
    }, 500);

    return () => clearTimeout(id);
  }, [search_txt]);

  useEffect(() => {
    const products = async () => {
      const pro = await getProducts();
      if (pro) set_prod_arr(pro);
    };
    const cart = async () => {
      const cart = await getCart();
      if (cart) set_cart_arr(cart);
    };
    products();
    cart();
  }, [location.key]);

  const getSearchProducts = async (search_txt) => {
    const pro = await getProducts(search_txt);
    if (pro) set_prod_arr(pro);
  };

  const handleOrder = () => {
    const token=localStorage.getItem("token")
    if(token)
    navigate("../checkout");
    else{
      enqueueSnackbar(
          "Cannot buy without Login",
          {
            variant: "warning",
          }
        );
    }
  };

  const handleAddToCart = async (prod, qty) => {
    let new_cart = null;
    if (qty || qty == 0) {
      if (qty == 0) {
        new_cart = await setCart(prod, 0);
      } else {
        new_cart = await setCart(prod, qty);
      }
    } else if (cart_arr.findIndex((val) => val.product._id == prod._id) == -1) {
      new_cart = await setCart(prod, 1);
    } else {
      enqueueSnackbar("Product already present in cart", {
        variant: "warning",
      });
    }
    if (new_cart) set_cart_arr(new_cart);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasAuthButtons />

      {/* start of setting the herocontainer */}
      <Box className={styles.herocontainer}>
        <Box className={styles.herocontent}>
          <div className={styles.herotext}>Exciting deals ahead!!!</div>
          <div className={styles.hero_subtext1}>
            Enjoy Shopping through quick and easy{" "}
            <span className={styles.special}>2-step</span> delivery!
          </div>
          <div className={styles.hero_subtext2}>
            order fast
            <img src={clock_gif} className={styles.clock_gif} />
          </div>
        </Box>
        <img className={styles.heroimage} src={hero} />
      </Box>
      {/* end of setting the herocontainer */}

      {/* start of setting the search textfield for product types */}
      <Box
        margin="10rem auto 4rem auto"
        minWidth="20rem"
        maxWidth="50rem"
        width="100%"
      >
        <TextField
          autoComplete="off"
          placeholder="Search..."
          value={search_txt}
          fullWidth
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              color: "purple",
              padding: "1rem 1.3rem",
              fontSize: "2rem",
            },
          }}
          onChange={(e) => set_search_txt(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                sx={{
                  fontSize: "2.5rem",
                  color: "blueviolet",
                  "& .MuiSvgIcon-root": { fontSize: "3.5rem" },
                }}
                position="end"
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {/* end of setting the search textfield for product types */}

      <Box className={styles.content}>
        {/* start of setting of product cards or no items found box if no matches for search text found */}
        {prod_arr.length ? (
          <Grid container marginRight="4rem" gap="2rem">
            {prod_arr.map((prod) => (
              <ProductCard prod={prod} handleAddToCart={handleAddToCart} />
            ))}
          </Grid>
        ) : (
          <Box className={styles.product_noitem}>
            <div>no items could be loaded...</div>
          </Box>
        )}
        {/* end of setting of product cards or no items found box if no matches for search text found */}

        {/* start of setting of Cart's card or no items present in cart box */}

        <Box className={styles.cart}>
          {cart_arr.length ? (
            <>
              <Box fontSize="4rem">cart</Box>
              {cart_arr.map((prod) => (
                <CartsCard prod={prod} handleAddToCart={handleAddToCart} />
              ))}
              <Box>
                total cost:{" "}
                <Box component="span" color="white" fontSize="3.5rem">
                  ₹{getCartCost(cart_arr)}
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  margin: "1rem auto 1rem auto",
                  width: "90%",
                  fontSize: "2rem",
                  fontWeight: "600",
                  backgroundColor: "error.main",
                  "&:hover": { backgroundColor: "error.dark" },
                }}
                onClick={handleOrder}
              >
                BUY NOW!
              </Button>
            </>
          ) : (
            <Box className={styles.cart_noitem}>no items in cart ☹️</Box>
          )}
          {/* end of setting of Cart's card or no items present in cart box */}
        </Box>
        
        {/* end of setting of Carts card or no items present in cart box */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Products;
