import {z} from "zod"

export const registerInputSchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string(),
  name: z.string(),
});

export const loginInputSchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string(),
});