import z from "zod";
import { authClient } from "@/lib/auth-client"
import { signInSchema, signUpSchema } from "@/lib/utils";

export const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    try {
        const response = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        });

        if (response.error) {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        throw new Error("Invalid Credentials");
    }
};

export const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
        const response = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
        });

        if (response.error) {
            throw new Error(
                "Email Already registered. Use a different email or sign in."
            );
        }
    } catch (error) {
        throw new Error("Cannot Sign Up, please try again later.");
    }
};
