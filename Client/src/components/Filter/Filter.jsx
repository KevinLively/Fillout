import React from "react";

const Filter = ({
  filter,
  index,
  questions,
  handleFilterChange,
  removeFilter,
}) => {
  return (
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field is-expanded">
          <div className="control">
            <div className="select is-fullwidth">
              <select
                value={filter.id}
                onChange={(e) =>
                  handleFilterChange(index, "id", e.target.value)
                }
                required
              >
                <option value="" defaultChecked>
                  Select Question
                </option>
                {questions?.map((question) => (
                  <option key={question.id} value={question.name}>
                    {question.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <div className="select">
              <select
                value={filter.condition}
                onChange={(e) =>
                  handleFilterChange(index, "condition", e.target.value)
                }
              >
                <option value="equals">Equals</option>
                <option value="does_not_equal">Does Not Equal</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              placeholder="Search by Value"
              type="text"
              value={filter.value}
              onChange={(e) =>
                handleFilterChange(index, "value", e.target.value)
              }
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-danger"
              type="button"
              onClick={() => removeFilter(index)}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
