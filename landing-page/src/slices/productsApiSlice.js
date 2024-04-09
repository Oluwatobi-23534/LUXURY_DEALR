import { apiSlice } from "./apiSlice";
import {
  CATEGORIES_URL,
  PRODUCTS_URL,
  PRODUCTS_SUBCATEGORY_URL,
} from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: newCategory,
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product.productId}`,
        method: "PUT",
        body: product,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),

    createReview: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}/${data.productId}/review`,
        method: "POST",
        body: data
      }),
    }),

    getProductsBySubcategory: builder.query({
      query: (subcategoryId) => ({
        url: `${PRODUCTS_SUBCATEGORY_URL}/${subcategoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductsBySubcategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation
} = productsApiSlice;
