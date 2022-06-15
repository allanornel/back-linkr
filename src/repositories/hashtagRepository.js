import db from "./../config/db.js";

async function insertHashtag(hashtags, postId) {
	const querySrtring = `
    with hashtag as (
        insert into hashtags (name)
        values ($1)
        returning id
    )
    insert into "postsHashtags" ("idPost", "idHashtag")
    values ($2, (select id from hashtag));
`;
	let array = [];
	for (let i = 0; i < hashtags.length; i++) {
		let Args = [hashtags[i], postId];
		array.push(await db.query(querySrtring, Args));
	}
	return array;
}

async function getHashtags() {
	return db.query(`
    SELECT hashtags.id,hashtags.name FROM "postsHashtags" AS ph
    JOIN hashtags ON ph."idHashtag"=hashtags.id
    GROUP BY hashtags.name,ph."idHashtag",hashtags.id
    ORDER BY COUNT (ph."idHashtag") DESC 
    LIMIT 10;`);
}


const hashtagRepository = {
	insertHashtag,
	getHashtags,
};
export default hashtagRepository;

