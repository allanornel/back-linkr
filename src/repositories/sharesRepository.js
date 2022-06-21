import db from "./../config/db.js";

async function postShare(userId, postId) {
  return db.query(`INSERT INTO shares("postId", "userId") VALUES ($1, $2)`, [postId, userId]);
}

async function getSharesByPostId(postId) {
  return db.query(
    `
    SELECT COUNT(s."postId") AS "shares" FROM shares s
    WHERE s."postId" = $1
  `,
    [postId]
  );
}

// TODO
// ESTUDAR ESSA QUERY PARA SABER PORQUE COUNT TÁ BUGANDO
// SELECT p."id", p."url", u."id" as "idUser", p."description",
//            u."username", u."picture" AS "image",
//             COUNT(l.id) AS "likesTotal"
//             COUNT(s."postId") AS "sharesTotal"
//             FROM posts p
//             JOIN users u ON u.id= p."userId"
//             LEFT JOIN shares s ON p.id = s."postId"
//             LEFT JOIN likes l ON p.id = l."postId"
//             GROUP BY p.id, u.id
//             ORDER BY p."createdAt" DESC
//             LIMIT 20;

const sharesRepository = {
  postShare,
  getSharesByPostId,
};

export default sharesRepository;
