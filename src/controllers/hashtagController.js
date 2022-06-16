import hashtagRepository from "../repositories/hashtagRepository.js";

export async function getTopHashtags(req, res) {
  try {
    const hashtags = await hashtagRepository.getHashtags();
    res.send(hashtags.rows);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}

export async function getHashtagByName(req, res) {
  const { hashtag } = req.params;
  try {
    const checkHashtag = await hashtagRepository.checkHashtagByName(hashtag);
    if (checkHashtag.rowCount === 0) return res.sendStatus(404);
    const posts = await hashtagRepository.getHashtagByName(hashtag);
    res.send(posts.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
