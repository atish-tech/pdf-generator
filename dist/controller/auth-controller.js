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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const __1 = require("..");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userInput_1 = require("../zod/userInput");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register function
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body; // Destructuring the name, email and password from the request body
    // If the name, email or password is invalid, return a 400 status code with a message
    if (userInput_1.registerInputSchema.safeParse({ name, email, password }).success === false) {
        return res.status(__1.ResponseStatus.BadRequest).json({ message: "Invalid input" });
    }
    const prisma = new client_1.PrismaClient(); // Create a new PrismaClient instance
    try {
        // If the email already exists, return a 400 status code with a message
        if (yield prisma.users.findUnique({ where: { email } }))
            return res.status(__1.ResponseStatus.BadRequest).json({ message: "Email already exists" });
        // Create a new user with the name, email and password provided
        yield prisma.users.create({
            data: {
                name,
                email,
                password: yield bcryptjs_1.default.hash(password, 10)
            },
        });
        // Return a 201 status code with a message
        return res.status(__1.ResponseStatus.Created).json({ message: "Registration Sucess" });
    }
    catch (error) {
        console.log("register", error);
        return res.status(__1.ResponseStatus.Error).json({ message: "Error creating user", error });
    }
});
exports.register = register;
// Login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // Destructuring the email and password from the request body
    // If the email or password is invalid, return a 400 status code with a message
    if (userInput_1.loginInputSchema.safeParse({ email, password }).success === false) {
        return res.status(__1.ResponseStatus.BadRequest).json({ message: "Invalid input" });
    }
    // Create a new PrismaClient instance
    const prisma = new client_1.PrismaClient();
    try {
        // Find the user with the email provided
        const user = yield prisma.users.findUnique({
            where: {
                email,
            },
        });
        // If the user is not found, return a 400 status code with a message
        if (!user) {
            return res.status(__1.ResponseStatus.BadRequest).json({ message: "User not found" });
        }
        // Compare the password provided with the password in the database
        if (!(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(__1.ResponseStatus.BadRequest).json({ message: "Invalid password" });
        }
        // grant a token to the user
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
        // Return a 200 status code with a message and the token
        return res.status(__1.ResponseStatus.Success).json({ message: "Login Success", token });
    }
    catch (error) {
        console.log("login", error);
        return res.status(__1.ResponseStatus.Error).json({ message: "Error logging in", error });
    }
});
exports.login = login;
