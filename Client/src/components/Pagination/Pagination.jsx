import React from "react";
import { ReactComponent as LeftIcon } from "../../assets/left-icon.svg";
import { ReactComponent as RightIcon } from "../../assets/right-icon.svg";

const Pagination = ({ page, pageCount, fetchFilteredResponses }) => {
  return (
    <div className="container is-full mb-6">
      <div className="columns is-centered">
        <div className="column is-narrow has-text-centered">
          <button
            className="button is-white has-text-white"
            disabled={page <= 1}
            onClick={() => fetchFilteredResponses(page - 1)}
          >
            <LeftIcon />
          </button>
        </div>
        <div className="column is-narrow has-text-centered mt-1">
          <span className="has-text-weight-bold title is-4 ">{page}</span>
        </div>
        <div className="column is-narrow has-text-centered">
          <button
            className="button is-white has-text-white"
            disabled={page >= pageCount}
            onClick={() => fetchFilteredResponses(page + 1)}
          >
            <RightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
