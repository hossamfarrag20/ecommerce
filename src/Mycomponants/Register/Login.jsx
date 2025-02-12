import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { authContext } from "../../context/Authprovider";
import { useNavigate } from "react-router-dom";
import Loadingpage from "../Loadingpage/Loadingpage";

export default function Login() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(authContext);
  const [isloading, setIsLoading] = useState(false);

  // ===================API DAta=================
  const apiDAta = {
    email: "",
    password: "",
  };
  // ===================Form Hadeler======================
  async function login(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(data.message);
      console.log(data.token);
      localStorage.setItem("Token", data.token);
      setUserToken(data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
    }
  }

  const registerformik = useFormik({
    initialValues: apiDAta,
    onSubmit: login,
    validate: (allData) => {
      const error = {};
      const myRegex = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password:
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      };

      if (!myRegex.email.test(allData.email)) {
        error.email = "Email Have Issue";
      } else if (!myRegex.password.test(allData.password)) {
        error.password = "Password Have Issue";
      }
      console.log(error);
      return error;
    },
  });

  // ====================Ui data====================
  const inputs = [
    {
      idx: 1,
      name: "email",
      value: registerformik.values.email,
      type: "email",
    },
    {
      idx: 2,
      name: "password",
      value: registerformik.values.password,
      type: "password",
    },
  ];

  if (isloading) {
    return <Loadingpage />;
  }
  return (
    <div className="contact-container min-h-screen flex flex-col justify-center bg-white dark:bg-gray-800 py-20">
      <div className="my-container pb-4">
        <div className="text-center">
          <h1 className="uppercase dark:text-white text-5xl font-bold">
            Login
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-10 px-10 sm:px-0">
        <div className="sm:grid sm:grid-cols-12">
          <div className="sm:col-span-6 sm:col-start-4">
            <form onSubmit={registerformik.handleSubmit} className="">
              <div className="d-flex flex-column align-items-center">
                {inputs.map((input) => (
                  <div key={input.idx} className="pt-7">
                    {/* =======================Label======================== */}
                    <div className="label-container">
                      {registerformik.values[input.name] && (
                        <label
                          className="align-self-start my-label-style py-0  my-0 dark:text-white"
                          htmlFor={inputs.name}
                        >
                          {input.name + " :"}
                        </label>
                      )}
                    </div>
                    {/* =========================Input====================== */}
                    <div className="">
                      <input
                        type={input.type}
                        placeholder={input.name}
                        className="border-0 w-full border-b-1 pb-1.5 dark:bg-gray-800 dark:text-gray-400 border-gray-200 my-0 outline-0"
                        name={input.name}
                        id={input.name}
                        value={input.value}
                        onChange={registerformik.handleChange}
                        onBlur={registerformik.handleBlur}
                        required
                      />
                    </div>
                    {/* =====================Handeling Error================== */}
                    {registerformik.errors[input.name] &&
                      registerformik.touched[input.name] && (
                        <div className=" dark:text-white">
                          {registerformik.errors[input.name]}
                        </div>
                      )}
                  </div>
                ))}
              </div>
              <div className="my-button mt-5 d-flex">
                <button
                  className="border-0 cursor-pointer rounded-[10px] px-3 mb-5 py-2 dark:bg-white  dark:text-black text-white"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
