import React from "react";
import useAllProducts from "../../customHooks/useAllProducts";
import Loadingpage from "../Loadingpage/Loadingpage";
import Error from "../Error/Error";
import { Link } from "react-router-dom";
import CartStyle from "../Cartstyle/CartStyle";

export default function ProductsPage() {
  const { data, isError, isLoading } = useAllProducts();

  if (isLoading) {
    return <Loadingpage />;
  }
  if (isError) {
    return <Error />;
  }
  const allProducts = data?.data.data;
  return (
    <div className=" dark:bg-gray-800 py-30">
      <CartStyle />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 p-5 pb-[100px]">
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl"
          >
            <div className="w-full h-[530px] bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Link className="relative" to={`/productdetails/${product._id}`}>
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {product.title.length > 30
                      ? `${product.title.slice(0, 27)}...`
                      : product.title}
                  </h3>
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
                    onClick={() => addingPro(product._id)}
                    className="w-full block cursor-pointer bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
