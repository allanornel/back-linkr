import db from "./../config/db.js";

async function searchFollow(from, to) {
  return db.query(`SELECT * FROM followers WHERE "followingId" = $1 AND "followerId" = $2`, [to, from])
}

async function follow(from, to) {
  return db.query(`INSERT INTO followers ("followingId", "followerId") VALUES($1, $2)`, [to, from])
}

async function notFollower(from, to) {
  return db.query(`DELETE FROM followers WHERE "followingId" = $1 AND "followerId" = $2`, [to, from])
}

async function searchFollowing(followerId) {
  return db.query(`SELECT "followingId" FROM followers WHERE "followerId"=$1;`, [followerId])
}

async function userFollowsSomeone(idUser) {
  return db.query(`select count("followerId") as total from users as u inner join followers folow on folow."followerId" = u.id where u.id = $1`, [idUser])
}

const followersRepository = {
  searchFollow,
  follow,
  notFollower,
  searchFollowing,
  userFollowsSomeone
}

export default followersRepository