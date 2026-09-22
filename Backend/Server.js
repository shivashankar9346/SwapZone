import express from "express";
import cors from "cors"
import connectDB from "./DataBase/db.js";
import itemRoutes from "./Routes/itemRoutes.js";
import authRoutes from "./Routes/authRoutes.js"
import wishlistRoutes from "./Routes/wishListRoutes.js";
import requestRoutes from "./Routes/requestRoutes.js";


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


app.get("/",(req,res)=>{
    res.send("Server is Running")
})


app.use("/api/auth", authRoutes);

app.use("/api/items",itemRoutes)
app.use("/uploads", express.static("uploads"));
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/requests", requestRoutes);


app.use((err, req, res, next) => {
    console.error("🔥🔥 GLOBAL ERROR 🔥🔥");
    console.error("ERROR NAME:", err.name);
    console.error("ERROR MESSAGE:", err.message);
    console.error("ERROR STACK:", err.stack);

    res.status(500).json({
        success: false,
        message: err.message
    });
});


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
