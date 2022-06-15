import { Router } from "express";

import { validateSchema } from "./../middlewares/validateSchema.js";
import postSchema from "./../schemas/postSchema.js";
import { createPost, getTimeline } from "./../controllers/postsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const postRouter = Router();

postRouter.use(validateToken);

postRouter.post("/post/create", validateSchema(postSchema), createPost);
postRouter.post("/post/like/:postId");
postRouter.get("/posts");
postRouter.put("/post/:postId");
postRouter.delete("/post/:postId");
postRouter.get("/timeline", getTimeline);

export default postRouter;
