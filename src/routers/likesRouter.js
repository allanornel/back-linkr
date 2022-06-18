import { Router } from 'express';

import { validateToken } from './../middlewares/authMiddleware.js';
import { likeOrDislikePost} from './../controllers/likesController.js';

const likesRouter = Router();

likesRouter.use(validateToken);

likesRouter.post('/like', likeOrDislikePost);

export default likesRouter;