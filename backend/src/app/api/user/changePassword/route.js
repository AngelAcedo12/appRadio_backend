import { tokenDecrypter } from "@/app/utils/encrypterToken";
import userSchema from '../../../models/dbModels/user.js'
import { stat } from "fs";
import { comparePassword, encryptPassword } from '../../../utils/passwordEncrypter';


export async function PUT(request) {
    const {body} = await request.json()
    const {token, password} = body 

    if (token===undefined || token===null || token=="") {
        return new Response(JSON.stringify({status:false, message:"Error en token" }), {status: 403});
    }

    const userLogIn = await tokenDecrypter(token).then((res) => {
        return res.user;
    })

    if(userLogIn === undefined || userLogIn === null){
        return new Response(JSON.stringify({message: 'User not found'}), {status: 403});
    }
 
    const encryptedPassword = await encryptPassword(password).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err)
    }
    )

    const filter = {
        email: userLogIn.email
    }
 
    const update = {
        password: encryptedPassword
    }

    const userUpdate = await userSchema.findOneAndUpdate(filter,update,{new:true})
    .then((res) => {
        console.log(res,"userUpdate")
        return res;
    }).catch((err) => {
        console.log(err)
    })
  
    if(userUpdate === null || userUpdate === undefined){
        console.log("Error to update")
        return new Response(JSON.stringify({message: 'Error to update'}), {status: 403});
    }
    return new Response(JSON.stringify({message: 'Password updated',status: true}, {status: 200}));
    
}