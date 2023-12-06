import React from "react";
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
  {
    id: 4,
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
];

export default function Cart() {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-20 max-w-full min-h-screen">
        <div className="p-4 w-full sm:w-9/12 bg-white">
          <div className="flex">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Cart</h1>
          </div>
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex justify-evenly border-t-2 mb-2 py-5"
              >
                <div className="w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 overflow-hidden mr-3">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={product.imageSrc}
                    alt={product.imageAlt}
                  />
                </div>
                <div className="flex flex-col w-full ">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm sm:text-base truncate font-normal">
                        {product.name}
                      </h3>
                      <h3 className="text-sm sm:text-base font-medium ml-2">
                        {product.price}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-400">{product.color}</p>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div>
                      <p className="text-sm sm:text-base inline text-left mr-3 ">
                        Qty
                      </p>
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
                    <h3 className="text-sm sm:text-base font-normal text-blue-600">
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
              <h3 className="text-sm sm:text-base font-medium">$90</h3>
            </div>
            <p  className="text-sm sm:text-base">Shipping and taxes will be calculated at checkout.</p>
            <div>
              <Link to="/checkout">
                <button className="flex justify-center items-center my-8 hover:bg-blue-600 rounded-lg w-full h-10 sm:h-12 bg-blue-700 text-white text-base sm:text-lg font-medium">
                  Checkout
                </button>
              </Link>
              <p className="text-center">
              or<Link className="text-blue-700 hover:text-blue-600 text-sm sm:text-base font-medium" to="/">Continue Shopping &rarr;</Link>
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
