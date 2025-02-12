import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../context/Cartprovider";
import axios from "axios";
import mybackground from "../../assets/new.png";
import { useNavigate } from "react-router-dom";
import Loadingpage from "../Loadingpage/Loadingpage";
export default function Ordering() {
  const { cartId, userToken, resetValues } = useContext(cartContext);
  const [isChash, setIsCash] = useState(false);
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  function creatChashOut(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        },
        {
          headers: { token: userToken },
          params: {
            url: "http://localhost:5173/ecommerce",
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
      })
      .catch((error) => {});
  }

  function creatCashOrder(values) {
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        },
        {
          headers: { token: userToken },
        }
      )
      .then((res) => {
        resetValues();
        console.log("Order Created:", res.data);
        setIsLoading(false);
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      if (isChash) {
        creatCashOrder(values);
      } else {
        creatChashOut(values);
      }
    },
  });
  if (isloading) {
    return <Loadingpage />;
  }
  return (
    <div
      style={{
        backgroundImage: `url(${mybackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="relative min-h-screen grid "
    >
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
        {/* <div
          className="relative  w-full bg-blue-500 h-full  md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${mybackground})`,
          }}
        >
          <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
        </div> */}
        <div className="py-30  flex flex-col items-start justify-start flex-auto min-w-0">
          <div className="flex relative inset-0 z-[1]  items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none">
            <div className="max-w-xl w-full space-y-12">
              <div className="lg:text-left text-center">
                <div className="flex items-center justify-center">
                  <div className="bg-black flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col space-y-8 mt-10"
                    >
                      <label className="font-bold text-lg text-white">
                        Details
                      </label>
                      <input
                        type="text"
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        placeholder="Enter details"
                        className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                      />

                      <label className="font-bold text-lg text-white">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        placeholder="Enter phone number"
                        className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"
                      />

                      <label className="font-bold text-lg text-white">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        placeholder="Enter city"
                        className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                      />
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsCash(true)}
                          type="submit"
                          className="border w-[70%] cursor-pointer hover:bg-indigo-600 border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
                        >
                          Cash On Delivery
                        </button>
                        <button
                          onClick={() => setIsCash(false)}
                          type="submit"
                          className="border cursor-pointer  grow  hover:bg-indigo-600 border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
                        >
                          Pay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
