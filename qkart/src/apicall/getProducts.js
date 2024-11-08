import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const getProducts = async (search_txt) => {
  try {
    const res = await axios.get(`${CLOUD_URL}/v1/products${search_txt ? `/${search_txt}` : ""}`);
    return res.data;
  } catch (e) {
    console.log(e);
    let err_msg = "Could not get Products";

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

export default getProducts;
