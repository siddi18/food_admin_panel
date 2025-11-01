import adminUserModel from "../models/adminUserModel.js";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await adminUserModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching users" });
    }
};

// Add new user
const addUser = async (req, res) => {
    try {
        const { name, email, mobile } = req.body;

        // Check if user already exists
        const existingUser = await adminUserModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User with this email already exists" });
        }

        const newUser = new adminUserModel({
            name,
            email,
            mobile
        });

        await newUser.save();
        res.json({ success: true, message: "User added successfully", data: newUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding user" });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile } = req.body;

        const updatedUser = await adminUserModel.findByIdAndUpdate(
            id,
            { name, email, mobile },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating user" });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await adminUserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting user" });
    }
};

export { getAllUsers, addUser, updateUser, deleteUser };
