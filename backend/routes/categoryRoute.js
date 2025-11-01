import express from 'express';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", addCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
