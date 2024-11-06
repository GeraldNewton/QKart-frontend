import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { CLOUD_URL,BASE_URL } from "../App";

const setCart = async (prod, count) => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      let cart_items=localStorage.getItem("cart_items");
      if(cart_items!=null && cart_items.length!=0){
        cart_items=JSON.parse(cart_items);
        const ind=cart_items.findIndex((prodl)=>prodl.product._id===prod._id)
        if(ind==-1){
          cart_items.push({product:prod,quantity:count})         
        }
        else if(count==0)
        cart_items.splice(ind,1);
        else
        cart_items[ind].quantity=count;
      }else{
        cart_items=[
          {
            product:prod,
            quantity:count
          }
        ]
      }
      localStorage.setItem("cart_items",JSON.stringify(cart_items));
      return cart_items;
    }else{
      const res = await axios.put(
        `${CLOUD_URL}/v1/cart`,
      {
        productId:prod._id,
        count,
        email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      return res.data.cart_items;
    }
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
