"use server"
import axios from "axios";

import { loginFormSchema } from "../lib/defination";
import { createSession } from "../lib/session";

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
        } else {
            const { email, password } = validatedFields?.data
            console.log(validatedFields.data);
            
            const response = await axios.post(`http://localhost:3001/login`, { email, password })
            if (response?.data?.success) {
                const userEmail = response?.data?.user?.email
                await createSession(userEmail)
                
            }else{
                return{errors: 'an error occured while login'}
            }
            return response.data;
        }

    } catch (error) {

    }
};
