import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const getCart = async () => {
  try {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (!token) {
      let cart=localStorage.getItem("cart_items");
      cart=JSON.parse(cart);
      return cart || [];
    }
    const res = await axios.get(`${CLOUD_URL}/v1/cart`, {
      headers: { Authorization: `Bearer ${token}`, email },
    });
    return res.data.cart_items;
  } catch (e) {
    let err_msg = "Could not show Cart items";
    if (e.response && e.response.data) {
      err_msg = `${err_msg} due to following reason:-
        ${e.response.data.name} : ${e.response.data.message}`;
    } else {
      err_msg = `${err_msg} due to System and Server error`;
    }
    enqueueSnackbar(err_msg, {
      variant: "error",
    });
  }
};

export default getCart;
