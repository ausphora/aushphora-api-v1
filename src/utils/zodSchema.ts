import { z } from "zod";

export const signupValidationSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signinValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const createProfileValidationSchema = z.object({
    bio: z.string().min(3),
    website: z.string().url(),
    github: z.string().min(3),
    twitter: z.string().min(3),
    instagram: z.string().min(3),
    linkedin: z.string().min(3),
    stackoverflow: z.string().min(3),
});

export const updateProfileValidationSchema = z.object({
    bio: z.string().min(3).optional(),
    website: z.string().url().optional(),
    github: z.string().min(3).optional(),
    twitter: z.string().min(3).optional(),
    instagram: z.string().min(3).optional(),
    linkedin: z.string().min(3).optional(),
    stackoverflow: z.string().min(3).optional(),
});
