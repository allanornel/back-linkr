
import { Router } from 'express';

import { Follower, FollowMe} from './../controllers/followerController.js';
import { validateToken } from './../middlewares/authMiddleware.js';



const followerRouter = Router()

followerRouter.post('/follower', validateToken, Follower)
followerRouter.get('/ifollow', validateToken, FollowMe)



export default followerRouter