import { Router } from "express";

import { insertComment, searchComments, countComments } from "../controllers/commentsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import { validateSchema } from "./../middlewares/validateSchema.js";
import commentSchema from "./../schemas/commentSchema.js";

const commentsRouter = Router();

commentsRouter.use(validateToken);

commentsRouter.post("/comment/:id", validateSchema(commentSchema), insertComment);
commentsRouter.get("/comment/:id", searchComments);
commentsRouter.get("/comment/count/:id", countComments);

export default commentsRouter;


