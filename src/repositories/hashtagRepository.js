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
    let Args = [hashtags[i].replace(/#/, '').trim(), postId];
    array.push(await db.query(querySrtring, Args));
  }
  return array;
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
    `SELECT p.* FROM hashtags h 
    JOIN "postsHashtags" ph ON ph."idHashtag"=h.id
    JOIN posts p ON ph."idPost" = p.id 
    WHERE h.name = $1;`,
    [hashtag]
  );
}

async function checkHashtagByName(hashtag) {
  return db.query(`SELECT * FROM hashtags WHERE name = $1`, [hashtag]);
}

const hashtagRepository = {
  insertHashtag,
  getHashtags,
  getHashtagByName,
  checkHashtagByName,
};
export default hashtagRepository;
