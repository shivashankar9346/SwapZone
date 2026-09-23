import express from "express"
import { RegisterUser , loginUser  , getMe} from "../Controllers/authController.js";
import authUser from "../Middleware/authUser.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.get("/get-me", authUser, getMe);

export default router;