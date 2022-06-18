import { IProduct } from "../../interface/IProduct";
import mongoose, { Document, Schema } from "mongoose";
import { productCollection } from "../../../constants/CollectionConstants";

export const ProductSchema = new Schema({
    name: String,
    image: String,
    description: String,
    quantity: Number,
    unit_price: Number,
});

export type ProductDocument = Document & IProduct;

export const product = mongoose.model<ProductDocument>(productCollection, ProductSchema);
