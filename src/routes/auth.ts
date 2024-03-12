import express from "express";
import { login, register } from "../controller/auth-controller";
// import { register } from "module";

const router = express.Router();

router.post("/register", register );
router.post("/login", login);


export default router;