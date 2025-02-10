import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/Cartprovider";

export default function CartStyle() {
  const {numOfCartItems} = useContext(cartContext);
  return (
    <div className="fixed end-[20px] bottom-[80px]">
      <div className="bg-[rgb(253,132,31)] w-[60px] h-[65px] flex justify-center shadow-2xl items-center rounded-xl relative">
        <Link className="" to="/cart">
          <i className="fa-solid fa-cart-plus text-[30px] shadow-2xl text-[rgb(0,18,83)]"></i>
        </Link>
        <div className="rounded-full absolute px-[6px] py-[1px] bg-[rgb(225,77,42)] flex items-center justify-center translate-y-[-30%] top-0 end-0">
          <span className="text-white ">{numOfCartItems}</span>
        </div>
      </div>
    </div>
  );
}
