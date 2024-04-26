import mongose from 'mongoose';

const DB_URL_DEV = process.env.DB_URL || 'mongodb://localhost:27017/pruebasAppRadio';
const DB_URL_PRO = process.env.DB_URL_PRO
const dbConnect = async () => {
    try {
        await mongose.connect( DB_URL_PRO,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

export {dbConnect};