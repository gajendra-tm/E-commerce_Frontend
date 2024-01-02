import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({product}) {
  return (
    <>
      <div className="w-44 md:w-52 lg:w-48 xl:w-56 mb-3 md:mx-2 lg:mx-1 xl:mx-2 box-content p-1 border-2 rounded-sm hover:opacity-90 ">
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
          <p className="text-sm lg:text-base font-medium">${product.price}</p>
        </div>
        <p className="text-sm lg:text-base">{product.rating}</p>
        </Link>
      </div>
    </>
  );
}
