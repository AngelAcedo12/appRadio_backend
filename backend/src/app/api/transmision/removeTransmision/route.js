import { dbConnect } from '@/app/config/mongodb'
import transmisionSchema from '../../../models/dbModels/transmision'
import { decodeUrl } from '../../../utils/UrlDecode'
await dbConnect()


export async function DELETE(req,res) {
    const url = await req.url;
    const urlParams = new URL(url).searchParams.toString().split('&');
    let paramsUsername = urlParams[0].split('=');
   
    const nameUser = decodeUrl(paramsUsername[1])



     const result = await transmisionSchema.deleteOne({"user.name":nameUser}).then((data) => data).catch((error) => error)
   
    if(result === null || result === undefined){
        return new Response(JSON.stringify({status:false, message: "Error al eliminar la transmision"}), {status: 200})   
    }

    return new Response(JSON.stringify({status:true, message: "Success"}), {status: 200})
}