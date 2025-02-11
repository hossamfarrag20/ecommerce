import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./Authprovider";
import Error from "./../Mycomponants/Error/Error";

export const cartContext = createContext();
export default function Cartprovider({ children }) {
  const { userToken } = useContext(authContext);
  const [numOfCartItems, setnumOfCartItem] = useState(0);
  const [products, setProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  function resetValues() {
    setProducts(null), setTotalCartPrice(0), setCartId(null);
  }

  async function addProducttocart(id) {
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: userToken },
        }
      )
      .then((res) => {
        console.log(res.data);

        // setnumOfCartItem(res.data.numOfCartItems);
        // setProducts(res.data.data.products);
        // setTotalCartPrice(res.data.data.totalCartPrice);
        getUserCart();
        setCartId(res.data.cartId);
        return true;
      })
      .catch((error) => {
        <Error />;
        return false;
      });
    return res;
  }
  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: userToken },
      })
      .then((res) => {
        console.log(res.data);
        setnumOfCartItem(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.cartId);
      })
      .catch((error) => {
        <Error />;
      });
  }
  async function updatecart(id, newData) {
    const res = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newData,
        },
        { headers: { token: userToken } }
      )
      .then((res) => {
        setnumOfCartItem(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);

        return true;
      })
      .catch((error) => {
        <Error />;
        return false;
      });
    return res;
  }

  function removeItemFromCart(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: userToken },
      })
      .then((res) => {
        setnumOfCartItem(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
      })
      .catch((error) => {
        <Error />;
      });
  }

  useEffect(() => {
    if (userToken) {
      getUserCart();
    }
  }, [userToken]);

  return (
    <cartContext.Provider
      value={{
        addProducttocart,
        numOfCartItems,
        products,
        totalCartPrice,
        updatecart,
        removeItemFromCart,
        cartId,
        userToken,
        resetValues,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
