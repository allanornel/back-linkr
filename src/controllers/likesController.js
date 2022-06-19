import userRepository from "./../repositories/usersRepository.js";
import likeRepository from "./../repositories/likeRepository.js";
import postRepository from "../repositories/postRepository.js";

export async function likeOrDislikePost(req, res) {
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
      res.sendStatus(200);
    }
    if (likeResult.rowCount === 0) {
      await likeRepository.insertLike(user.id, postId);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getLikes(req, res) {
  const { user } = JSON.parse(JSON.stringify(res.locals));
  const { id } = req.params;
  try {
    const query = await likeRepository.listOfLike(id);
    const listUsernames = [...query.rows];

    const numberLikes = listUsernames.length;
    const twoFirst = [listUsernames[0]?.username, listUsernames[1]?.username];
    const isLike = false;

    for (let i = 0; i < listUsernames.length; i++) {
      if (user.username === listUsernames[i]?.username) {
        twoFirst[0] = "Você";
        isLike = true;
        break;
      }
    }

    res.status(200).send({ numberLikes, twoFirst, isLike });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
