import db from "./../config/db.js";

async function searchUser(userId) {
    return db.query(`
        SELECT * FROM users WHERE id=$1
    `, [userId]);
}

async function insertPost(url, description, userId) {
    return db.query(`
        INSERT INTO posts (url, description, "userId")
        VALUES ($1, $2, $3); 
        `, [url, description, userId]); 
}

async function getPosts(user) {
    return (
        db.query(
            `
            SELECT p."id", p."url", p."description", 
            u."username", u."picture",
            h."name" AS "hashtag",
            COALESCE(COUNT(l."id"), 0) AS "likesTotal"  
            FROM posts p
            JOIN users u ON u."id" = p."userId"
            LEFT JOIN likes l ON l."userId" = p."userId"
            LEFT JOIN "postsHashtags" ph ON ph."idPost" = p."id"
            LEFT JOIN hashtags h ON h."id" = ph."id"
            WHERE p."userId" = $1
            GROUP BY p."id", p."url", p."description", u."username", u."picture", h."name"
            ORDER BY p."createdAt" DESC
            LIMIT 20
            `, [user.id]
        )
    )
}

const postRepository = {
    searchUser,
    insertPost,
    getPosts
}

export default postRepository;
