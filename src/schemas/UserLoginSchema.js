import joi from "joi";

const UserLoginSchema = joi.object({
  email: joi.string().empty().required(),
  password: joi.string().min(6).empty().required(),
  id: joi.any().forbidden()
});

export default UserLoginSchema;