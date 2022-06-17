import userRepository from "./../repositories/usersRepository.js";
import likeRepository from "./../repositories/likeRepository.js";
import postRepository from "../repositories/postRepository.js";

export async function likePost(req, res){
    const { user } = JSON.parse(JSON.stringify(res.locals));
    const { postId } = req.body;
    try {
        const userResult = await userRepository.searchUser(user.id);
        if (userResult.rowCount === 0) return res.sendStatus(404);

        const postResult = await postRepository.findPost(postId);
        if (postResult.rowCount === 0) return res.sendStatus(404);

        const likeResult = await likeRepository.searchLike(user.id, postId);
        if (likeResult.rowCount > 0) return res.sendStatus(409);

        await likeRepository.insertLike(user.id, postId);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function dislikePost(req, res){
    const { user } = JSON.parse(JSON.stringify(res.locals));
    const { postId } = req.body;
    try {
        const userResult = await userRepository.searchUser(user.id);
        if (userResult.rowCount === 0) return res.sendStatus(404);

        const postResult = await postRepository.findPost(postId);
        if (postResult.rowCount === 0) return res.sendStatus(404);

        const likeResult = await likeRepository.searchLike(user.id, postId);
        if (likeResult.rowCount === 0) return res.sendStatus(404);

        await likeRepository.deleteLike(user.id, postId);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}