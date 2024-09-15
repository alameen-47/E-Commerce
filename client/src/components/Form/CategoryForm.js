import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form
        className="flex justify-between  flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className="form-field flex justify-between gap-3">
          <input
            type="text"
            className="form-control w-screen h-10 rounded-lg p-1"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-btn-primary rounded-lg h-10">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
