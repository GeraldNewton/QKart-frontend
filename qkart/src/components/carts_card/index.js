import { Box, Stack, Button } from "@mui/material";
import styles from "./index.module.css";

//! prod=contains the prod object
//! handleAddToCart=checks if cart card is for products page or for checkout page as in former we can ajust quantity of objects in latter we cannot

const CartsCard = ({ prod, handleAddToCart }) => {
  return (
    <Box className={styles.cart_item} key={prod.product._id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>{prod.product.name}</Box>
        <img className={styles.cart_img} src={prod.product.image} alt="" />
      </Stack>
      {handleAddToCart ? (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Box>Cost of item</Box>
            <Box>₹ {prod.product.cost}</Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontSize: "2.5rem",
                  minWidth: "1rem",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: "support",
                  color: "blueviolet",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
                onClick={() => handleAddToCart(prod.product, prod.quantity - 1)}
              >
                -
              </Button>
              <Box component="span" display="inline-block" margin="0rem 1rem">
                {prod.quantity}
              </Box>
              <Button
                variant="contained"
                sx={{
                  fontSize: "2.5rem",
                  minWidth: "1rem",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: "support",
                  color: "blueviolet",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
                onClick={() => handleAddToCart(prod.product, prod.quantity + 1)}
              >
                +
              </Button>
            </Box>
            <Box>₹ {prod.quantity * prod.product.cost}</Box>
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Box>Total Units</Box>
            <Box>{prod.quantity}</Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box>Cost</Box>
            <Box>₹ {prod.quantity * prod.product.cost}</Box>
          </Stack>
        </>
      )}
    </Box>
  );
};
export default CartsCard;
