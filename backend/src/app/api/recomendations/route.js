import { tokenDecrypter } from "@/app/utils/encrypterToken";
import { dbConnect } from "../../config/mongodb";
import userSchema from "../../models/dbModels/user";

await dbConnect();
export async function POST(request){
  
    
    const {token,actualUser} = await request.json();
    console.log(actualUser)
    const userToken = await tokenDecrypter(token).then((res) => {
        return res.user;
    });

    const recomendations =  await userSchema.aggregate([ { $sample: { size: 10 } } ]).then((res) => {	
        return res
       
    }



    ).catch((error) => {
      console.log(error)
      return {}
    }
    )
    const response = recomendations.filter((item) => {
        if(item.email !== userToken.email || item.email !== actualUser) {
            return item
        }
        
    }).map((item) => {
        
        return {
            name: item.name,
            email: item.email,
            imgProfile: item.imgProfile

        }
    }
    )
    return new Response(JSON.stringify(response));
}