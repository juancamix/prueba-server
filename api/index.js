import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import canchasRoute from "./routes/canchas.js";

import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();

dotenv.config();

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Conectado con mongoDB.")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected!", ()=>{
    console.log("mongoDB desconectado!");
});
 //middlewares

app.use(cors());
app.use(cookieParser());
 app.use(express.json())

 app.use("/api/auth", authRoute);
 app.use("/api/users", usersRoute);
 app.use("/api/canchas", canchasRoute);

 app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "algo salio mal"
    return res.status(errorStatus).json({
        succes:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    });
});

 app.listen (8800, () => {
    connect()
    console.log("Conectado con backend!")
}) ;