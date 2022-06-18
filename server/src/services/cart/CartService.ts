import { CartRepository } from "../../repository/cart/CartRepository";
import { ProductRepository } from "../../repository/product/ProductRepository";
import AppError from "../../core/utility/AppError";
import logger from "../../core/Logger";
import ReponseMessage from "../../core/utility/ReponseMessage";
const responseObj = new ReponseMessage();
const cartRpo = new CartRepository();
const productRpo = new ProductRepository();

export class CartService {
    async addToCart (req: any) {
        try {
            const {
                productId
            } = req.body;
            const quantity = Number.parseInt(req.body.quantity);
            let cartDetails:any = await cartRpo.findCarts();
            logger.info(cartDetails)
            let productDetails = await productRpo.findProduct({ _id : productId });
                 if (!productDetails) {
                    responseObj.httpStatusCode = 500;
                    responseObj.message = "something went wrong.Could not found Product.";
                    throw new AppError(responseObj.message);
                }
            
            if (cartDetails) {
                
                const indexFound = cartDetails.findIndex(item => item.productId._id == productId);
                if (indexFound !== -1 && quantity <= 0) {
                    cartDetails.splice(indexFound, 1);
                    await cartDetails.save();
                } else if (indexFound !== -1) {
                    const cartData = {
                        quantity: quantity,
                        price: productDetails.unit_price,
                        total: productDetails.unit_price * quantity
                    }
                    await cartRpo.updateCart(cartDetails[indexFound]._id,cartData);
                } else if (quantity > 0) {
                    const cartData = {
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.unit_price,
                        total: productDetails.unit_price * quantity
                    }
                    await cartRpo.addCart(cartData);
                } else {
                    responseObj.httpStatusCode = 400;
                    responseObj.message = "Invalid Request.";
                    throw new AppError(responseObj.message);
                }
            } else {
                const cartData = {
                        productId: productId,
                        quantity: quantity,
                        total: productDetails.unit_price * quantity,
                        price: productDetails.unit_price
                }
                await cartRpo.addCart(cartData);
            }
           return true;
        
        }
        catch(err){
            logger.error(err);
            responseObj.httpStatusCode = 500;
            responseObj.message = "Creating Video failed.Please try again.";
            throw new AppError(responseObj.message);
        }
    }

    async getCartList (req: any) {
        try {
            logger.info("Started Execution for findVideos ==>");
        
            let carts = await cartRpo.findCarts();
            let subTotal = carts.map(item => item.total).reduce((acc, next) => acc + next);
            return { items: carts, subTotal: subTotal};
        } catch (error) {
            logger.error(
                `Error in findVideos method of VideoService ${error}`
            );
            throw error;
        }
    }

}