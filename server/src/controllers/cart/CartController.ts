import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { CartService } from "../../services/cart/CartService";
import { Request, Response, NextFunction } from "express";
const responseObj = new ReponseMessage();
const cartService = new CartService();

export default class CartController extends BaseController {

    async getCartList(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info("Started Execution for findCarts ==>");
            const carts = await cartService.getCartList(req);
            responseObj.httpStatusCode = 200;
            responseObj.message = "Cart list Succesfully.";
            responseObj.data = carts;
            BaseController.createResponse.success(res, responseObj);
        } catch (error) {
            logger.error(
                `Error in find carts ${error}`
            );
            return next(error);
        }
    };

    async addToCart(req: Request, res: Response, next: NextFunction) {

        try {
            logger.info("Started Execution for adding Cart ==>");
            await cartService.addToCart(req);
            responseObj.httpStatusCode = 200;
            responseObj.message = "Cart Created Succesfully.";
            BaseController.createResponse.success(res, responseObj);
        } catch (error) {
            logger.error(
                `Error in Adding Cart ${error}`
            );
            return next(error);
        }

    };
   
}

