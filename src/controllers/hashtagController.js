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
  const { name } = req.params;
  try {
    const checkHashtag = await hashtagRepository.checkHashtagByName(name);
    if (checkHashtag.rowCount === 0) return res.sendStatus(404);
    const posts = await hashtagRepository.getHashtagByName(name);
    res.send(posts.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
