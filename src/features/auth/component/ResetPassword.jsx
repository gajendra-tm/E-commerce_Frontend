import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAsync, selectPasswordReset } from "../authSlice";

export default function ResetPassword() {
  const [spinner, setSpinner] = useState(false);
  // to fetch the current URL parameters,
  //present in the browser search/queryString.
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (passwordReset) {
      setSpinner(false);
    }
  }, [passwordReset]);

  return (
    <>
      {token && email ? (
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
              Enter New Password
            </h1>
            <form
              noValidate
              className="mt-10"
              onSubmit={handleSubmit((data) => {
                setSpinner(!spinner);
                dispatch(
                  resetPasswordAsync({ token, email, password: data.password })
                );
              })}
            >
              <div>
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  New Password
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
                  Confirm New Password
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
                  {passwordReset === true ? (
                    <p className="text-green-600">
                      Password reset Successfully
                    </p>
                  ) : (
                    <p className="text-red-500">{passwordReset}</p>
                  )}
                </div>
              </div>

              <div className="w-72 sm:w-96 h-9 mb-10">
                <button className="w-full h-full bg-blue-700 hover:bg-blue-600 rounded-md text-white">
                  {spinner && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {!spinner ? "Set New Password" : "Resetting . . ."}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className=" text-base sm:text-2xl mt-4 font-bold  text-center">Incorrect Link Address</p>
      )}
    </>
  );
}
