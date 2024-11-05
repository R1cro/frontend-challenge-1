import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(4, { message: 'Invalid username.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
});
