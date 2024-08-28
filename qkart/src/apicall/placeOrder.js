import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const PlaceOrder = async (password) => {
  try {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (!token || !email) {
      enqueueSnackbar(
        "Cannot Place Order due to faulty Login, You can Login again to remove this error",
        {
          variant: "error",
        }
      );
      return;
    }
    const res = await axios.post(
      `${CLOUD_URL}/v1/cart/buy`,
      {
        email,
        password,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } catch (e) {
    let err_msg = "Could not Place Order";
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

export default PlaceOrder;
