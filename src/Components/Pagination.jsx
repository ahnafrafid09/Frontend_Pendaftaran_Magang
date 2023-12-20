import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ rows, page, pages, changePage }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <p className="mb-4 sm:mb-0">
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pages}
        onPageChange={changePage}
        containerClassName="flex items-center justify-center mt-4 sm:mt-0"
        pageClassName="block text-netral-black font-lato border border-gray-500 rounded w-10 h-10 flex items-center justify-center"
        previousClassName="w-20 h-10 flex items-center justify-center text-netral-gray bg-white font-lato"
        nextClassName="w-20 h-10 flex items-center justify-center text-netral-black bg-white font-lato"
        activeClassName="bg-blue-400 text-white border-none"
      />
    </div>
  );
};

export default Pagination;
