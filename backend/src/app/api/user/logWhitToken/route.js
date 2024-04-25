import {dbConnect} from "../../../config/mongodb";
import user from '../../../models/dbModels/user'
import {tokenDecrypter} from "../../../utils/encrypterToken";

await dbConnect();
async function POST (request) {

    const data = await request.json();
    const token = data.token;
    console.log(data, "DATA")
    console.log(token)
    if (token!==undefined || token!==null || token!=="") {

        const userLogIn = await tokenDecrypter(token).then((res) => {
            console.log(res, "userLogIN"); return user;
        });
        const result = await user.findOne({email: user.email}).then((res) => {
            return res;
        })
        console.log(result)
        console.log(userLogIn)
        if(result){
            let response = new Response(JSON.stringify({status:true}));
            return response;
        }
        let response = new Response(JSON.stringify({status:true}));
        return response
    } else {
        let response = new Response(JSON.stringify({status:false}));
        console.log(response, "response")
        return response
    }


}
export{ 
    POST
}