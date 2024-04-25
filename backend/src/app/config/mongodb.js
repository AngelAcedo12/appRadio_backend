import mongose from 'mongoose';

const DB_URL = process.env.DB_URL_PRODUCTIONS || 'mongodb://localhost:27017/pruebasAppRadio';
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