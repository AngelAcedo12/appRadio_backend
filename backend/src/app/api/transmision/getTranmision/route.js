import { dbConnect } from "../../../config/mongodb";
import transmisionSchema from '../../../models/dbModels/transmision'

await dbConnect();
export async function GET(){
    
    const transmisions = await transmisionSchema.find().then((res) => {
        return res
    }).catch((err) => {
        return err  
    })
    
    return new Response(JSON.stringify(transmisions), {status: 200})

}