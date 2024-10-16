import { Router } from "express";
import { login, logout, register, renderIndex, renderlogin, renderRegister } from "../controllers/userController.js";

let router=Router();

//rendering pages
router.get("/",renderIndex)
router.get("/register",renderRegister)
router.get("/login",renderlogin)
//handle login and register
router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)

export default router;