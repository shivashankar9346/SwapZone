import express from "express";
import cors from "cors"
import connectDB from "./DataBase/db.js";
import itemRoutes from "./Routes/itemRoutes.js";
import authRoutes from "./Routes/authRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000;



connectDB()

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Server is Running")
})


app.use("/api/auth", authRoutes);

app.use("/api/items",itemRoutes)
app.use("/uploads", express.static("uploads"));


app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
    
})