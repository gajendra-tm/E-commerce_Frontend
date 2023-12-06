import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 2,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },

  {
    id: 3,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  //   {
  //     id: 4,
  //     name: "Throwback Hip Bag",
  //     href: "#",
  //     color: "Salmon",
  //     price: "$90.00",
  //     quantity: 1,
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //     imageAlt:
  //       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  //   },
  //   {
  //     id: 5,
  //     name: "Throwback Hip Bag",
  //     href: "#",
  //     color: "Salmon",
  //     price: "$90.00",
  //     quantity: 1,
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //     imageAlt:
  //       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  //   },
  //   {
  //     id: 6,
  //     name: "Throwback Hip Bag",
  //     href: "#",
  //     color: "Salmon",
  //     price: "$90.00",
  //     quantity: 1,
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //     imageAlt:
  //       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  //   },
];

const addresses = [
  {
    name: "John wick",
    phone: "8578965236",
    address: "HSR layout, Sector-7, Bangaluru.",
    city: "Bengaluru",
    pin: "50001",
  },
  {
    name: "Aston agar",
    phone: "8578965258",
    address: "HSR layout, Sector-7, Bangaluru.",
    city: "Bengaluru",
    pin: "50001",
  },
];

//order summary animation
const staggerMenuItems = stagger(0.01, { startDelay: 0.1 });

function useOrderAnimation(orderIsOpen) {
  const [orderscope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".order_open",
      {
        clipPath: orderIsOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(0% 100% 0% 0% round 0px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "#order_list",
      orderIsOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: orderIsOpen ? staggerMenuItems : 0,
      }
    );
  }, [orderIsOpen]);

  return orderscope;
}

