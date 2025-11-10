import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import toast from "react-hot-toast";
import { createProduct } from "../redux/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.quantity
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!image) {
      toast.error("Please upload product image");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("image", image);

    try {
      await dispatch(createProduct(data)).unwrap();
      toast.success("Product created successfully!");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
      });
      setImage(null);
      setImagePreview(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error || "Failed to create product");
    }
  };

  return (
    <div className="w-[80%] max-w-[900px] mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md">
      <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-[600] text-[#454545] mb-6 sm:mb-8">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        <div>
          <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
            Product Title
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] sm:text-[15px] 
            outline-none focus:border-[#ff4141] transition-all"
          />
        </div>

        <div>
          <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write product description here..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] sm:text-[15px] 
            outline-none focus:border-[#ff4141] transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div>
            <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$0.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] sm:text-[15px] 
              outline-none focus:border-[#ff4141] transition-all"
            />
          </div>

          <div>
            <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
              Product Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] sm:text-[15px] 
              outline-none focus:border-[#ff4141] transition-all cursor-pointer bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[14px] sm:text-[15px] 
              outline-none focus:border-[#ff4141] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[15px] sm:text-[16px] font-[500] text-[#454545] mb-2">
            Product Image
          </label>
          <div className="relative">
            <label
              htmlFor="file-input"
              className="flex flex-col items-center justify-center w-full h-[200px] sm:h-[250px] border-2 
              border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ff4141] transition-all 
              bg-gray-50 hover:bg-gray-100"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain p-4"
                />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <FiUpload className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-gray-400" />
                  <p className="text-[14px] sm:text-[15px] text-gray-500 font-[500]">
                    Click to upload image
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-gray-400">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="file-input"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setImagePreview(null);
              }}
              className="mt-2 text-[13px] sm:text-[14px] text-red-500 hover:text-red-600 font-[500]"
            >
              Remove Image
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto sm:min-w-[200px] h-[50px] sm:h-[55px] mt-4 bg-[#ff4141] text-white 
          text-[15px] sm:text-[16px] font-[600] rounded-lg cursor-pointer hover:bg-[#e63939] transition-all 
          shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "ADDING..." : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
