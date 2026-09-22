import User from "../Models/authModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {

    try {

          console.log("🔥 REGISTER CONTROLLER HIT");
        console.log("BODY:", req.body);

        const {
            name,
            email,
            campusorhostel,
            branch,
            password
        } = req.body


                console.log("Checking user:", email);


        //if user exists

        const existingUser = await User.findOne({ email })

         console.log("Existing user:", existingUser);

        if (existingUser) {
            return res.status(400).json({
                message: "User already registered"
            })
        }

        //hash password

        const hashedPassword = await bcrypt.hash(password, 10)

        //create User

        const user = await User.create({
            name,
            email,
            campusorhostel,
            branch,
            password: hashedPassword
        })
       
        console.log("✅ USER CREATED:", user);

     

        res.status(201).json({
            message: "Registration Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campusorhostel: user.campusorhostel,
                branch: user.branch
            }

        })

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });

    }

}


export const loginUser = async (req, res) => {

    try {
        const {  email , password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
           return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        //compare password

        const isPasswordCorrect = await bcrypt.compare(
            password, user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        
        }
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
           // Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );



        res.status(200).json({
            message: "Login successful",
            token:token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campusorhostel: user.campusorhostel,
                branch: user.branch
            }
        });

    }
    catch(err) {

        res.status(500).json({
            message: err.message
        });
    }
}