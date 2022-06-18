import express from "express";
const fileUpload = require("../../core/middleware/file-upload");
import ProductController from "../../controllers/product/ProductController";

export class ProductRoutes {
        static configureRoutes() {
                const controller = new ProductController();
                const router = express.Router();
                router.post("/addProduct", fileUpload.single('image'), controller.addProduct);
                router.get("/getProducts", controller.getProducts);
                return router;
        }
}