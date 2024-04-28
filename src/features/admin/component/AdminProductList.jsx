import React from "react";
import { Link } from "react-router-dom";

export default function AdminProductList({ product }) {
  return (
    <>
      <div>
        <div className="w-44 h-fit md:w-52 lg:w-44 xl:w-52 mb-2 sm:ml-3 md:mx-2 lg:mx-1 xl:mx-2 box-content p-1 border-2 rounded-sm hover:opacity-90 ">
          <Link to={`/product-details/${product.id}`}>
            <div className="w-full h-44 lg:w-full lg:h-56 mb-4">
              <img
                className="w-full h-full rounded-lg object-cover object-center"
                src={product.thumbnail}
                alt={product.title}
              />
            </div>
            <div>
              <h3 className="text-sm truncate lg:text-base">{product.title}</h3>
              <div className="flex flex-col items-end">
              <p className="text-sm lg:text-base font-medium">
              &#x20B9; {Math.ceil(product.price*80).toLocaleString()}
              </p>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="text-sm lg:text-base">Rating: {product.rating}</p>
              </div>
            <div className="flex justify-between">
              {product.deleted &&
              <p className="text-sm lg:text-base text-red-600 bg-red-200 rounded-md px-2">
               Product Deleted
              </p>}
            </div>
          </Link>
        </div>
        <div className="flex justify-around mb-5">
          <Link to={`/admin/admin-product-form/edit/${product.id}`}>
            <button className=" text-white text-base font-medium bg-blue-600 hover:bg-blue-500 p-1 rounded-md">
              Edit Product
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
