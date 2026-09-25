import express from "express";
import cors from "cors";
import path from "path";

import connectDB from "./DataBase/db.js";

import itemRoutes from "./Routes/itemRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import wishlistRoutes from "./Routes/wishListRoutes.js";
import requestRoutes from "./Routes/requestRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;


// =====================================
// CORS
// =====================================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://swapzone-1-z61x.onrender.com"
        ],
        credentials: true
    })
);


// =====================================
// BODY PARSER
// =====================================

app.use(express.json());


// =====================================
// SERVE UPLOADED IMAGES
// =====================================

const uploadDir = path.join(process.cwd(), "uploads");

console.log("📁 UPLOAD DIRECTORY:", uploadDir);

app.use(
    "/uploads",
    express.static(uploadDir)
);


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {

    res.send("Server is Running");

});


// =====================================
// API ROUTES
// =====================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/items",
    itemRoutes
);

app.use(
    "/api/wishlist",
    wishlistRoutes
);

app.use(
    "/api/requests",
    requestRoutes
);


// =====================================
// START SERVER
// =====================================

const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );

            console.log(
                `📁 Serving uploads from: ${uploadDir}`
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