import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    historial: [
        {
            changeId: String,
            id: String,
            name: String,
            url: String,
            urlResolved: String,
            homepage: String,
            favicon: String,
        }
    ]
});
export default mongoose.models.user ||  mongoose.model('users', userSchema) ;