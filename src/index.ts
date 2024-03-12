import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import productRoute from "./routes/product";
const app = express();

app.use(cors());
app.use(express.json());

export enum ResponseStatus {
    Success = 200,
    BadRequest = 400,
    Created = 201,
    NotFound = 404, 
    Error = 500
}

// default route
app.get("/", (req : any, res : any) => {
  res.status(ResponseStatus.Success).json({ message: "Hello World" });
});

app.use("/auth", authRouter);
app.use("/product", productRoute);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});