import productModel from "../models/productModel.js";

// Get all products (with category populated)
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('categoryId', 'name description');
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching products" });
    }
};

// Add new product
const addProduct = async (req, res) => {
    try {
        const { name, categoryId, price, status } = req.body;

        const newProduct = new productModel({
            name,
            categoryId,
            price,
            status: status || 'available'
        });

        await newProduct.save();
        const populatedProduct = await productModel.findById(newProduct._id).populate('categoryId', 'name description');
        
        res.json({ success: true, message: "Product added successfully", data: populatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding product" });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryId, price, status } = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { name, categoryId, price, status },
            { new: true }
        ).populate('categoryId', 'name description');

        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating product" });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting product" });
    }
};

export { getAllProducts, addProduct, updateProduct, deleteProduct };
