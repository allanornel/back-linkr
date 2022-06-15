import postRepository from "./../repositories/postRepository.js";

export async function createPost(req, res) {
    const userId = 3;
    const { url, description } = req.body;
  try {
    const userResult = await postRepository.searchUser(userId);
    if (userResult.rowCount === 0) return res.sendStatus(404);

    await postRepository.insertPost(url, description, userId);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
}
}

export async function getTimeline(req, res) {
    const { user } = req.locals;

    try {
        const { rows } = await postRepository.getPosts(user);

        res.status(200).send(rows);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}