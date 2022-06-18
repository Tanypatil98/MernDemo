import express from "express";
import CartController from "../../controllers/cart/CartController";

export class CartRoutes {
        static configureRoutes() {
                const controller = new CartController();
                const router = express.Router();
                router.post("/addToCart",  controller.addToCart);
                router.get("/getCartList",  controller.getCartList);
                return router;
        }
}