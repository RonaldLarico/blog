import { Router } from "express";

import { searchProfile, showAllProfile, showProfile, updateProfile } from "../controllers/profile.controllers"
import { updateVerifyProfile } from "../middlewares/profile.middlewares";

export const profileRoute = Router();

profileRoute.get("/profiles", showAllProfile)
profileRoute.get("/profile/:id", showProfile)
profileRoute.get("/search/profile", searchProfile)
profileRoute.put("/profile/:id", updateVerifyProfile, updateProfile)