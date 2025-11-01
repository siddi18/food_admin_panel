import categoryModel from "../models/categoryModel.js";

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching categories" });
    }
};

// Add new category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.json({ success: false, message: "Category already exists" });
        }

        const newCategory = new categoryModel({
            name,
            description
        });

        await newCategory.save();
        res.json({ success: true, message: "Category added successfully", data: newCategory });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding category" });
    }
};

// Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!updatedCategory) {
            return res.json({ success: false, message: "Category not found" });
        }

        res.json({ success: true, message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating category" });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.json({ success: false, message: "Category not found" });
        }

        res.json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting category" });
    }
};

export { getAllCategories, addCategory, updateCategory, deleteCategory };
