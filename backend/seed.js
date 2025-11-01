import mongoose from 'mongoose';
import 'dotenv/config';
import adminUserModel from './models/adminUserModel.js';
import categoryModel from './models/categoryModel.js';
import productModel from './models/productModel.js';
import adminOrderModel from './models/adminOrderModel.js';
import { connectDB } from './config/db.js';

// Sample data
const users = [
    { name: "John Smith", email: "john.smith@example.com", mobile: "9876543210" },
    { name: "Emma Wilson", email: "emma.wilson@example.com", mobile: "9876543211" },
    { name: "Michael Brown", email: "michael.brown@example.com", mobile: "9876543212" },
    { name: "Sarah Davis", email: "sarah.davis@example.com", mobile: "9876543213" },
    { name: "David Johnson", email: "david.johnson@example.com", mobile: "9876543214" },
    { name: "Lisa Anderson", email: "lisa.anderson@example.com", mobile: "9876543215" },
    { name: "James Taylor", email: "james.taylor@example.com", mobile: "9876543216" },
    { name: "Jennifer Martinez", email: "jennifer.martinez@example.com", mobile: "9876543217" }
];

const categories = [
    { name: "Fast Food", description: "Quick service meals including burgers, fries, and sandwiches" },
    { name: "Beverages", description: "Cold and hot drinks, juices, and smoothies" },
    { name: "Desserts", description: "Sweet treats, ice creams, cakes, and pastries" },
    { name: "Indian Cuisine", description: "Traditional Indian dishes and curries" },
    { name: "Chinese Food", description: "Noodles, fried rice, and Chinese specialties" },
    { name: "Pizza", description: "Various types of pizzas with different toppings" },
    { name: "Healthy Options", description: "Salads, wraps, and nutritious meals" }
];

