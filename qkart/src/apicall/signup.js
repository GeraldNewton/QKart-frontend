import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const signUp = async ({ username, password, email }) => {
  try {
    const res = await axios.post(`${CLOUD_URL}/v1/auth/signup`, {
      username,
      email,
      password,
    });
    return res;
  } catch (e) {
    if (e.response.data) {
      enqueueSnackbar(`${e.response.data.name} : ${e.response.data.message}`, {
        variant: "error",
      });

      if (e.response.data.err_arr)
        setTimeout(
          () =>
            e.response.data.err_arr.forEach((val) =>
              enqueueSnackbar(`${val}`, { variant: "error", persist: true })
            ),
          3000
        );
    }
  }
};

export default signUp;
