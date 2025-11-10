import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api";
import { AppDispatch } from "./store";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: { _id: string; name: string };
  quantity: number;
}

interface ProductState {
  allProducts: Product[];
  product: Product | undefined;
  totalPages: number | null;
  totalProducts: number;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  product: undefined,
  totalPages: null,
  totalProducts: 0,
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk<
  { allProducts: Product[] },
  void,
  { rejectValue: string }
>("allProducts/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get("/product/get-all");
    return { allProducts: data.products };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
});

export const fetchSingleProduct = createAsyncThunk<
  { product: Product },
  {
    productId: string | undefined;
  },
  { rejectValue: string }
>("product/fetchSingleProduct", async ({ productId }, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/product/get-single/${productId}`);
    return { product: data.product };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
});

export const fetchProducts = createAsyncThunk<
  { products: Product[]; totalPages: number; totalProducts: number },
  { limit: string; pageNumber: string; category: string },
  { rejectValue: string }
>(
  "products/fetchProducts",
  async ({ limit, pageNumber, category }, { rejectWithValue }) => {
    try {
      const { data } = await API.get(
        `/product/products/${category}?limit=${limit}&page=${pageNumber}`
      );
      return {
        products: data.products,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const createProduct = createAsyncThunk<
  { product: Product },
  FormData,
  { rejectValue: string }
>("product/createProduct", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/product/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { product: data.product };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create product"
    );
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  {
    productId: string | undefined;
    formData: FormData;
  },
  { rejectValue: string }
>(
  "product/updateProduct",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/product/update/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.updatedProduct;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk<
  void,
  { productId: string | undefined },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "product/deleteProduct",
  async ({ productId }, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/product/delete/${productId}`);
      dispatch(fetchAllProducts());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.allProducts;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.allProducts.findIndex(
          (prod) => updatedProduct._id === prod._id
        );
        if (index !== -1) {
          state.allProducts[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
