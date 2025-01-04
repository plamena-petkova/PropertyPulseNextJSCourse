import mongoose, { mongo } from "mongoose";

let connected = false;

const connectDB = async() => {
    mongoose.set('strictQuery', true);

    //If the database is already connected, dont connect again
    if(connected) {
        console.log('MongoDb is connected!');
        return;
    }
    
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDb is now connected!');

    } catch(error) {
        console.log(error);
    }
}

export default connectDB;