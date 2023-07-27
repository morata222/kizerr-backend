import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import gigRouter from './routes/gig.route.js'
import reviewRouter from './routes/review.route.js'
import orderRouter from  './routes/order.route.js'
import cors from 'cors'
dotenv.config()
const app = express()
const port = 3000
app.use(json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use('/', userRouter)
app.use('/', authRouter)
app.use('/', gigRouter)
app.use('/', reviewRouter)
app.use('/', orderRouter)
app.use((err , req , res , next) => {
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "Something went wrong";
   return res.status(errorStatus).send(errorMessage);   
} )

// ...

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_KEY) 
    console.log(`Example app listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
};
app.listen(port, () => {
  connect();
})

