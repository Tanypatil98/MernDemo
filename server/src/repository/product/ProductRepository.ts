import  Product  from "../../models/schema/product/ProductIn";

export class ProductRepository {

    async findProduct(condition: any) {
        return await Product.findOne(condition);
    }

    async findAllProduct() {
        return await Product.find();
    }

}




