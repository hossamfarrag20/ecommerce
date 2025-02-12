import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./Authprovider";
import Error from "./../Mycomponants/Error/Error";
import { useQuery } from "@tanstack/react-query";

export const cartContext = createContext();
export default function Cartprovider({ children }) {
  const { userToken } = useContext(authContext);
  const [numOfCartItems, setnumOfCartItem] = useState(0);
  const [products, setProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [wishList, setWishList] = useState(false);

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

  // zaki---------------------------------------------------------------------
  async function AddProductwishlist(id) {
    const res = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        {
          headers: { token: userToken },
        }
      )
      .then((res) => {
        setWishList(true);
        console.log(res);

        return true;
      })
      .catch((error) => {
        return false;
      });
    return res;
  }

  async function DeleteProductwishlist(id) {
    const res = await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        {
          headers: { token: userToken },
        }
      )
      .then((res) => {
        setWishList(false);
        console.log(res);

        return true;
      })
      .catch((error) => {
        console.log(res);

        return false;
      });
    return res;
  }
  // function GetAllProductwishlist() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
  //     headers: { token: userToken },
  //   });
  // }

  // const {
  //   data: wishlistData,
  //   isLoading: wishlistLoading,
  //   isError: wishlistError,
  // } = useQuery({
  //   queryKey: ["GetAllProductwishlist"],
  //   queryFn: GetAllProductwishlist,
  //   refetchInterval: 500,
  // });
  // zaki---------------------------------------------------------------------
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
        AddProductwishlist,
        wishList,
        setWishList,
        DeleteProductwishlist,
        // wishlistData,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
