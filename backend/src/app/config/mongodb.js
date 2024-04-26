import mongose from 'mongoose';


const DB_URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL;

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