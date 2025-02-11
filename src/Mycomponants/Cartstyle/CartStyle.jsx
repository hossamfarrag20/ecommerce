import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/Cartprovider";
import { authContext } from "../../context/Authprovider";
import MyModal from "../Modal/Modal";
import { modalcontext } from "../../context/Modalprovider";

export default function CartStyle() {
  const { numOfCartItems } = useContext(cartContext);
  const { userToken } = useContext(authContext);
  const { setOpenModal, setDescriptionMassege, setBtnContent } = useContext(modalcontext);
  function getTHeModal() {
    setOpenModal(true);
    setDescriptionMassege("Please Login First");
    setBtnContent("Login");
  }

  return (
    <div className="fixed end-[20px] bottom-[80px] z-50">
      <div className="bg-[rgb(253,132,31)] w-[60px] h-[65px] flex justify-center shadow-2xl items-center rounded-xl relative">
        {userToken ? (
          <Link className="" to="/cart">
            <i className="fa-solid cursor-pointer fa-cart-plus text-[30px] shadow-2xl text-[rgb(0,18,83)]"></i>
          </Link>
        ) : (
          <i
            onClick={getTHeModal}
            className="fa-solid cursor-pointer fa-cart-plus text-[30px] shadow-2xl text-[rgb(0,18,83)]"
          ></i>
        )}

        <div className="rounded-full absolute px-[6px] py-[1px] bg-[rgb(225,77,42)] flex items-center justify-center translate-y-[-30%] top-0 end-0">
          <span className="text-white ">{numOfCartItems}</span>
        </div>
      </div>
      <MyModal />
    </div>
  );
}
