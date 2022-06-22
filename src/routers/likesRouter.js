import { Router } from 'express';

import { validateToken } from './../middlewares/authMiddleware.js';
import { likeOrDislikePost, getLikes} from './../controllers/likesController.js';

const likesRouter = Router();

likesRouter.use(validateToken);

likesRouter.post('/like', likeOrDislikePost);
likesRouter.get('/like/:id', getLikes);

export default likesRouter;