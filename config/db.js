import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection with DB established', {host: conn.connection.host});
    } catch(error) {
        console.log('Error in db connection', { error });
    }
}

export default connectDatabase;