export default function CheckOut() {
  const [orderIsOpen, setOrderIsOpen] = useState(false);
  const orderscope = useOrderAnimation(orderIsOpen);

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-4 p-10 relative bg-gray-100 max-w-full min-h-screen"
        ref={orderscope}
      >
        <div className="flex justify-end items-center md:hidden text-gray-600 mb-2 text-base font-medium">
          Order summary &rarr;
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="block md:hidden "
            onClick={() => setOrderIsOpen(!orderIsOpen)}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </motion.button>
        </div>
        <div className="bg-white p-4 md:col-start-1 md:col-end-3 h-full md:w-11/12">
          <div>
            <div className="border-b-2 border-gray-300 ">
              <h2 className="text-md sm:text-lg font-medium">
                Contact information
              </h2>
              <div className="text-sm sm:text-base text-gray-500 mb-8 mt-1 grid col-span-1">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-md sm:text-lg font-medium mb-4">
                Shipping information
              </h2>
              <div className="grid grid-cols-2">
                <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                  <label className="block" htmlFor="first_name">
                    First name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
                <div className="text-sm sm:text-base text-gray-500 mb-4 ml-1 grid col-span-1">
                  <label className="block" htmlFor="last_name">
                    Last name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
              </div>
              <div className="text-sm sm:text-base text-gray-500 mb-4 grid col-span-1">
                <label className="block" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
                <div className="text-sm sm:text-base text-gray-500 mb-4 ml-1 grid col-span-1">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
                <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
                <div className="text-sm sm:text-base text-gray-500 mb-4 ml-1 grid col-span-1">
                  <label htmlFor="postal_code">Postal code</label>
                  <input
                    id="postal_code"
                    name="postal_code"
                    type="number"
                    className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
              </div>
              <div className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  className="p-3 h-5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                />
              </div>
            </div>
            <div className="flex justify-end pb-10 border-b-2 border-gray-300">
                <button className="text-sm text-center text-gray-900 hover:text-white font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 bg-white hover:bg-blue-700 ">
                  Reset
                </button>
                <button className="text-sm text-center text-white hover:text-gray-900 font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 ml-2 bg-blue-700 hover:bg-white">
                  Save address
                </button>
              </div>
          </div>
          <div className="py-10 border-b-2 border-gray-300">
            <h2 className="text-md sm:text-lg font-medium mb-1">
              Delivery address
            </h2>
            <p className="text-sm sm:text-base mb-1 text-gray-500">
              Choose from Existing address
            </p>
            <div>
              {addresses.map((address) => {
                return (
                  <div
                    key={address.phone}
                    className="p-2 mb-1 border-2 border-gray-300"
                  >
                    <div className="flex space-x-2 text-sm font-medium text-gray-600">
                      <input name="address" type="radio" />
                      <h3>{address.name}</h3>
                    </div>
                    <span className="block ml-5 text-sm font-normal text-gray-500">
                      <p>{address.address}</p>
                      <p>City: {address.city}</p>
                      <p>Pin: {address.pin}</p>
                      <p>Ph: {address.phone}</p>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-10 border-b-2 border-gray-300">
            <h2 className="text-md sm:text-lg font-medium mb-1">
              Payment options
            </h2>
            <p className="text-sm sm:text-base mb-1 text-gray-500">
              Choose one
            </p>
            <div>
              <div className="p-2 mb-1  border-gray-300">
                <div className="flex items-center space-x-2 mb-2 text-sm font-medium text-gray-600">
                  <input name="payment" type="radio" />
                  <h3>Online/UPI</h3>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                  <input name="payment" type="radio" />
                  <h3>Cash On Delivery</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* cart items mobile layout */}
        <div
          style={{
            pointerEvents: orderIsOpen ? "auto" : "none",
            clipPath: "inset(10% 50% 90% 50% round 10px)",
          }}
          className="order_open block md:hidden absolute p-4 max-w-full left-0 right-0 min-h-full bg-white"
        >
          <div id="order_list">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-medium">Order summary</h1>
              <span>
                <svg
                  onClick={() => setOrderIsOpen(!orderIsOpen)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                </svg>
              </span>
            </div>
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex justify-evenly border-t-2 mb-2 py-5"
                >
                  <div className="w-20 h-20 border-2 border-gray-200 rounded-lg flex-shrink-0 overflow-hidden mr-3">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={product.imageSrc}
                      alt={product.imageAlt}
                    />
                  </div>
                  <div className="flex flex-col w-full ">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-base truncate font-normal">
                          {product.name}
                        </h3>
                        <h3 className="text-base font-medium ml-2">
                          {product.price}
                        </h3>
                      </div>
                      <p className="text-base text-gray-400">{product.color}</p>
                    </div>
                    <div className="flex justify-between mt-auto">
                      <div>
                        <p className="text-base inline text-left mr-3 ">Qty</p>
                        <select
                          name=""
                          id=""
                          className="border border-gray-500 shadow-md outline-blue-500  w-10 rounded-md"
                        >
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                        </select>
                      </div>
                      <h3 className="text-base font-normal text-blue-600">
                        <Link to="#">remove</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t-2 mb-2 py-5 ">
              <div className="flex justify-between">
                <h3 className="text-base font-medium">Subtotal</h3>
                <h3 className="text-base font-medium">$90</h3>
              </div>
              <p className="text-base text-gray-400">
                Shipping and taxes will be calculated at checkout.
              </p>
              <div>
                <Link to="/checkout">
                  <button className="flex justify-center items-center my-8 hover:bg-blue-600 rounded-lg w-full h-10 bg-blue-700 text-white text-base font-medium">
                    Pay and Order
                  </button>
                </Link>
                <p className="text-center">
                  or
                  <Link
                    className="text-blue-700 hover:text-blue-600 text-base font-medium"
                    to="/"
                  >
                    Continue Shopping &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* cart items web layout */}
        <div className="hidden md:block p-4 col-start-3 col-end-5 max-w-full min-h-screen bg-white">
          <h1 className="text-lg font-medium">Order summary</h1>
          <div>
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex justify-evenly box-content border-t-2 mb-2 py-5"
                >
                  <div className="w-24 h-24 border-2 border-gray-200 rounded-lg flex-shrink-0 overflow-hidden mr-3">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={product.imageSrc}
                      alt={product.imageAlt}
                    />
                  </div>
                  <div className="flex flex-col w-full ">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-base truncate font-normal">
                          {product.name}
                        </h3>
                        <h3 className="text-sm sm:text-base font-normal ml-2">
                          {product.price}
                        </h3>
                      </div>
                      <p className="text-base text-gray-400">{product.color}</p>
                    </div>
                    <div className="flex justify-between mt-auto">
                      <div>
                        <p className="text-base inline text-left mr-3 ">Qty</p>
                        <select
                          name=""
                          id=""
                          className="border border-gray-500 shadow-md outline-blue-500  w-10 rounded-md"
                        >
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                          <option value="">{product.quantity}</option>
                        </select>
                      </div>
                      <h3 className="text-base font-normal text-blue-600">
                        <Link to="#">remove</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t-2 mb-2 py-5 ">
            <div className="flex justify-between">
              <h3 className="text-base font-medium">Subtotal</h3>
              <h3 className="text-base font-medium">$90</h3>
            </div>
            <p className="text-base text-gray-400">
              Shipping and taxes will be calculated at checkout.
            </p>
            <div>
              <Link to="/checkout">
                <button className="flex justify-center items-center my-8 hover:bg-blue-600 rounded-lg w-full h-12 bg-blue-700 text-white text-base font-medium">
                  Pay and Order
                </button>
              </Link>
              <p className="text-center">
                or
                <Link
                  className="text-blue-700 hover:text-blue-600 text-base font-medium"
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
