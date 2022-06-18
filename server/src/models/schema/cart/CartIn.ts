import { ICart } from "../../interface/ICart";
import mongoose, { Document, Schema } from "mongoose";
import { cartCollection } from "../../../constants/CollectionConstants";

export const cartSchema = new Schema({
    productId: Schema.Types.ObjectId,
    quantity: Number,
    price: Number,
    total: Number,
});

export type CartDocument = Document & ICart;

export const cart = mongoose.model<CartDocument>(cartCollection, cartSchema);
