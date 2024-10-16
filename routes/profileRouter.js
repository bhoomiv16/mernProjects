import { Router } from "express";
import { auth } from "../middleware/auth.js";
import userModel from "../model/userModel.js";
let router =Router();

router.get("/",auth,async (req,res,next)=>{
    let user=await userModel.findById(req.user)
    res.send(`hello ${user.userName} this is profile route`)


})
export default router;