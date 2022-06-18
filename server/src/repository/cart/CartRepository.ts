import Cart from "../../models/schema/cart/Cart";


export class CartRepository {

    async findCarts() {
        return await Cart.find().populate("productId");
    }

    async addCart(payload: object) {
        return await Cart.create(payload);
    }

    async updateCart(id: string,payload: object) {
        return await Cart.findByIdAndUpdate(id,payload);
    }

}




