import { Router } from "express";
import { getTopHashtags } from "../controllers/hashtagController.js";
const hashtagRouter = Router();

hashtagRouter.get("/hashtags", getTopHashtags);
hashtagRouter.get("/hashtags/:id");

export default hashtagRouter;
