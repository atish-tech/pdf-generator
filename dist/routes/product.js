"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userMiddlerare_1 = require("../middleware/userMiddlerare");
const product_controller_1 = require("../controller/product-controller");
const router = express_1.default.Router();
router.post("/create", userMiddlerare_1.userMiddleware, product_controller_1.addProduct);
router.get("/get", userMiddlerare_1.userMiddleware, product_controller_1.getProduct);
exports.default = router;
