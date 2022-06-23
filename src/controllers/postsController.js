import urlMetadata from "url-metadata";

import userRepository from "./../repositories/usersRepository.js";
import postRepository from "./../repositories/postRepository.js";
import hashtagRepository from "./../repositories/hashtagRepository.js";
import likeRepository from "./../repositories/likeRepository.js";
import sharesRepository from "./../repositories/sharesRepository.js";
import commentRepository from "./../repositories/commentRepository.js";

export async function createPost(req, res) {
  const { user } = JSON.parse(JSON.stringify(res.locals));
  const { url, description } = req.body;
  try {
    const userResult = await userRepository.searchUser(user.id);
    if (userResult.rowCount === 0) return res.sendStatus(404);

    const post = await postRepository.insertPost(url, description, user.id);
    const postId = post.rows[0].id;
    const hashtags = description.match(/(\s|^)\#\w\w+\b/gm);
    if (hashtags) {
      await Promise.all(
        hashtags.map(async (hashtag) => {
          const checkHashtag = await hashtagRepository.checkHashtagByName(hashtag.replace(/#/, "").trim());
          if (checkHashtag.rowCount === 0) await hashtagRepository.insertHashtag([hashtag], postId);
          else await hashtagRepository.insertHashtagExists(checkHashtag.rows[0].id, postId);
        })
      );
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getTimeline(req, res) {
  const { user } = JSON.parse(JSON.stringify(res.locals));
  const { limit } = req.body;

  try {
    const { id } = user;
    const { rows } = await postRepository.getPosts(limit, id);

    await Promise.all(
      rows.map(async (post) => {
        const { title, image, description } = await urlMetadata(post.url);
        post.title = title;
        post.postImage = image;
        post.urlDescription = description;
      })
    );

    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getNumberOfPosts(req, res) {
  try {
    const { rows } = await postRepository.getTotalPosts();
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;

  try {
    const userExist = await userRepository.searchUser(id);
    if (userExist.rowCount === 0) return res.sendStatus(404);

    const { rows } = await postRepository.getPostsFromUser(id);

    await Promise.all(
      rows.map(async (post) => {
        const { title, image, description } = await urlMetadata(post.url);

        post.title = title;
        post.postImage = image;
        post.urlDescription = description;
      })
    );

    res.status(200).send({ name: userExist.rows[0].username, posts: rows });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function editPost(req, res) {
  const { postId } = req.params;
  const { user } = JSON.parse(JSON.stringify(res.locals));
  const { description, url } = req.body;
  try {
    const userResult = await userRepository.searchUser(user.id);
    if (userResult.rowCount === 0) return res.sendStatus(404);

    const postResult = await postRepository.findPost(postId);
    if (postResult.rowCount === 0) return res.sendStatus(404);
    if (postResult.rows[0].userId !== user.id) return res.sendStatus(401);

    await postRepository.editPost(url, description, postId);
    await hashtagRepository.deletePostHashTags(postId);

    const hashtags = description.match(/(\s|^)\#\w\w+\b/gm);
    if (hashtags) {
      await Promise.all(
        hashtags.map(async (hashtag) => {
          const checkHashtag = await hashtagRepository.checkHashtagByName(hashtag.replace(/#/, "").trim());
          if (checkHashtag.rowCount === 0) await hashtagRepository.insertHashtag([hashtag], postId);
          else await hashtagRepository.insertHashtagExists(checkHashtag.rows[0].id, postId);
        })
      );
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    const user = res.locals.user;

    const findPost = await postRepository.findPost(postId);

    if (findPost.rows[0].userId !== user.id) {
      return res.sendStatus(401);
    }

    await hashtagRepository.deletePostHashTags(postId);
    await likeRepository.deleteLikesForDeletePost(postId);
    await commentRepository.deleteCommentPost(postId);
    await sharesRepository.deleteSharesPost(postId);

    await postRepository.deletePost(postId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUsers(req, res) {
  try {
    const user = res.locals.user;
    const users = await userRepository.getUsers(user.id);
    res.status(201).send(users.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
