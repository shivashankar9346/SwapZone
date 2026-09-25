import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only JPG, JPEG, PNG and WEBP images are allowed"
                )
            );
        }
    }
});

export default upload;



// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const uploadDir = path.join(process.cwd(), "uploads");

// // Create uploads folder if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },

//     filename: (req, file, cb) => {
//     const cleanName = file.originalname
//         .replace(/\s+/g, "-");

        

//     cb(null, `${Date.now()}-${cleanName}`);
// }

// });

// const upload = multer({
//     storage: storage
// });

// export default upload;