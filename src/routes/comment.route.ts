import { Router } from "express";

import { showAllComments, showComment, createComment, updateComment, deleteComment } from "../controllers/comment.controllers"
import { verifyComment } from "../middlewares/comment.middlewares";

export const commentRoute = Router();

commentRoute.get("/comments/post/:postId", showAllComments)
commentRoute.get("/comment/:id", showComment)
commentRoute.post("/comment", verifyComment, createComment)
commentRoute.put("/comment/:id", verifyComment, updateComment)
commentRoute.delete("/comment/:id", deleteComment)