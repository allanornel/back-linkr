import { Router } from "express";

import { getPosts } from "../repositories/postRepository.js";

const postRouter = Router();

postRouter.post("/post/create");
postRouter.post("/post/like/:postId");
postRouter.get("/posts");
postRouter.put("/post/:postId");
postRouter.delete("/post/:postId");
postRouter.get("/timeline");

export default postRouter;
