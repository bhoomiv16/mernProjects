import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

let userSchema=new Schema({
    userName:{
        type:String,
        required:[true,"UserName field is required"]
    },
    email:{
        type:String,
        required:[true,"Email field is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password field is required"],
        minLength:[8,"Min length of characters is 8"]
    }

});

//pre-middleware given by mongoose
userSchema.pre("save",async function(next){
    let salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})


//methods-functions applied on instances of model
//statics - functions applied on model directly

userSchema.methods.verifyPassword=async function(pwd,pwdDb) {
    return await bcrypt.compare(pwd,pwdDb);
    
}



let userModel=model("userCollection",userSchema);

export default userModel;
