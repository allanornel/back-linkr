import bcrypt from "bcrypt";
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
