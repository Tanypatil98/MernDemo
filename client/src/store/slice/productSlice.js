import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";

export const getProductList = createAsyncThunk(
  "getProductList",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get("/product/getProducts");
      return response.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.post("/product/addProduct", data.data);
      console.log("response", response);
      if(response.status === 200){
        data.cb(null,response);
      }
      return response.message;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
    loader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loader = false;
      state.products = action.payload.data;
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
