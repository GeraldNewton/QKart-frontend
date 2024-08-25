import axios from "axios";
import { enqueueSnackbar } from "notistack";

const changeAdd = async (newadd, pass) => {
  try {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !email) {
      enqueueSnackbar(
        "Cannot Place Order due to faulty Login, You can Login again to remove this error",
        {
          variant: "error",
        }
      );
      return;
    }
    const res = await axios.put(
      `http://localhost:3000/v1/users/setAdd/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}`, newadd, pass },
      }
    );
    if (res.data.address) return res.data.address;
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
    if (e.response.data.err_arr)
      setTimeout(() => {
        e.response.data.err_arr.forEach((val) =>
          enqueueSnackbar(val, {
            variant: "error",
            persist: true,
          })
        );
      }, 2000);
  }
};

export default changeAdd;
