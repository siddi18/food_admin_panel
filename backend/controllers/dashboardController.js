import adminUserModel from "../models/adminUserModel.js";
import productModel from "../models/productModel.js";
import adminOrderModel from "../models/adminOrderModel.js";

// Dashboard aggregation - Get summary statistics
const getDashboardStats = async (req, res) => {
    try {
        // Count total users
        const totalUsers = await adminUserModel.countDocuments();

        // Count total products
        const totalProducts = await productModel.countDocuments();

        // Count total orders
        const totalOrders = await adminOrderModel.countDocuments();

        // Calculate total revenue using aggregation
        const revenueResult = await adminOrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        res.json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching dashboard stats" });
    }
};

export { getDashboardStats };
