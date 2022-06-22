import postRepository from "./../repositories/postRepository.js";
import userRepository from './../repositories/usersRepository.js';
import commentRepository from "./../repositories/commentRepository.js";

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
        const queryComments =  await commentRepository.searchComments(id);
        const listComments = [...queryComments.rows];

        res.status(200).send(listComments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}