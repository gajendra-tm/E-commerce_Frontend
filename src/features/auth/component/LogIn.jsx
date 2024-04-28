import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  loginUserAsync,
  selectLoggedInError,
  selectLoggedInUser,
} from "../authSlice";
import { Zoom, toast } from "react-toastify";

export default function LogIn() {
  const [loginDetails, setLoginDetails] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const userError = useSelector(selectLoggedInError);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loggedInUser
      ? toast.success("LoggedIn Successfuly", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        })
      : "null";
  }, [loggedInUser]);

  return (
    <>
      {loggedInUser && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex justify-center items-center max-w-full min-h-screen">
        <div>
          <div className="mx-auto rounded-full bg-slate-300 w-16 sm:w-20 h-16 sm:h-20">
            <img
              className=" w-full h-full "
              src="/images/cart-logo.png"
              alt="logo"
            />
          </div>
          <div className="flex justify-center items-center text-black w-full mt-2">
            <button
              onClick={() => {
                setLoginDetails(!loginDetails);
              }}
              className=" bg-amber-200 hover:bg-amber-300 rounded-lg w-fit p-1"
            >
              Click here for login details
            </button>
          </div>
          {loginDetails && (
            <div className="flex justify-center items-center text-black bg-amber-200 rounded-lg w-full">
              <ul>
                <li>userEmail: testuser@gmail.com</li>
                <li>adminEmail: testadmin@gmail.com</li>
                <li>password: Test@123456</li>
              </ul>
            </div>
          )}
          <h1 className=" text-xl sm:text-2xl mt-4 font-bold text-center">
            Log in to your Account
          </h1>
          <form
            noValidate
            className="mt-10"
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
              );
            })}
          >
            <div>
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="w-72 sm:w-96 h-full mb-5 mt-3">
                <input
                  className="w-full h-full p-2 border border-gray-300 shadow-sm  rounded-md outline-blue-700 "
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "enter the valid email",
                    },
                  })}
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <span
                  className="text-sm font-medium text-blue-700 hover:text-blue-600"
                  htmlFor="password"
                >
                  <Link to="/forgot-password" className="cursor-pointer">
                    Forgot Password?
                  </Link>
                </span>
              </div>
              <div className=" w-72 sm:w-96 h-full mb-5 mt-3">
                <input
                  className="w-full h-full p-2 border border-gray-300 shadow-sm rounded-md outline-blue-700 "
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                />
                {errors.password && (
                  <p className=" text-red-500">{errors.password.message}</p>
                )}
                {userError && <p className=" text-red-500">{userError}</p>}
              </div>
            </div>

            <div className="w-72 sm:w-96 h-9 mb-10">
              <button
                type="submit"
                className="w-full h-full bg-blue-700 hover:bg-blue-600 rounded-md text-white"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-500" type="submit">
            <p>
              Don&apos;t have an account?
              <Link
                className="text-blue-700 hover:text-blue-600 text-sm ml-1 font-semibold"
                to="/signup"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
