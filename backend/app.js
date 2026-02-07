import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'


mongoose.connect(process.env.MONGODB_URI)

const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/auth", authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(3001, ()=>{
    console.log("server started on port 3001")
})