import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { ProductService } from "../../services/product/ProductService";
import { Request, Response, NextFunction } from "express";
const responseObj = new ReponseMessage();
const productService = new ProductService();

export default class AuthController extends BaseController {

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info("Started Execution for getProducts ==>");
            responseObj.httpStatusCode = 200;
            responseObj.data = await productService.getProducts();
            BaseController.createResponse.success(res, responseObj);
        } catch (error) {
            logger.error(
                `Error in geting Products ${error}`
            );
            return next(error);
        }
    };

    async addProduct(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info(" Started Add Product");
             await productService.addProduct(req);
             responseObj.httpStatusCode = 200;
             responseObj.message = "Product Created Succesfully.";
             BaseController.createResponse.success(res, responseObj);
        } catch (error) {
            logger.error(error);
            return next(error);
        }
    };

}

