import { ResponseStatus } from "..";
import { productInputSchema } from "../zod/productInput";
import { PrismaClient } from "@prisma/client";

export const addProduct = async (req: any, res: any) => {
    let {
        productRate,
        productQty,
        productName
    } = req.body;

    productQty = parseInt(productQty);
    productRate = parseInt(productRate);

    if (productInputSchema.safeParse({
        productName,
        productQty,
        productRate
    }).success === false) {
        return res.status(ResponseStatus.BadRequest).json({
            message: "Invalid input"
        });
    }

    const prisma = new PrismaClient();

    try {
        await prisma.product.create({
            data: {
                productName,
                productQty,
                productRate,
                userId: req.userId
            }
        });
        return res.status(ResponseStatus.Created).json({
            message: "Product added successfully"
        });
    } catch (error) {
        console.log("addProduct", error);
        return res.status(ResponseStatus.Error).json({
            message: "Error adding product",
            error
        });
    }
};

export const getProduct = async (req: any, res: any) => {
    const prisma = new PrismaClient();

    try {
        const products = await prisma.product.findMany({
            where: {
                userId: req.userId
            }
        });
        return res.status(ResponseStatus.Success).json(products);
    } catch (error) {
        console.log("getProduct", error);
        return res.status(ResponseStatus.Error).json({
            message: "Error getting product",
            error
        });
    }
};