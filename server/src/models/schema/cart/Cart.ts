import * as mongoose from 'mongoose';
import {ICart} from '../../interface/ICart';

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const Cart = mongoose.model<ICart & mongoose.Document>('carts', cartSchema);
export default Cart;