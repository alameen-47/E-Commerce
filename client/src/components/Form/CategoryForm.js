import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="form-field"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ marginBottom: "5px", height: "30px" }}
          />
        </div>

        <button type="submit" className="btn-btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
