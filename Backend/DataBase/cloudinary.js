import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("☁️ CLOUDINARY CONFIG CHECK:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key_exists: !!process.env.CLOUDINARY_API_KEY,
    api_secret_exists: !!process.env.CLOUDINARY_API_SECRET
});


// =====================================
// CLOUDINARY PING
// =====================================

try {

    const pingResult = await cloudinary.api.ping();

    console.log(
        "☁️ CLOUDINARY PING SUCCESS:",
        pingResult
    );

} catch (error) {

    console.error(
        "❌ CLOUDINARY PING FAILED:",
        error
    );

}


// =====================================
// TEST CLOUDINARY UPLOAD
// =====================================

try {

    const testResult = await cloudinary.uploader.upload(
        "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        {
            folder: "swapzone/test"
        }
    );

    console.log(
        "☁️ TEST UPLOAD SUCCESS:",
        testResult.secure_url
    );

} catch (error) {

    console.error("❌ TEST UPLOAD FAILED:");
    console.error("MESSAGE:", error.message);
    console.error("HTTP CODE:", error.http_code);
    console.error("NAME:", error.name);
    console.error("FULL ERROR:", error);
}

export default cloudinary;