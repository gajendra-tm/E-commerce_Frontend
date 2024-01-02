import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductsById,
  createProductAsync,
  fetchProductsByIdAsync,
  selectBrands,
  selectCategories,
  selectProductsById,
  updateProductAsync,
} from "../../product/productSlice";
import { useParams } from "react-router-dom";

export default function AdminProductForm() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProducts = useSelector(selectProductsById);
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductsByIdAsync(params.id));
    } else {
      dispatch(clearProductsById());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProducts && params.id) {
      setValue("title", selectedProducts.title);
      setValue("description", selectedProducts.description);
      setValue("brand", selectedProducts.brand);
      setValue("category", selectedProducts.category);
      setValue("price", selectedProducts.price);
      setValue("discountPercentage", selectedProducts.discountPercentage);
      setValue("stock", selectedProducts.stock);
      setValue("thumbnail", selectedProducts.thumbnail);
      setValue("image1", selectedProducts.images[0]);
      setValue("image2", selectedProducts.images[1]);
      setValue("image3", selectedProducts.images[2]);
      setValue("image4", selectedProducts.images[3]);
    }
  }, [selectedProducts, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProducts };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    reset();
  };

  return (
    <>
      <div className="flex justify-center h-full w-full">
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            const product = { ...data };
            product.images = [
              product.image1,
              product.image2,
              product.image3,
              product.image4,
            ];
            product.rating = 0;
            delete product["image1"];
            delete product["image2"];
            delete product["image3"];
            delete product["image4"];
            product.price = +product.price; //to convert from string to number
            product.stock = +product.stock;
            product.discountPercentage = +product.discountPercentage;

            if (params.id) {
              product.id = params.id;
              product.rating = selectedProducts.rating;
              dispatch(updateProductAsync(product));
              reset();
            } else {
              dispatch(createProductAsync(product));
              reset();
            }
          })}
          className="p-4 md:col-start-1 md:col-end-3 h-full w-8/12"
        >
          <div>
            <h2 className="text-md sm:text-lg font-medium mb-4">Add Product</h2>
            <div className="text-sm sm:text-base text-gray-500 mb-5 mt-1 grid col-span-1">
              <label htmlFor="title">Product Title</label>
              <input
                id="title"
                {...register("title", { required: "title is required" })}
                type="text"
                className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="text-sm sm:text-base text-gray-500 mb-5 grid col-span-1">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                {...register("description", {
                  required: "description is required",
                })}
                type="text"
                rows={5}
                className="resize-none p-2 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2">
              <div className="text-sm sm:text-base mr-1 text-gray-500 mb-5 grid col-span-1">
                <label htmlFor="brand">Brand</label>
                <select
                  id="brand"
                  {...register("brand", { required: "choose the brand" })}
                  type="text"
                  className="p-2 h-10 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                >
                  <option>--choose-the-brand--</option>
                  {brands.map((brand) => {
                    return <option key={brand.value}>{brand.label}</option>;
                  })}
                </select>
              </div>
              <div className="text-sm sm:text-base text-gray-500 mb-5 grid col-span-1">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  {...register("category", { required: "choose the category" })}
                  type="text"
                  className="p-2 h-10 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                >
                  <option>--choose-the-category--</option>
                  {categories.map((category) => {
                    return (
                      <option key={category.value}>{category.label}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  {...register("price", {
                    required: "price is required",
                    min: 1,
                    max: 10000,
                  })}
                  type="number"
                  className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="text-sm sm:text-base text-gray-500 mb-4 mr-1 grid col-span-1">
                <label htmlFor="discountPercentage">Discount %</label>
                <input
                  id="discountPercentage"
                  {...register("discountPercentage", {
                    required: "discount % is required",
                    min: 0,
                    max: 100,
                  })}
                  type="number"
                  className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                />
                {errors.discountPercentage && (
                  <p className="text-red-500">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>
              <div className="text-sm sm:text-base text-gray-500 mb-4 grid col-span-1">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  {...register("stock", { required: "stock is required" })}
                  type="number"
                  className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
                />
                {errors.stock && (
                  <p className="text-red-500">{errors.stock.message}</p>
                )}
              </div>
            </div>
            <div className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1">
              <label htmlFor="thumbnail">Thumbnail Image</label>
              <input
                id="thumbnail"
                {...register("thumbnail", { required: "enter image URL" })}
                type="text"
                className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.thumbnail && (
                <p className="text-red-500">{errors.thumbnail.message}</p>
              )}
            </div>
            <div
              id="imgparent"
              className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1"
            >
              <label htmlFor="image1">Image 1</label>
              <input
                id="image1"
                {...register("image1", { required: "enter image URL" })}
                type="text"
                className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.image1 && (
                <p className="text-red-500">{errors.image1.message}</p>
              )}
            </div>
            <div
              id="imgparent"
              className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1"
            >
              <label htmlFor="image2">Image 2</label>
              <input
                id="image2"
                {...register("image2", { required: "enter image URL" })}
                type="text"
                className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.image2 && (
                <p className="text-red-500">{errors.image2.message}</p>
              )}
            </div>
            <div
              id="imgparent"
              className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1"
            >
              <label htmlFor="image3">Image 3</label>
              <input
                id="image3"
                {...register("image3", { required: "enter image URL" })}
                type="text"
                className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.image3 && (
                <p className="text-red-500">{errors.image3.message}</p>
              )}
            </div>
            <div
              id="imgparent"
              className="text-sm sm:text-base text-gray-500 mb-8 grid col-span-1"
            >
              <label htmlFor="image4">Image 4</label>
              <input
                id="image4"
                {...register("image4", { required: "enter image URL" })}
                type="text"
                className="px-3 h-8 mt-0.5 w-full shadow-sm border text-gray-600 border-gray-400 rounded-lg outline-blue-700"
              />
              {errors.image4 && (
                <p className="text-red-500">{errors.image4.message}</p>
              )}
            </div>
            <div className="flex justify-end pb-10 border-b-2 border-gray-300">
              <button
                onClick={() => {
                  reset();
                }}
                className="text-sm text-center text-gray-900 hover:text-white font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 bg-white hover:bg-gray-600 "
              >
                Reset
              </button>
              {params.id ? (
                <button
                  onClick={() => handleDelete()}
                  className=" text-sm text-center text-white ml-2 hover:text-gray-900 font-medium max-w-max border-2 border-gray-400 rounded-lg p-1 bg-red-500 hover:bg-white "
                >
                  Delete
                </button>
              ) : null}
              <button
                type="submit"
                className="text-sm text-center text-white hover:text-gray-900 font-medium max-w-max border-2 ml-2 border-gray-400 rounded-lg p-1 bg-blue-700 hover:bg-white"
              >
                {params.id ? "Update product" : "Add product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
