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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.create({
        data: {
            name,
            email,
            password
        }
    });
    console.log(user);
});
const updateUser = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.update({
        where: { id },
        data: { name }
    });
    console.log(user);
});
const addTodo = (userId, task) => __awaiter(void 0, void 0, void 0, function* () {
    const temp = yield prisma.todos.create({
        data: {
            userId, task
        }
    });
    console.log(temp);
});
const getAllTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todos.findMany({
        where: { task: "Revise SQL" }
    });
    console.log(todos);
});
// register("raj", "raj@gmail.com", "code");
// updateUser(1 , "raj Atish");
// addTodo(1 , "Revise SQL");
getAllTodo(4);
