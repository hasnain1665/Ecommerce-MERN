import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import toast from "react-hot-toast";
import { createCategory } from "../redux/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.categories);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please provide the category name");
      return;
    }

    try {
      await dispatch(createCategory({ name })).unwrap();
      toast.success("Category created successfully!");

      setName("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error || "Failed to create category");
    }
  };
  return (
    <div className="w-[50%] max-w-[900px] mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md">
      <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-[600] text-[#454545] mb-6 sm:mb-8">
        Add New Category
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        <div>
          <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] sm:text-[15px] 
            outline-none focus:border-[#ff4141] transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto sm:min-w-[200px] h-[50px] sm:h-[55px] mt-4 bg-[#ff4141] text-white 
          text-[15px] sm:text-[16px] font-[600] rounded-lg cursor-pointer hover:bg-[#e63939] transition-all 
          shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "ADDING..." : "ADD CATEGORY"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
