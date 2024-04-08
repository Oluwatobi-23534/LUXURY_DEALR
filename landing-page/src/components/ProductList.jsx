import React from "react";

import "../index.css";
import { HashLink } from "react-router-hash-link";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../slices/productsApiSlice";


const ProductList = () => {
  
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  console.log(categories);


   

   

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast.error(error?.data?.message || error?.error)
  }

  return (
    <div id="products-top" className="product-list w-full">
      {categories &&
        categories.map((category) => (
          <div key={category.name} className="category font-bold">
            <h1>{category.name}</h1>
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="subcategory">
                <h2 className="underline cursor-pointer">
                  <HashLink to={`/products/subcategory/${subcategory._id}#top`}>
                    {subcategory.name}
                  </HashLink>
                </h2>
                {subcategory.items.map((item) => (
                  <div key={item.name} className="">
                    <p className="item rounded-lg">{item.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );




};

export default ProductList;
