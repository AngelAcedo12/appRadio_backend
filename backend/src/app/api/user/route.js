
import {dbConnect} from '../../config/mongodb'
import user from '../../models/dbModels/user'
import {tokenEncrypter} from "../../utils/encrypterToken";
await dbConnect();


async function GET (request) {
   
    const url = await request.url;
    const urlParams = new URL(url).searchParams.toString().split('&')
    const params = urlParams[0].split("=")
    const name = params[1]
    console.log(name)
    const result = await user.find({name:name}).then((user) => {
        
        return {
            status: true,
            message: 'User found',
            user: user
        }
    }).catch((error) => {
        return {
            status: false,
            message: 'User not found',
            error: error
        }
    })
    if(user.status === false){
        return new Response(JSON.stringify(result));
    }
    const token = tokenEncrypter(result.user);
    const response = new Response(JSON.stringify(result));
    response.headers.set('token', token);
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
    response.headers.set('token', token);   


    return response;

}





export {
    GET,POST
}