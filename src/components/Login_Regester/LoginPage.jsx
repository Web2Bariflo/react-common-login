import React from "react";
import Layout from "../layout/Layout";
import logo from "./../../assets/image/logo.png";
import { useForm } from "react-hook-form";
import map from "./../../assets/image/Frame.png";
import { Link, useNavigate, redirect } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://192.168.0.110:8001/log_in/",
        data
      );
      console.log(response);
      if (response.data.cat == "aqua") {
        if (response.data.message === "Login Successful For aqua Admin") {
          console.log("its a aqua admin ");
          window.location.href = `https://aqua.bc-pl.com/adminside/verify-token?category=aquaUser&token=${response.data.token}&mono=${response.data.mobno}`;
        } else {
          console.log("its a user");
          window.location.href = `https://aqua.bc-pl.com/users/verify-token?category=aquaUser&token=${response.data.token}&mobno=${response.data.mobno}`;
        }
      } else if (response.data.cat == "water") {
        if (response.data.message === "Login Successful For aqua Admin") {
          console.log("its a water admin ");
          //window.location.href = `https://aqua.bc-pl.com/adminside/verify-token?category=aquaUser&token=${response.data.token}&mono=${response.data.mobno}`;
        } else {
          console.log("its a water user");
          // window.location.href = `https://aqua.bc-pl.com/users/verify-token?category=aquaUser&token=${response.data.token}&mobno=${response.data.mobno}`;
        }

        console.log("its a Water user");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <Layout title="common login Page">
      <section
        className="dark:bg-gray-900 h-full flex justify-center"
        style={{
          background: "linear-gradient(to right, rgb(0, 101, 236), #94c1ff)",
        }}
      >
        <div className="flex flex-col items-center justify-center px-4 py-8 h-screen lg:py-0 lg:w-1/2">
          <div className="w-full bg-white rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center mb-0">
                <img src={logo} alt="logo" />
              </div>
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white text-center mt-[0px]">
                Log in
              </h1>
              <p
                className="text-md font-semibold leading-tight tracking-tight text-black md:text-md dark:text-white text-center"
                style={{ paddingTop: "0px" }}
              >
                Common Login
              </p>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your phone number"
                    required
                    {...register("username", {
                      required: true,
                    })}
                  />
                  {errors.username && (
                    <span className="text-sm font-light text-red-500">
                      Username required
                    </span>
                  )}
                  {errors.username && errors.username.type === "maxLength" && (
                    <span className="text-sm font-light text-red-500">
                      Max length should be 12
                    </span>
                  )}
                  {errors.username && errors.username.type === "minLength" && (
                    <span className="text-sm font-light text-red-500">
                      Min length should be 10
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-sm font-light text-red-500">
                      Password required
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forget Password
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link to="/signup">
                    {" "}
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                      Register Here
                    </span>{" "}
                  </Link>
                </p>
              </form>
              <Link
                to="/change-language"
                className="text-sm mt-0 text-gray-500"
              >
                Change Language
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-cover lg:block lg:w-1/2 m-auto">
          <img src={map} alt="map" className="m-auto w-3/4" />
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
