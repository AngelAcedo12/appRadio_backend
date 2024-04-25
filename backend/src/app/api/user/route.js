
import {dbConnect} from '../../config/mongodb'
import user from '../../models/dbModels/user'
import {tokenEncrypter} from "../../utils/encrypterToken";
import { decodeUrl } from '../../utils/UrlDecode';
await dbConnect();


async function GET (request) {
   
    const url = await request.url;
    const urlParams = new URL(url).searchParams.toString().split('&')
    const paramsEmail = urlParams[0].split("=")
    const paramsPassword = urlParams[1].split("=")
    const email = decodeUrl(paramsEmail[1]) 
    const password = paramsPassword[1]
    
  
    const queryBody = {
        email:email
    }
    console.log(queryBody)
    const result = await user.findOne(queryBody).then(res => {
        
        if(res.password===password){

            return {
                status: true,
                message: 'User found',
                user: res
            }
        }else{
            return {
                status: false,
                message: 'Password incorrect',
                user:{}
            }
        }

    }).catch((error) => {
        return {
            status: false,
            message: 'User not found',
            error: error
        }
    })

    if(user.status === false){
        const response = new Response(JSON.stringify(result))
        response.headers.set('Content-Type', 'application/json');
        return response;
    }

    const token = tokenEncrypter(result.user);
    const response = new Response(JSON.stringify(result));
    response.headers.set('oauth-token-app-radio', token);
    response.headers.set('Content-Type', 'application/json');
    return response;
}

async function POST (request) {

    const body = await request.json();
    const result = await user.create(body).then(() =>{
        return {
            status: true,
            message: 'User created' 
        }
    } ).catch((error) => {

        return {
            status: false,
            message: "Failed to create user",
            error: error    
        }
    });
    if(result.status === false){
        const newRespose = new Response(JSON.stringify(result));
        return newRespose;
    }
    const token = tokenEncrypter(body);
    const response = new Response(JSON.stringify(result));
    response.headers.set('oauth-token-app-radio', token);   


    return response;

}





export {
    GET,POST
}