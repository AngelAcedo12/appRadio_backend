import mongoose from "mongoose";
import { type } from "os";

const transmisionSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        unique: true  
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    user : {
        name: {type: String},
        email: {type: String},
        imgProfile: {type: String}
    },
    views : {
        type: Number,
        default: 0
    },
    likes : {
        type: Number,
        default: 0
    },
    dislikes : {
        type: Number,
        default: 0
    },



    })

module.exports = mongoose.models.transmisions ||  mongoose.model('transmisions', transmisionSchema) ;