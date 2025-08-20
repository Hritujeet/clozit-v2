"use client";
import { confirmOrder } from "@/actions/order.actions";
import { clearCart } from "@/lib/redux/cart/cartSlice";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PaymentSuccess = () => {
    const params = useSearchParams();
    const sessionId = params.get("session_id");
    const dispatch = useDispatch();
    const [redirect, setredirect] = useState<string>("/");
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            const { redirectUrl } = await confirmOrder(sessionId);
            setredirect(redirectUrl);
            dispatch(clearCart());
        },
        onSuccess: () => {
            router.push(redirect);
        },
        onError: () => {
            router.push(redirect);
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
        <div className="h-[80vh] w-full flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight flex gap-2 justify-center items-center">
                Your Order is being processed...{" "}
                <Loader2 className="w-6 h-6 animate-spin" />
            </h1>
            <p className="text-muted-foreground text-sm">
                Payment was successful. We’re confirming your order. You will be
                redirected automatically
            </p>
        </div>
    );
};

export default PaymentSuccess;
