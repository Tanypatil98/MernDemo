import { Types } from 'mongoose';

export interface ICart {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
}