import { Router } from "express";

import { validateSchema } from "./../middlewares/validateSchema.js";

import linkValidation from "./../middlewares/linkValidation.js";
import postSchema from "./../schemas/postSchema.js";

import { createPost, getTimeline, getUserPosts, editPost, deletePost, getUsers, getNumberOfPosts } from "./../controllers/postsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const postRouter = Router();

postRouter.use(validateToken);

postRouter.post("/post/create", validateSchema(postSchema), createPost);
postRouter.get("/posts");
postRouter.put("/post/:postId", validateSchema(postSchema), linkValidation, editPost);
postRouter.delete("/post/:postId", deletePost);
postRouter.post("/timeline", getTimeline);
postRouter.post("/user/:id", getUserPosts);
postRouter.get("/users", getUsers);
postRouter.get("/poststotal", getNumberOfPosts);

export default postRouter;
