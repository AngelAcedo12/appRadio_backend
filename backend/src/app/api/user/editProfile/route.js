import { tokenDecrypter } from "@/app/utils/encrypterToken";
import { dbConnect } from "../../../config/mongodb";
import userSchema from '../../../models/dbModels/user'





await dbConnect();

export async function PUT(request) {

    const {body} = await request.json()
    const {token,name,imgProfileSelected} = body

    if (token===undefined || token===null || token=="") {
        return new Response(JSON.stringify({status:false, message:"Error en token" }), {status: 403});
    }
    
    const userLogIn = await tokenDecrypter(token).then((res) => {
        return res.user;
    })

    const filter = {
        email: userLogIn.email
    }
    console.log(imgProfileSelected)
    const update = {
        name: name,
        imgProfile: imgProfileSelected,
       
    }
    
    const userUpdate = await userSchema.findOneAndUpdate(filter,update,{new:true}).then((res) => {
        
        return res
    }).catch((err) => {
        console.log(err)
    })

    if(userUpdate === null || userUpdate === undefined){
        console.log("Error to update")
        return new Response(JSON.stringify({message: 'Error to update'}), {status: 403});
    }
    return new Response(JSON.stringify({message: 'User updated',status: true}, {status: 200}));


}
