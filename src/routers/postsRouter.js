import { Router } from "express";

const postRouter = Router();

postRouter.post("/post/create");
postRouter.post("/post/like/:postId");
postRouter.get("/posts");
postRouter.put("/post/:postId");
postRouter.delete("/post/:postId");

export default postRouter;
