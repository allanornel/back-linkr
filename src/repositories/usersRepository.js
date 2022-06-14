import db from "./../config/db.js";

async function checkSignUp(email, username) {
  return db.query("SELECT * FROM users WHERE email = $1 OR username = $2", [
    email,
    username,
  ]);
}

async function insertUser(username, email, passwordHash, picture) {
  return db.query(
    "INSERT INTO users(username, email, password, picture) VALUES ($1, $2, $3, $4)",
    [username, email.toLowerCase(), passwordHash, picture]
  );
}

const userRepository = {
  checkSignUp,
  insertUser,
};

export default userRepository;
