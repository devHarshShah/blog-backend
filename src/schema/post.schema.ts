import { z } from 'zod';
import mongoose from 'mongoose';

const postSchema = z.object({
  title: z.string(),
  content: z.string()
});

type PostType = z.infer<typeof postSchema>;

export { postSchema, type PostType };
