import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { authContext } from "../../context/Authprovider";
import Loadingpage from "../Loadingpage/Loadingpage";
import Error from "../Error/Error";
import useWishlist from "../../customHooks/useWishlist";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/Cartprovider";
import toast from "react-hot-toast";
import CartStyle from "../Cartstyle/CartStyle";

export default function WishlistPage() {
  const { DeleteProductwishlist } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false); // Loading state for wishlist operations
  const [isError, setIsError] = useState(false); // Error state for wishlist operations

  const {
    data,
    isError: isWishlistError,
    isLoading: isWishlistLoading,
    refetch,
  } = useWishlist();

  const handleRemoveFromWishlist = async (productId) => {
    setIsLoading(true); // Start loading
    setIsError(false); // Reset error state
    try {
      const res = await DeleteProductwishlist(productId);
      if (res) {
        toast.success("Product Removed from Wishlist", {
          duration: 3000,
          position: "top-center",
        });
        await refetch(); // Refetch wishlist data after removing
      }
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

  if (isWishlistLoading) {
    return <Loadingpage />;
  }

  if (isWishlistError) {
    return <Error />;
  }

  const allWishListData = data?.data.data;

  return (
    <div className="dark:bg-gray-800 min-h-screen p-5">
        <CartStyle />
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl py-30">
        <div className="space-y-6">
          {allWishListData?.length === 0 ? (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              No Products in your wishlist
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
          )}
          {allWishListData?.map((wishlistproduct) => (
            <div
              key={wishlistproduct._id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
            >
              <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <Link to={"/productdetails/" + wishlistproduct._id}>
                  <img
                    className="h-20 w-20 dark:hidden"
                    src={wishlistproduct.imageCover}
                    alt={wishlistproduct.title}
                  />
                  <img
                    className="hidden h-20 w-20 dark:block"
                    src={wishlistproduct.imageCover}
                    alt={wishlistproduct.title}
                  />
                </Link>
                <label htmlFor="counter-input" className="sr-only">
                  Choose quantity:
                </label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                  <div className="flex items-center"></div>
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {wishlistproduct.price} EGP
                    </p>
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <Link
                    to={"/productdetails/" + wishlistproduct._id}
                    className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    {wishlistproduct.title}
                  </Link>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFromWishlist(wishlistproduct._id)
                      }
                      disabled={isLoading} // Disable button while loading
                      className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        className="me-1.5 h-5 w-5 fill-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                      </svg>
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
