import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useGetProductsBySubcategoryQuery,
} from "../slices/productsApiSlice";
import { addToBucket } from "../slices/bucketListSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subcategoryId } = useParams(); // Changed from subcategoryName to subcategoryId

  // State for managing quantities
  const [quantities, setQuantities] = useState({});

  // State for managing comments/ratings
  const [userComment, SetUserComment] = useState("");
  const [userRating, SetUserRating] = useState(5);

  const { data, isLoading, isError, error, refetch } =
    useGetProductsBySubcategoryQuery(subcategoryId);

  const [createReview, { isloading: LoadingCreateReview }] =
    useCreateReviewMutation();

  const products = data?.products;
  const subcategory = data?.subcategory;

  console.log("Products:", products);
  console.log("Subcategory:", subcategory); // Changed from subcategoryName to subcategoryId

  useEffect(() => {
    if (isError) {
      toast.error(`Error: ${error.message}`);
    }
  }, [isError, error]);

  const handleAddToBucket = (product) => {
    // Get the quantity for this product
    const quantity = quantities[product._id] || 1;

    // Add the product and quantity to the bucket
    dispatch(addToBucket({ ...product, qty: quantity }));

    navigate("/bucketlist");
  };

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities({
      ...quantities,
      [id]: newQuantity || "", // Set to an empty string when newQuantity is not a number
    });
  };

  const handleCreateReview = async (e, productId) => {
    // Add productId as a parameter
    e.preventDefault();

    try {
      const res = await createReview({
        productId, // Use the productId passed into the function
        rating: userRating,
        comment: userComment,
      }).unwrap();
      toast.success(res.message);
      SetUserComment("");
      refetch();
    } catch (error) {
      toast.error(error.data.message || error?.error);
    }
  };


  if (isLoading) {
    // Show the Loader component
    return <Loader />;
  }

  if (isError) {
    // Show an error message
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 lg:pt-28 pt-12">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl font-bold mt-4 border-4 border-blue-500 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 shadow-lg">
            {subcategory ? subcategory.name : "Loading..."}
          </h1>

          {subcategory && (
            <iframe
              title="Promo Video"
              frameBorder="0"
              src={subcategory.promoVideoUrl} // Use the video URL from the API
              allowFullScreen={true}
              className="my-4 w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-1/2 mx-auto rounded-lg shadow-lg overflow-hidden p-2 sm:p-4"
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-8xl mb-6 p-12">
            {Array.isArray(products) &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
                >
                  <h2 className="text-lg font-semibold text-blue-700 mb-4">
                    {product.name}
                  </h2>
                  <div className="carousel w-full">
                    <Carousel>
                      {product.images.map((image, imageIndex) => (
                        <div key={imageIndex} className="w-full">
                          <img
                            src={`http://localhost:7000${
                              image.startsWith("/images/") ? "" : "/images/"
                            }${image}`}
                            alt={`${product.name} ${imageIndex + 1}`}
                            className="object-cover w-full h-auto"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <p className="mt-4 text-sm text-blue-900 border border-gray-300 p-2 w-full h-20 overflow-auto">
                    {product.description}
                  </p>
                  <p className="mt-2 text-sm text-blue-600">
                    Brand: {product.brand}
                  </p>
                  <p className="mt-2 text-sm text-blue-600">
                    Category: {product.categoryName}
                  </p>
                  <p className="mt-2 text-sm text-blue-600">
                    Subcategory: {product.subcategoryName}
                  </p>
                  <p className="mt-2 text-sm text-blue-600">
                    Price: ${product.price}
                  </p>
                  <p className="mt-2 text-sm text-blue-600">
                    In Stock: {product.inStock ? "Yes" : "No"}
                  </p>
                  <div className="mt-2">
                    <label
                      htmlFor={`quantity-${product._id}`}
                      className="text-sm text-blue-600"
                    >
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${product._id}`}
                      type="number"
                      min="1"
                      className="ml-2 text-sm text-blue-600 border border-gray-300 p-1 w-16"
                      value={
                        quantities[product._id] !== undefined
                          ? quantities[product._id]
                          : 1
                      }
                      onChange={(e) =>
                        handleQuantityChange(product._id, e.target.value)
                      }
                    />
                  </div>

                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleAddToBucket(product)}
                  >
                    Place Your Order
                  </button>

                  {/* Add a form for submitting reviews */}
                  <form className="mt-12 bg-blue-100 p-4 rounded">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                      Write a Review:
                    </h3>
                    <label
                      htmlFor={`comment-${product._id}`}
                      className="text-sm text-blue-600"
                    >
                      Comment:
                    </label>
                    <textarea
                      id={`comment-${product._id}`}
                      className="ml-2 text-sm text-blue-600 border border-gray-300 p-1 w-full"
                      value={userComment}
                      onChange={(e) => SetUserComment(e.target.value)}
                      required
                    />
                    <label
                      htmlFor={`rating-${product._id}`}
                      className="text-sm text-blue-600 mt-4"
                    >
                      Rating:
                    </label>
                    <select
                      id={`rating-${product._id}`}
                      className="ml-2 text-sm text-blue-600 border border-gray-300 p-1 w-16"
                      value={userRating}
                      onChange={(e) => SetUserRating(e.target.value)}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                    <button
                      type="submit"
                      className="mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                      onClick={(e) => handleCreateReview(e, product._id)}
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
