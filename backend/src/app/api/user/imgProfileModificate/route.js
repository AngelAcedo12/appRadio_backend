import { dbConnect } from "../../../config/mongodb";
import userSchema from '../../../models/dbModels/user'





await dbConnect();

export async function PUT(request) {

    const body = await request.json()
    console.log(body)
    
    return new Response(JSON.stringify("PUT HISTORY"))
    
}
