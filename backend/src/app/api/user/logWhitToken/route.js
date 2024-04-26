import {dbConnect} from "../../../config/mongodb";
import user from '../../../models/dbModels/user'
import {tokenDecrypter} from "../../../utils/encrypterToken";

await dbConnect();
async function POST (request) {

    const data = await request.json();
    const token = data.token;

    if (token!==undefined || token!==null || token!=="") {
        const userLogIn = await tokenDecrypter(token).then((res) => {
     
            return res.user;
        });
        const findUserInDb=  await user.findOne({email: userLogIn.email}).then((res) => {
    
            return res;
        })
        

        if(findUserInDb.name===userLogIn.name && findUserInDb.email===userLogIn.email ){
            let response = new Response(JSON.stringify({status:true},200));
            return response;
        }
        let response = new Response(JSON.stringify({status:true},200));
        return response
    } else {
        let response = new Response(JSON.stringify({status:false},403));
    
        return response
    }


}
export{ 
    POST
}