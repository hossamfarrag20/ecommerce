import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavigationBar from "../Navbar/NavigationBar";
import CartStyle from "../Cartstyle/CartStyle";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}
