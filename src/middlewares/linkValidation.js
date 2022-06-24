import urlExist from "url-exist";

export default async function linkValidation(req, res, next) {
  const { url } = req.body;
  try {
    const existUrl = await urlExist(url);
    if (!existUrl) return res.status(404).send("Não é um Link válido!");

    next();
  } catch (error) {
    res.sendStatus(404);
    console.log(error.message);
  }
}
