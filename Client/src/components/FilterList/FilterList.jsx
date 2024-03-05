import React from "react";
import Filter from "../Filter/Filter";

const FilterList = ({
  filters,
  questions,
  handleFilterChange,
  removeFilter,
}) => {
  return (
    <div className="container">
      <h3 className="title is-3">Filters:</h3>
      <div className="columns is-multiline">
        {filters.length ? (
          filters.map((filter, index) => (
            <div className="column is-full" key={index}>
              <Filter
                index={index}
                filter={filter}
                questions={questions}
                handleFilterChange={handleFilterChange}
                removeFilter={removeFilter}
              />
            </div>
          ))
        ) : (
          <div className="column is-full">No filters applied</div>
        )}
      </div>
    </div>
  );
};

export default FilterList;
