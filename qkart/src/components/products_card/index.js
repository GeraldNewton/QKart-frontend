import {
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({ prod, handleAddToCart }) => {
  return (
    <Grid item key={prod._id}>
      <Card sx={{ minWidth: 300 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image={prod.image}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "red", fontWeight: "600",fontSize:"2.5rem" }}
          >
            {prod.name}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ color: "red", fontWeight: "600",fontSize:"2rem" }}
            >
              ₹ {prod.cost}
            </Typography>
            <Rating
              name="read-only"
              value={parseInt(prod.rating)}
              readOnly
              size="large"
              sx={{fontSize:"2.5rem"}}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={()=>handleAddToCart(prod)}
            sx={{
              fontSize:"2rem",
              textTransform:"uppercase",
              fontWeight:"600"
            }}
          >
            <AddShoppingCartIcon
              sx={{ fontSize: "4rem" }}
            />
            add
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
