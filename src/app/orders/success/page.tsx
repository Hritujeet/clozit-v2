"use client";
import { confirmOrder } from "@/actions/order.actions";
import { clearCart } from "@/lib/redux/cart/cartSlice";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Package, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PaymentSuccess = () => {
    const params = useSearchParams();
    const sessionId = params.get("session_id");
    const dispatch = useDispatch();
    const [redirect, setredirect] = useState<string>("/");
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            const { redirectUrl } = await confirmOrder(sessionId);
            setredirect(redirectUrl);
            dispatch(clearCart());
        },
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => {
                router.push(redirect);
            }, 2000); // Give user time to see success state
        },
        onError: () => {
            router.push(redirect);
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
        <div className="min-h-[80vh] w-full flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Animated Icon */}
                <div className="relative">
                    <div 
                        className={`mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                            showSuccess 
                                ? 'bg-green-100 dark:bg-green-900/30 scale-110' 
                                : 'bg-blue-50 dark:bg-blue-900/30'
                        }`}
                    >
                        {showSuccess ? (
                            <CheckCircle2 
                                className={`w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400 transition-all duration-500 animate-pulse`}
                            />
                        ) : (
                            <Loader2 
                                className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400 animate-spin" 
                            />
                        )}
                    </div>
                    
                    {/* Ripple effect */}
                    {showSuccess && (
                        <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
                    )}
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all duration-500 ${
                        showSuccess ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'
                    }`}>
                        {showSuccess ? 'Payment Successful!' : 'Processing Your Order...'}
                    </h1>
                    
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
                        {showSuccess 
                            ? 'Your order has been confirmed successfully. Redirecting you now...'
                            : 'Payment was successful. We\'re confirming your order details and preparing everything for you.'
                        }
                    </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center items-center space-x-4 pt-6">
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            mutation.isSuccess ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
                        }`} />
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Payment
                        </span>
                    </div>
                    
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-500 delay-300 ${
                            showSuccess ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`} />
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Confirmation
                        </span>
                    </div>
                    
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    
                    <div className="flex items-center space-x-2">
                        <Package className={`w-3 h-3 transition-colors duration-700 delay-500 ${
                            showSuccess ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Processing
                        </span>
                    </div>
                </div>

                {/* Loading Bar */}
                {!showSuccess && (
                    <div className="w-full max-w-xs mx-auto">
                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" 
                                 style={{ 
                                     animation: 'loading 2s ease-in-out infinite',
                                     width: '60%'
                                 }} 
                            />
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                {showSuccess && (
                    <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 animate-fade-in">
                        <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                            You'll receive an email confirmation shortly with your order details.
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes loading {
                    0%, 100% { transform: translateX(-100%); }
                    50% { transform: translateX(200%); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;