import db from "./../config/db.js";

async function searchFollow(from, to) {
  return db.query(`SELECT * FROM followers WHERE "followingId" = $1 AND "followerId" = $2`, [from, to])
}

async function follow(from, to) {
  return db.query(`INSERT INTO followers ("followingId", "followerId") VALUES($1, $2)`, [from, to])
}

async function notFollower(from, to) {
  return db.query(`DELETE FROM followers WHERE "followingId" = $1 AND "followerId" = $2`, [from, to])
}

async function searchFollowing(followerId) {
  return db.query(`SELECT "followingId" FROM followers WHERE "followerId"=$1;`, [followerId])
}

const followersRepository = {
  searchFollow,
  follow,
  notFollower,
  searchFollowing
}

export default followersRepository