import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({product}) {
  return (
    <>
      <div className="w-44 h-fit md:w-52 lg:w-44 xl:w-52 mb-3 sm:ml-3 md:mx-2 lg:mx-1 xl:mx-2 box-content p-1 border-2 rounded-sm hover:opacity-90 ">
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
          <p className="text-sm lg:text-base font-medium">&#x20B9; {Math.ceil(product.price*80).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex justify-end">
        <p className="text-sm lg:text-base">Rating: {product.rating}</p>
        </div>
        </Link>
      </div>
    </>
  );
}
