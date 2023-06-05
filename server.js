import express from "express";
import dotenv from 'dotenv';
import color from 'colors';
import morgan from "morgan";
import connectDB from "./config/db.js";
 import cors from 'cors';
 import authRoutes from "./routes/authRoute.js"


dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middeleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Mern stack ecommerce app</h1>");
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
});