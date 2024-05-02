import { dbConnect } from "../../../config/mongodb";
import userShema from '../../../models/dbModels/user'
await dbConnect();  


export async function GET(request){
    const body = request.json()
    console.log(body)
    
    return new Response(JSON.stringify("GET PROFILE"))
}