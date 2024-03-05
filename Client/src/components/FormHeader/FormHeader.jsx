import React from "react";

const FormHeader = ({ formId, setFormId }) => {
  return (
    <div className="field mt-5">
      <label htmlFor="formId" className="title is-4">
        Form ID:
      </label>
      <div className="control mt-5">
        <input
          type="text"
          id="formId"
          className="input"
          value={formId}
          onChange={(e) => setFormId(e.target.value)}
          required
          disabled
        />
      </div>
    </div>
  );
};

export default FormHeader;
