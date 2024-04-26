import mongose from 'mongoose';

const DB_URL = ""
if(process.env.NODE_ENV !== 'production'){
    DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/pruebasAppRadio';
    
}else{
     DB_URL = process.env.DB_URL_PRO
}

const dbConnect = async () => {
    try {
        await mongose.connect( DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

export {dbConnect};