import { Router } from "express";

import { validateSchema } from "./../middlewares/validateSchema.js";

import linkValidation from "./../middlewares/linkValidation.js";
import postSchema from "./../schemas/postSchema.js";
import { createPost, getTimeline, getUserPosts, deletePost } from "./../controllers/postsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const postRouter = Router();

postRouter.use(validateToken);

postRouter.post("/post/create", validateSchema(postSchema), createPost);
postRouter.post("/post/like/:postId");
postRouter.get("/posts");
postRouter.put("/post/:postId");
postRouter.delete("/post/:postId", validateToken, deletePost);
postRouter.get("/timeline", getTimeline);
postRouter.get("/user/:id", getUserPosts);

export default postRouter;
