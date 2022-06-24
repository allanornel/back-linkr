
import { Router } from 'express';

import { Follower, FollowMe, UserFollowsSomeone} from './../controllers/followerController.js';
import { validateToken } from './../middlewares/authMiddleware.js';



const followerRouter = Router()

followerRouter.post('/follower', validateToken, Follower)
followerRouter.get('/ifollow', validateToken, FollowMe)
followerRouter.get('/followsomeone', validateToken, UserFollowsSomeone)


export default followerRouter