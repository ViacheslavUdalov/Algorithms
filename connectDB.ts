import mongoose from "mongoose";

const connectDB =  () => {
    try {
        // Подключение к MongoDB
       mongoose.connect('mongodb+srv://slava187115:111@cluster0.gi5tyfq.mongodb.net/algorithms?retryWrites=true&w=majority')
            .then(() => {
                console.log('connected')
            });
    } catch (error: any) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB
