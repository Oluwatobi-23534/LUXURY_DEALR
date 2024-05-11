import React from "react";
import {Link} from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const pageNumber = Array.from({ length: pages }, (_, i) => i + 1);

  return pages > 1 ? (
    <ul className="flex space-x-2">
      {pageNumber?.map((currentPage) => (
        <Link
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${currentPage}`
                : `/page/${currentPage}`
              : `/admin/products/${currentPage}`
          }
          key={currentPage}
          className={`px-3 py-2 rounded-md border ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {currentPage}
        </Link>
      ))}
    </ul>
  ) : null;
};

export default Paginate;
