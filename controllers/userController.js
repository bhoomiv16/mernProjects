import userModel from "../models/userModel.js";
import { genToken } from "../utils/genToken.js";

export let register = async (req, res, next) => {
  let { userName, email, password } = req.body;

  // console.log(existingEmail);
  
  try {
    let existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User is already registered,Please Login" });
    }

    let newUser = await userModel.create({
      userName: userName,
      email: email,
      password: password,
    });
    let token = await genToken(newUser._id);
    res.cookie("token",`Bearer ${token}`,{
      maxAge:60*60*24*1000,
      httpOnly:true
    })
    
    
    

    // res.status(201).json({
    //   data: { name: newUser.userName, email: newUser.email },
    //   token,
    //   status: "Registered user successfully",
    // });
    res.status(200).redirect("/api/v1/todo")

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export let login = async (req, res, next) => {
  let { email, password } = req.body;
  // console.log(existingUser);
  
  try {
    let existingUser = await userModel.findOne({ email });
    if (
      !existingUser ||
      !(await existingUser.verifyPassword(password, existingUser.password))
    ) {
      return res
        .status(400)
        .json({ message: "User doesn't exist or incorrect password" });
    }
    let token = await genToken(existingUser._id);
    res.cookie("token",`Bearer ${token}`,{
      maxAge:60*60*24*1000,
      httpOnly:true
    })

    // res.status(201).json({
    //   data: { name: existingUser.userName, email: existingUser.email },
    //   token,
    //   status: "User logged in successfully",
    // });
    // res.status(200).render("home",{todos:todos})
    res.status(200).redirect("/api/v1/todo")

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export let renderIndex = async (req, res, next) => {
  try {
    res.status(200).render("index.ejs");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export let renderRegister =  (req, res, next) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export let renderlogin = async (req, res, next) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const logout=(req,res,next)=>{
  res.clearCookie("token")
  res.redirect("/api/v1/user/login")
}