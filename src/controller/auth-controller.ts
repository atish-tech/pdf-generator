import { PrismaClient } from "@prisma/client";
import { ResponseStatus } from "..";
import encrypt from "bcryptjs";
import { loginInputSchema, registerInputSchema } from "../zod/userInput";
import jsonwebtoken from "jsonwebtoken";

// Register function
export const register = async (req: any, res: any) => {
    const { name, email, password } = req.body;   // Destructuring the name, email and password from the request body

    // If the name, email or password is invalid, return a 400 status code with a message
    if (registerInputSchema.safeParse({ name, email, password }).success === false) {
        return res.status(ResponseStatus.BadRequest).json({ message: "Invalid input" });
    }

    const prisma = new PrismaClient();   // Create a new PrismaClient instance
    try {
        // If the email already exists, return a 400 status code with a message
        if (await prisma.users.findUnique({ where: { email } }))
            return res.status(ResponseStatus.BadRequest).json({ message: "Email already exists" });

        // Create a new user with the name, email and password provided
        await prisma.users.create({
            data: {
                name,
                email,
                password: await encrypt.hash(password, 10)
            },
        });

        // Return a 201 status code with a message
        return res.status(ResponseStatus.Created).json({ message: "Registration Sucess" });
    } catch (error) {
        console.log("register", error);
        return res.status(ResponseStatus.Error).json({ message: "Error creating user", error });
    }
}

// Login function
export const login = async (req: any, res: any) => {
    const { email, password } = req.body;   // Destructuring the email and password from the request body

    // If the email or password is invalid, return a 400 status code with a message
    if (loginInputSchema.safeParse({ email, password }).success === false) {
        return res.status(ResponseStatus.BadRequest).json({ message: "Invalid input" });
    }
    
    // Create a new PrismaClient instance
    const prisma = new PrismaClient();

    try {
        // Find the user with the email provided
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });

        // If the user is not found, return a 400 status code with a message
        if (!user) {
            return res.status(ResponseStatus.BadRequest).json({ message: "User not found" });
        }

        // Compare the password provided with the password in the database
        if (!await encrypt.compare(password, user.password)) {
            return res.status(ResponseStatus.BadRequest).json({ message: "Invalid password" });
        }

        // grant a token to the user
        const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });

        // Return a 200 status code with a message and the token
        return res.status(ResponseStatus.Success).json({ message: "Login Success", token });
    } catch (error) {
        console.log("login", error);
        return res.status(ResponseStatus.Error).json({ message: "Error logging in", error });
    }
}