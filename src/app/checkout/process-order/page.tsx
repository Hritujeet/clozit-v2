"use client";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
    const params = useSearchParams();
    useEffect(() => {
        const a = Object.fromEntries(params);
        console.log(a);
        
    }, []);
    return (
        <main className="h-[60vh] w-full flex flex-col justify-center items-center gap-3 text-center text-balance">
            <div className="flex gap-2 items-center">
                <h1 className="text-4xl font-bold tracking-tight flex gap-2 items-center justify-center">
                    Processing Order...
                </h1>
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground text-center">
                Your Order is being processed, you will be redirected
                automatically.
            </p>
        </main>
    );
};

export default page;
