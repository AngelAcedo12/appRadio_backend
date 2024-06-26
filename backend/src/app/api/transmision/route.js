import { dbConnect } from "../../config/mongodb";
import transmisionSchema from '../../models/dbModels/transmision'
import userSchema from '@/app/models/dbModels/user'
import { tokenDecrypter } from "@/app/utils/encrypterToken";
import { decodeUrl } from "../../utils/UrlDecode";
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


export async function POST(req,res) {

    const {transmision, token} = await req.json()

    
    
    const userByToken = await tokenDecrypter(token).then((data) => data).catch((error) => error)

    if(userByToken === false){
        
        return new Response({status:false, message: "Unauthorized" }, {status: 401})
    }
    
    const userFind = await userSchema.findOne({email: userByToken.user.email}).then((data) => data).catch((error) => error)
    
    if(userFind === null || userFind === undefined){
            
            return new Response({status:false, message: "User not found"}, {status: 404})
    }
    
    if(await verifyOneTransmision(userFind.email)){
        
        return new Response(JSON.stringify({status:false, message: "Ya tienes una transmision activa"}), {status: 403})
    }

    const newTransmision = {
        title: transmision.title,
        description: transmision.description,
        user: {
            name: userFind.name,
            email: userFind.email,
            imgProfile: userFind.imgProfile
        }
    }
    const result = await transmisionSchema.create(newTransmision).then((data) => data).catch((error) => error)
    if(result === null || result === undefined){
        return new Response(JSON.stringify({status:false, message: "Error al crear la transmision"}), {status: 200})   
    }

    return new Response(JSON.stringify({status:true, message: "Success"}), {status: 200})


}



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

async function verifyOneTransmision(email) {

    let result = []
     result = await transmisionSchema.find({"user.email": email}).then((data) => data).catch((error) => error)
  

     if(result.length > 0){
         return true
     }else{
            return false
     }
       
}