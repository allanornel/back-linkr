import sharesRepository from "../repositories/sharesRepository.js";
import userRepository from "./../repositories/usersRepository.js";
import postRepository from "../repositories/postRepository.js";

export async function postShare(req, res) {
  const { user } = JSON.parse(JSON.stringify(res.locals));
  const { postId } = req.params;
  try {
    const userResult = await userRepository.searchUser(user.id);
    if (userResult.rowCount === 0) return res.sendStatus(404);

    const postResult = await postRepository.findPost(postId);
    if (postResult.rowCount === 0) return res.sendStatus(404);

    await sharesRepository.postShare(user.id, postId);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getSharesByPostId(req, res) {
  const { postId } = req.params;
  try {
    const postResult = await postRepository.findPost(postId);
    if (postResult.rowCount === 0) return res.sendStatus(404);

    const shares = await sharesRepository.getSharesByPostId(postId);

    res.send(shares.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
