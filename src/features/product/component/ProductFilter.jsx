import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import ProductList from "./ProductList";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

  {
    id: 8,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

  {
    id: 9,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 10,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "color",
    name: "color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "yellow", label: "Yellow", checked: true },
      { value: "blue", label: "Blue", checked: false },
      { value: "brown", label: "Brown", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "gold", label: "Gold", checked: false },
    ],
  },

  {
    id: "category",
    name: "category",
    options: [
      { value: "new arrival", label: "New Arrival", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },

  {
    id: "size",
    name: "size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "8l", label: "8L", checked: false },
      { value: "10l", label: "10L", checked: true },
      { value: "12l", label: "12L", checked: false },
    ],
  },
];

const staggerMenuItems = stagger(0.01, { startDelay: 0.1 });

//sort animation
function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 360 : 0 }, { duration: 0.3 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

function useMobileAnimation(mobileIsOpen) {
  const [mobilescope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: mobileIsOpen ? 360 : 0 }, { duration: 0.3 });

    animate(
      "ul",
      {
        clipPath: mobileIsOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(100% 0% 0% 0% round 0px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      mobileIsOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: mobileIsOpen ? staggerMenuItems : 0,
      }
    );
  }, [mobileIsOpen]);

  return mobilescope;
}

//filter animation
function useFilterAnimation(filterIsOpen) {
  const [filterscope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "#filter_animation",
      {
        clipPath: filterIsOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(100% 0% 0% 0% round 0px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "input,label",
      filterIsOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: filterIsOpen ? staggerMenuItems : 0,
      }
    );
  }, [filterIsOpen]);

  return filterscope;
}

export default function ProductFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);
  const mobilescope = useMobileAnimation(mobileIsOpen);
  const filterscope = useFilterAnimation(filterIsOpen);

  return (
    <>
      <div className=" flex justify-between items-center flex-col sm:p-4 max-w-full rounded-lg">
        <div className="flex justify-between w-full sm:border-b-2 ">
          <div className="">
            <h1 className="hidden sm:block sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
              New Arrivals
            </h1>
          </div>

          {/* sort&filter section mobile layout */}
          <div className="fixed block sm:hidden bottom-0 left-0 w-full h-12 bg-red-600">
            <div className="flex justify-evenly relative w-full h-full items-center">
              <div ref={mobilescope}>
                <div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMobileIsOpen(!mobileIsOpen)}
                  >
                    Sort
                    <svg
                      className="inline-block arrow"
                      style={{ transformOrigin: "50% 55%" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="25"
                      height="25"
                    >
                      <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
                    </svg>
                  </motion.button>
                </div>
                <ul
                  style={{
                    pointerEvents: mobileIsOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                  }}
                  className="flex flex-col justify-center overflow-hidden absolute z-10 left-0 bottom-0 h-56 w-full p-2 box-border bg-gray-800 font-medium text-white drop-shadow-2xl text-lg leading-loose"
                >
                  <span className=" h-5 flex justify-end items-end">
                    <svg
                      onClick={() => setMobileIsOpen(!mobileIsOpen)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                    </svg>
                  </span>
                  {sortOptions.map((sortOption, sortIndex) => {
                    return (
                      <li
                        key={sortIndex}
                        className="hover:text-gray-400 rounded-lg px-2 cursor-pointer w-44"
                      >
                        {sortOption.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="inline-block" ref={filterscope}>
                <div className="ml-0 sm:ml-48">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="text-base sm:text-xl"
                    onClick={() => setFilterIsOpen(!filterIsOpen)}
                  >
                    Filter
                    <svg
                      className="inline ml-1"
                      style={{ transformOrigin: "50% 55%" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="20"
                      height="20"
                    >
                      <path d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.4037 6L11 12.8944V20H13V12.8944L17.5963 6H6.4037Z"></path>
                    </svg>
                  </motion.button>
                </div>
                <div
                  style={{
                    pointerEvents: filterIsOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                  }}
                  id="filter_animation"
                  className="absolute bottom-0 left-0 h-screen overflow-x-auto p-1  bg-gray-800 w-full text-white"
                >
                  <span className=" h-6 flex justify-end items-end invert">
                    <svg
                      onClick={() => setFilterIsOpen(!filterIsOpen)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                    </svg>
                  </span>
                  {filters.map((section) => {
                    return (
                      <span
                        className="flex flex-col px-9 w-full mb-5"
                        key={section.id}
                      >
                        <span className="font-medium border-t-2 border-gray-300 text-gray-200">
                          {section.name}
                        </span>
                        <div>
                          {section.options.map((option, optionIdx) => {
                            return (
                              <div
                                key={option.value}
                                className="flex justify-start items-center w-40"
                              >
                                <input
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.name}`}
                                  type="checkbox"
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300  focus:ring-2 ring-blue-500 ring-offset-2"
                                />
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm  text-gray-100 leading-6 font-medium"
                                >
                                  {option.label}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* sort&filter section web layout */}
          <div className="hidden sm:block sm:text-xl relative" ref={scope}>
            <div className="flex justify-end">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                Sort
                <svg
                  className="inline-block sm:ml-2 arrow"
                  style={{ transformOrigin: "50% 55%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  width="25"
                  height="25"
                >
                  <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
                </svg>
              </motion.button>
            </div>
            <ul
              style={{
                pointerEvents: isOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
              }}
              className="flex flex-col justify-center items-center absolute top-8 right-3 h-48 w-44 p-2 box-content border-2 bg-white drop-shadow-2xl rounded-lg text-lg leading-loose"
            >
              {sortOptions.map((sortOption, sortIndex) => {
                return (
                  <li
                    key={sortIndex}
                    className="hover:bg-gray-100 rounded-lg px-2 cursor-pointer w-40"
                  >
                    {sortOption.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex w-full sm:mt-6">
          <div className="hidden sm:block mr-2  w-40">
            {filters.map((section) => {
              return (
                <span
                  className="flex flex-col border-t-2 w-40 mb-5"
                  key={section.id}
                >
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <div>
                    {section.options.map((option, optionIdx) => {
                      return (
                        <div
                          key={option.value}
                          className="flex justify-start items-center w-40"
                        >
                          <input
                            id={`${section.id}-${optionIdx}`}
                            name={`${section.name}`}
                            type="checkbox"
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            className="h-4 w-4 rounded border-gray-300  focus:ring-2 ring-blue-500 ring-offset-2"
                          />
                          <label
                            htmlFor={`${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600 leading-6 font-normal"
                          >
                            {option.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </span>
              );
            })}
          </div>
          <div className=" flex justify-evenly flex-wrap w-full overflow-y-auto">
            {products.map((product) => {
              return <ProductList key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
