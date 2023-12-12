import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByFiltersAsync,
  seletAllProducts,
  seletAllTotalItems,
} from "../productSlice";
import ProductFilterMobile from "./ProductFilterMobile";
import ProductSortWeb from "./ProductSortWeb";

const sortOptions = [
  { name: "Best Rating", order: "desc", sort: "rating", current: false },
  { name: "Price: Low to High", order: "asc", sort: "price", current: false },
  { name: "Price: High to Low", order: "desc", sort: "price", current: false },
];

const filters = [
  {
    id: "brand",
    name: "Brand",
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

export default function ProductFilter() {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(seletAllProducts);
  const totalItems = useSelector(seletAllTotalItems);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSort = (e, sortOption) => {
    const newSort = {
      ...sort,
      _sort: sortOption.sort,
      _order: sortOption.order,
    };
    setSort(newSort);
  };

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    // need to add multiple categories on server
    if (e.target.checked) {
      newFilter[section.id]
        ? newFilter[section.id].push(option.value)
        : (newFilter[section.id] = [option.value]);
    } else {
      delete newFilter[section.id];
    }
    setFilter(newFilter);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: 10 };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

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
          <ProductFilterMobile
            propsList={{ sortOptions, filters, handleFilter, handleSort }}
          ></ProductFilterMobile>

          {/* sort&filter section web layout */}
          <ProductSortWeb
            propsList={{ sortOptions, handleSort }}
          ></ProductSortWeb>
        </div>
        <div className="flex w-full sm:mt-6">
          <div className="hidden sm:block mr-2 w-40">
            {filters.map((section) => {
              return (
                <div
                  className="flex flex-col border-t-2  overflow-x-hidden h-80 w-40 mb-5"
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
                </div>
              );
            })}
          </div>

          {/* product list component */}
          <div className=" flex justify-evenly md:justify-start flex-wrap w-full max-h-screen overflow-y-auto">
            {products.map((product) => {
              return <ProductList key={product.id} product={product} />;
            })}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <span>
            <svg
              className="border rounded-full mr-1 hover:bg-gray-300 border-gray-400 bg-white w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
            </svg>
          </span>
          {Array.from({ length: Math.ceil(totalItems / 10) }).map(
            (val, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                  className={`${
                    index + 1 === page ? "bg-blue-700 text-white" : "bg-white"
                  } border border-gray-400 rounded-md mr-0.5 font-medium w-8 h-8 text-center`}
                >
                  {index + 1}
                </button>
              );
            }
          )}
          <span>
            <svg
              className="border rounded-full ml-1 hover:bg-gray-300 border-gray-400 bg-white w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
