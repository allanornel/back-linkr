import db from "./../config/db.js";

async function createComment(comment, postId, userId){
    return db.query(`
        INSERT INTO comments (comment, "postId", "userId")
        VALUES ($1, $2, $3);
    `, [comment, postId, userId]);
}

const commentRepository = {
    createComment
}

export default commentRepository;