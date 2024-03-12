import express from "express";
import { userMiddleware } from "../middleware/userMiddlerare";
import { addProduct, getProduct } from "../controller/product-controller";
const router = express.Router();

router.post("/create", userMiddleware , addProduct)
router.get("/get", userMiddleware , getProduct)


export default router;