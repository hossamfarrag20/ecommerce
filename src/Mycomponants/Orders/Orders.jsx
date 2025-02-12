import axios from "axios";
import React, { useContext } from "react";
import { authContext } from "../../context/Authprovider";
import { useQuery } from "@tanstack/react-query";
import Loadingpage from "../Loadingpage/Loadingpage";

export default function Orders() {
  const { userToken, userData } = useContext(authContext);

  // دالة لجلب جميع الطلبات
  function getallorders() {
    if (userToken) {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
      );
    }
  }

  // استخدام useQuery لجلب البيانات
  const { data, isLoading } = useQuery({
    queryKey: ["getallorders"],
    queryFn: getallorders,
    enabled : !!userToken
});
console.log(data);

  // دالة لتنسيق التاريخ
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // تنسيق التاريخ
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // استخدام تنسيق 12 ساعة (AM/PM)
    };

    return date.toLocaleString("en-US", options);
  };

  // عرض صفحة التحميل إذا كانت البيانات قيد التحميل
  if (isLoading) {
    return <Loadingpage />;
  }

  return (
    <>
      <section className="py-24 relative bg-white min-h-screen dark:bg-gray-800">
        {userToken ? (
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black dark:text-white mb-9">
              {data?.data.length > 0 ? "Order History" : "No Orders Yet"}
            </h2>

            {data?.data.map((order, index) => (
              <div
                key={index}
                className="mt-7 border border-gray-300 dark:border-gray-700 pt-9"
              >
                <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                  <div className="data">
                    <p className="font-medium text-lg leading-8 text-black dark:text-white mt-3 whitespace-nowrap">
                      Order Payment: {formatDate(order.createdAt)}{" "}
                      {/* استخدام الدالة هنا */}
                    </p>
                  </div>
                </div>
                <svg
                  className="my-9 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  width={1216}
                  height={2}
                  viewBox="0 0 1216 2"
                  fill="none"
                >
                  <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>

                {order?.cartItems.map((Orderdetails, index) => (
                  <div
                    key={index}
                    className="flex py-2 max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11"
                  >
                    <div className="grid grid-cols-4 w-full">
                      <div className="col-span-4 sm:col-span-1">
                        <img
                          src={Orderdetails.product.imageCover}
                          alt
                          className="max-sm:mx-auto object-cover"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-black dark:text-white mb-3 whitespace-nowrap">
                          {Orderdetails.product.title}
                        </h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 dark:text-gray-400 mb-8 whitespace-nowrap">
                          Category: {Orderdetails.product.category.name}
                        </p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Quantity: {Orderdetails.count}
                          </span>
                          <p className="font-semibold text-xl leading-8 text-black dark:text-white whitespace-nowrap">
                            Price ${Orderdetails.price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 dark:text-gray-400 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
                          Delivered
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <svg
                  className="mt-9 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  width={1216}
                  height={2}
                  viewBox="0 0 1216 2"
                  fill="none"
                >
                  <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>

                <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                  <div className="flex max-sm:flex-col-reverse py-10 items-center">
                    <p className="font-normal text-xl leading-8 text-gray-500 dark:text-gray-400 sm:pl-8">
                      Payment Is Successful
                    </p>
                  </div>
                  <p className="font-medium text-xl leading-8 text-black dark:text-white max-sm:py-4">
                    <span className="text-gray-500 dark:text-gray-400">
                      Total Price:{" "}
                    </span>
                    &nbsp;${order.totalOrderPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="font-manrope px-10 font-extrabold text-3xl lead-10 text-black dark:text-white mb-9">
            Please Login First
          </h2>
        )}
      </section>
    </>
  );
}