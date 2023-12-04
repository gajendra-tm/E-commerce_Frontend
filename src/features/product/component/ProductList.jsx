import React from "react";

export default function ProductList({product}) {
  return (
    <>
      <div className="w-fit h-fit mb-3 p-1 border rounded-lg hover:bg-gray-300 ">
        <div className="w-36 h-36 lg:w-56 lg:h-56 mb-2 ">
          <img
            className="w-full h-full rounded-lg object-cover object-center"
            src={product.imageSrc}
            alt={product.imageAlt}
          />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm lg:text-base">{product.name}</h3>
          <p className="text-sm lg:text-base font-medium">{product.price}</p>
        </div>
        <p className="text-sm lg:text-base">{product.color}</p>
      </div>
    </>
  );
}
