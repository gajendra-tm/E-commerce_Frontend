import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync, fetchProductsByFiltersAsync, seletAllProducts } from "../productSlice";

const sortOptions = [
  { name: "Best Rating", order: "desc", sort:"rating", current: false },
  { name: "Price: Low to High", order: "asc", sort:"price", current: false },
  { name: "Price: High to Low", order: "desc", sort:"price", current: false },
];

const filters = [
  {
    id: "brands",
    name: "Brands",
    options: [
      { value: "Apple", label: "Apple", checked: false },
      { value: "Samsung", label: "Samsung", checked: false },
      { value: "OPPO", label: "OPPO", checked: false },
      { value: "Huawei", label: "Huawei", checked: false },
      {
        value: "Microsoft Surface",
        label: "Microsoft Surface",
        checked: false,
      },
      { value: "Infinix", label: "Infinix", checked: false },
      { value: "HP Pavilion", label: "HP Pavilion", checked: false },
      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of Acqua Di Gio",
        checked: false,
      },
      { value: "Royal_Mirage", label: "Royal Mirage", checked: false },
      {
        value: "Fog Scent Xpressio",
        label: "Fog Scent Xpressio",
        checked: false,
      },
      { value: "Al Munakh", label: "Al Munakh", checked: false },
      { value: "Lord - Al-Rehab", label: "Lord - Al-Rehab", checked: false },
      { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
      { value: "Hemani Tea", label: "Hemani Tea", checked: false },
      { value: "Dermive", label: "Dermive", checked: false },
      { value: "ROREC White Rice", label: "ROREC White Rice", checked: false },
      { value: "Fair & Clear", label: "Fair & Clear", checked: false },
      { value: "Saaf & Khaas", label: "Saaf & Khaas", checked: false },
      { value: "Bake Parlor Big", label: "Bake Parlor Big", checked: false },
      {
        value: "Baking Food Items",
        label: "Baking Food Items",
        checked: false,
      },
      { value: "fauji", label: "fauji", checked: false },
      { value: "Dry Rose", label: "Dry Rose", checked: false },
      { value: "Boho Decor", label: "Boho Decor", checked: false },
      { value: "Flying Wooden", label: "Flying Wooden", checked: false },
      { value: "LED Lights", label: "LED Lights", checked: false },
      { value: "luxury palace", label: "luxury palace", checked: false },
      { value: "Golden", label: "Golden", checked: false },
      {
        value: "Furniture Bed Set",
        label: "Furniture Bed Set",
        checked: false,
      },
      { value: "Ratttan Outdoor", label: "Ratttan Outdoor", checked: false },
      { value: "Kitchen Shelf", label: "Kitchen Shelf", checked: false },
      { value: "Multi Purpose", label: "Multi Purpose", checked: false },
      { value: "AmnaMart", label: "AmnaMart", checked: false },
      {
        value: "Professional Wear",
        label: "Professional Wear",
        checked: false,
      },
      { value: "Soft Cotton", label: "Soft Cotton", checked: false },
      { value: "Top Sweater", label: "Top Sweater", checked: false },
      {
        value: "RED MICKY MOUSE..",
        label: "RED MICKY MOUSE..",
        checked: false,
      },
      { value: "Digital Printed", label: "Digital Printed", checked: false },
      { value: "Ghazi Fabric", label: "Ghazi Fabric", checked: false },
      { value: "IELGY", label: "IELGY", checked: false },
      { value: "IELGY fashion", label: "IELGY fashion", checked: false },
      {
        value: "Synthetic Leather",
        label: "Synthetic Leather",
        checked: false,
      },
      {
        value: "Sandals Flip Flops",
        label: "Sandals Flip Flops",
        checked: false,
      },
      { value: "Maasai Sandals", label: "Maasai Sandals", checked: false },
      { value: "Arrivals Genuine", label: "Arrivals Genuine", checked: false },
      { value: "Vintage Apparel", label: "Vintage Apparel", checked: false },
      { value: "FREE FIRE", label: "FREE FIRE", checked: false },
      { value: "The Warehouse", label: "The Warehouse", checked: false },
      { value: "Sneakers", label: "Sneakers", checked: false },
      { value: "Rubber", label: "Rubber", checked: false },
      { value: "Naviforce", label: "Naviforce", checked: false },
      { value: "SKMEI 9117", label: "SKMEI 9117", checked: false },
      { value: "Strap Skeleton", label: "Strap Skeleton", checked: false },
      { value: "Stainless", label: "Stainless", checked: false },
      { value: "Eastern Watches", label: "Eastern Watches", checked: false },
      { value: "Luxury Digital", label: "Luxury Digital", checked: false },
      { value: "Watch Pearls", label: "Watch Pearls", checked: false },
      { value: "Bracelet", label: "Bracelet", checked: false },
      { value: "LouisWill", label: "LouisWill", checked: false },
      { value: "Copenhagen Luxe", label: "Copenhagen Luxe", checked: false },
      { value: "Steal Frame", label: "Steal Frame", checked: false },
      { value: "Darojay", label: "Darojay", checked: false },
      {
        value: "Fashion Jewellery",
        label: "Fashion Jewellery",
        checked: false,
      },
      { value: "Cuff Butterfly", label: "Cuff Butterfly", checked: false },
      {
        value: "Designer Sun Glasses",
        label: "Designer Sun Glasses",
        checked: false,
      },
      { value: "mastar watch", label: "mastar watch", checked: false },
      { value: "Car Aux", label: "Car Aux", checked: false },
      { value: "W1209 DC12V", label: "W1209 DC12V", checked: false },
      { value: "TC Reusable", label: "TC Reusable", checked: false },
      { value: "Neon LED Light", label: "Neon LED Light", checked: false },
      {
        value: "METRO 70cc Motorcycle - MR70",
        label: "METRO 70cc Motorcycle - MR70",
        checked: false,
      },
      { value: "BRAVE BULL", label: "BRAVE BULL", checked: false },
      { value: "shock absorber", label: "shock absorber", checked: false },
      { value: "JIEPOLLY", label: "JIEPOLLY", checked: false },
      { value: "Xiangle", label: "Xiangle", checked: false },
      {
        value: "lightingbrilliance",
        label: "lightingbrilliance",
        checked: false,
      },
      { value: "Ifei Home", label: "Ifei Home", checked: false },
      { value: "DADAWU", label: "DADAWU", checked: false },
      { value: "YIOSI", label: "YIOSI", checked: false },
    ],
  },

  {
    id: "category",
    name: "Category",
    options: [
      { value: "smartphones", label: "smartphones", checked: false },
      { value: "laptops", label: "laptops", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "skincare", label: "skincare", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      { value: "home-decoration", label: "home decoration", checked: false },
      { value: "furniture", label: "furniture", checked: false },
      { value: "tops", label: "tops", checked: false },
      { value: "womens-dresses", label: "womens dresses", checked: false },
      { value: "womens-shoes", label: "womens shoes", checked: false },
      { value: "mens-shirts", label: "mens shirts", checked: false },
      { value: "mens-shoes", label: "mens shoes", checked: false },
      { value: "mens-watches", label: "mens watches", checked: false },
      { value: "womens-watches", label: "womens watches", checked: false },
      { value: "womens-bags", label: "womens bags", checked: false },
      { value: "womens-jewellery", label: "womens jewellery", checked: false },
      { value: "sunglasses", label: "sunglasses", checked: false },
      { value: "automotive", label: "automotive", checked: false },
      { value: "motorcycle", label: "motorcycle", checked: false },
      { value: "lighting", label: "lighting", checked: false },
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
  const [filter, setFilter] = useState({});

  const scope = useMenuAnimation(isOpen);
  const mobilescope = useMobileAnimation(mobileIsOpen);
  const filterscope = useFilterAnimation(filterIsOpen);

  const dispatch = useDispatch();
  const products = useSelector(seletAllProducts);

  const handleSort = (e,sortOption)=>{
    const newFilter = { ...filter,_sort:sortOption.sort, _order:sortOption.order};
    setFilter(newFilter);
    dispatch(fetchProductsByFiltersAsync(newFilter))
  }

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter, [section.id]: option.value };
    setFilter(newFilter);
    dispatch(fetchProductsByFiltersAsync(newFilter));
  };

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

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
          <div className="fixed block sm:hidden z-50 bottom-0 left-0 w-full h-12 bg-red-600">
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
                        onClick={(e)=>handleSort(e,sortOption)}
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
                                  name={section.name}
                                  type="checkbox"
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  onChange={(e) => handleFilter(e, section, option)}
                                  className="h-4 w-4 rounded border-gray-300  focus:ring-2 ring-blue-500 ring-offset-2"
                                />
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm truncate  text-gray-100 leading-6 font-medium"
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
              className="flex flex-col justify-center items-center absolute top-8 right-3 w-48 p-2 box-content border-2 bg-white drop-shadow-2xl rounded-lg text-lg leading-loose"
            >
              {sortOptions.map((sortOption, sortIndex) => {
                return (
                  <li
                    key={sortIndex}
                    onClick={(e)=>handleSort(e,sortOption)}
                    className="hover:bg-gray-100 rounded-lg px-2 cursor-pointer w-full"
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
                            name={section.name}
                            type="checkbox"
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            onChange={(e) => handleFilter(e, section, option)}
                            className="h-4 w-4 rounded border-gray-300  focus:ring-2 ring-blue-500 ring-offset-2"
                          />
                          <label
                            htmlFor={`${section.id}-${optionIdx}`}
                            className="ml-3 text-sm truncate text-gray-600 leading-6 font-normal"
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
          <div className=" flex justify-evenly md:justify-start flex-wrap w-full max-h-screen overflow-y-auto">
            {products.map((product) => {
              return <ProductList key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
