"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { contactAction } from "@/app/contact/actions";
import z from "zod";

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: z.infer<typeof contactSchema>) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value)
        );

        const result = await contactAction(formData);

        if (result?.success) {
            toast.success("Your message was sent.");
            reset();
        } else {
            toast.error(
                "An unexpected error occurred, please try again later."
            );
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Us
                </h1>
                <p className="mb-8 lg:mb-16 text-center text-muted-foreground">
                    Got a technical issue? Want to send feedback about a
                    feature? Need details about our Business plan? Let us know.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register("name")}
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            disabled={isSubmitting}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                        <Label htmlFor="message">Your message</Label>
                        <Textarea
                            id="message"
                            className="h-40"
                            {...register("message")}
                            disabled={isSubmitting}
                        />
                        {errors.message && (
                            <p className="text-sm text-red-500">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? (
                            <>
                                Submitting...
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
