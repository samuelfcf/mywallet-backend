import joi from "joi";

const TransactionSchema = joi.object({
  user_id: joi.number().integer().min(1).required(),
  description: joi.string().empty().required(),
  value: joi.number().integer().min(1).required(),
  inflow: joi.boolean().required(),
  data: joi.date().iso().required(),
  id: joi.any().forbidden()
});

export default TransactionSchema;