import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PaymentCancel = () => {
    return (
        <div className="h-[60vh] w-full text-3xl font-bold flex flex-col gap-2 justify-center items-center">
            Payment Unsuccessful
            <p className="text-sm">
                The payment couldn't be processed. We won't charge you. You
                order couldn't be placed so you may need to place the order
                again.
            </p>
            <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
                Go To Home
            </Link>
        </div>
    );
};

export default PaymentCancel;
