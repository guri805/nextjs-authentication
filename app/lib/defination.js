import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string()
        .email("Invalid email address") // Validates that the input is a valid email
        .nonempty("Email is required"), // Ensures the email field is not empty
    password: z
        .string()
        .min(4, "Password must be at least 8 characters long") // Ensures password length
        .nonempty("Password is required"), // Ensures the password field is not empty
});
