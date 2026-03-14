import * as z from "zod"

export const LoginSchema = z.string().regex(/^[a-z]+$/)