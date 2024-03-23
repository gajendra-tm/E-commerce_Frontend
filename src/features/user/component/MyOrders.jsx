import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function MyOrders() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch, loggedInUser]);

  return (
    <>
      <div>
        {userOrders.map((order) => (
          
          <div key={order.id} className="flex flex-col justify-center items-center pt-5 max-w-full min-h-full">
              <div className="p-4 w-full sm:w-9/12 bg-gray-100 rounded-md">
                <div className="flex">
                  <h1 className="text-xl md:text-2xl font-bold tracking-wide mb-2">
                    Order : #{order.id}
                  </h1>
                </div>
                <h3 className="text-red-500 text-base font-medium tracking-wide">
                  Order status : {order.status}
                </h3>
                <div className="flex justify-evenly border-t-2 border-gray-300 mt-2 box-border mb-2 py-5">
                  <div className="w-20 sm:w-32 h-20 sm:h-32 flex-shrink-0 overflow-hidden mr-3">
                    <img
                      src={order.cartItems[0].product.thumbnail}
                      alt={order.cartItems[0].product.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col w-full ">
                    <h3 className="text-sm sm:text-base font-normal">
                      <span className="text-lg font-medium">{`${order.cartItems[0].product.title}`}</span>
                      <span className=" font-medium text-gray-500">
                        {" "}
                        and {`${Math.ceil(order.totalItems - 1)}`} more items
                      </span>
                    </h3>
                    <div className="flex justify-end mt-auto">
                      <h3 className="text-sm sm:text-base font-medium ">
                        Total Paid : $ {order.totalPrice}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-gray-300 mb-2 py-5 ">
                  <p className="text-sm sm:text-base">Address :</p>
                  <div
                    className="p-2 mb-1 border-2 border-gray-300"
                  >
                    <div className="flex space-x-2 text-sm font-medium text-gray-700">
                      <h3>{order.selectedAddress.fullname}</h3>
                    </div>
                    <div className="md:flex md:justify-between ml-5 text-sm font-medium text-gray-500">
                      <span>
                        <p>{order.selectedAddress.address}</p>
                        <p>City : {order.selectedAddress.city}</p>
                      </span>
                      <span>
                        <p>Pin : {order.selectedAddress.pincode}</p>
                        <p>Ph : {order.selectedAddress.phone}</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </>
  );
}
