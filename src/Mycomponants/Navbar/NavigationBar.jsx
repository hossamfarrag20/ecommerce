import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { authContext } from "../../context/Authprovider";

export default function NavigationBar() {
  const { userToken, setuserToken } = useContext(authContext);
  const navigate = useNavigate();
  function handelchange() {
    localStorage.removeItem("Token");
    setuserToken(null);
    navigate("/login");
  }
  return (
    <div className="px-5 py-2 dark:bg-gray-800">
      <Navbar fluid rounded>
        <Navbar.Brand
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse "
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>

        <Navbar.Toggle className="cursor-pointer" />

        <Navbar.Collapse>
          {userToken ? (
            <div className="flex flex-col sm:flex-row  sm:gap-5">
              <NavLink
                to="/"
                className="block py-2 px-3  text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Products
              </NavLink>
              <NavLink
                to="/brands"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Brands
              </NavLink>
              <NavLink
                to="/categories"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Categories
              </NavLink>
              <NavLink
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </NavLink>
              <div>
              <span
                onClick={handelchange}
                className="block py-2 px-3 cursor-pointer text-white rounded-sm md:bg-transparent md:p-0 dark:text-white"
              >
                Logout
              </span>
            </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:gap-5">
              <NavLink
                to="/login"
                className="block py-2 px-3  text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sign up
              </NavLink>
            </div>
          )}

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
