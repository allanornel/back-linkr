import userRepository from "./../repositories/usersRepository.js";
import likeRepository from "./../repositories/likeRepository.js";
import postRepository from "../repositories/postRepository.js";

export async function likeOrDislikePost(req, res){
    const { user } = JSON.parse(JSON.stringify(res.locals));
    const { postId } = req.body;
    try {
        const userResult = await userRepository.searchUser(user.id);
        if (userResult.rowCount === 0) return res.sendStatus(404);

        const postResult = await postRepository.findPost(postId);
        if (postResult.rowCount === 0) return res.sendStatus(404);

        const likeResult = await likeRepository.searchLike(user.id, postId);
        if (likeResult.rowCount > 0) {
            await likeRepository.deleteLike(user.id, postId);
            res.status(200).send(false);
        }
        if (likeResult.rowCount === 0) {
            await likeRepository.insertLike(user.id, postId);
            res.status(200).send(true);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
