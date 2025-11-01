import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' }
}, { timestamps: true });

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
