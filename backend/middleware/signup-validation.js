const { z } = require("zod");


// Creating an object schema
const signupSchema = z.object({
    name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
   password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least of 3 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

module.exports = signupSchema;