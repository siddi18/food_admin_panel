import express from 'express';
import { createOrder } from '../controllers/adminOrderController.js';

const adminOrderRouter = express.Router();

adminOrderRouter.post("/", createOrder);

export default adminOrderRouter;
