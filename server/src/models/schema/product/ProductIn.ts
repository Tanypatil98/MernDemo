import * as mongoose from 'mongoose';
import {IProduct} from '../../interface/IProduct';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    unit_price:{
        type:Number,
        required:true,
    },
    
},
{ timestamps: true });

const Product = mongoose.model<IProduct & mongoose.Document>('Product', productSchema);
export default Product;