import User from "../models/userModel.js";

export const createUser = async(req, res) => {

    try {

        const { name, role, email, password } = req.body;

        if (!name || !role || !email || !password) {
            return res.status(400).json({
                message: "Name, role, email and password cannot be empty!"
            });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const user = new User({ name, role, email, password });
        await user.save();

        console.log("User Created in Database successfuly!");

        res.status(201).json({
            message: "User Created in Database successfuly!",
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Error Creating User: ", error);

        res.status(500).json({
            message: "Error creating User in Database, Internal Server Error!"
        });
    }
}

export const getAllUsers = async(req, res) => {
    try {

        const totalUsers = await User.countDocuments();
        const user = await User.find();

        res.status(200).json({
            succsess: true,
            message: "All Users Fetched Successfuly!",
            user,
            totalUsers
        });
    } catch (error) {
        console.log("Error Fetching all Users: ", error)
        res.status(500).json({
            succsess: false,
            message: "Internal Server Error."
        });
    }
}

export const getSingleUser = async(req, res) => {
    try {
        const { id } = req.params;

        // If requester is a team member they can only access own profile
        if (req.user && req.user.role === "Team Member" && req.user.id.toString() !== id) {
            return res.status(403).json({ message: "Forbidden: cannot access other users." });
        }

        const user = await User.findById(id).select("name email role createdAt updatedAt");

        if (!user) {
            return res.status(404).json({
                message: "No User found with the Provided ID.",
                id
            });
        }
        res.status(200).json({
            message: "Single User Fetched Successfuly!",
            user
        });
    } catch (error) {

        if (error.name === "CastError") {
            res.status(400).json({
                message: "Invalid User ID Format."
            });
        }
        res.status(500).json({
            succsess: false,
            message: "Internal Server Error."
        })
    }
}

export const updateUser = async(req, res) => {
    try {
        const { id } = req.params;

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: "No User found with the Provided ID.",
                id
            });
        }

        let updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData })

        res.status(200).json({
            message: "User information updated sucessfully!",
            updatedUser
        });
    } catch (error) {

        // If someone sends an invalid MongoDB ObjectId (e.g., /123), findById() will throw a CastError.
        // To handle this cleanly, you can detect it like this:
        if (error.name === "CastError") {
            res.status(400).json({
                message: "Invalid User ID Format."
            });
        }
        res.status(500).json({
            succsess: false,
            message: "Internal Server Error."
        })
    }
}

export const deleteUser = async(req, res) => {
    try {

        const { id } = req.params;
        const findUser = await User.findById(id);

        if (!findUser) {
            res.status(404).jason({
                message: "No User Exist with the Provided ID in Database",
                id
            })
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User Deleted Successfully!"
        })

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid User ID format."
            });
        }

        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}