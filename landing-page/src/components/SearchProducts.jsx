import React from 'react'
import { HashLink } from "react-router-hash-link";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Paginate from './Paginate';

const SearchProducts = () => {
    const { keyword, currentPage } = useParams();
    const { data, isLoading, isError, error } = useGetProductsQuery({
      keyword,
      currentPage,
    });

    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <div>Error: {error.message}</div>;
    }


  return (
    <div className="bg-blue-200 min-h-screen">
      <div className="p-4 md:p-10 lg:p-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <h1 className="col-span-full text-lg md:text-xl lg:text-2xl font-semibold text-blue-700 mb-4">
          Search Results for "{keyword}"
        </h1>
        {data?.products?.length > 0 ? (
          data?.products?.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-md mb-4 flex bg-white shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
            >
              {/* Display the product image */}
              <div className="w-1/2 pr-4">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL || ""}${
                    product.images[0].startsWith("/images/") ? "" : "/images/"
                  }${product.images[0]}`}
                  alt={`${product.name} 1`}
                  className="object-cover w-full h-auto"
                />
              </div>
              <div className="w-1/2 pl-4">
                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                  {product.name}
                </h2>
                <p className="text-sm text-blue-600">Brand: {product.brand}</p>
                <p className="text-sm text-blue-600">
                  Category: {product.categoryName}
                </p>
                <p className="text-sm text-blue-600">
                  Subcategory: {product.subcategoryName}
                </p>
                <p className="text-sm text-blue-600">Price: ₦{product.price}</p>
                <p className="text-sm text-blue-600">
                  In Stock: {product.inStock ? "Yes" : "No"}
                </p>
                <p className="text-sm text-blue-600">
                  Rating:{" "}
                  {product.rating > 0
                    ? "⭐".repeat(product.rating)
                    : "No ratings yet. Be the first!"}
                </p>

                <Link to={`/products/${product._id}`}>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-lg md:text-xl lg:text-2xl font-semibold text-blue-700 mb-4 text-center">
            <strong className="text-red-700">
              Oops! We couldn't find what you're looking for.
            </strong>
            <p className="mt-4">
              But don't worry, we have plenty of other amazing products for you
              to explore!
            </p>
            <HashLink
              to="/products#products-top"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              <span className="underline">Explore Available Products</span>
            </HashLink>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-12">
        <Paginate
          pages={data.pages}
          page={data.currentPage}
          keyword={keyword ? keyword : ""}
        />
      </div>
    </div>
  );

}

export default SearchProducts