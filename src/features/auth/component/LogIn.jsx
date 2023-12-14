import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex justify-center items-center max-w-full min-h-screen">
        <div>
          <div className="mx-auto rounded-full bg-slate-300 w-16 sm:w-20 h-16 sm:h-20">
            <img
              className=" w-full h-full "
              src="/images/cart-logo.png"
              alt="logo"
            />
          </div>
          <h1 className=" text-xl sm:text-2xl mt-4 font-bold text-center">
            Log in to your Account
          </h1>
          <form
            className="mt-10"
            onSubmit={handleSubmit((data) => console.log(data))}
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
                  })}
                  type="password"
                />
                {errors.password && (
                  <p className=" text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="w-72 sm:w-96 h-9 mb-10">
              <button className="w-full h-full bg-blue-700 hover:bg-blue-600 rounded-md text-white">
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
