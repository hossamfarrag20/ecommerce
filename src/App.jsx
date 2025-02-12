import { Children, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Loadingpage from "./Mycomponants/Loadingpage/Loadingpage";
import Navbar from "./Mycomponants/Navbar/NavigationBar";
import Footer from "./Mycomponants/Footer/Footer";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Register from "./Mycomponants/Register/Register";
import Error from "./Mycomponants/Error/Error";
import Layout from "./Mycomponants/Layout/Layout";
import Login from "./Mycomponants/Register/Login";
import Home from "./Mycomponants/Home/Home";
import Authprovider from "./context/Authprovider";
import Authorized from "./Mycomponants/protection/Authorized";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Mycomponants/Productdetails/ProductDetails";
import Cartprovider from "./context/Cartprovider";
import CartPage from "./Mycomponants/CartPage/CartPage";
import Ordering from "./Mycomponants/ordering/Ordering";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import MyModal from "./Mycomponants/Modal/Modal";
import ModaProvider from "./context/Modalprovider";
import Category from "./Mycomponants/Category/Category";
import ProductsPage from "./Mycomponants/ProductsPage/ProductsPage";
import Brands from "./Mycomponants/Brands/Brands";
import WishlistPage from "./Mycomponants/WishLIstPage/WishlistPage";
import Orders from "./Mycomponants/Orders/Orders";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "*", element: <Error /> },
      { path: "", element: <Home /> },
      // { path: "products", element: <Error /> },
      // { path: "brands", element: <Error /> },
      { path: "category", element: <Category /> },
      {
        path: "signup",
        element: (
          <Authorized>
            <Register />
          </Authorized>
        ),
      },
      {
        path: "login",
        element: (
          <Authorized>
            <Login />
          </Authorized>
        ),
      },
      { path: "productdetails/:id", element: <ProductDetails /> },
      { path: "cart", element: <CartPage /> },
      { path: "order", element: <Ordering /> },
      { path: "modal", element: <MyModal /> },
      { path: "products", element: <ProductsPage /> },
      { path: "brands", element: <Brands /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "Orders", element: <Orders /> },
    ],
  },
]);
const theClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <QueryClientProvider client={theClient}>
        <ModaProvider>
          <Authprovider>
            <Cartprovider>
              <RouterProvider router={router} />
            </Cartprovider>
          </Authprovider>
        </ModaProvider>
      </QueryClientProvider>
      <Toaster />
      <Offline>Only shown offline (surprise!)</Offline>
    </>
  );
}

export default App;
