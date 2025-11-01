import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true }
}, { timestamps: true });

const adminUserModel = mongoose.models.adminUser || mongoose.model("adminUser", adminUserSchema);
export default adminUserModel;
