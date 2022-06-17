import { Router } from 'express';

import { validateToken } from './../middlewares/authMiddleware.js';
import { likePost, dislikePost } from './../controllers/likesController.js';

const likesRouter = Router();

likesRouter.use(validateToken);

likesRouter.post('/like', likePost);
likesRouter.delete('/dislike', dislikePost);

export default likesRouter;