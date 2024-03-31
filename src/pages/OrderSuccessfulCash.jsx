import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {resetCurrentOrder} from "../features/orders/orderSlice";
import { resetCartAsync } from "../features/cart/cartSlice";

export default function OrderSuccessful() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(resetCurrentOrder());
    dispatch(resetCartAsync());
  },[dispatch])

  return (
    <>
      <div className="flex flex-col justify-center items-center max-w-full h-screen bg-gray-50 p-5">
       
        <div className="text-blue-700 text-xl font-medium">
          <svg
            fill="#65b941"
            height="64px"
            width="64px"
            version="1.1"
            id="Filled_Icons"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-2.4 -2.4 28.80 28.80"
            enableBackground="new 0 0 24 24"
            xmlSpace="preserve"
            stroke="#65b941"
            transform="rotate(0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.144"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Status-Approved-Filled">
                <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M9.5,18.3l-5.6-5.7l1.8-1.8l3.9,3.9l8.4-8.4l1.8,1.8 L9.5,18.3z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="text-center my-4 space-y-3">
          <h1 className="text-3xl font-bold">Order Placed Successfully</h1>
          <Link className="text-base font-normal text-blue-500" to="/my-orders">Go to My Orders</Link>
          <p className="text-base font-normal">
            Thank you for completing your Order. <br />
            Have a great day!
          </p>
        </div>
        <Link to="/">
          <button className="bg-blue-700 text-white text-base font-medium p-2 mt-3 hover:bg-blue-600 rounded-lg">
            Go back Home
          </button>
        </Link>
      </div>
    </>
  );
}
