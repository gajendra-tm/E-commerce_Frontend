import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <div className="flex justify-center items-center max-w-full min-h-screen border border-red-700">
        <div>
          <div className="mx-auto rounded-full bg-slate-300 w-16 sm:w-20 h-16 sm:h-20">
            <img
              className=" w-full h-full "
              src="/images/cart-logo.png"
              alt="logo"
            />
          </div>
          <h1 className=" text-xl sm:text-2xl mt-4 font-bold text-center">
            Log in to your account
          </h1>
          <form className="mt-10 mb-4">
            <div>
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email address
              </label>
              <div>
                <input
                  className="w-72 sm:w-96 h-9 my-3 p-2 border border-gray-300 shadow-sm  rounded-md outline-blue-700 "
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mt-4">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a className="text-blue-700 hover:text-blue-600 font-semibold" href="">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="">
                <input
                  className="w-72 sm:w-96 h-9 my-3 p-2 border border-gray-300 shadow-sm rounded-md outline-blue-700 "
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
          <button className="w-72 sm:w-96 h-9 mb-10 bg-blue-700 hover:bg-blue-600 rounded-md text-white">
            Log in
          </button>
          <div className="text-center text-sm text-gray-500">
            <p>
              Don&apos;t have an account?
              <Link className="text-blue-700 hover:text-blue-600 text-sm ml-1 font-semibold" to="/signup">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
