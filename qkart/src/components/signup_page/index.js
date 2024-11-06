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
import signUp from "../../apicall/signup.js";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import logo from "../../assests/signup_login.png";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/index.js";

const Signup = () => {
  // ! to set circular progress
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const verify_signup = (obj) => {
    if (obj.password !== obj.re_password) return false;
    return true;
  };

  const handleForm = async (e) => {
    setLoad(true);
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const re_password = e.target.elements.re_password.value;
    const username = e.target.elements.username.value;
    const signup_obj = {
      email,
      password,
      re_password,
      username,
    };
    if (!verify_signup(signup_obj)) {
      enqueueSnackbar("Password and Re-Entered Password should match", {
        variant: "warning",
      });
    } else {
      const res = await signUp(signup_obj);
      if (res && res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("address", res.data.user.address);
        localStorage.setItem("id", res.data.user._id);
        localStorage.setItem("walletmoney", res.data.user.walletmoney);
        enqueueSnackbar("SignUp successfull", {
          variant: "success",
        });
        navigate("/");
      }
    }
    setLoad(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header />
      <Stack
        direction="row"
        alignItems="center"
        width="90%"
        margin="8rem auto"
        flexWrap="wrap"
        gap="2rem"
      >
        <img src={logo} alt="signup image" className={styles.hero_img} />
        <Box className={styles.box} component="form" onSubmit={handleForm}>
          <Typography
            variant="h3"
            marginBottom="4rem"
            className={styles.typography}
          >
            Sign Up
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            marginTop="2rem"
          >
            <InputLabel
              htmlFor="username"
              sx={{ margin: "0rem", fontSize: "2.4rem" }}
            >
              Enter the Username:
            </InputLabel>
            <TextField
              required
              autoComplete="off"
              id="username"
              label="username"
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            marginTop="2rem"
            marginBottom="2rem"
          >
            <InputLabel
              htmlFor="re_password"
              sx={{ margin: "0rem", fontSize: "2.4rem" }}
            >
              Re-enter the Password:
            </InputLabel>
            <TextField
              required
              type="password"
              autoComplete="off"
              id="re_password"
              label="renter password"
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
              sx={{ fontSize: "1.8rem", marginTop: "2rem" }}
            >
              submit
            </Button>
          ) : (
            <CircularProgress marginTop="2rem"/>
          )}
          <Typography
            variant="h4"
            margin="3rem auto 2rem auto"
            color="purple"
          >
            Already have an account,{" "}
            <span onClick={() => navigate(-1)} className={styles.login_link}>
              Login
            </span>{" "}
            to your Account!
          </Typography>
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
};
export default Signup;
