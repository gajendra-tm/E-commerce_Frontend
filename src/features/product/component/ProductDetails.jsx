import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdAsync, selectProductsById } from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectCartItems } from "../../cart/cartSlice";
import { toast, Zoom } from "react-toastify";

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState([0]);
  const [selectedSize, setSelectedSize] = useState([0]);
  const [currentIndex, setCurrentIdex] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector(selectProductsById);
  const cartItems = useSelector(selectCartItems);
  const params = useParams();

  const handleCart = (e) => {
    e.preventDefault();
    if (cartItems.findIndex((items) => items.product.id === product.id) < 0) {
      //findIndex returns -1 if there is no index, so we put the <0 condition to check true & false
      const newItems = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItems.color = selectedColor;
      }
      if (selectedSize) {
        newItems.size = selectedSize;
      }
      dispatch(addToCartAsync(newItems));
      toast.success("item added to Cart", {
        //this needs to be reffered from the backend only
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    } else {
      toast.warn("item already added", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    }
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
              xmlns="http://www.w3.org/2000/svg"
              className=" absolute top-2/4 right-1 rounded-full border-2 bg-amber-300 hover:bg-amber-200"
              onClick={handleRightClick}
            >
              <svg viewBox="0 0 24 24" width="35" height="35">
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
            <div className="text-base font-medium list-disc list-inside">
              Highlights
              <p className="text-base font-normal text-justify text-gray-700">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
                dolore quibusdam placeat, nostrum blanditiis esse veritatis
                illo, maxime reiciendis atque non, sunt tenetur inventore facere
                quo explicabo beatae. Ad qui tempore molestias nostrum iste
                dolores laborum ex maiores distinctio exercitationem, quidem
                vitae unde quo cum aut deleniti eum officiis officia enim
                excepturi, id repellendus mollitia? Ea reprehenderit placeat
                veniam provident, dolorum, perspiciatis facere dolor odio sit
                suscipit sequi velit.<br/>  Consequuntur ratione culpa atque magni ea
                dolor nam, doloribus quibusdam est voluptas enim explicabo
                recusandae nulla nobis, blanditiis sint esse accusamus
                necessitatibus non provident a velit harum, aperiam maiores.
                Ipsam temporibus rerum magni, quas animi laborum amet ex
                officiis quisquam voluptatem blanditiis laboriosam, hic
                reiciendis dignissimos veritatis vitae porro ducimus.<br/>  Repellat
                reiciendis et molestias sapiente esse repellendus illo deleniti
                ipsam aperiam dolorem consequatur rem, fugit maxime deserunt
                blanditiis veritatis magnam quae?
              </p>
            </div>
            <div className="mt-10">
              <h3 className="text-base font-medium">Details</h3>
              <p className="text-base font-normal text-gray-700">
                {product.description}
              </p>
            </div>
          </div>

          {/* color section */}
          <div className="col-span-1 p-3">
            <h1 className="text-3xl font-normal mb-10">
              &#x20B9; {Math.ceil(product.price * 80).toLocaleString()}
            </h1>
            {product.colors && product.colors.length > 0 && (
              <div>
                <label htmlFor="colors" className="text-base font-medium mb-2">
                  Color
                </label>
                <div className="flex justify-start w-fit mb-10">
                  {product.colors.map((color, colorIdx) => {
                    return (
                      <div
                        key={colorIdx}
                        className={`flex m-3 rounded-full ${
                          selectedColor ? color.selectedClass : ""
                        }`}
                      >
                        <input
                          name="colors"
                          value={color.id}
                          type="radio"
                          defaultChecked={color.checked}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className={`w-6 h-6 ${
                            selectedColor ? color.class : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* size section */}
            <div className="ralative">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label htmlFor="sizes" className="text-base font-medium mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap">
                    {product.sizes.map((size, sizeIdx) => {
                      return (
                        <div
                          key={sizeIdx}
                          className="flex flex-col justify-center items-center"
                        >
                          <input
                            name="sizes"
                            value={size.id}
                            type="radio"
                            onChange={(e) => {
                              setSelectedSize(e.target.value);
                            }}
                            className="block w-2 h-2 xl:w-5 xl:h-5 m-2 mb-0 hover:bg-gray-200 focus:border-blue-700 text-sm font-medium border-2 rounded-full border-dashed border-gray-700"
                          />
                          {size.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
