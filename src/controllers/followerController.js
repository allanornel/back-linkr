import followersRepository from "../repositories/followRepository.js";

export async function Follower(req, res) {
  
  const { from, to } = req.body


  const iFollow = await followersRepository.searchFollow(from, to)
  if(iFollow.rowCount) {
    await followersRepository.notFollower(from, to)
    return res.sendStatus(204)
  }
  
  await followersRepository.follow(from, to)

  res.sendStatus(204)

}

export async function FollowMe(req, res) {

  const { from, to } = req.query

  if(!from || !to) {
    return res.sendStatus(400)
  }


  let iFollow = false

  const searchFollow = await followersRepository.searchFollow(from, to)

  if(searchFollow.rowCount) {
    iFollow = true
  }


  res.status(200).json({ iFollow  })

}

export async function UserFollowsSomeone(req, res) {
  const { id } = req.query

  if(!id) {
    return res.sendStatus(400)
  }


  const userFollower = await followersRepository.userFollowsSomeone(id)


  if(userFollower.rows[0].total === '0') {
    return res.status(200).json({ follow: false })
  }

  return res.status(200).json({ follow: true })
  

}