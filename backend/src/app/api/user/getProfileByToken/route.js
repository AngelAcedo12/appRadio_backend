import { tokenDecrypter } from '@/app/utils/encrypterToken';
import { dbConnect } from '../../../config/mongodb'
import userSchema from '../../../models/dbModels/user'

await dbConnect()   

export async function POST(request){

    const data = await request.json();
    const token = data.body.token;

    if (token!==undefined || token!==null || token!=="") {
        const userByToken = await tokenDecrypter(token).then((res) => {
            console.log(res)
            return res.user;
        });

        const findUserInDb=  await userSchema.findOne({email: userByToken.email}).then((res) => {
            
            return res;
        })


    let response = new Response(JSON.stringify({status:true,profile:{
        name: findUserInDb.name,
        email: findUserInDb.email,
        imgProfile: findUserInDb.imgProfile,
        history: findUserInDb.historial
    }},200));

    return response


    }else{
        let response = new Response(JSON.stringify({status:false},403));
    
        return response
    }


}

