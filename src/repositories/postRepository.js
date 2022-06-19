import db from "./../config/db.js";

async function insertPost(url, description, userId) {
  return db.query(
    `
        INSERT INTO posts (url, description, "userId")
        VALUES ($1, $2, $3) RETURNING id; 
        `,
    [url, description, userId]
  );
}

async function getPosts() {
  return db.query(
    `
            SELECT p."id", p."url", u."id" as "idUser", p."description", 
            h."name" AS "hashtag",
            u."username", u."picture" AS "image",
            COALESCE(COUNT(l."id"), 0) AS "likesTotal"  
            FROM posts p
            JOIN users u ON u."id" = p."userId"
            LEFT JOIN likes l ON l."userId" = p."userId"
            LEFT JOIN "postsHashtags" ph ON ph."idPost" = p."id"
            LEFT JOIN hashtags h ON h."id" = ph."id"
            GROUP BY p."id", p."url", p."description", h."name",
            u."username", u."picture", u."id"
            ORDER BY p."createdAt" DESC
            LIMIT 20
            `
  );
}

async function getPostsFromUser(id) {
  return db.query(
    `
            SELECT p."id", p."url", p."description",
            h."name" AS "hashtag",
            COALESCE(COUNT(l."id"), 0) AS "likesTotal"  
            FROM posts p
            JOIN users u ON u."id" = p."userId"
            LEFT JOIN likes l ON l."userId" = p."userId"
            LEFT JOIN "postsHashtags" ph ON ph."idPost" = p."id"
            LEFT JOIN hashtags h ON h."id" = ph."id"
            WHERE p."userId" = $1
            GROUP BY p."id", p."url", p."description", h."name"
            ORDER BY p."createdAt" DESC
            LIMIT 20
            `,
    [id]
  );
}

async function findPost(id) {
  return await db.query(
    `
        SELECT * FROM posts WHERE id=$1
    `,
    [id]
  );
}

async function editPost(url, description, id) {
  if (description === undefined) return db.query(`UPDATE posts SET url=$1 WHERE id = $2`, [url, id]);
  return db.query(`UPDATE posts SET url=$1, description=$2 WHERE id = $3`, [url, description, id]);
}

async function deletePost(id) {
  return await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

const postRepository = {
  insertPost,
  getPosts,
  getPostsFromUser,
  findPost,
  deletePost,
  editPost,
};

export default postRepository;
