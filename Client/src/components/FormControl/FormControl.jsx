import React from "react";

const FormControl = ({ addFilter }) => {
  return (
    <div className="field is-grouped is-centered mt-5">
      <div className="control">
        <button type="button" className="button is-info" onClick={addFilter}>
          Add Filter
        </button>
      </div>
      <div className="control">
        <button type="submit" className="button is-info">
          Fetch Responses
        </button>
      </div>
    </div>
  );
};

export default FormControl;
