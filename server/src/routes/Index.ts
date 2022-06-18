import express from "express";
import { ProductRoutes } from "./product/ProductRoutes";
import { CartRoutes } from "./cart/CartRoutes";

export class RouteBinder {
    static bindRoutes() {
        const router = express.Router();
        // @** attach route guard i.e access restriction based on module level.
        router.use("/product", ProductRoutes.configureRoutes());
        router.use("/cart", CartRoutes.configureRoutes());
        return router;
    }
}
