import { z } from 'zod'

const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type RegisterType = z.infer<typeof registerSchema>

export { registerSchema, loginSchema, type RegisterType }
