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
    (SELECT p."id", p."url", u."id" as "idUser", p."description", 
    u."username", u."picture" AS "image", p."createdAt", 
    false as repost, null AS "shareUserId",
	COALESCE("countLikes".count, 0) AS "likesTotal",
	COALESCE("countShares".count, 0) AS "countsTotal",
    COALESCE(COUNT(c."postId"), 0) AS "commentsTotal"  
    FROM posts p
    JOIN users u ON u."id" = p."userId"
    LEFT JOIN followers f ON f."followingId" = p."userId"
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM likes 
		WHERE likes."userId" = $1 
		GROUP BY "postId", likes.id) AS "countLikes" ON "countLikes"."postId" = p.id
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM shares WHERE shares."userId" = $1 
		GROUP BY "postId", shares.id) AS "countShares" ON "countShares"."postId" = p.id
    LEFT JOIN comments c ON c."userId" = u."id"
    WHERE f."followerId" = $1 OR p."userId" = $1
    GROUP BY p."id", u.id, "countLikes".count, "countShares".count
  )
UNION ALL 
(SELECT p."id", p."url", u."id" as "idUser", p."description", 
    u."username", u."picture" AS "image", s."createdAt", 
    true as repost, s."userId" AS "shareUserId",
	COALESCE("countLikes".count, 0) AS "likesTotal",
	COALESCE("countShares".count, 0) AS "countsTotal",
    COALESCE(COUNT(c."postId"), 0) AS "commentsTotal" 
    FROM posts p
    JOIN users u ON u."id" = p."userId"
    JOIN shares s ON s."postId" = p."id"
    LEFT JOIN followers f ON f."followingId" = p."userId"
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM likes WHERE likes."userId" = $1 
		GROUP BY "postId", likes.id) AS "countLikes" ON "countLikes"."postId" = p.id
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM shares WHERE shares."userId" = $1 
		GROUP BY "postId", shares.id) AS "countShares" ON "countShares"."postId" = p.id
    LEFT JOIN comments c ON c."userId" = u."id"
    WHERE f."followerId" = $1 OR s."userId" = $1
    GROUP BY p."id", u.id, s."createdAt", s."userId", "countLikes".count, "countShares".count
)
    ORDER BY "createdAt" DESC
    LIMIT $2;
    `,
    [userId, limit]
  );
}

async function getPostsFromUser(id) {
  return db.query(
    `
    (SELECT p."id", p."url", u."id" as "idUser", p."description", 
    u."username", u."picture" AS "image", p."createdAt", 
    false as repost, null AS "shareUserId",
	COALESCE("countLikes".count, 0) AS "likesTotal",
	COALESCE("countShares".count, 0) AS "countsTotal",
    COALESCE(COUNT(c."postId"), 0) AS "commentsTotal"  
    FROM posts p
    JOIN users u ON u."id" = p."userId"
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM likes 
		WHERE likes."userId" = $1 
		GROUP BY "postId", likes.id) AS "countLikes" ON "countLikes"."postId" = p.id
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM shares WHERE shares."userId" = $1 
		GROUP BY "postId", shares.id) AS "countShares" ON "countShares"."postId" = p.id
    LEFT JOIN comments c ON c."userId" = u."id"
    WHERE p."userId" = $1
    GROUP BY p."id", u.id, "countLikes".count, "countShares".count
  )
UNION ALL 
(SELECT p."id", p."url", u."id" as "idUser", p."description", 
    u."username", u."picture" AS "image", s."createdAt", 
    true as repost, s."userId" AS "shareUserId",
	COALESCE("countLikes".count, 0) AS "likesTotal",
	COALESCE("countShares".count, 0) AS "countsTotal",
    COALESCE(COUNT(c."postId"), 0) AS "commentsTotal" 
    FROM posts p
    JOIN users u ON u."id" = p."userId"
    JOIN shares s ON s."postId" = p."id"
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM likes WHERE likes."userId" = $1 
		GROUP BY "postId", likes.id) AS "countLikes" ON "countLikes"."postId" = p.id
	LEFT JOIN (SELECT "postId", COUNT("postId") 
		FROM shares WHERE shares."userId" = $1 
		GROUP BY "postId", shares.id) AS "countShares" ON "countShares"."postId" = p.id
    LEFT JOIN comments c ON c."userId" = u."id"
    WHERE s."userId" = $1
    GROUP BY p."id", u.id, s."createdAt", s."userId", "countLikes".count, "countShares".count
)
    ORDER BY "createdAt" DESC
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
