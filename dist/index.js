"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = __importDefault(require("./routes/auth"));
var product_1 = __importDefault(require("./routes/product"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Success"] = 200] = "Success";
    ResponseStatus[ResponseStatus["BadRequest"] = 400] = "BadRequest";
    ResponseStatus[ResponseStatus["Created"] = 201] = "Created";
    ResponseStatus[ResponseStatus["NotFound"] = 404] = "NotFound";
    ResponseStatus[ResponseStatus["Error"] = 500] = "Error";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
// default route
app.get("/", function (req, res) {
    res.status(ResponseStatus.Success).json({ message: "Hello World" });
});
app.use("/auth", auth_1.default);
app.use("/product", product_1.default);
app.listen(8000, function () {
    console.log("Server is running on port 8000");
});
// "start": "nodemon --exec ts-node src/index.ts"
