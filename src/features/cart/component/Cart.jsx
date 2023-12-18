import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItemsAsync, seletCartItems, updateCartItemsAsync } from "../cartSlice";

export default function Cart() {
  const cartItems = useSelector(seletCartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((amount, item)=>item.price*item.quantity +amount,0);
  const totalItems = cartItems.reduce((total, item)=>item.quantity +total,0);

  const handleUpdate =(e, item)=>{
    dispatch(updateCartItemsAsync({...item, quantity:+e.target.value}))
  };

  const handleDelete =(e, item)=>{
    e.preventDefault();
    dispatch(deleteCartItemsAsync(item));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-20 max-w-full min-h-full">
        <div className="p-4 w-full sm:w-9/12 bg-white">
          <div className="flex">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Cart</h1>
          </div>
          {cartItems.map((item) => {
            return (
              <div
                key={item.id}
                className="flex justify-evenly border-t-2 mb-2 py-5"
              >
                <div className="w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 overflow-hidden mr-3">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-col w-full ">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm sm:text-base truncate font-normal">
                        {item.title}
                      </h3>
                      <h3 className="text-sm sm:text-base font-medium ml-2">
                        ${item.price}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-400">
                      Rating:{item.rating}
                    </p>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div>
                      <p className="text-sm sm:text-base inline text-left mr-3 ">
                        Qty
                      </p>
                      <select
                      onChange={(e)=>handleUpdate(e,item.id)}
                      value={item.quantity}
                        className="border border-gray-500 shadow-md outline-blue-500 w-10 rounded-md"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <h3
                    onClick={(e)=>handleDelete(e,item)} className="text-sm sm:text-base font-normal text-blue-600">
                      <Link to="#">remove</Link>
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t-2 mb-2 py-5 ">
            <div className="flex justify-between">
              <h3 className="text-sm sm:text-base font-medium">Subtotal</h3>
              <h3 className="text-sm sm:text-base font-medium">
                ${totalPrice}
              </h3>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm sm:text-base font-medium">Total Items</h3>
              <h3 className="text-sm sm:text-base font-medium">
                {totalItems} Items
              </h3>
            </div>
            <p className="text-sm sm:text-base">
              Shipping and taxes will be calculated at checkout.
            </p>
            <div>
              <Link to="/checkout">
                <button className="flex justify-center items-center my-8 hover:bg-blue-600 rounded-lg w-full h-10 sm:h-12 bg-blue-700 text-white text-base sm:text-lg font-medium">
                  Checkout
                </button>
              </Link>
              <p className="text-center">
                or
                <Link
                  className="text-blue-700 hover:text-blue-600 text-sm sm:text-base font-medium"
                  to="/"
                >
                  Continue Shopping &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
