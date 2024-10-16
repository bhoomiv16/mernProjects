import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
// import userModel from "../../authentication/model/userModel.js";


//multer for image

export async function auth(req, res, next) {
  try {
    //     let token;
    //    if( req.headers.authorization?.startsWith("Bearer")){
    //         token= req.headers.authorization.split(" ")[1]
    //     }
    //     let decodedToken=await jwt.verify(token,"TopSecret")
    //     const  user=await userModel.findById(decodedToken.id)
    //        req.user=user?._id;
    //                   next()
    let token;
    if (req.cookies.token?.startsWith("Bearer")) {
      token = req.cookies.token.split(" ")[1];
    }
    let decodedToken = await jwt.verify(token, "TopSecret");
    const user = await userModel.findById(decodedToken.id);
    req.user = user?._id;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
}
