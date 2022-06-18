import { ProductRepository } from "../../repository/product/ProductRepository";
import AppError from "../../core/utility/AppError";
import logger from "../../core/Logger";
import Product from "../../models/schema/product/ProductIn";
import ReponseMessage from "../../core/utility/ReponseMessage";
const responseObj = new ReponseMessage();
const productRepo = new ProductRepository();

export class ProductService {

    async addProduct(req: any) {
        try {

            const { name, description, quantity, unit_price } = req.body;
                let identifiedProduct;
                try {
                    identifiedProduct = await productRepo.findProduct({ name: name });
                }
                catch (err) {
                    responseObj.httpStatusCode = 401;
                    responseObj.message = "something went wrong.";

                    throw new AppError(responseObj.message);
                }

                if (identifiedProduct) {
                    responseObj.httpStatusCode = 401;
                    responseObj.message = "Product name is Already registered.";

                    throw new AppError(responseObj.message);
                }
                try {
                
                const createdProduct = new Product({
                        name,
                        image: req.file.path.split("\\").join("/"),
                        description,
                        quantity: parseInt(quantity),
                        unit_price: parseInt(unit_price)
                    });
                
                    await createdProduct.save();

                }
                catch (err) {
                    logger.error("err1");
                    throw new AppError(err);
                }
        } catch (error) {
            logger.error(`Error in add prodct method of ProductService ${error}`);
            throw error;
        }
    }

    async getProducts() {
        try {
            return await productRepo.findAllProduct();
        } catch (error) {
            throw new AppError(error);
        }
    };

   
}
