import mongoose from "mongoose";

const adminOrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'adminUser', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

const adminOrderModel = mongoose.models.adminOrder || mongoose.model("adminOrder", adminOrderSchema);
export default adminOrderModel;
