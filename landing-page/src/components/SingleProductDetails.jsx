import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { toast } from "react-toastify";
import {
  useGetProductsDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToBucket } from "../slices/bucketListSlice";

const SingleProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
      error,
    refetch
  } = useGetProductsDetailsQuery(productId);

  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation();

  const [review, setReview] = useState({ rating: 5, comment: "" });

  // State for managing quantities
    const [quantities, setQuantities] = useState({});
    
  // State for managing comments/ratings
  const [userComment, SetUserComment] = useState("");
  const [userRating, SetUserRating] = useState(5);

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

  return (
    <div className="mx-auto p-6 lg:p-40 bg-blue-400 w-full">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <div className="w-full lg:w-1/2">
          {/* Render product images in a carousel */}
          {product &&
            Array.isArray(product.images) &&
            product.images.length > 0 && (
              <Carousel>
                {product.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="w-full aspect-w-1 aspect-h-1 p-6"
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL || ""}${
                        image.startsWith("/images/") ? "" : "/images/"
                      }${image}`}
                      alt={`${product.name} ${imageIndex + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Carousel>
            )}
        </div>

        <div className="w-full lg:w-1/2 p-4">
          {product && (
            <>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm text-gray-700 border border-gray-300 p-2 w-full h-20 overflow-auto">
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

              {/* Display customer reviews */}
              <div className="mt-12 w-full bg-blue-50 p-2 rounded-md">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Customer Reviews:
                </h3>
                {product.reviews.length > 0 ? (
                  product.reviews.map((review, reviewIndex) => (
                    <div key={reviewIndex} className="border-t pt-2">
                      <p className="text-sm text-blue-600">
                        Rating: {"⭐".repeat(review.rating)}
                      </p>
                      <p className="text-sm text-blue-600">
                        Comment: {review.comment}
                      </p>
                      <p className="text-sm text-blue-600">By: {review.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-blue-600">
                    No reviews yet. Be the first to share your thoughts on this
                    product!
                  </p>
                )}
              </div>

              {/* Form for writing a review */}
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
            </>
          )}
        </div>
      </div>
    </div>
  );


};

export default SingleProductDetails;
