"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productInputSchema = void 0;
const zod_1 = require("zod");
exports.productInputSchema = zod_1.z.object({
    productName: zod_1.z.string().min(3).max(255),
    productQty: zod_1.z.number().min(0),
    productRate: zod_1.z.number(),
});
