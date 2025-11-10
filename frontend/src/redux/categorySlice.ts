import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../api";
import { AppDispatch } from "./store";

export interface Category {
  _id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchAllCategories = createAsyncThunk<
  { categories: Category[] },
  void,
  { rejectValue: string }
>("categories/fetchAllCategories", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get("/category/get");
    return { categories: data.categories };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
});

export const createCategory = createAsyncThunk<
  { category: Category },
  { name: string },
  { rejectValue: string }
>("categories/createCategory", async ({ name }, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/category/create", { name });
    return { category: data.category };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create category"
    );
  }
});

export const updateCategory = createAsyncThunk<
  Category,
  {
    categoryId: string | undefined;
    name: string;
  },
  { rejectValue: string }
>(
  "categories/updateCategory",
  async ({ categoryId, name }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/category/update/${categoryId}`, {
        name,
      });
      return data.category;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk<
  void,
  { categoryId: string | undefined },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "categories/deleteCategory",
  async ({ categoryId }, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/category/delete/${categoryId}`);
      dispatch(fetchAllCategories());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (cat) => cat._id === updatedCategory._id
        );

        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default categorySlice.reducer;
