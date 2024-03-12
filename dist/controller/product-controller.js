"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.addProduct = void 0;
const __1 = require("..");
const productInput_1 = require("../zod/productInput");
const client_1 = require("@prisma/client");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { productRate, productQty, productName } = req.body;
    productQty = parseInt(productQty);
    productRate = parseInt(productRate);
    if (productInput_1.productInputSchema.safeParse({
        productName,
        productQty,
        productRate
    }).success === false) {
        return res.status(__1.ResponseStatus.BadRequest).json({
            message: "Invalid input"
        });
    }
    const prisma = new client_1.PrismaClient();
    try {
        yield prisma.product.create({
            data: {
                productName,
                productQty,
                productRate,
                userId: req.userId
            }
        });
        return res.status(__1.ResponseStatus.Created).json({
            message: "Product added successfully"
        });
    }
    catch (error) {
        console.log("addProduct", error);
        return res.status(__1.ResponseStatus.Error).json({
            message: "Error adding product",
            error
        });
    }
});
exports.addProduct = addProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const products = yield prisma.product.findMany({
            where: {
                userId: req.userId
            }
        });
        return res.status(__1.ResponseStatus.Success).json(products);
    }
    catch (error) {
        console.log("getProduct", error);
        return res.status(__1.ResponseStatus.Error).json({
            message: "Error getting product",
            error
        });
    }
});
exports.getProduct = getProduct;
