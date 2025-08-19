"use client";
import { authClient } from "@/components/auth-client";
import { signInSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { handleSignIn } from "@/lib/auth/helpers";

const SignInComponent = () => {
    const queryClient = useQueryClient();
    const [pending, setpending] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signInSchema) });

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof signInSchema>) => {
            await handleSignIn(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Signed In Succesfully", {
                duration: 2000,
            });
            reset();
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        },
        onError: () => {
            toast.error("Invalid Credentials!", {
                duration: 2000,
            });
            reset();
        },
    });

    const onSubmit = async (formData: z.infer<typeof signInSchema>) => {
        const { data, success } = z.safeParse(signInSchema, formData);
        if (success) {
            mutation.mutate(data);
        } else {
            toast.error("Something went wrong, please try again later!");
        }
    };

    return (
        <div className="max-w-lg w-full mx-auto">
            <h1 className="text-3xl font-black text-center text-primary">
                Sign In to Clozit
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-6 px-6 py-3 my-8"
            >
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register("email", { required: true })}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="john@example.com"
                        disabled={mutation.isPending || pending}
                    />
                    {errors?.email && (
                        <Alert
                            className="border-none bg-destructive/10"
                            variant="destructive"
                        >
                            <AlertTitle>Email is required</AlertTitle>
                            <AlertDescription>
                                Please enter a valid email
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        {...register("password", { required: true })}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        disabled={mutation.isPending || pending}
                    />
                    {errors?.password && (
                        <Alert
                            className="border-none bg-destructive/10"
                            variant="destructive"
                        >
                            <AlertTitle>Password is required</AlertTitle>
                            <AlertDescription>
                                Password should be at least 6 characters long
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                <Button
                    disabled={mutation.isPending || pending}
                    type="submit"
                    className="w-full"
                >
                    {mutation.isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mb-5">
                <span className="bg-card text-muted-foreground relative z-10 px-4">
                    Or Continue With
                </span>
            </div>
            <div className="flex items-center gap-2 px-6">
                <Button
                    disabled={pending || mutation.isPending}
                    variant={"outline"}
                    className="w-full hover:bg-primary/10"
                    onClick={async () => {
                        setpending(true);
                        await authClient.signIn.social({
                            provider: "google",
                        });
                        toast.success("Signed In Successfully", {
                            duration: 2000,
                        });
                        setpending(false);
                    }}
                >
                    {pending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <Image
                                src="/google.svg"
                                alt="Google"
                                width={24}
                                height={24}
                            />
                            Google
                        </>
                    )}
                </Button>
            </div>
            <p className="text-center text-muted-foreground mt-4">
                Don't have an account?{" "}
                <Link
                    href="/auth/sign-up"
                    className="text-primary hover:underline underline-offset-2"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default SignInComponent;
