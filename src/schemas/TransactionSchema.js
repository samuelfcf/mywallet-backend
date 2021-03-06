import joi from 'joi';

const TransactionSchema = joi.object({
  userId: joi.number().integer().min(1).required(),
  description: joi.string().empty().required(),
  value: joi.number().precision(4).strict().required(),
  inflow: joi.boolean().required(),
  date: joi.date().iso().required()
});

export default TransactionSchema;
