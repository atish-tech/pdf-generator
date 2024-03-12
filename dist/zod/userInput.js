"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInputSchema = exports.registerInputSchema = void 0;
const zod_1 = require("zod");
exports.registerInputSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.loginInputSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string(),
});
