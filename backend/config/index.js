import mongoose from "mongoose";

 const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('MongoDB Connection Failed');
    }
 }

 export default connectDB;