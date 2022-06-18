import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import productSlice from "./slice/productSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
