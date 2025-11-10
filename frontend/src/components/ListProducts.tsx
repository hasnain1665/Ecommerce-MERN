import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { FiEdit2, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { deleteProduct, Product, updateProduct } from "../redux/productSlice";
import toast from "react-hot-toast";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const ListProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allProducts, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      category: product.category.name,
    });
    console.log(product.image);
    setImagePreview(product.image);
    setNewImage(null);
    setShowEditModal(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
      console.log(file);
    }
    console.log(imagePreview);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.name ||
      !editFormData.description ||
      !editFormData.price ||
      !editFormData.category ||
      !editFormData.quantity
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("description", editFormData.description);
    formData.append("price", editFormData.price);
    formData.append("category", editFormData.category);
    formData.append("quantity", editFormData.quantity);

    if (newImage) {
      formData.append("image", newImage);
    }
    dispatch(
      updateProduct({ productId: selectedProduct?._id, formData })
    ).unwrap();
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedProduct?._id) {
      toast.error("No product selected");
      return;
    }

    dispatch(deleteProduct({ productId: selectedProduct?._id }));
    toast.success("Product deleted successfully");
    setShowDeleteModal(false);
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
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
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-[600] text-[#454545]">
          All Products
        </h1>
        <p className="text-[14px] sm:text-[15px] text-gray-600">
          Total: {allProducts.length} products
        </p>
      </div>

      {allProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-[16px] text-gray-600">No products found</p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-[14px] font-[600] text-[#454545]">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-[14px] font-[600] text-[#454545]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-[14px] font-[600] text-[#454545]">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-[14px] font-[600] text-[#454545]">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-[14px] font-[600] text-[#454545]">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-center text-[14px] font-[600] text-[#454545]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={`${baseURL}${product.image}`}
                        alt={product.name}
                        className="w-[60px] h-[60px] object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-[500] text-[#454545] line-clamp-2 max-w-[300px]">
                        {product.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-[13px] font-[500] text-[#454545] rounded-full">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[15px] font-[600] text-[#ff4141]">
                        ${product.price}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-[500] text-[#454545]">
                        {product.quantity}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit2 className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
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
            {allProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  <img
                    src={`${baseURL}${product.image}`}
                    alt={product.name}
                    className="w-[80px] h-[80px] object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-[14px] font-[500] text-[#454545] line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[16px] font-[600] text-[#ff4141] mb-1">
                      ${product.price}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-[11px] font-[500] text-[#454545] rounded-full">
                        {product.category.name}
                      </span>
                      <span className="text-[12px] text-gray-600">
                        Qty: {product.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 bg-blue-50 rounded-lg text-[13px] font-[500] hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    <FiEdit2 className="w-[14px] h-[14px]" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
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
                Edit Product
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
                    Product Image
                  </label>
                  <div className="relative">
                    <label
                      htmlFor="edit-file-input"
                      className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ff4141] transition-all bg-gray-50 hover:bg-gray-100"
                    >
                      {imagePreview ? (
                        <img
                          src={
                            imagePreview.startsWith("blob:")
                              ? imagePreview
                              : `${baseURL}${imagePreview}`
                          }
                          alt="Preview"
                          className="max-h-full max-w-full object-contain p-4"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <FiUpload className="w-[40px] h-[40px] text-gray-400" />
                          <p className="text-[14px] text-gray-500 font-[500]">
                            Click to upload new image
                          </p>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      id="edit-file-input"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  {newImage && (
                    <p className="text-[12px] text-green-600 mt-2">
                      New image selected: {newImage.name}
                    </p>
                  )}
                  {!newImage && imagePreview && (
                    <p className="text-[12px] text-gray-500 mt-2">
                      Current image will be kept if no new image is selected
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[14px] font-[500] text-[#454545] mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#ff4141] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-[500] text-[#454545] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#ff4141] transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-[500] text-[#454545] mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#ff4141] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-[500] text-[#454545] mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#ff4141] transition-all"
                    />
                  </div>
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
                Delete Product
              </h2>
              <p className="text-[14px] text-gray-600 text-center mb-4">
                Are you sure you want to delete "{selectedProduct?.name}"? This
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

export default ListProducts;
