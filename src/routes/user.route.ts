import { Router } from "express";

import { showAllUsers, showUser, searchUser, createUser, deleteUser } from "../controllers/user.controllers";
import { verifyUser } from "../middlewares/user.middlewares";

export const userRoute = Router();

userRoute.get("/users", showAllUsers)
userRoute.get("/user/:id", showUser)
userRoute.get("/search/user", searchUser)
userRoute.post("/user", verifyUser, createUser)
userRoute.delete("/user/:id", deleteUser)