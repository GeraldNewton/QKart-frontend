import {
  Stack,
  Box,
  TextField,
  Typography,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import Header from "../header";
import Footer from "../footer";
import styles from "./index.module.css";
import getOrders from "../../apicall/getOrders";
import deleteOrders from "../../apicall/deleteOrder";
import changeAdd from "../../apicall/changeAddress";
import { enqueueSnackbar } from "notistack";

const UserPage = () => {
  // ! to store the orders from backend
  const [orders, setOrders] = useState([]);
  // ! to set loader cicularprogress during api call
  const [load, setLoad] = useState(true);
  // ! to set dialog on changing address
  const [dialog, setDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [newadd_view, set_newadd_view] = useState("none");
  const newadd = useRef("");

  const handleDelete = async (id) => {
    const response = await deleteOrders(id);
    if (response) setOrders(response);
  };

  useEffect(() => {
    const apiGetOrders = async () => {
      const order = await getOrders();
      if (order) setOrders(order);
      setLoad(false);
    };
    apiGetOrders();
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const address = localStorage.getItem("address");
    const walletmoney = localStorage.getItem("walletmoney");
    if (!email || !address || !username || !walletmoney)
      enqueueSnackbar(
        "Cannot get User information due to faulty login, Please Login Again to solve this error",
        {
          variant: "error",
        }
      );
    else
      setUserInfo({
        username,
        email,
        address,
        walletmoney,
      });
  }, []);

  const getOrderCost = (products) =>
    products.reduce((acc, obj) => acc + obj.units * obj.cost, 0);

  const handleChangeAdd = async (event) => {
    event.preventDefault();
    let pass = event.target[0].value,
      add = newadd.current;
    if (add == "")
      enqueueSnackbar("Address field cannot be empty", { variant: "warning" });
    const response = await changeAdd(add, pass);
    if (response) {
      setUserInfo((val) => ({ ...val, address: response }));
      enqueueSnackbar("Address Changed Successfully", {
        variant: "success",
      });
      localStorage.setItem("address", response);
    }
    setDialog(false);
    set_newadd_view("none");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasAuthButtons no_user />
      <Box
        width="70%"
        borderRadius="2rem"
        backgroundColor="white"
        margin="8rem auto 8rem auto"
        boxSizing="border-box"
        padding="4rem"
      >
        {/* start of setting the user image icon and user info */}
        <Stack
          direction={{ md: "column", lg: "row" }}
          width="80%"
          boxSizing="border-box"
          margin="0rem auto"
          gap="3rem"
          alignItems="flex-start"
        >
          <PersonOutlineOutlinedIcon
            className={styles.user_icon}
            sx={{
              fontSize: "25rem",
              border: "0.5rem solid rgba(128, 128, 128, 0.464)",
              borderRadius: "1rem",
              backgroundColor: "antiquewhite",
            }}
          />
          <Stack direction="column" width="100%">
            <Stack direction="row" justifyContent="space-between" gap="2rem">
              <Typography variant="h4" fontWeight="600" width="16rem">
                username:
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                color="primary.main"
                flexGrow="1"
              >
                {userInfo.username}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap="2rem">
              <Typography variant="h4" fontWeight="600" width="16rem">
                email:
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                sx={{ wordBreak: "break-all" }}
                color="primary.main"
                flexGrow="1"
              >
                {userInfo.email}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap="2rem">
              <Typography variant="h4" fontWeight="600" width="16rem">
                wallet money:
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                color="primary.main"
                flexGrow="1"
              >
                ₹ {userInfo.walletmoney}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap="2rem">
              <Typography variant="h4" fontWeight="600" width="16rem">
                address:
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                color="blueviolet"
                sx={{ wordBreak: "break-all" }}
                flexGrow="1"
              >
                {userInfo.address}
              </Typography>
            </Stack>

            <Box display={newadd_view == "none" ? "block" : "none"}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "1.5rem",
                  width: "20rem",
                  marginTop: "2rem",
                  fontWeight: "600",
                  padding: "0.5rem 1rem",
                  backgroundColor: "secondary.mid",
                  "&:hover": { backgroundColor: "secondary.main" },
                }}
                onClick={() => {
                  set_newadd_view("block");
                }}
              >
                <BusinessIcon
                  sx={{ marginRight: "0.5rem", fontSize: "2.5rem" }}
                />
                change address
              </Button>
            </Box>
          </Stack>
        </Stack>
        {/* end of setting the user image icon and user info */}

        {/* start of setting the newaddress textfield */}
        <Box
          fullWidth
          textAlign="center"
          marginTop="5rem"
          display={newadd_view}
        >
          <TextField
            placeholder="Enter new Address..."
            multiline
            rows={4}
            sx={{ width: "100%" }}
            inputProps={{ style: { fontSize: "2rem", lineHeight: "1.9rem" } }}
            onChange={(e) => {
              newadd.current = e.target.value;
            }}
          />
          <Box marginTop="3rem">
            <Button
              variant="contained"
              onClick={() => {
                setDialog((val) => !val);
              }}
              sx={{
                marginRight: "2rem",
                fontSize: "1.5rem",
                padding: "0.5rem 1rem",
              }}
              type="submit"
            >
              submit
            </Button>
            <Button
              sx={{
                fontSize: "1.5rem",
                padding: "0.5rem 1rem",
              }}
              variant="contained"
              onClick={() => {
                set_newadd_view("none");
              }}
            >
              cancel
            </Button>
          </Box>
        </Box>
        {/* end of setting the newaddress textfield */}

        {/* start to set the dialog box to get password for changing address */}
        <Dialog
          open={dialog}
          onClose={() => {
            setDialog((val) => !val);
          }}
          sx={{
            "& form": {
              width: "150rem",
            },
          }}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              handleChangeAdd(event);
            },
          }}
        >
          <DialogTitle sx={{ fontSize: "2.5rem" }}>Change Address</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: "2rem" }}>
              Enter the Password for Verification.
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="pass"
              name="pass"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              multiline
              sx={{
                backgroundColor: "white",
                "& .MuiInputBase-input": {
                  color: "purple",
                  padding: "1rem 1.3rem",
                  fontSize: "2rem",
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2rem",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setDialog((val) => !val);
              }}
              sx={{
                fontSize: "1.5rem",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ fontSize: "1.5rem" }}
            >
              Change address
            </Button>
          </DialogActions>
        </Dialog>
        {/* end to set the dialog box to get password for changing address */}

        {/* start to set the your orders text and circular progress box to get password for changing address */}
        <Typography
          marginTop="4rem"
          marginBottom="2rem"
          variant="h2"
          color="error.dark"
          fontWeight="600"
        >
          Your Orders:
        </Typography>
        {load && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {/* end to set the your orders text and circular progress box to get password for changing address */}

        {/* start to set the orders containg products purchased  */}
        {!load &&
          (orders.length ? (
            orders.map((obj) => (
              <Box
                backgroundColor="rgb(249, 226, 195)"
                boxSizing="border-box"
                padding="1.5rem"
                marginBottom="2rem"
                borderRadius="1.5rem"
                key={obj._id}
              >
                <Box display="flex" gap="3rem" flexWrap="wrap">
                  {obj.products.map((prod) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      padding="0.5rem"
                      borderRadius="1rem"
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        className={styles.order_image}
                        src={prod.image}
                        alt=""
                      />
                      <Box>
                        <Typography
                          component="div"
                          fontSize="2rem"
                          color="primary.main"
                          marginLeft="1rem"
                        >
                          {prod.name}
                          {"   "}
                          <Box component="span" fontSize="3rem" color="red">
                            ×
                          </Box>
                          {prod.units}
                        </Typography>
                        <Typography
                          component="div"
                          fontSize="2rem"
                          color="primary.main"
                          marginLeft="1rem"
                        >
                          Cost(1): ₹{prod.cost}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  marginTop="2rem"
                >
                  <Typography
                    fontSize="2.5rem"
                    fontWeight="600"
                    color="primary.main"
                  >
                    Total Cost: ₹{getOrderCost(obj.products)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "support",
                      fontSize: "1.5rem",
                      color: "black",
                      fontWeight: "600",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "error.dark",
                      },
                      marginLeft:"2rem"
                    }}
                    onClick={() => handleDelete(obj._id)}
                  >
                    cancel order
                  </Button>
                </Stack>
              </Box>
            ))
          ) : (
            <Box
              height="20rem"
              fontWeight="600"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="2rem"
              fontSize="4rem"
              backgroundColor="secondary.light"
              color="error.main"
              padding="0 2rem"
            >
              You Do Not Have Any Orders Made...
            </Box>
          ))}
        {/* start to set the orders containg products purchased  */}
      </Box>
      <Footer />
    </Box>
  );
};
export default UserPage;
