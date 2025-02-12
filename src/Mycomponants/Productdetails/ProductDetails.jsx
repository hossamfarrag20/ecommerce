import { useQuery } from "@tanstack/react-query";
import React, { use, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loadingpage from "./../Loadingpage/Loadingpage";
import Error from "./../Error/Error";
import axios from "axios";
import { cartContext } from "./../../context/Cartprovider";
import toast from "react-hot-toast";
import CartStyle from "../Cartstyle/CartStyle";
import { Button } from "flowbite-react";
import { authContext } from "../../context/Authprovider";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProducttocart } = useContext(cartContext);
  const { userToken } = useContext(authContext);
  const { wishlistData } = useContext(cartContext);
  async function handlingCart() {
    const res = await addProducttocart(id);
    res
      ? toast.success("Product Added", {
          duration: 3000,
          position: "top-center",
        })
      : toast.error("Error, Try again Later", {
          duration: 3000,
          position: "top-center",
        });
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getProductsdetails", id],
    queryFn: getProductDetails,
    
  });
  if (isLoading) {
    return <Loadingpage />;
  }
  if (isError) {
    return <Error />;
  }

  const Productsdetails = data?.data.data;
 //------------------- zaki---------------------------------------------------------------------

  const wishlistIds = new Set(wishlistData?.data.data.map((item) => item.id));

  // if (wishlistIds?.has(Productsdetails.id)) {
  //   iswishlist = true;
  // } else {
  //   iswishlist = false;
  // }

  function AddProductwishlist() {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: { token: userToken },
        }
      )
      .then((res) => {
        toast.success("Product Added to Wishlist", {
          duration: 3000,
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error("Error, Try again Later", {
          duration: 3000,
          position: "top-center",
        });
      });
      // iswishlist = true;
  }
  function DeleteProductwishlist() {
    axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        {
          headers: { token: userToken },
        }
      )
      .then((res) => {
        toast.success("Product Deleted From Wishlist", {
          duration: 3000,
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error("Error, Try again Later", {
          duration: 3000,
          position: "top-center",
        });
      });
      // iswishlist = false;
  }
// zaki---------------------------------------------------------------------

  return (
    <>
      <div className="flex items-center justify-center Minimum-height2 my-[80px]">
        <CartStyle />

        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:w-1/3 p-4 relative">
              <div className=" ">
                <img
                  src={Productsdetails.imageCover}
                  alt={Productsdetails.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
                {/* -----------zaki----------------------------------------- */}
                {!wishlistIds?.has(Productsdetails.id) ? (
                  <button
                    onClick={() => {
                      AddProductwishlist();
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 absolute top-0 right-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={DeleteProductwishlist}
                    className="absolute  top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    <svg
                      className="w-6 fill-red-500 h-6 absolute top-0 right-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </button>
                )}
                {/* ----------------------------------zaki ----------------------------------*/}
              </div>
            </div>

            <div className="md:w-2/3 p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {Productsdetails.title}
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                {Productsdetails.description}
              </p>

              <div className="flex items-center mb-4">
                <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                  {Productsdetails.ratingsAverage} ★
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {Productsdetails.ratingsQuantity} Reviewer
                </span>
              </div>

              <ul className="text-sm text-gray-700 mb-6">
                <li className="flex items-center mb-1">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Quantity : {Productsdetails.quantity}
                </li>
                <li className="flex items-center mb-1">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Brand : {Productsdetails.brand.name}
                </li>
                <li className="flex items-center mb-1">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Slug : {Productsdetails.brand.slug}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Sold : {Productsdetails.sold} times
                </li>
              </ul>

              <div className="flex items-center justify-between mb-4">
                <div>
                  {Productsdetails.priceAfterDiscount ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">
                        {Productsdetails.priceAfterDiscount}
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                        {Productsdetails.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      {Productsdetails.price}
                    </span>
                  )}
                </div>
                {Productsdetails.priceAfterDiscount != 0 &&
                  Productsdetails.priceAfterDiscount && (
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Sale :{" "}
                      {((((Productsdetails.price -
                        Productsdetails.priceAfterDiscount) /
                        Productsdetails.price)* 100)).toFixed(2)}
                      %
                    </span>
                  )}
              </div>

              <p className="text-green-600 text-sm font-semibold mb-4">
                Free Delivery
              </p>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                  Buy Now
                </button>
                <button
                  onClick={handlingCart}
                  className="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
