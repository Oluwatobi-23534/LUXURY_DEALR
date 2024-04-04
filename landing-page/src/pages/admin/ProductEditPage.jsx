import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const [updateProduct, { isLoading: loadingUpdate }, refetch] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categoryName: "",
    subcategoryName: "",
    quantity: "",
    price: "",
    brand: "",
  });

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const {
    name,
    description,
    categoryName,
    subcategoryName,
    quantity,
    price,
    brand,
  } = productData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
    console.log(productData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        description,
        categoryName,
        subcategoryName,
        quantity,
        price,
        brand,
      }).unwrap();
      toast.success("Product updated successfully");
        navigate("/admin/products");
        refetch();
    } catch (error) {
      return toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="flex justify-center py-20 px-12 bg-blue-100 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-md p-12 mt-12 "
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold text-blue-800">Edit Product</h2>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
            value={name}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            id="description"
            onChange={handleInputChange}
            value={description}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="categoryName"
            id="categoryName"
            onChange={handleInputChange}
            value={categoryName}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subcategoryName"
          >
            Subcategory
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="subcategoryName"
            id="subcategoryName"
            onChange={handleInputChange}
            value={subcategoryName}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="quantity"
            id="quantity"
            onChange={handleInputChange}
            value={quantity}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="price"
            id="price"
            onChange={handleInputChange}
            value={price}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="brand"
          >
            Brand
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="brand"
            id="brand"
            onChange={handleInputChange}
            value={brand}
          />
        </div>

        <button
          type="submit"
          className="w-full text-base bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
          onClick={handleSubmit}
        >
          Update Product
        </button>
        {loadingUpdate && <Loader />}
      </form>
    </div>
  );
};

export default ProductEditPage;