const products = [
    // Fast Food
    { name: "Chicken Burger", price: 199, status: "available" },
    { name: "Veg Burger", price: 149, status: "available" },
    { name: "French Fries", price: 99, status: "available" },
    { name: "Chicken Sandwich", price: 179, status: "available" },
    
    // Beverages
    { name: "Coca Cola", price: 50, status: "available" },
    { name: "Fresh Orange Juice", price: 89, status: "available" },
    { name: "Mango Smoothie", price: 129, status: "available" },
    { name: "Cold Coffee", price: 149, status: "available" },
    
    // Desserts
    { name: "Chocolate Ice Cream", price: 119, status: "available" },
    { name: "Vanilla Cake Slice", price: 159, status: "available" },
    { name: "Brownie with Ice Cream", price: 189, status: "available" },
    
    // Indian Cuisine
    { name: "Butter Chicken", price: 299, status: "available" },
    { name: "Paneer Tikka Masala", price: 269, status: "available" },
    { name: "Biryani", price: 249, status: "available" },
    { name: "Dal Makhani", price: 199, status: "available" },
    
    // Chinese Food
    { name: "Veg Fried Rice", price: 179, status: "available" },
    { name: "Chicken Noodles", price: 219, status: "available" },
    { name: "Manchurian", price: 189, status: "available" },
    
    // Pizza
    { name: "Margherita Pizza", price: 349, status: "available" },
    { name: "Pepperoni Pizza", price: 449, status: "available" },
    { name: "Veggie Supreme Pizza", price: 399, status: "available" },
    
    // Healthy Options
    { name: "Caesar Salad", price: 199, status: "available" },
    { name: "Grilled Chicken Wrap", price: 229, status: "available" },
    { name: "Fruit Bowl", price: 149, status: "available" }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Connect to database
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await adminUserModel.deleteMany({});
        await categoryModel.deleteMany({});
        await productModel.deleteMany({});
        await adminOrderModel.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Insert users
        console.log('👥 Adding users...');
        const insertedUsers = await adminUserModel.insertMany(users);
        console.log(`✅ Added ${insertedUsers.length} users\n`);

        // Insert categories
        console.log('📂 Adding categories...');
        const insertedCategories = await categoryModel.insertMany(categories);
        console.log(`✅ Added ${insertedCategories.length} categories\n`);

        // Map products to categories and insert
        console.log('📦 Adding products...');
        const productsWithCategories = [
            // Fast Food (index 0)
            { ...products[0], categoryId: insertedCategories[0]._id },
            { ...products[1], categoryId: insertedCategories[0]._id },
            { ...products[2], categoryId: insertedCategories[0]._id },
            { ...products[3], categoryId: insertedCategories[0]._id },
            
            // Beverages (index 1)
            { ...products[4], categoryId: insertedCategories[1]._id },
            { ...products[5], categoryId: insertedCategories[1]._id },
            { ...products[6], categoryId: insertedCategories[1]._id },
            { ...products[7], categoryId: insertedCategories[1]._id },
            
            // Desserts (index 2)
            { ...products[8], categoryId: insertedCategories[2]._id },
            { ...products[9], categoryId: insertedCategories[2]._id },
            { ...products[10], categoryId: insertedCategories[2]._id },
            
            // Indian Cuisine (index 3)
            { ...products[11], categoryId: insertedCategories[3]._id },
            { ...products[12], categoryId: insertedCategories[3]._id },
            { ...products[13], categoryId: insertedCategories[3]._id },
            { ...products[14], categoryId: insertedCategories[3]._id },
            
            // Chinese Food (index 4)
            { ...products[15], categoryId: insertedCategories[4]._id },
            { ...products[16], categoryId: insertedCategories[4]._id },
            { ...products[17], categoryId: insertedCategories[4]._id },
            
            // Pizza (index 5)
            { ...products[18], categoryId: insertedCategories[5]._id },
            { ...products[19], categoryId: insertedCategories[5]._id },
            { ...products[20], categoryId: insertedCategories[5]._id },
            
            // Healthy Options (index 6)
            { ...products[21], categoryId: insertedCategories[6]._id },
            { ...products[22], categoryId: insertedCategories[6]._id },
            { ...products[23], categoryId: insertedCategories[6]._id }
        ];

        const insertedProducts = await productModel.insertMany(productsWithCategories);
        console.log(`✅ Added ${insertedProducts.length} products\n`);

        // Create sample orders
        console.log('🛒 Adding orders...');
        const orders = [
            {
                userId: insertedUsers[0]._id,
                items: [
                    { productId: insertedProducts[0]._id, quantity: 2, price: insertedProducts[0].price },
                    { productId: insertedProducts[4]._id, quantity: 2, price: insertedProducts[4].price }
                ],
                totalAmount: (insertedProducts[0].price * 2) + (insertedProducts[4].price * 2),
                orderDate: new Date('2024-10-25')
            },
            {
                userId: insertedUsers[1]._id,
                items: [
                    { productId: insertedProducts[18]._id, quantity: 1, price: insertedProducts[18].price },
                    { productId: insertedProducts[5]._id, quantity: 3, price: insertedProducts[5].price }
                ],
                totalAmount: insertedProducts[18].price + (insertedProducts[5].price * 3),
                orderDate: new Date('2024-10-26')
            },
            {
                userId: insertedUsers[2]._id,
                items: [
                    { productId: insertedProducts[11]._id, quantity: 2, price: insertedProducts[11].price },
                    { productId: insertedProducts[13]._id, quantity: 1, price: insertedProducts[13].price },
                    { productId: insertedProducts[4]._id, quantity: 2, price: insertedProducts[4].price }
                ],
                totalAmount: (insertedProducts[11].price * 2) + insertedProducts[13].price + (insertedProducts[4].price * 2),
                orderDate: new Date('2024-10-27')
            },
            {
                userId: insertedUsers[3]._id,
                items: [
                    { productId: insertedProducts[19]._id, quantity: 1, price: insertedProducts[19].price },
                    { productId: insertedProducts[7]._id, quantity: 2, price: insertedProducts[7].price },
                    { productId: insertedProducts[10]._id, quantity: 1, price: insertedProducts[10].price }
                ],
                totalAmount: insertedProducts[19].price + (insertedProducts[7].price * 2) + insertedProducts[10].price,
                orderDate: new Date('2024-10-28')
            },
            {
                userId: insertedUsers[4]._id,
                items: [
                    { productId: insertedProducts[15]._id, quantity: 2, price: insertedProducts[15].price },
                    { productId: insertedProducts[16]._id, quantity: 1, price: insertedProducts[16].price }
                ],
                totalAmount: (insertedProducts[15].price * 2) + insertedProducts[16].price,
                orderDate: new Date('2024-10-29')
            },
            {
                userId: insertedUsers[5]._id,
                items: [
                    { productId: insertedProducts[21]._id, quantity: 1, price: insertedProducts[21].price },
                    { productId: insertedProducts[22]._id, quantity: 1, price: insertedProducts[22].price },
                    { productId: insertedProducts[5]._id, quantity: 1, price: insertedProducts[5].price }
                ],
                totalAmount: insertedProducts[21].price + insertedProducts[22].price + insertedProducts[5].price,
                orderDate: new Date('2024-10-30')
            },
            {
                userId: insertedUsers[6]._id,
                items: [
                    { productId: insertedProducts[1]._id, quantity: 3, price: insertedProducts[1].price },
                    { productId: insertedProducts[2]._id, quantity: 2, price: insertedProducts[2].price },
                    { productId: insertedProducts[4]._id, quantity: 3, price: insertedProducts[4].price }
                ],
                totalAmount: (insertedProducts[1].price * 3) + (insertedProducts[2].price * 2) + (insertedProducts[4].price * 3),
                orderDate: new Date('2024-10-31')
            }
        ];

        const insertedOrders = await adminOrderModel.insertMany(orders);
        console.log(`✅ Added ${insertedOrders.length} orders\n`);

        // Calculate and display summary
        const totalRevenue = insertedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        console.log('📊 SEEDING SUMMARY:');
        console.log('═'.repeat(50));
        console.log(`👥 Total Users:     ${insertedUsers.length}`);
        console.log(`📂 Total Categories: ${insertedCategories.length}`);
        console.log(`📦 Total Products:   ${insertedProducts.length}`);
        console.log(`🛒 Total Orders:     ${insertedOrders.length}`);
        console.log(`💰 Total Revenue:    ₹${totalRevenue}`);
        console.log('═'.repeat(50));
        console.log('\n✅ Database seeding completed successfully!\n');
        console.log('🚀 You can now start your admin panel and see all the data!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
