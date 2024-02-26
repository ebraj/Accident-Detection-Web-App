import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least 7 characters long" }),
});

export { LoginSchema };
