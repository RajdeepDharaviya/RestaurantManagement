const zod = require("zod");

const usersignupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
  contact: zod.number().min(10),
  role: zod.string(),
});

const customersignupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8).max(16),
  contact: zod.number().min(10),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8).max(16),
});

module.exports = { usersignupSchema, customersignupSchema, signinSchema };
