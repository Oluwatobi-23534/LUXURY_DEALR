import React, { useState, useEffect, useRef } from "react";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const CategoryListPage = () => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch,
  } = useGetCategoriesQuery();

  const [createCategory, { isSuccess, isError, error: createCategoryError }] =
    useCreateCategoryMutation();

  const [showCreateCategoryForm, setShowCreateCategoryForm] =
    React.useState(false);
 const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [promoVideoUrl, setPromoVideoUrl] = useState("");
  const [uploadStatus1, setUploadStatus1] = useState("");
  const [uploadStatus2, setUploadStatus2] = useState("");
  const productImage1Ref = useRef();
  const productImage2Ref = useRef();

  // Initialize state for product details
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productImages, setProductImages] = useState(["", ""]);
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [imageInput1, setImageInput1] = useState("");
  const [imageInput2, setImageInput2] = useState("");


  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubcategoryNameChange = (event) => {
    setSubcategoryName(event.target.value);
  };

  const handlePromoVideoUrlChange = (event) => {
    setPromoVideoUrl(event.target.value);
  };


  const handleProductNameChange = (event) => {
    setNewProduct(event.target.value);
  };

  const handleAddProduct = () => {
    // Check if all the product details are filled in
    if (
      !newProduct ||
      !productDescription ||
      !productPrice ||
      !file1 ||
      !file2 ||
      !productBrand
    ) {
      alert(
        "Please fill in all the product details before adding a new product."
      );
      return;
    }

    // Add the new product to the products array
    setProducts([
      ...products,
      {
        name: newProduct,
        brand: productBrand,
        description: productDescription,
        price: productPrice,
        images: productImages, // Use the productImages array
      },
    ]);

    // Clear the form fields by resetting the state variables
    setNewProduct("");
    setProductBrand("");
    setProductDescription("");
    setProductPrice("");
    setImageInput1(""); // Reset the image inputs
    setImageInput2("");
    setUploadStatus1(""); // Reset the upload status messages
    setUploadStatus2("");
  };

  const handleRemoveProduct = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  const handleCreateCategory = () => {
    setShowCreateCategoryForm(true);
  };

  // Handlers for product details
  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

 const handleUpload = async (file, setUploadStatus) => {
   const formData = new FormData();
   formData.append("images", file);

   try {
     const res = await axios.post("http://localhost:7000/upload", formData);
     console.log("Upload response:", res.data); // Log the server response
     setUploadStatus("Upload successful");
     return res.data[0].filename; // return the filename of the uploaded image
   } catch (err) {
     console.log(err);
     setUploadStatus("Upload failed");
   }
 };

 const handleSubmit = async (event) => {
   event.preventDefault();

   // Map over the products array and create a new array of products with all details
   const detailedProducts = products.map((product, index) => ({
     name: product.name,
     description: product.description,
     price: product.price,
     brand: product.brand,
     images: productImages,
     inStock: true, // Add this line if you want all products to be in stock by default
   }));

   const newCategory = {
     categoryName,
     subcategoryName,
     promoVideoUrl, // Add this line
     products: detailedProducts, // use the new array of products with all details
   };

   console.log("New Category:", newCategory); // Log newCategory

   try {
     await createCategory(newCategory).unwrap();
     toast.success("Category created successfully");
     setCategoryName("");
     setSubcategoryName("");
     setPromoVideoUrl(""); // Add this line to clear the promo video URL field
     setProducts([]);
     // Clear the product details fields
     setProductDescription("");
     setProductPrice("");
   } catch (error) {
     toast.error("Failed to create category");
   }
 };


  useEffect(() => {
  console.log('productImages:', productImages);
}, [productImages]);



  useEffect(() => {
    if (categoriesError) {
      toast.error(categoriesError?.data?.message || categoriesError?.error);
    }
  }, [categoriesError]);

  if (isLoadingCategories) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-auto py-20 px-12 bg-blue-100 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-2xl font-semibold mb-2 sm:mb-4 text-blue-800">
          Categories
        </h2>
        <button
          className="text-sm sm:text-base bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md mb-2 sm:mb-4"
          onClick={handleCreateCategory}
          type="button"
        >
          Create Category
        </button>
      </div>

      <table className="min-w-full divide-y divide-blue-200 shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Subcategories
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Products
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-200">
          {categories?.map((category) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-500 font-semibold">
                {category._id}
              </td>
              <td className="font-semibold px-6 py-4 whitespace-nowrap border border-blue-500">
                {category.name}
              </td>
              <td className="font-semibold px-6 py-4 whitespace-nowrap border border-blue-500">
                {category.subcategories &&
                  category.subcategories.map((subcategory) => (
                    <div key={subcategory._id}>{subcategory.name}</div>
                  ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-500">
                {category.subcategories &&
                  category.subcategories.map(
                    (subcategory) =>
                      subcategory.items &&
                      subcategory.items.map((item) => (
                        <div key={item._id} className="border p-2 my-2">
                          {item.name}
                        </div>
                      ))
                  )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateCategoryForm && (
        <div className="pt-12 shadow-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoryName"
              >
                Category Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={handleCategoryNameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subcategoryName"
              >
                Subcategory Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="subcategoryName"
                value={subcategoryName}
                onChange={handleSubcategoryNameChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`promoVideoUrl`}
              >
                Promo Video URL:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name={`promoVideoUrl`}
                value={promoVideoUrl}
                onChange={handlePromoVideoUrlChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`product`}
              >
                Product Name:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={`product`}
                value={newProduct}
                onChange={handleProductNameChange}
              />

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productDescription"
                >
                  Product Description:
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="productDescription"
                  onChange={handleProductDescriptionChange}
                  value={productDescription}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productBrand"
                >
                  Product Brand:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productPrice"
                >
                  Product Price:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="productPrice"
                  value={productPrice}
                  onChange={handleProductPriceChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productImage1"
                >
                  Product Image 1:
                </label>
                <div className="flex items-center">
                  <input
                    ref={productImage1Ref}
                    className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
                    type="file"
                    name="productImage1"
                    value={imageInput1}
                    onChange={(e) => {
                      setFile1(e.target.files[0]);
                      setImageInput1(e.target.value);
                    }}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      const imageFilename1 = await handleUpload(
                        file1,
                        setUploadStatus1
                      );
                      setProductImages((prevImages) => [
                        imageFilename1,
                        prevImages[1],
                      ]);
                    }}
                    type="button"
                  >
                    Upload
                  </button>
                  <div className="ml-3">{uploadStatus1}</div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productImage2"
                >
                  Product Image 2:
                </label>
                <div className="flex items-center">
                  <input
                    ref={productImage2Ref}
                    className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
                    type="file"
                    name="productImage2"
                    value={imageInput2}
                    onChange={(e) => {
                      setFile2(e.target.files[0]);
                      setImageInput2(e.target.value);
                    }}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      const imageFilename2 = await handleUpload(
                        file2,
                        setUploadStatus2
                      );
                      setProductImages((prevImages) => [
                        prevImages[0],
                        imageFilename2,
                      ]);
                    }}
                    type="button"
                  >
                    Upload
                  </button>
                  <div className="ml-3">{uploadStatus2}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Add Product
              </button>
              <div className="flex flex-wrap">
                {products.map(
                  (product, index) =>
                    product.name && (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 m-2 border rounded"
                      >
                        <span>{product.name}</span>
                        <button
                          onClick={() => handleRemoveProduct(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                          type="button"
                        >
                          x
                        </button>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
