import db from "./../config/db.js";

async function insertHashtag(hashtags, postId) {
  const querySrtring = `
    with hashtag as (
        insert into hashtags (name)
        values ($1)
        returning id   
    )
    insert into "postsHashtags" ("idPost", "idHashtag")
    values ($2, (select id from hashtag));
`;
  let array = [];
  for (let i = 0; i < hashtags.length; i++) {
    let Args = [hashtags[i].replace(/#/, "").trim(), postId];
    array.push(await db.query(querySrtring, Args));
  }
  return array;
}

async function insertHashtagExists(idHashtag, idPost) {
  return db.query(
    `INSERT INTO "postsHashtags" ("idPost", "idHashtag")
  values ($1, $2)`,
    [idPost, idHashtag]
  );
}

async function getHashtags() {
  return db.query(`
    SELECT hashtags.id,hashtags.name FROM "postsHashtags" AS ph
    JOIN hashtags ON ph."idHashtag"=hashtags.id
    GROUP BY hashtags.name,ph."idHashtag",hashtags.id
    ORDER BY COUNT (ph."idHashtag") DESC 
    LIMIT 10;`);
}

async function getHashtagByName(hashtag) {
  return db.query(
    `SELECT p."id", p."url", u."id" as "idUser", p."description", 
    h."name" AS "hashtag",
    u."username", u."picture" AS "image",
    COALESCE(COUNT(l."id"), 0) AS "likesTotal"  
    FROM hashtags h
    JOIN "postsHashtags" ph ON ph."idHashtag" = h.id    
    LEFT JOIN posts p ON ph."idPost" = p.id
    LEFT JOIN likes l ON l."postId" = p.id
    LEFT JOIN users u ON p."userId" = u.id
    WHERE h.name = $1
    GROUP BY p."id", p."url", p."description", h."name",
    u."username", u."picture", u."id"
    ORDER BY p."createdAt" DESC
    LIMIT 20`,
    [hashtag]
  );
}

async function checkHashtagByName(hashtag) {
  return db.query(`SELECT * FROM hashtags WHERE name = $1`, [hashtag]);
}

async function deletePostHashTags(idPost) {
  return db.query(`DELETE FROM "postsHashtags" WHERE "idPost" = $1`, [idPost]);
}

const hashtagRepository = {
  insertHashtag,
  getHashtags,
  getHashtagByName,
  checkHashtagByName,
  deletePostHashTags,
  insertHashtagExists,
};
export default hashtagRepository;
