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

const postRepository = {
    searchUser,
    insertPost
}

export default postRepository;