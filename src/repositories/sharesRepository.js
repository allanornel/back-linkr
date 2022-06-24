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

async function deleteSharesPost(postId) {
  return db.query(`DELETE FROM shares WHERE "postId"=$1`, [postId]);
}

const sharesRepository = {
  postShare,
  getSharesByPostId,
  deleteSharesPost,
};

export default sharesRepository;
