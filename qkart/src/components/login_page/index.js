// import "./index.css"
import Header from "../header";
import {
  Box,
  Typography,
  Stack,
  InputLabel,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import styles from "./index.module.css";
import login from "../../apicall/login.js";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import logo from "../../assests/signup_login.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../footer/index.js";

const Login = () => {
  // ! to set loader
  const [load, setLoad] = useState(false);
  const navigate=useNavigate();

  const handleForm = async (e) => {
    setLoad(true);
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const signup_obj = {
      email,
      password,
    };
    const res = await login(signup_obj);
    if (res && res.data.token && res.data.user) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("id", res.data.user._id);
      localStorage.setItem("address", res.data.user.address);
      localStorage.setItem("walletmoney",res.data.user.walletmoney);
      enqueueSnackbar("Login successfull", {
        variant: "success",
      });
      navigate("/products")
    }
    setLoad(false);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" minHeight="100vh">

      <Header />
      <Stack
        direction="row"
        alignItems="center"
        width="90%"
        margin="8rem auto"
        flexWrap="wrap"
        gap="2rem"
      >
        <img src={logo} alt="login image" className={styles.hero_img} />
        <Box className={styles.box} component="form" onSubmit={handleForm}>
          <Typography
            variant="h3"
            marginBottom="4rem"
            className={styles.typography}
          >
            Login
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            marginTop="2rem"
          >
            <InputLabel
              htmlFor="email"
              sx={{ margin: "0rem", fontSize: "2.4rem" }}
            >
              Enter the Email:
            </InputLabel>
            <TextField
              required
              autoComplete="off"
              type="email"
              id="email"
              label="email"
              size="small"
              InputLabelProps={{
                style: {
                  fontSize: "2rem",
                },
              }}
              InputProps={{
                style: {
                  fontSize: "2rem",
                },
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            marginTop="2rem"
          >
            <InputLabel
              htmlFor="password"
              sx={{ margin: "0rem", fontSize: "2.4rem" }}
            >
              Enter the Password:
            </InputLabel>
            <TextField
              required
              type="password"
              autoComplete="off"
              id="password"
              label="password"
              size="small"
              InputLabelProps={{
                style: {
                  fontSize: "2rem",
                },
              }}
              InputProps={{
                style: {
                  fontSize: "2rem",
                },
              }}
            />
          </Stack>
          {!load ? (
            <Button
              type="submit"
              variant="contained"
              sx={{ fontSize: "1.8rem", marginTop: "4rem" }}
            >
              submit
            </Button>
          ) : (
            <CircularProgress />
          )}
          <Typography
            variant="h5"
            margin="3rem auto 2rem auto"
            className={styles.typography}
            color="purple"
          >
            Don't have an account,{" "}
            <Link to="signup" className={styles.login_link}>
              Sign Up
            </Link>{" "}
            to Create an Account!
          </Typography>
        </Box>
      </Stack>
      <Footer/>
    </Box>
  );
};
export default Login;
