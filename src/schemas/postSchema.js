import joi from 'joi';

const pattern = '/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm';

const postSchema = joi.object({
    url: joi.string().regex(pattern).required(),
    description: joi.string()
});

export default postSchema;
