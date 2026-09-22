// import multer from "multer";

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {

//         const uniqueName =
//             Date.now() + "-" + file.originalname;

//         cb(null, uniqueName);
//     }

// });

// const upload = multer({
//     storage: storage
// });

// export default upload;



import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");

console.log("📁 Upload directory:", uploadDir);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        console.log("📁 Saving file to:", uploadDir);
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        console.log("📷 File name:", uniqueName);

        cb(null, uniqueName);
    }

});

const upload = multer({
    storage
});

export default upload;