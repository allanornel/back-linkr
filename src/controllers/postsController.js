import { getPosts } from "../repositories/postRepository.js";

export async function getTimeline(req, res) {
    const { user } = res.locals;

    try {
        const { rows } = await getPosts(user);

        res.status(200).send(rows);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}