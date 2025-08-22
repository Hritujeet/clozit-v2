"use server";
import { contactSchema } from "@/lib/utils";
import { db } from "@/utils/db/db";

export const contactAction = async (data: FormData) => {
    try {
        const payload = {
            name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            message: data.get("message"),
        };

        const result = contactSchema.safeParse(payload);

        if (!result.success) {
            return {
                success: false,
                error: result.error.message,
            };
        }

        const newContact = await db.contact.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                phone: result.data.phone,
                message: result.data.message,
            },
        });

        return { success: true, newContact };
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
};
