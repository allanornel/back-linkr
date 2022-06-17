import db from "./../config/db.js";

async function insertLike(userId, postId){
    return await db.query(`
        INSERT INTO likes ("postId", "userId")
        VALUES ($1, $2);
    `, [postId, userId]);
}

const likeRepository = {
    insertLike
};

export default likeRepository;