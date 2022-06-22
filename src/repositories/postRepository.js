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

async function getTotalPosts() {
  return db.query(`
        SELECT COALESCE(COUNT(p."id"), 0) AS "numberOfPosts"
        FROM posts p
    `);
}

async function getPosts(limit, userId) {
  return db.query(
    `
    SELECT p."id", p."url", u."id" as "idUser", p."description", 
    u."username", u."picture" AS "image",
    COALESCE(COUNT(c."id"), 0) AS "commentsTotal"  
    FROM posts p
    JOIN users u ON u."id" = p."userId"
    LEFT JOIN followers f ON f."followerId" = p."userId"
    LEFT JOIN comments c ON c."postId" = p."id"
    WHERE f."followingId" = $1  OR f."followerId" = $1
    OR p."userId" = $1
    GROUP BY p."id", u.id
    ORDER BY p."createdAt" DESC
    LIMIT $2;
    `,
    [userId, limit]
  );
}

async function getPostsFromUser(id) {
  return db.query(
    `
      SELECT p."id", p."url", u."id" as "idUser", p."description", 
      h."name" AS "hashtag",
      u."username", u."picture" AS "image",
      COALESCE(COUNT(c."id"), 0) AS "commentsTotal"  
      FROM posts p
      JOIN users u ON u."id" = p."userId"
      LEFT JOIN comments c ON c."postId" = p."id"
      LEFT JOIN "postsHashtags" ph ON ph."idPost" = p."id"
      LEFT JOIN hashtags h ON h."id" = ph."id"
      WHERE p."userId" = $1
      GROUP BY p."id", p."url", p."description", h."name",
      u."username", u."picture", u."id"
      ORDER BY p."createdAt" DESC
      LIMIT 20;
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
  getTotalPosts,
};

export default postRepository;
