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
