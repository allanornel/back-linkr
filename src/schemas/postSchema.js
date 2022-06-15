import joi from 'joi';

const postSchema = joi.object({
    url: joi.string().uri().trim().required(),
    description: joi.string()
});

export default postSchema;
