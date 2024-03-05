import React from "react";

const Pagination = ({ page, pageCount, fetchFilteredResponses }) => {
  return (
    <div className="container is-full">
      <div className="columns is-justify-content-space-between">
        <div className="column">
          <button
            className="button"
            disabled={page <= 1}
            onClick={() => fetchFilteredResponses(page - 1)}
          >
            Previous Page
          </button>
        </div>
        <div className="column">
          <span className="has-text-weight-bold">Page {page}</span>
        </div>
        <div className="column">
          <button
            className="button"
            disabled={page >= pageCount}
            onClick={() => fetchFilteredResponses(page + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
