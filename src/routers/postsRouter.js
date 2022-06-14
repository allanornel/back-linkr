import { Router } from "express";

import { validateSchema } from "./../middlewares/validateSchema.js";
import postSchema from "./../schemas/postSchema.js";
import { createPost } from "./../controllers/postsController.js";

const postRouter = Router();

postRouter.post("/post/create", validateSchema(postSchema), createPost);
postRouter.post("/post/like/:postId");
postRouter.get("/posts");
postRouter.put("/post/:postId");
postRouter.delete("/post/:postId");

export default postRouter;
