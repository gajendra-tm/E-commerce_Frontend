import React, { useState, useEffect } from "react";
import AdminProductList from "./AdminProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectBrands,
  selectCategories,
  selectAllProducts,
  selectAllTotalItems,
} from "../../product/productSlice";
import AdminProductFilterMobile from "./AdminProductFilterMobile";
import AdminProductSortWeb from "./AdminProductSortWeb";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Best Rating", order: "desc", sort: "rating", current: false },
  { name: "Price: Low to High", order: "asc", sort: "price", current: false },
  { name: "Price: High to Low", order: "desc", sort: "price", current: false },
];

export default function AdminProductFilter() {
  const [openFilter, setOpenFilter] = useState(0);
  const [selectFilter, setSelectFilter] = useState(false);
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
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination, admin:true }));
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
              New Arrivals admin
            </h1>
          </div>
          {/* sort&filter section mobile layout */}
          <AdminProductFilterMobile
            propsList={{ sortOptions, filters, handleFilter, handleSort }}
          ></AdminProductFilterMobile>

          {/* sort&filter section web layout */}
          <AdminProductSortWeb
            propsList={{ sortOptions, handleSort }}
          ></AdminProductSortWeb>
        </div>
        <div className="flex w-full sm:mt-6">
          <div className="hidden sm:block mr-2 w-40">
            {filters.map((section,index) => {
              return (
                <div
                  className="flex flex-col border-t-2 overflow-x-hidden w-40 p-1"
                  key={index}
                >
                   <button
                    onClick={() => {
                      setOpenFilter(index);
                      setSelectFilter(!selectFilter);
                    }}
                    className="flex justify-between font-medium text-gray-900"
                  >
                    {section.name}
                    {openFilter === index && !selectFilter  ? (
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M5 11V13H19V11H5Z"></path>
                    </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="currentColor"
                      >
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                      </svg>
                    )}
                  </button>
                  {openFilter === index && !selectFilter ? ( 
                  <div className="flex flex-col overflow-x-hidden h-80 w-40 mb-5">
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
                  </div>) : null}
                </div>
              );
            })}
          </div>

          {/* product list component */}
          <div>
            <div className="ml-2">
              <Link to="/admin/admin-product-form">
              <button
                className=" text-white text-base font-medium bg-green-600 hover:bg-green-500 p-1 mb-2 rounded-md"
              >
                Add New Product
              </button>
              </Link>
            </div>
            <div className=" flex justify-evenly lg:justify-start flex-wrap w-full max-h-screen overflow-y-auto">
              {products.map((product) => {
                return <AdminProductList key={product.id} product={product} />;
              })}
            </div>
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
