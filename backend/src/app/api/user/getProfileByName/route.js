import { dbConnect } from "../../../config/mongodb";
import userShema from '../../../models/dbModels/user'
await dbConnect();  


export async function POST(request){
    const {body} =await request.json()
  
    const {name} = body
   
    const queryBody = {
        name: name
    }
    const result = await userShema.findOne(queryBody).then((res) => {  

        return {
            status: true,
            profile: res
        }

   
    }   
    ).catch((err) => {
        return {
            status: false,
            
            error: err
        }
    })
    // console.log(result)
    if(result.status === false){
        
        return new Response(JSON.stringify({status: false, error: result.error}, {status: 403}))
    }
  
    const profile = {
        name: result.profile.name,
        email: result.profile.email,
        imgProfile: result.profile.imgProfile,
        history: result.profile.historial
    }

    return new Response(JSON.stringify({status: true, profile: {profile}}), {status: 200} )
}