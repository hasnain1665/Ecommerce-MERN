import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";
import { API } from "../api";
import { AppDispatch } from "./store";

export interface Cart {
  product: Product;
  cartQuantity: number;
}

export interface CartState {
  cartItems: Cart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchAllItems = createAsyncThunk<
  { cartItems: Cart[] },
  void,
  { rejectValue: string }
>("cart/fetchAllItems", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get("/cart/get-all");
    console.log(data.allItems);
    return { cartItems: data.allItems };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch items"
    );
  }
});

export const updateItem = createAsyncThunk<
  Cart,
  {
    productId: string | undefined;
    cartQuantity: number;
  },
  { rejectValue: string }
>(
  "cart/updateItem",
  async ({ productId, cartQuantity }, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/cart/update-cart", {
        productId,
        cartQuantity,
      });
      return data.Item;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update item"
      );
    }
  }
);

export const removeItem = createAsyncThunk<
  void,
  { productId: string | undefined },
  { rejectValue: string; dispatch: AppDispatch }
>("cart/removeItem", async ({ productId }, { rejectWithValue, dispatch }) => {
  try {
    await API.delete("/cart/remove-item", {
      data: { productId },
    });
    dispatch(fetchAllItems());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to remove item"
    );
  }
});

export const addItem = createAsyncThunk<
  void,
  { productId: string | undefined; cartQuantity: number },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "cart/addItem",
  async ({ productId, cartQuantity }, { rejectWithValue, dispatch }) => {
    try {
      await API.post("/cart/add", {
        productId,
        cartQuantity,
      });

      dispatch(fetchAllItems());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.cartItems;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCartItem = action.payload;
        const index = state.cartItems.findIndex(
          (item) => item.product._id === updatedCartItem.product._id
        );
        if (index !== -1) {
          state.cartItems[index] = updatedCartItem;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default cartSlice.reducer;
