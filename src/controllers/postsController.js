import urlMetadata from 'url-metadata';

import userRepository from "./../repositories/usersRepository.js";
import postRepository from "./../repositories/postRepository.js";
import hastagRepository from "./../repositories/hashtagRepository.js";


export async function createPost(req, res) {
    const { user } = JSON.parse(JSON.stringify(res.locals));
    const { url, description } = req.body;
  try {
    const userResult = await userRepository.searchUser(user.id);
    if (userResult.rowCount === 0) return res.sendStatus(404);

    const post = await postRepository.insertPost(url, description, user.id);

    const hastags = description.match(/(\s|^)\#\w\w+\b/gm)

    await hastagRepository.insertHashtag(hastags, post.rows[0].id)

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getTimeline(req, res) {
    //const { user } = JSON.parse(JSON.stringify(res.locals));

    try {
        const { rows } = await postRepository.getPosts();

        await Promise.all(rows.map(async (post) => {
            const { title, image, description } = await urlMetadata(post.url);
            
            post.title = title;
            post.postImage = image;
            post.urlDescription = description;
        }));

        res.status(200).send(rows);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getUserPosts(req, res) {
    const { id } = req.params;
    
    try {
        const { rows } = await postRepository.getPostsFromUser(id);

        await Promise.all(rows.map(async (post) => {
            const { title, image, description } = await urlMetadata(post.url);
            
            post.title = title;
            post.postImage = image;
            post.urlDescription = description;
        }));

        res.status(200).send(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deletePost (req, res) {
    try {
        const { postId } = req.params
        const user = res.locals.user

        
        const findPost = await postRepository.findPost(postId)


        if (findPost.rows[0].userId !== user.id) {
          return res.sendStatus(401)
        }

        await hastagRepository.deletePostHashTags(postId)

        await postRepository.deletePost(postId)

        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}