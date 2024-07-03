import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(5, "Title is required").max(30),
    body: z.string().min(10, "Body is required").max(500),
    flairs: z.string().optional(),
});

export const habitSchema = z.object( {
    habit: z.string().regex(/[a-zA-Z]+$/).min(3, 'cannot be shorted than 3').max(20,'cannot be longer than 20')
})