import joi from "joi";

const UserSchema = joi.object({
  name: joi.string().empty().required(),
  email: joi.string().empty().required(),
  password: joi.string().min(6).empty().required(),
  id: joi.any().forbidden()
});

export default UserSchema;