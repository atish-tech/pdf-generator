"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userMiddlerare_1 = require("../middleware/userMiddlerare");
var product_controller_1 = require("../controller/product-controller");
var router = express_1.default.Router();
router.post("/create", userMiddlerare_1.userMiddleware, product_controller_1.addProduct);
router.get("/get", userMiddlerare_1.userMiddleware, product_controller_1.getProduct);
exports.default = router;
