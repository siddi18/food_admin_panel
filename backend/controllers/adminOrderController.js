import adminOrderModel from "../models/adminOrderModel.js";
import adminUserModel from "../models/adminUserModel.js";
import productModel from "../models/productModel.js";

// Create new order
const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Validate user exists
        const user = await adminUserModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Validate products and calculate total
        let totalAmount = 0;
        for (let item of items) {
            const product = await productModel.findById(item.productId);
            if (!product) {
                return res.json({ success: false, message: `Product ${item.productId} not found` });
            }
            totalAmount += item.quantity * item.price;
        }

        const newOrder = new adminOrderModel({
            userId,
            items,
            totalAmount,
            orderDate: new Date()
        });

        await newOrder.save();
        const populatedOrder = await adminOrderModel.findById(newOrder._id)
            .populate('userId', 'name email mobile')
            .populate('items.productId', 'name price');

        res.json({ success: true, message: "Order created successfully", data: populatedOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating order" });
    }
};

export { createOrder };
