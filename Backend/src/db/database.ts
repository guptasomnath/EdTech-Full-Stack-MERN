import mongoose from "mongoose";

export let databaseRef : typeof mongoose;
export const connectDatabase = async () => {
    try {
        databaseRef = await mongoose.connect(process.env.DB_URL);
        console.log('Mongo DB Database Connected Successfuly');
    } catch (error) {
        console.log('Mongo DB Database Connectiong Error \n' + error);
    }
}