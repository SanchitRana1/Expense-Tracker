import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/db.js"
import { readdirSync } from "fs"
import transactionRoute from "./routes/transactionRoute.js"
import expenseRoute from "./routes/expenseRoute.js"


const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT; 

app.get("/",(req,res)=>{
    res.send("Testing root")
})

app.use("/api/v1/income",transactionRoute )
app.use("/api/v1/expense",expenseRoute )

app.listen(PORT,()=>{
    connectDB()
    console.log(`Listening to port ${PORT}`)
})