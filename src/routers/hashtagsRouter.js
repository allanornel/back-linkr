import { Router } from "express";

const hashtagRouter = Router();

hashtagRouter.get("/hashtags");
hashtagRouter.get("/hashtags/:id");

export default hashtagRouter;
