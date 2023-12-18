import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdAsync, selectProductsById } from "../productSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync } from "../../cart/cartSlice";

const products = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      name: "White",
      checked: true,
      class: "accent-rose-400",
      selectedClass: "ring-4 ring-rose-400 ring-offset-2",
    },
    {
      name: "Gray",
      checked: false,
      class: "accent-teal-400",
      selectedClass: "ring-4 ring-teal-400 ring-offset-2",
    },
    {
      name: "Black",
      checked: false,
      class: "accent-amber-400",
      selectedClass: "ring-4 ring-amber-400 ring-offset-2",
    },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(products.colors[0].name);
  const [currentIndex, setCurrentIdex] = useState(0);
  const product = useSelector(selectProductsById);
  const user = useSelector(selectLoggedInUser);
  console.log(user.id,"thui")
  const dispatch = useDispatch();
  const params = useParams();

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCartAsync({ ...product, quantity: 1, user: user.id }));
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setCurrentIdex((prevIndex) => {
      return prevIndex + 1 === product.images.length ? 0 : prevIndex + 1;
    });
  };

  const handleLeftClick = (e) => {
    e.preventDefault();
    setCurrentIdex((prevIndex) => {
      return prevIndex - 1 < 0 ? product.images.length - 1 : prevIndex - 1;
    });
  };

  useEffect(() => {
    dispatch(fetchProductsByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <div className="xl:grid grid-rows-2 max-w-full min-h-full ">
        {/* images mobile layout */}
        <div className="xl:hidden w-full h-[36rem] relative mt-2 box-border rounded-xl overflow-hidden">
          <div className="w-full h-full ">
            <button
              className=" absolute top-2/4 right-1 rounded-full border-2 bg-amber-300 hover:bg-amber-200"
              onClick={handleRightClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="35"
                height="35"
              >
                <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
              </svg>
            </button>
            {product.id && (
              <img
                src={product.images[currentIndex]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            )}
            <button
              className="absolute top-2/4 left-1 rounded-full border-2 bg-amber-300 hover:bg-amber-200"
              onClick={handleLeftClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="35"
                height="35"
              >
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* images web layout */}
        {product.id && (
          <div className="hidden xl:grid grid-cols-3">
            <div className="col-span-1 row-span-2 m-3 rounded-2xl overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-fill object-center"
              />
            </div>
            <div className="col-span-1 row-span-1 col-start-2 row-end-1 m-3 rounded-2xl overflow-hidden">
              <img
                src={product.images[1]}
                alt={product.title}
                className="w-full h-full object-fill object-center"
              />
            </div>
            <div className="col-span-1 row-span-1 col-start-2 row-end-2 m-3 rounded-2xl overflow-hidden">
              <img
                src={product.images[2]}
                alt={product.title}
                className="w-full h-full object-fill object-center"
              />
            </div>
            <div className="col-span-1 row-span-2 m-3 rounded-2xl overflow-hidden">
              <img
                src={product.images[3]}
                alt={product.title}
                className="w-full h-full object-fill object-center"
              />
            </div>
          </div>
        )}

        {/* product details */}
        <div className="xl:grid grid-cols-3 mt-10">
          <div className="col-span-2 p-3 h-4/5 box-content xl:border-r-2 border-gray-300">
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-5">{product.title}</h1>
              <p className="text-lg font-normal">{product.description}</p>
            </div>
            <ol className="text-base font-medium list-disc list-inside">
              Highlights
              {products.highlights.map((highlight, highlightIdx) => {
                return (
                  <li
                    key={highlightIdx}
                    className="text-base font-normal text-gray-700"
                  >
                    {highlight}
                  </li>
                );
              })}
            </ol>
            <div className="mt-10">
              <h3 className="text-base font-medium">Details</h3>
              <p className="text-base font-normal text-gray-700">
                {product.description}
              </p>
            </div>
          </div>

          {/* color section */}
          <div className="col-span-1 p-3">
            <h1 className="text-3xl font-normal mb-10">{product.price}</h1>
            <h3 className="text-base font-medium mb-2">Color</h3>
            <div className="flex justify-start w-fit mb-10">
              {products.colors.map((color, colorIdx) => {
                return (
                  <div
                    key={colorIdx}
                    className={`flex m-3 rounded-full ${
                      selectedColor ? color.selectedClass : ""
                    }`}
                  >
                    <input
                      name={color}
                      value={color.name}
                      type="radio"
                      defaultChecked={color.checked}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className={`w-6 h-6 ${selectedColor ? color.class : ""}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* size section */}
            <div className="ralative">
              <h3 className="text-base font-medium mb-2">Size</h3>
              <div className="flex flex-wrap">
                {products.sizes.map((size) => {
                  return (
                    <div key={size.name}>
                      <button
                        className={`w-12 h-12 xl:w-16 xl:h-16 m-2 hover:bg-gray-200 focus:border-blue-700 text-sm font-medium border-2 rounded-full border-dashed border-gray-700 ${
                          size.inStock === false
                            ? "cursor-not-allowed line-through opacity-50 hover:bg-transparent focus:border-gray-700 "
                            : ""
                        }`}
                      >
                        {size.name}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-7 w-full h-12 md:h-14">
                <button
                  onClick={handleCart}
                  className="text-base md:text-lg font-bold w-3/4  xl:w-full text-white rounded-xl hover:bg-blue-600 bg-blue-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
