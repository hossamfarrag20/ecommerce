import React, { useContext } from "react";
import useCategories from "../../customHooks/useCategories";
import Loadingpage from "../Loadingpage/Loadingpage";
import Error from "../Error/Error";
import { Link } from "react-router-dom";
import CartStyle from "../Cartstyle/CartStyle";

export default function () {
  const { data, isError, isLoading } = useCategories();

  if (isError) {
    return <Error />;
  }
  if (isLoading) {
    return <Loadingpage />;
  }
  const allCategories = data?.data.data;
  console.log(allCategories);

  return (
    <>
    <CartStyle />
      <div className="dark:bg-gray-800">
        <div class="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-30 gap-8 sm:gap-5  md:gap-10">
          {allCategories.map((category) => (
            <div class="mx-auto w-[400px] sm:w-full">
              <div class="relative flex flex-col overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl dark:bg-gray-900 dark:text-gray-300 w-full">
                <div class="relative mx-4 mt-4  text-gray-700 bg-white bg-clip-border rounded-xl ">
                  <img
                    src={category.image}
                    alt={category.name}
                    class="object-cover object-center w-full md:h-70 h-96 lg:h-96 rounded-lg"
                  />
                </div>

                <div class="p-6 pt-0">
                  <button
                    class="align-middle mt-3 select-none font-sans font-bold text-xl cursor-pointer hover:bg-indigo-600 text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    {category.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
