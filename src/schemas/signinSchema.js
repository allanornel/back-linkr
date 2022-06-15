import joi from "joi";

const SigninValidation = joi.object({
  email: joi.string().required().email().messages({
    'string.empty': 'informe um email',
    'string.email': 'informe um email válido'
  }),
  password: joi.string().required().messages({
    'string.empty': `informe uma senha`
  })
})

export default SigninValidation