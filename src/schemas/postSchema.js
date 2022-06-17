import joi from 'joi';

const postSchema = joi.object({
    url: joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).required(),
    description: joi.string()
});

export default postSchema;
