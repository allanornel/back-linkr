import db from "./../config/db.js";

async function checkSignUp(email, username) {
  return db.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email, username]);
}

async function insertUser(username, email, passwordHash, picture) {
  return db.query("INSERT INTO users(username, email, password, picture) VALUES ($1, $2, $3, $4)", [
    username,
    email.toLowerCase(),
    passwordHash,
    picture,
  ]);
}

async function searchUser(userId) {
  return db.query(
    `
      SELECT * FROM users WHERE id=$1
  `,
    [userId]
  );
}

async function findByUser(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUsers() {
  return db.query(`S
  SELECT u.*, f."followerId" FROM users u
  LEFT JOIN followers f ON u.id = f."followerId"
  `);
}

const userRepository = {
  checkSignUp,
  insertUser,
  searchUser,
  findByUser,
  getUsers,
};

export default userRepository;
