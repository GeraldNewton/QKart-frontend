import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const setCart = async (productId, count) => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      enqueueSnackbar(
        "Cannot set Cart items due to faulty Login, You can Login again to remove this error",
        {
          variant: "error",
        }
      );
      return;
    }
    const res = await axios.put(
      `${CLOUD_URL}/v1/cart`,
      {
        productId,
        count,
        email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.cart_items;
  } catch (e) {
    let err_msg = "Could not set Cart items";

    if (e.response && e.response.data) {
      err_msg = `${err_msg} due to following reason:-
        ${e.response.data.name} : ${e.response.data.message}`;
      if (e.response.data.err_arr)
        setTimeout(
          () =>
            e.response.data.err_arr.forEach((val) =>
              enqueueSnackbar(`${val}`, { variant: "error", persist: true })
            ),
          3000
        );
    } else {
      err_msg = `${err_msg} due to System and Server error`;
    }
    enqueueSnackbar(err_msg, {
      variant: "error",
    });
  }
};

export default setCart;
