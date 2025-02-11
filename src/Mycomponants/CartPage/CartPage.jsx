import React, { useContext } from "react";
import { cartContext } from "../../context/Cartprovider";
import Loadingpage from "../Loadingpage/Loadingpage";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CartStyle from "../Cartstyle/CartStyle";

export default function CartPage() {
  const { totalCartPrice, products, updatecart, removeItemFromCart } =
    useContext(cartContext);
  console.log("products", products);
  if (!products) {
    return <Loadingpage />;
  }
  async function changeCount(id, newData) {
    const res = await updatecart(id, newData);
    console.log("products", products);
    res
      ? toast.success("Product count Changed", {
          duration: 3000,
          position: "top-center",
        })
      : toast.error("Error, Try again Later", {
          duration: 3000,
          position: "top-center",
        });
  }
  function startRemove(id) {
    removeItemFromCart(id);
  }

  return (
    <>
      <section className="bg-white py-8 antialiased Minimum-height3 dark:bg-gray-900 md:py-16">
        <CartStyle />

        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          <Link to={"/order"}>
            <button className="text-white bg-emerald-500 p-4 cursor-pointer">
              Pay
            </button>
          </Link>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {products?.map((product) => (
                  <div
                    key={product.product._id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img
                        className="h-20 w-20 dark:hidden"
                        src={product.product.imageCover}
                        alt={product.product.title}
                      />
                      <img
                        className="hidden h-20 w-20 dark:block"
                        src={product.product.imageCover}
                        alt={product.product.title}
                      />
                      <label for="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              changeCount(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 cursor-pointer shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            placeholder=""
                            value={product.count}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value) || 0;
                              changeCount(product.product._id, newValue);
                            }}
                            required
                          />
                          <button
                            onClick={() =>
                              changeCount(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex cursor-pointer h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            {product.price} EGP
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {product.product.title}
                        </a>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className=" cursor-pointer inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                          >
                            <svg
                              class="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                              />
                            </svg>
                            Add to Favorites
                          </button>

                          <button
                            onClick={() => startRemove(product.product._id)}
                            type="button"
                            className="inline-flex items-center cursor-pointer text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          >
                            <svg
                              class="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
