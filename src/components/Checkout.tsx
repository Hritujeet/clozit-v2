"use client";
import { loadCart } from "@/lib/utils";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Checkout = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [clientSecret, setClientSecret] = useState<string>("");
    const config = localStorage.getItem("config");
    const cart = loadCart();

    useEffect(() => {
        const orderData = {
            config: JSON.parse(config),
            cart,
        };
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount,
                orderData: orderData,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setClientSecret(data.clientSecret);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Payment intent creation failed:", error);
                setErrorMessage("Failed to initialize payment");
                setLoading(false);
            });
    }, []);
    
    if (loading) {
        <div className="flex justify-center items-center py-4 w-full">
            <Loader2 className="animate-spin text-primary" />
        </div>;
    }
    return (
        <div>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            {clientSecret && <PaymentElement />}
            <Button
                className="w-full hover:ring-2 hover:ring-offset-2 hover:ring-primary mt-4"
                size="lg"
                disabled={loading || !stripe || !elements}
                onClick={async (event) => {
                    event.preventDefault();
                    setLoading(true);

                    if (!stripe || !elements) {
                        return;
                    }

                    const { error: submitError } = await elements.submit();

                    if (submitError) {
                        setErrorMessage(submitError.message);
                        setLoading(false);
                        return;
                    }

                    const { error } = await stripe.confirmPayment({
                        elements,
                        clientSecret,
                        confirmParams: {
                            return_url:
                                "http://localhost:3000/checkout/process-order",
                        },
                    });

                    if (error) {
                        setErrorMessage(error.message);
                    }
                    setLoading(false);
                }}
            >
                {loading ? (
                    <>
                        Processing... <Loader2 className="animate-spin" />
                    </>
                ) : (
                    <>
                        Place Order <CheckCircle />
                    </>
                )}
            </Button>
        </div>
    );
};
export default Checkout;
