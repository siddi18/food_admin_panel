import express from 'express';
import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/adminUserController.js';

const adminUserRouter = express.Router();

adminUserRouter.get("/", getAllUsers);
adminUserRouter.post("/", addUser);
adminUserRouter.put("/:id", updateUser);
adminUserRouter.delete("/:id", deleteUser);

export default adminUserRouter;
