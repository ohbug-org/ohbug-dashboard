import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  type: z.enum(['javascript'] as const),
})

export default formSchema
