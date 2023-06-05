import mongoose from "mongoose";
// import morgan from "morgan";
import Color from "colors";
// import dotenv from "dotenv";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connecting to mongodb database ${conn.connection .host}`.bgMagenta.white);
        
    } catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.white)
        
    }
}
export default connectDB;