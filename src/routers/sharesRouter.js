import { Router } from "express";
import { getSharesByPostId, postShare } from "../controllers/sharesController.js";

import { validateToken } from "./../middlewares/authMiddleware.js";

const sharesRouter = Router();

sharesRouter.use(validateToken);

sharesRouter.post("/share/:postId", postShare);
sharesRouter.get("/share/:postId", getSharesByPostId);

export default sharesRouter;
