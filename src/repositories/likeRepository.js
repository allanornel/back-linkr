import db from "./../config/db.js";

async function insertLike(userId, postId){
    return await db.query(`
        INSERT INTO likes ("postId", "userId")
        VALUES ($1, $2);
    `, [postId, userId]);
}

async function searchLike(userId, postId){
    return await db.query(`
        SELECT * FROM likes
        WHERE "userId"=$1 AND "postId"=$2;
    `, [userId, postId]);
}

async function deleteLike(userId, postId){
    return await db.query(`
        DELETE FROM likes
        WHERE "userId"=$1 AND "postId"=$2;
    `, [userId, postId]);
}

const likeRepository = {
    insertLike, 
    searchLike,
    deleteLike
};

export default likeRepository;