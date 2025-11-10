import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  Category,
  deleteCategory,
  updateCategory,
} from "../redux/categorySlice";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const ListCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editName, setEditName] = useState("");

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setShowEditModal(true);
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName) {
      toast.error("Please enter name");
      return;
    }

    dispatch(
      updateCategory({ categoryId: selectedCategory?._id, name: editName })
    );
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedCategory?._id) {
      toast.error("No Category selected");
      return;
    }

    dispatch(deleteCategory({ categoryId: selectedCategory?._id }));
    toast.success("Category deleted successfully");
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ff4141] rounded-full animate-spin"></div>
          <p className="text-[16px] text-gray-600 font-[500]">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-[600] text-[#454545]">
          All Categories
        </h1>
        <p className="text-[14px] sm:text-[15px] text-gray-600">
          Total: {categories.length} categories
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-[16px] text-gray-600">No category found</p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block lg:justify-center bg-white rounded-lg shadow-md overflow-hidden ">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-[14px] font-[600] text-[#454545]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-right text-[14px] font-[600] text-[#454545]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-[500] text-[#454545] line-clamp-2 max-w-[300px]">
                        {category.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit2 className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(category)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="text-[14px] font-[500] text-[#454545] line-clamp-2 mb-2">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 bg-blue-50 rounded-lg text-[13px] font-[500] hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    <FiEdit2 className="w-[14px] h-[14px]" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 bg-red-50 rounded-lg text-[13px] font-[500] hover:bg-red-100 transition-all cursor-pointer"
                  >
                    <FiTrash2 className="w-[14px] h-[14px]" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-[20px] font-[600] text-[#454545]">
                Edit Category
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <FiX className="w-[20px] h-[20px]" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[14px] font-[500] text-[#454545] mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#ff4141] transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 text-[#454545] rounded-lg font-[500] hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#ff4141] text-white rounded-lg font-[500] hover:bg-[#e63939] transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-[450px] w-full">
            <div className="p-6">
              <div className="w-[60px] h-[60px] bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-[28px] h-[28px] text-red-600" />
              </div>
              <h2 className="text-[20px] font-[600] text-[#454545] text-center mb-2">
                Delete Category
              </h2>
              <p className="text-[14px] text-gray-600 text-center mb-4">
                Are you sure you want to delete "{selectedCategory?.name}"? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 text-[#454545] rounded-lg font-[500] hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-[500] hover:bg-red-700 transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCategories;
