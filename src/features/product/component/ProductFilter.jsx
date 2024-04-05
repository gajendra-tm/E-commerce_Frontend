import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectBrands,
  selectCategories,
  selectAllProducts,
  selectAllTotalItems,
} from "../productSlice";
import ProductFilterMobile from "./ProductFilterMobile";
import ProductSortWeb from "./ProductSortWeb";

const sortOptions = [
  { name: "Best Rating", order: "desc", sort: "rating", current: false },
  { name: "Price: Low to High", order: "asc", sort: "price", current: false },
  { name: "Price: High to Low", order: "desc", sort: "price", current: false },
];

export default function ProductFilter() {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectAllTotalItems);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const totalPages = Math.ceil(totalItems / 10);

  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },

    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

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
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
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

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
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
                  <span
                    className="font-medium text-gray-900"
                    style={{ transformOrigin: "50% 55%" }}
                  >
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
          <div className=" flex justify-evenly sm:justify-start flex-wrap w-full max-h-screen overflow-y-auto">
            {products.map((product) => {
              return <ProductList key={product.id} product={product} />;
            })}
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center mb-12 md:mb-0">
          <span>
            <svg
              onClick={() => {
                setPage(page > 1 ? page - 1 : page);
              }}
              disabled
              className=" border rounded-full mr-1 hover:bg-gray-300 border-gray-400 bg-white w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
            </svg>
          </span>
          {Array.from({ length: totalPages }).map((val, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  handlePage(index + 1);
                }}
                className={`${
                  index + 1 === page ? "bg-blue-700 text-white" : "bg-white"
                } flex justify-center items-center border border-gray-400 rounded-md mr-0.5  font-medium w-5 h-5 md:w-8 md:h-8`}
              >
                {index + 1}
              </button>
            );
          })}
          <span>
            <svg
              onClick={() => {
                setPage(page < totalPages ? page + 1 : page);
              }}
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
