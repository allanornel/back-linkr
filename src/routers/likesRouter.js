import { Router } from 'express';

import { validateToken } from './../middlewares/authMiddleware.js';
import { likePost } from './../controllers/likesController.js';

const likesRouter = Router();

likesRouter.use(validateToken);

likesRouter.post('/like', likePost);
likesRouter.delete('/dislike');

export default likesRouter;