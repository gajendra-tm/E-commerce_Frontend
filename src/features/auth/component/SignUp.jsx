import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync, selectLoggedInUser } from "../authSlice";

export default function SignUp() {
  const loggedInUser = useSelector(selectLoggedInUser)
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <h1 className=" text-xl sm:text-2xl mt-4 font-bold  text-center">
            Create a New Account
          </h1>
          <form
          noValidate
            className="mt-10"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({ email: data.email, password: data.password })
              )
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
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <div className=" w-72 sm:w-96 h-full mb-5 mt-3">
                <input
                  className="w-full h-full p-2 border border-gray-300 shadow-sm rounded-md outline-blue-700 "
                  id="password"
                  {...register("password", {
                    required: "passowrd is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `at least 8 characters
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                  - Can contain special characters`,
                    },
                  })}
                  type="password"
                />
                {errors.password && (
                  <p className=" text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className=" w-72 sm:w-96 h-full mb-5 mt-3">
                <input
                  className="w-full h-full p-2 border border-gray-300 shadow-sm rounded-md outline-blue-700 "
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirm the password",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "password does not match",
                  })}
                  type="confirmPassword"
                />
                {errors.confirmPassword && (
                  <p className=" text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-72 sm:w-96 h-9 mb-10">
              <button className="w-full h-full bg-blue-700 hover:bg-blue-600 rounded-md text-white">
                Sign up
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>
              Have an account?
              <Link
                className="text-blue-700 hover:text-blue-600 text-sm ml-1 font-semibold"
                to="/login"
              >
                Login to account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
