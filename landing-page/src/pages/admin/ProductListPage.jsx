import React from "react";

import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useNavigate } from "react-router-dom"





const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return toast.error(error?.data?.message || error?.error);
  }

  const editProductHandler = (id) => {
    navigate(`/admin/product/${id}/edit`)
    refetch();
  }

  return (
    <div className="overflow-x-auto py-20 px-12 bg-blue-100">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-2xl font-semibold mb-2 sm:mb-4 text-blue-800">
          Products
        </h2>
        
      </div>

      <table className="min-w-full divide-y divide-blue-200 shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Subcategory
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Brand
            </th>
            <th className="px-6 py-3 bg-blue-50 text-left text-xs leading-4 font-medium text-blue-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-200">
          {products?.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap">{product._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4">
                {product.description.length > 30
                  ? `${product.description.substring(0, 30)}...`
                  : product.description}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {product.categoryName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.subcategoryName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {product.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={() => editProductHandler(product._id)}>
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
    </div>
  );

};

export default ProductListPage;
