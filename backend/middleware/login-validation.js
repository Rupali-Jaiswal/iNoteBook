const { z } = require("zod");

// Creating an object schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
   password: z
    .string({ required_error: "Password is required" }).trim()
    .min(3, { message: "Password must be at least of 3 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

module.exports = loginSchema;