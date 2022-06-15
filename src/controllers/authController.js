import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import usersRepository from "../repositories/usersRepository.js";

export async function signUp(req, res) {
  const { email, username, password, picture } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    let findEmailUsername = await usersRepository.checkSignUp(email, username);
    if (findEmailUsername.rowCount > 0) {
      return res.status(409).send("Email/Username já cadastrado!");
    }
    await usersRepository.insertUser(
      username,
      email.toLowerCase(),
      passwordHash,
      picture
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function Signin(req, res) {
  const { email, password } = req.body
  try {

    const findEmailUsername = await usersRepository.findByUser(email)

    if (!findEmailUsername.rowCount) {
      return res.status(401).json({ error: 'Email não cadastrado!' })
    }


    if(!(await bcrypt.compare(password, findEmailUsername.rows[0].password))) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    const data = {
      id: findEmailUsername.rows[0].id,
      username: findEmailUsername.rows[0].username,
      picture: findEmailUsername.rows[0].picture
    }

    const token = jwt.sign(data, process.env.JWT_TOKEN)

    res.status(200).json(token)

  } catch (error) {
    res.sendStatus(500)
  }
}