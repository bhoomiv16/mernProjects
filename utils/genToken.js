import jwt from 'jsonwebtoken'

export async function genToken(id){
    try {
         return jwt.sign({id:id},"TopSecret",{
            expiresIn:'1d'
         })
    } catch (error) {
        console.log(error);
    }

}
