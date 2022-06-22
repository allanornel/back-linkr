import postRepository from "./../repositories/postRepository.js";
import userRepository from './../repositories/usersRepository.js';
import commentRepository from "./../repositories/commentRepository.js";
import followersRepository from "./../repositories/followRepository.js";

export async function insertComment(req, res){
    const { comment } = req.body;
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));
    try {
        const userResult = await userRepository.searchUser(user.id);
        if (userResult.rowCount === 0) return res.sendStatus(404);

        const existPost = await postRepository.findPost(id);
        if( existPost.rowCount === 0 ) return res.sendStatus(404);

        await commentRepository.createComment(comment, id, user.id);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function searchComments(req, res){
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));
    try {
        const queryAuthor = await postRepository.findPost(id);
        const authorId = queryAuthor.rows[0]?.userId;

        const queryComments =  await commentRepository.searchComments(id);
        const listComments = [...queryComments.rows];

        const queryFollowing = await followersRepository.searchFollowing(user.id);
        const listFollowing = [...queryFollowing.rows];

        listComments.map((comment) => {
            const { userId } = comment;
            if( authorId == userId ) {
                comment.userStatus = `post's author`;
            } else if( listFollowing.some((following) => following.followingId == userId )) {
                comment.userStatus = `following`;
            }
        })

        res.status(200).send(listComments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}