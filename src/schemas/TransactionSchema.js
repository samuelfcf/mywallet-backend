import joi from "joi";

const TransactionSchema = joi.object({
  user_id: joi.number().integer().min(1).required(),
  description: joi.string().empty().required(),
  value: joi.number().strict().required(),
  inflow: joi.boolean().required(),
  date: joi.date().iso().required(),
  id: joi.any().forbidden()
});

export default TransactionSchema;
