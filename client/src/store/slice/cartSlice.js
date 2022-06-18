import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authHeaders } from "../../helpers/axios";
//Action

//getCartList
export const getCartList = createAsyncThunk(
  "getCartList",
  async (thunkAPI) => {
    try {
      const response = await Axios.get('/cart/getCartList', authHeaders());
      console.log("getCartResponse", response.data);

      return response.data.data;
    } catch (error) {
      console.log("getCartError", error.response);
      // data.cb(null, error);
    }
  }
);

//addToCart
export const addToCart = createAsyncThunk(
  "addToCart",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.post("/cart/addToCart", data.data);
      console.log("addToCart", response);
      if (response.status === 200) {
         data.cb(null,response.data.message);
      }
      return response.message;
    } catch (error) {
      console.log("ERROR", error.response);
      return data.cb(null, error);
    }
  }
);

//createSlice

const initialState = {
  carts: [],
  total: null,
  loader: false,
  error: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    //getCartList
    builder.addCase(getCartList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getCartList.fulfilled, (state, action) => {
      state.loader = false;
      state.carts = action.payload.items;
      state.total = action.payload.subTotal;
    });
    builder.addCase(getCartList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //addToCart
    builder.addCase(addToCart.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});
export default cartSlice.reducer;
