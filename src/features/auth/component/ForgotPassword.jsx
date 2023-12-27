import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
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
            Enter email to reset Password
          </h1>
          <form
          noValidate
            className="mt-10"
            onSubmit={handleSubmit((data) => {
                // later this part needs to be handled/updated with the backend
              console.log(data)
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

            <div className="w-72 sm:w-96 h-9 mb-10">
              <button
                type="submit"
                className="w-full h-full bg-blue-700 hover:bg-blue-600 rounded-md text-white"
              >
                Send Email
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-500" type="submit">
            <p>
              Go Back to
              <Link
                className="text-blue-700 hover:text-blue-600 text-sm ml-1 font-semibold"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
