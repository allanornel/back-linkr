import { Router } from "express";
import {
  getTopHashtags,
  getHashtagByName,
} from "../controllers/hashtagController.js";
const hashtagRouter = Router();

hashtagRouter.get("/hashtags", getTopHashtags);
hashtagRouter.get("/hashtags/:hashtag", getHashtagByName);

export default hashtagRouter;
