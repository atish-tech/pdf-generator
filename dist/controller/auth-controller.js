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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
var client_1 = require("@prisma/client");
var __1 = require("..");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var userInput_1 = require("../zod/userInput");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register function
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, prisma, _b, _c, error_1;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                // If the name, email or password is invalid, return a 400 status code with a message
                if (userInput_1.registerInputSchema.safeParse({ name: name, email: email, password: password }).success === false) {
                    return [2 /*return*/, res.status(__1.ResponseStatus.BadRequest).json({ message: "Invalid input" })];
                }
                prisma = new client_1.PrismaClient();
                _f.label = 1;
            case 1:
                _f.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.users.findUnique({ where: { email: email } })];
            case 2:
                // If the email already exists, return a 400 status code with a message
                if (_f.sent())
                    return [2 /*return*/, res.status(__1.ResponseStatus.BadRequest).json({ message: "Email already exists" })];
                _c = (_b = prisma.users).create;
                _d = {};
                _e = {
                    name: name,
                    email: email
                };
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3: 
            // Create a new user with the name, email and password provided
            return [4 /*yield*/, _c.apply(_b, [(_d.data = (_e.password = _f.sent(),
                        _e),
                        _d)])];
            case 4:
                // Create a new user with the name, email and password provided
                _f.sent();
                // Return a 201 status code with a message
                return [2 /*return*/, res.status(__1.ResponseStatus.Created).json({ message: "Registration Sucess" })];
            case 5:
                error_1 = _f.sent();
                console.log("register", error_1);
                return [2 /*return*/, res.status(__1.ResponseStatus.Error).json({ message: "Error creating user", error: error_1 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
// Login function
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, prisma, user, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                // If the email or password is invalid, return a 400 status code with a message
                if (userInput_1.loginInputSchema.safeParse({ email: email, password: password }).success === false) {
                    return [2 /*return*/, res.status(__1.ResponseStatus.BadRequest).json({ message: "Invalid input" })];
                }
                prisma = new client_1.PrismaClient();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.users.findUnique({
                        where: {
                            email: email,
                        },
                    })];
            case 2:
                user = _b.sent();
                // If the user is not found, return a 400 status code with a message
                if (!user) {
                    return [2 /*return*/, res.status(__1.ResponseStatus.BadRequest).json({ message: "User not found" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                // Compare the password provided with the password in the database
                if (!(_b.sent())) {
                    return [2 /*return*/, res.status(__1.ResponseStatus.BadRequest).json({ message: "Invalid password" })];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
                // Return a 200 status code with a message and the token
                return [2 /*return*/, res.status(__1.ResponseStatus.Success).json({ message: "Login Success", token: token })];
            case 4:
                error_2 = _b.sent();
                console.log("login", error_2);
                return [2 /*return*/, res.status(__1.ResponseStatus.Error).json({ message: "Error logging in", error: error_2 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
