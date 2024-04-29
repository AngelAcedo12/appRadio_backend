import { dbConnect } from "../../../../config/mongodb";
import { tokenDecrypter } from "../../../../utils/encrypterToken";
import userSchema from '../../../../models/dbModels/user'

export async function POST(request) {   

    const {headers} = await request.json();
    console.log(headers)
    const token = headers.Authorization

    const user = await tokenDecrypter(token).then((res) => {
        console.log(res)
        return res.user;
    }
    );
    if(user === undefined || user === null){
        return new Response(JSON.stringify({message: 'User not found'}), {status: 403});
    }
    const userFound = await userSchema.findOne({email: user.email}).then((res) => {
        return res;
    }
    ).catch((error) => {
        return error;
    })
    if(userFound.historial === null || userFound.historial === undefined){
        return new Response(JSON.stringify({message: 'History not found'}), {status: 403});
    }
    return new Response(JSON.stringify({data: userFound.historial}), {status: 200});


}