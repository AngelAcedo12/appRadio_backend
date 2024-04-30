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
    imgProfile:{
        type: String,
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
            tags: [String],
            country: String,
            countryCode: String,
            state: String,
            language: [String],
            votes: Number,
            lastChangeTime: Date,
            codec: String,
            bitrate: Number,
            hls: Boolean,
            lastCheckOk: Boolean,
            lastCheckTime: Date,
            lastCheckOkTime: Date,
            lastLocalCheckTime: Date,
            clickTimestamp: Date,
            clickCount: Number,
            clickTrend: Number,  
        }
    ]
});

module.exports = mongoose.models.users ||  mongoose.model('users', userSchema) ;