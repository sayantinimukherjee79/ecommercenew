import User from "../models/User.js";

// password encryption
import bcrypt from "bcryptjs";

//jwt token creation using jsonwebtoken

import jwt from "jsonwebtoken";

//registration

export const register = async (req, res) => {
    try {

        //first user details would be extracted from frontend request

        const { name, email, password, phone, role, shopName, shopUrl } = req.body;

        //input validation

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //first it will check user already exits or not

        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ message: "user already exits" });

        //create new user

        const userRole = role === "vendor" ? "vendor" : "customer";

        if (userRole === "vendor" && (!shopName || !shopUrl)) {
            return res.status(400).json({
                message: "Shop name and shop URL are required for vendor",
            });
        }

        //hash password, you should never store password in notmal form, it should be stored in encryoted format

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: userRole,

            //vendor fields only if role is vendor
            shopName: userRole === "vendor" ? shopName : undefined,
            shopUrl: userRole === "vendor" ? shopUrl : undefined,
        });

        //save new user details

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

//login

export const login = async (req, res) => {

    try {

        console.log("Login Body:", req.body);

        //extracting email and password from frontend request

        const { email, password } = req.body;

        //it will check if there is any fiend empty or not among email and password

        if (!email || !password) {
            return res.status(400).json({ message: "Fields are required" });
        }


        //check if the user exists or not

        const user = await User.findOne({ email });

        if (!user) {
            console.log("user not found");
            return res.status(401).json({ message: "invalid credentials" });
        }

        console.log("User Found:", user.email);
        console.log("DB password", user.password);
        console.log("Entered password:", password);


        //match password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("password mismatch");
            return res.status(401).json({ message: "invalid credentials" });
        }

        //generate jwt token

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );


        //successful response

        res.status(200).json({
            message: "login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        });



    } catch (error) {

        res.status(500).json({ message: "server error", error: error.message });

    }

};
