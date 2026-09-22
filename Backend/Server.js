import express from "express";
import cors from "cors"
import connectDB from "./DataBase/db.js";
import itemRoutes from "./Routes/itemRoutes.js";
import authRoutes from "./Routes/authRoutes.js"
import wishlistRoutes from "./Routes/wishListRoutes.js";
import requestRoutes from "./Routes/requestRoutes.js";
import path from "path";


const app = express()
const PORT = process.env.PORT || 3000;





app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://swapzone-1-z61x.onrender.com"
        ],
        credentials: true
    })
);
app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);



app.get("/",(req,res)=>{
    res.send("Server is Running")
})


app.use("/api/auth", authRoutes);

app.use("/api/items",itemRoutes)
app.use("/uploads", express.static("uploads"));
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/requests", requestRoutes);




const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT}`
            );
        });

    } catch (error) {

        console.error(
            "Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();
