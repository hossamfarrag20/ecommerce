import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loadingpage from "../Loadingpage/Loadingpage";
import Error from "../Error/Error";
import Sliding from "../Sliding/Sliding";
import Categslider from "./../Sliding/Categslider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/Cartprovider";
import toast from "react-hot-toast";
import MyModal from "../Modal/Modal";
import CartStyle from "../Cartstyle/CartStyle";
import useAllProducts from "../../customHooks/useAllProducts";
import useWishlist from "../../customHooks/useWishlist"; // Import the custom hook

export default function Home() {
  const { addProducttocart, AddProductwishlist, DeleteProductwishlist } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false); // Loading state for wishlist operations
  const [isError, setIsError] = useState(false); // Error state for wishlist operations
  const [wishlistIds, setWishlistIds] = useState(new Set()); // Track wishlist product IDs

  // Fetch all products
  const { data, isError: isProductsError, isLoading: isProductsLoading } = useAllProducts();

  // Fetch wishlist data
  const { data: wishlistData, refetch: refetchWishlist } = useWishlist();

  // Update wishlist IDs when wishlist data changes
  useEffect(() => {
    if (wishlistData?.data?.data) {
      const ids = new Set(wishlistData.data.data.map((item) => item._id));
      setWishlistIds(ids);
    }
  }, [wishlistData]);

  const handleAddToCart = async (id) => {
    try {
      const res = await addProducttocart(id);
      if (res) {
        toast.success("Product Added to Cart", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error, Try again Later", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const toggleWishlist = async (productId) => {
    setIsLoading(true); // Start loading
    setIsError(false); // Reset error state
    try {
      if (wishlistIds.has(productId)) {
        await DeleteProductwishlist(productId);
        toast.success("Product Removed from Wishlist");
      } else {
        await AddProductwishlist(productId);
        toast.success("Product Added to Wishlist");
      }
      await refetchWishlist(); // Refetch wishlist data after updating
    } catch (error) {
      setIsError(true); // Set error state
      toast.error("Error, Try again Later", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isProductsLoading) {
    return <Loadingpage />;
  }

  if (isProductsError) {
    return <Error />;
  }

  const allProducts = data?.data.data;

  return (
    <div className=" ">
      <CartStyle />
      <div>

        <div className="grid py-30 sm:grid-cols-2 md:grid-cols-3 dark:bg-gray-800 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 p-5 pb-[100px]">
          {allProducts.map((product) => {
            const isInWishlist = wishlistIds.has(product._id); // Check if product is in wishlist
            return (
              <div
                key={product._id}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl"
              >
                <div className="w-full h-[530px] bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Link
                    className="relative"
                    to={`/productdetails/${product._id}`}
                  >
                    <div className="relative after:absolute after:inset-0 before:absolute  before:content-['🔗'] before:top-[50%] before:start-[50%] before:translate-[-50%] before:z-10 text-2xl text-white before:text-black   after:bg-black after:opacity-10 after:rounded-xl after:transition-opacity after:duration-300 hover:after:opacity-50 hover:before:opacity-100 before:opacity-0">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-[270px] object-cover rounded-xl"
                      />
                    </div>

                    {product.priceAfterDiscount != 0 &&
                      product.priceAfterDiscount && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                          Sale
                        </span>
                      )}
                  </Link>

                  <div className="p-5 h-[252px] flex flex-col gap-2 justify-between ">
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {product.title.length > 30
                            ? `${product.title.slice(0, 27)}...`
                            : product.title}
                        </h3>
                        <button
                          onClick={() => toggleWishlist(product._id)}
                          disabled={isLoading}
                          className="text-red-500 hover:text-red-600 focus:outline-none"
                        >
                          <svg
                            className={`w-6 h-6 ${
                              isInWishlist ? "fill-red-500" : "fill-none"
                            }`}
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
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {product.category.name}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        {product.priceAfterDiscount ? (
                          <>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {product.priceAfterDiscount}EGP
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {product.price}EGP
                            </p>
                          </>
                        ) : (
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {product.price}EGP
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <div
                            key={index}
                            className={
                              index < Math.floor(product.ratingsAverage)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }
                          >
                            ★
                          </div>
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="w-full block cursor-pointer bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}