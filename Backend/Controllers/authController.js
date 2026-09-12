import User from "../Models/authModel";
import bcrypt from "bcryptjs"

export const RegisterUser = async (req, res) => {

    try {

        const {
            name,
            email,
            campusorhostel,
            branch,
            password
        } = req.body


        //if user exists

        const existingUser = await User.findOne({ email })

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
        const { name, email } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({
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
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campusorhostel: user.campusorhostel,
                branch: user.branch
            }
        });

    }
    catch {

        res.status(500).json({
            message: error.message
        });
    }
}