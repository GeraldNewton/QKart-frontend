import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const deleteOrders = async (id) => {
  try {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar(
        "Cannot get Cart items due to faulty Login, You can Login again to remove this error",
        {
          variant: "error",
        }
      );
      return;
    }
    const res = await axios.delete(`${CLOUD_URL}/v1/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        email,
        id,
      },
    });
    if (res.data.orders) {
      enqueueSnackbar("Order cancelled Sucessfully", {
        variant: "success",
      });
      return res.data.orders;
    } else {
      enqueueSnackbar("Order cancelled Failed", {
        variant: "error",
      });
      return null;
    }
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

export default deleteOrders;
