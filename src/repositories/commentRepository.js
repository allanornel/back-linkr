import db from "./../config/db.js";

async function createComment(comment, postId, userId) {
  return db.query(
    `
        INSERT INTO comments (comment, "postId", "userId")
        VALUES ($1, $2, $3);
    `,
    [comment, postId, userId]
  );
}

async function searchComments(postId) {
  return db.query(
    `
        SELECT comments."userId", comments.comment, users.username, users.picture
        FROM comments
        JOIN users ON comments."userId" = users.id
        WHERE comments."postId" = $1;
    `,
    [postId]
  );
}

async function deleteCommentPost(postId) {
  return db.query(`DELETE FROM comments WHERE "postId" = $1`, [postId]);
}

async function countComments(postId) {
  return db.query(`SELECT count(*) FROM comments WHERE "postId" = $1`, [postId]);
}

const commentRepository = {
  createComment,
  searchComments,
  deleteCommentPost,
  countComments,
};

export default commentRepository;
