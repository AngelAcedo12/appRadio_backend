import { dbConnect } from "../../../config/mongodb";
import transmisionSchema from '../../../models/dbModels/transmision'

await dbConnect();
export async function GET(req,res){
    
    const transmisions = await transmisionSchema.find().then((res) => {

        return res
    }).catch((err) => {
        return err  
    })

    if(transmisions===null || transmisions===undefined){
        return new Response(JSON.stringify({message:"No se encontraron transmisiones"}), {status: 404})
    }
    
 

    return new Response(JSON.stringify({data:transmisions, message:"success"}), {status: 200})

}