import express from "express";
import cors from "cors";
import connectDB from "./DataBase/db.js";
import itemRoutes from "./Routes/itemRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import wishlistRoutes from "./Routes/wishListRoutes.js";
import requestRoutes from "./Routes/requestRoutes.js";
// import path from "path";
// import fs from "fs";

const app = express();

const PORT = process.env.PORT || 3000;


// ===============================
// CORS
// ===============================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://swapzone-1-z61x.onrender.com"
        ],
        credentials: true
    })
);


// ===============================
// BODY PARSERS
// ===============================

app.use(express.json());


// // ===============================
// // STATIC UPLOADS
// // ===============================

// const uploadDir = path.join(process.cwd(), "uploads");

// console.log("📁 Upload directory:", uploadDir);
// console.log("📁 Upload directory exists:", fs.existsSync(uploadDir));

// app.use(
//     "/uploads",
//     express.static(uploadDir)
// );


// ===============================
// DEBUG UPLOADS
// ===============================

// app.get("/debug/uploads", (req, res) => {

//     console.log("🔥 DEBUG UPLOADS");

//     console.log(
//         "📁 Current working directory:",
//         process.cwd()
//     );

//     console.log(
//         "📁 Upload directory:",
//         uploadDir
//     );

//     const exists = fs.existsSync(uploadDir);

//     console.log(
//         "📁 Upload directory exists:",
//         exists
//     );

//     if (!exists) {

//         return res.status(404).json({
//             exists: false,
//             directory: uploadDir,
//             message: "Uploads directory does not exist"
//         });

//     }

//     const files = fs.readdirSync(uploadDir);

//     console.log("📦 Files:", files);

//     res.json({
//         exists: true,
//         directory: uploadDir,
//         files
//     });
// });


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.send("Server is Running");
});


// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/items", itemRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/requests", requestRoutes);


// ===============================
// START SERVER
// ===============================

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