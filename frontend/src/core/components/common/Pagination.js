import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { route, pages, page, keyword = "" } = props;
  return (
    <nav>
      <div className="flex items-center justify-center space-x-2">
        {[...Array(pages).keys()].map((x) => (
          <Link
            className={`px-4 py-2 ${
              x + 1 === page ? "bg-green-500 text-white" : "bg-gray-100"
            }`}
            key={x + 1}
            to={
              keyword
                ? `${route}?keyword=${keyword}&page=${x + 1}`
                : `${route}?page=${x + 1}`
            }
          >
            {x + 1}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
