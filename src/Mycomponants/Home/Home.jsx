import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loadingpage from "../Loadingpage/Loadingpage";
import Error from "../Error/Error";
import Sliding from "../Sliding/Sliding";
import Categslider from "./../Sliding/Categslider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/Cartprovider";

export default function Home() {
  // const [allProducts, setallProducts] = useState(null);

  // async function getAllProducts() {
  //   const response = await axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products", {
  //       params: {
  //         sort: "price",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data.data);
  //       setallProducts(response.data.data);
  //     })
  //     .catch((error) => {
  //       <Error />;
  //     });
  // }
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  const { addProducttocart } = useContext(cartContext);

  function addingPro(id) {
    addProducttocart(id);
  }
  // ,{
  //   params:{
  //     sort: 'category'
  //   }
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getallProducts"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
    refetchInterval: 15 * 60 * 1000,
    retry: 3,
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return <Loadingpage />;
  }
  if (isError) {
    return <Error />;
  }
  const allProducts = data?.data.data;
  return (
    <div>
      <div>
        <div>
          <Sliding />
        </div>
        <div>
          <Categslider />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 p-5 pb-[100px]">
          {allProducts.map((product) => (
            <div key={product._id} className="bg-gray-100">
              <div className="w-full h-[530px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <Link
                  className="relative"
                  to={`/productdetails/${product._id}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-[270px] object-cover rounded-xl"
                  />
                  {product.priceAfterDiscount != 0 &&
                    product.priceAfterDiscount && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                      </span>
                    )}
                </Link>

                <div className="p-5 h-[252px] flex flex-col gap-2 justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.title.length > 30
                        ? `${product.title.slice(0, 27)}...`
                        : product.title}
                    </h3>
                    <p className="text-gray-500 mt-1">
                      {product.category.name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      {product.priceAfterDiscount ? (
                        <>
                          <p className="text-2xl font-bold text-gray-900">
                            {product.priceAfterDiscount}EGP
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            {product.price}EGP
                          </p>
                        </>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">
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
                              : "text-gray-300"
                          }
                        >
                          ★
                        </div>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={() => addingPro(product._id)}
                      className="w-full block cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
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
    </div>
  );
}
