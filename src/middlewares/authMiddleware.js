import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    const secretKey = process.env.JWT_TOKEN;

    if (!token) {
        return res.sendStatus(401);
    }

    const user = jwt.verify(token, secretKey);
    if (!user) {return res.status(401);}
    res.locals.user = user;
    next();
}