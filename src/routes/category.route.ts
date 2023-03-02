import { Router } from "express";

import { showAllCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.controllers";
import { verifyCategory } from "../middlewares/category.middlewares";

export const categoryRoute = Router();

categoryRoute.get("/categories", showAllCategory)
categoryRoute.post("/category", createCategory)
categoryRoute.put("/category/:id",verifyCategory, updateCategory)
categoryRoute.delete("/category/:id", deleteCategory)