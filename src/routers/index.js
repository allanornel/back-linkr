import { Router } from "express";
import authRouter from "./authRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import postsRouter from "./postsRouter.js";
import likesRouter from "./likesRouter.js";
import followerRouter from "./followerRouter.js"
import commentsRouter from "./commentsRouter.js";
import sharesRouter from "./sharesRouter.js";

const router = Router();

router.use(authRouter);
router.use(hashtagsRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(followerRouter);
router.use(commentsRouter);
router.use(sharesRouter);

export default router;
