import express from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
