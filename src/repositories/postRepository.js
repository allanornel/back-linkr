import db from '../config/db.js';

export async function getPosts(user) {
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

