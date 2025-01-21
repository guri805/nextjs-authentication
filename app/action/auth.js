"use server";
import axios from "axios";
import { loginFormSchema } from "../lib/defination";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

export const login = async (state, formData) => {
    // Validate form data using the schema
    const validatedFields = loginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    try {
        if (!validatedFields?.success) {
            // Return validation errors
            return {
                errors: validatedFields?.error?.flatten()?.fieldErrors,
            };
        }
        const { email, password } = validatedFields?.data;
        console.log(validatedFields.data);

        const response = await axios.post(`http://localhost:3001/login`, { email, password });

        if (response?.data?.success) {
            const userEmail = response?.data?.user?.email;
            const userRole = response?.data?.user?.role;
            await createSession(userEmail, userRole);
            return response.data;
        } else {
            return { errors: 'An error occurred while logging in' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { errors: 'Unexpected error occurred during login' };
    }
};

export async function logout() {
    deleteSession();
    redirect('/');
}


