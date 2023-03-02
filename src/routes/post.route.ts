import { Router } from "express";
import { showAllPosts, showPost, createPost, updatePost, deletePost } from "../controllers/post.controllers";
import { verifyPost } from "../middlewares/post.middlewares";

export const postRoute = Router()

postRoute.get("/posts/author/:authorId", showAllPosts)
postRoute.get("/post/:id", showPost)
postRoute.post("/post", createPost)
postRoute.put("/post/:id", verifyPost, updatePost)
postRoute.delete("/post/:id", deletePost)