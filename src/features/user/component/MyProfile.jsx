import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function MyProfile() {
  const [editUserAddress, setEditUserAddress] = useState(-1);
  const [newUserAddress, setNewUserAddress] = useState(false);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (updatedData, index) => {
    const updtedUser = { ...user, addresses: [...user.addresses] };
    updtedUser.addresses.splice(index, 1, updatedData);
    dispatch(updateUserAsync(updtedUser));
    setEditUserAddress(-1);
  };

  const handleRemove = (e, index) => {
    const updatedUser = { ...user, addresses: [...user.addresses] };
    updatedUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(updatedUser));
  };

  const handleForm = (index) => {
    setNewUserAddress(false);
    setEditUserAddress(index);
    const address = user.addresses[index];
    setValue("email", address.email);
    setValue("fullname", address.fullname);
    setValue("address", address.address);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
    setValue("phone", address.phone);
  };

  return (
    <>
      <div className="flex flex-col items-center pt-5 max-w-full min-h-full">
        <div className="p-4 w-full sm:w-9/12 bg-gray-100 rounded-md">
          <div className="flex">
            <h1 className="text-md md:text-2xl font-bold tracking-wide mb-2">
              Name : {"Enter your Name here"}
            </h1>
          </div>
          <h3 className="text-green-500 text-base font-medium tracking-wide">
            User email : {user.email}
          </h3>
          <div className="border-t-2 border-gray-300 py-5 mt-2 ">
            
            {/* add new-address section */}
            <div>
              <div className="flex justify-between items-center max-w-full">
                <h1 className="text-md sm:text-base font-medium mb-1">
                  Address Details :
                </h1>
                <button
                  onClick={() => {setNewUserAddress(true);setEditUserAddress(-1); reset()}}
                  className=" text-white text-base font-medium bg-green-600 hover:bg-green-500 p-1 mb-2 rounded-md"
                >
                  Add New Address
                </button>
              </div>
              {newUserAddress === true ? (
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      updateUserAsync({
                        ...user,
                        addresses: [...user.addresses, data],
                      })
                    );
                    reset();
                    setNewUserAddress(false);
                  })}
                  className="bg-white p-4 md:col-start-1 md:col-end-3 min-h-full max-w-full mb-5 rounded-md"
                >
                  <div>
                    <div className="border-b-2 border-gray-300 ">
                      <h2 className="text-md sm:text-lg font-medium">
                        Contact information
                      </h2>
                      <div className="text-sm sm:text-base text-gray-500 mb-8 mt-1 grid col-span-1">
                        <label htmlFor="email">Email address</label>
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })
                        }
                          type="email"
                          className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-5">
                      <h2 className="text-md sm:text-lg font-medium mb-4">
                        Shipping information
                      </h2>
                      <div className="text-sm sm:text-base text-gray-500 mb-4  grid col-span-1">
                        <label className="block" htmlFor="fullname">
                          Full Name
                        </label>
                        <input
                          id="fullname"
                          {...register("fullname", {
                            required: "name is required",
                          })}
                          type="text"
                          className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                        />
                        {errors.fullname && (
                          <p className="text-red-500">
                            {errors.fullname.message}
                          </p>
                        )}
                      </div>
                      <div className="text-sm sm:text-base text-gray-500 mb-4 grid col-span-1">
                        <label className="block" htmlFor="address">
                          Address
                        </label>
                        <input
                          id="address"
                          {...register("address", {
                            required: "address is required",
                          })}
                          type="text"
                          className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                        />
                        {errors.address && (
                          <p className="text-red-500">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                          <label htmlFor="city">City</label>
                          <input
                            id="city"
                            {...register("city", {
                              required: "city is required",
                            })}
                            type="text"
                            className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                          />
                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                          <label htmlFor="state">State</label>
                          <input
                            id="state"
                            {...register("state", {
                              required: "state is required",
                            })}
                            type="text"
                            className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                          />
                          {errors.state && (
                            <p className="text-red-500">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                        <div className="text-sm sm:text-base text-gray-500 mb-4 grid col-span-1">
                          <label htmlFor="pincode">Pin code</label>
                          <input
                            id="pincode"
                            {...register("pincode", {
                              required: "picode is required",
                            })}
                            type="number"
                            className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                          />
                          {errors.pincode && (
                            <p className="text-red-500">
                              {errors.pincode.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1">
                        <label htmlFor="phone">Phone</label>
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "enter the phone number",
                          })}
                          type="tel"
                          className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end pb-10 border-b-2 border-gray-300">
                      <button
                        onClick={() => {
                          setNewUserAddress(false); reset();
                        }}
                        className="text-sm text-center text-gray-900 hover:text-white font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 bg-white hover:bg-gray-600 "
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm text-center text-white hover:text-gray-900 font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 ml-2 bg-blue-700 hover:bg-white"
                      >
                       Add address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>

            {/* address edit section */}
            {user.addresses.map((address, index) => {
              return (
                <div
                  key={index}
                  className="p-2 mb-1 border-2 border-gray-300 rounded-md"
                >
                  {editUserAddress === index ? (
                    <form
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        handleEdit(data, index);
                        reset();
                      })}
                      className="bg-white p-4 md:col-start-1 md:col-end-3 min-h-full max-w-full mb-5 rounded-md"
                    >
                      <div>
                        <div className="border-b-2 border-gray-300 ">
                          <h2 className="text-md sm:text-lg font-medium">
                            Contact information
                          </h2>
                          <div className="text-sm sm:text-base text-gray-500 mb-8 mt-1 grid col-span-1">
                            <label htmlFor="email">Email address</label>
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-5">
                          <h2 className="text-md sm:text-lg font-medium mb-4">
                            Shipping information
                          </h2>
                          <div className="text-sm sm:text-base text-gray-500 mb-4  grid col-span-1">
                            <label className="block" htmlFor="fullname">
                              Full Name
                            </label>
                            <input
                              id="fullname"
                              {...register("fullname", {
                                required: "name is required",
                              })}
                              type="text"
                              className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                            />
                            {errors.fullname && (
                              <p className="text-red-500">
                                {errors.fullname.message}
                              </p>
                            )}
                          </div>
                          <div className="text-sm sm:text-base text-gray-500 mb-4 grid col-span-1">
                            <label className="block" htmlFor="address">
                              Address
                            </label>
                            <input
                              id="address"
                              {...register("address", {
                                required: "address is required",
                              })}
                              type="text"
                              className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                            />
                            {errors.address && (
                              <p className="text-red-500">
                                {errors.address.message}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-3">
                            <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                              <label htmlFor="city">City</label>
                              <input
                                id="city"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                type="text"
                                className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                              />
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                            <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                              <label htmlFor="state">State</label>
                              <input
                                id="state"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                type="text"
                                className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                              />
                              {errors.state && (
                                <p className="text-red-500">
                                  {errors.state.message}
                                </p>
                              )}
                            </div>
                            <div className="text-sm sm:text-base text-gray-500 mb-4 grid col-span-1">
                              <label htmlFor="pincode">Pin code</label>
                              <input
                                id="pincode"
                                {...register("pincode", {
                                  required: "picode is required",
                                })}
                                type="number"
                                className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                              />
                              {errors.pincode && (
                                <p className="text-red-500">
                                  {errors.pincode.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1">
                            <label htmlFor="phone">Phone</label>
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "enter the phone number",
                              })}
                              type="tel"
                              className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end pb-10 border-b-2 border-gray-300">
                          <button
                            onClick={() => {
                              setEditUserAddress(-1);
                            }}
                            className="text-sm text-center text-gray-900 hover:text-white font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 bg-white hover:bg-gray-600 "
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="text-sm text-center text-white hover:text-gray-900 font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 ml-2 bg-blue-700 hover:bg-white"
                          >
                            Update address
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null}

                  {/* existing addresses */}
                  <div className="flex space-x-2 text-sm font-medium text-gray-700">
                    <h3>{address.fullname}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className=" ml-5 text-sm font-medium text-gray-500">
                      <p>{address.address}</p>
                      <p>City: {address.city}</p>
                      <p>Pin: {address.pincode}</p>
                      <p>Ph: {address.phone}</p>
                    </div>
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleForm(index)}
                        className="text-sm sm:text-base font-normal text-blue-600"
                      >
                        <Link to="#">Edit</Link>
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        className="text-sm sm:text-base font-normal text-blue-600"
                      >
                        <Link to="#">Remove</Link>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
