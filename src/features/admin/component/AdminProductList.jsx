import React from "react";
import { Link } from "react-router-dom";

export default function AdminProductList({ product }) {
  return (
    <>
      <div>
        <div className="w-44 md:w-52 lg:w-48 xl:w-56 mb-2 md:mx-2 lg:mx-1 xl:mx-2 box-content p-1 border-2 rounded-sm hover:opacity-90 ">
          <Link to={`/product-details/${product.id}`}>
            <div className="w-full h-44 lg:w-full lg:h-56 mb-4">
              <img
                className="w-full h-full rounded-lg object-cover object-center"
                src={product.thumbnail}
                alt={product.title}
              />
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm truncate lg:text-base">{product.title}</h3>
              <p className="text-sm lg:text-base font-medium">
                ${product.price}
              </p>
            </div>
              <p className="text-sm lg:text-base">{product.rating}</p>
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
