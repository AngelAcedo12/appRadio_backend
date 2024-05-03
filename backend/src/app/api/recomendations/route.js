import { dbConnect } from "../../config/mongodb";
import userSchema from "../../models/dbModels/user";

await dbConnect();
export async function GET(){

    const recomendations =  await userSchema.aggregate([ { $sample: { size: 10 } } ]).then((res) => {	

        return res
       
    }
    ).catch((error) => {
      console.log(error)
      return {}
    }
    )
    const response = recomendations.map((item) => {
        return {
            name: item.name,
            email: item.email,
            imgProfile: item.imgProfile

        }
    }
    )
    return new Response(JSON.stringify(response));
}