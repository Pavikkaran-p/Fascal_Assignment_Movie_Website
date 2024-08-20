import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js';
import movieListRoutes from './routes/movieListRoutes.js';
import movieRoute from './routes/movieRoute.js'
import { movieById } from './controllers/movieController.js';
dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/lists', movieListRoutes);
app.use('/api/movie',movieRoute);
// app.get('/movie',movieById);

app.get('/',(req,res)=>{
    console.log("Working good")
    res.sendStatus(200)
})

app.listen(3001, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log(`MongoDB connected to ${process.env.MONGODB_URL}`));
    console.log("Server listining on http://127.0.0.1:3001");
});