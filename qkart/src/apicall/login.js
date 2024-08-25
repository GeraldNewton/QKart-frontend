import axios from "axios";
import { enqueueSnackbar } from "notistack";

const login = async ({ email, password }) => {
  try {
    const res = await axios.get("http://localhost:3000/v1/auth/login", {
      headers: {
        email,
        password,
      },
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

export default login;
