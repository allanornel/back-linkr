import { Router } from "express";
import authRouter from "./authRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import postsRouter from "./postsRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(authRouter);
router.use(hashtagsRouter);
router.use(postsRouter);
router.use(likesRouter);

export default router;
