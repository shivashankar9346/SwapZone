import multer from "multer";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }

});

const upload = multer({
    storage: storage
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

//         const uniqueName =
//             `${Date.now()}-${file.originalname}`;

//         cb(null, uniqueName);
//     }

// });

// const upload = multer({
//     storage: storage
// });

// export default upload;