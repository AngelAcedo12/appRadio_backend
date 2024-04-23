import mongoose from "mongoose";
import { TypeRadio } from "./typeRadio";
import { type } from "os";

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
