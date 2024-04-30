import { dbConnect } from "../../../config/mongodb";
import { tokenDecrypter } from "../../../utils/encrypterToken";
import userSchema from '../../../models/dbModels/user'
await dbConnect();





export async function POST(request) {


    const {headers,body} = await request.json();
    const token = headers.Authorization 
    const user = await tokenDecrypter(token).then((res) => {
    
        return res.user;
    });

    if(body.history.data === undefined || body.history.data === null){
        return new Response(JSON.stringify({message: 'Error to add'}), {status: 403});
    }



    if(user === undefined || user === null){
        return new Response(JSON.stringify({message: 'User not found'}), {status: 403});
    }else{  
        
        let oldHistory = []
        const userFound = await userSchema.findOne({email: user.email}).then((res) => {
          
            return res;
        }).catch((error) => {   
            return error;
        }
        )
 
        oldHistory = userFound.historial
        
        if(oldHistory === null || oldHistory === undefined){
            oldHistory = []
            return new Response(JSON.stringify({message: 'Error to add'}), {status: 403});
        }
        let lastPosition = oldHistory.length
       
        if(oldHistory[oldHistory.length-1].id === body.history.data.id){
            console.log("No add to history")
            return new Response(JSON.stringify({message: 'Ya es el ultimo en el historial'}), {status: 403});
        }
        oldHistory.push(body.history.data)
        
        const queryBody = {
            email: user.email
        }

        const userUpdate = await userSchema.findOneAndUpdate(queryBody, {historial: oldHistory}).then((res) => {
       
            return res;
        }    
        ).catch((error) => {
            return error;
        })  
        
    }
    return new Response(JSON.stringify({message: 'History Add'}), {status: 200});
}