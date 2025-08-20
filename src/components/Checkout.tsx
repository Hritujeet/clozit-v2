"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { checkoutSchema, convertToSubcurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createAuthClient } from "better-auth/react";
import { City, State } from "country-state-city";
import { ArrowRight, Loader2, MapPin, Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Stripe Key Undefined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const { useSession } = createAuthClient();

const Checkout = () => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            streetAddress: "",
            state: "",
            city: "",
        },
    });
    const cart = useSelector((state: any) => state.cart.items);
    const [subtotal, setSubtotal] = useState(0);
    const [amountToPay, setAmountToPay] = useState(0);
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    const selectedState = watch("state");
    const states = State.getStatesOfCountry("IN");
    const cities = selectedState
        ? City.getCitiesOfState("IN", selectedState)
        : [];

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.isPending) return;
        if (!session.data) {
            router.push("/auth/signin");
            return;
        }

        let total = 0;
        Object.keys(cart).forEach((item: string) => {
            total += cart[item].price * cart[item].qty;
        });
        const shipping = 9.99;
        setSubtotal(total);
        setAmountToPay(total + shipping);
        setIsCartLoaded(true);
    }, [session, cart, router]);

    const onSubmit = (data: any) => {
        console.log(data);
    };

    if (!isCartLoaded || amountToPay === 0) {
        return (
            <main className="flex flex-col justify-center items-center w-full h-64">
                <h1 className="text-4xl font-bold text-primary">
                    Loading Checkout Details
                </h1>
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </main>
        );
    }

    return (
        <main className="flex justify-center items-center w-full px-8 sm:px-12 md:px-16 lg:px-20 xl:px-32 min-h-[60vh]">
            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amountToPay),
                    currency: "usd",
                }}
            >
                <div
                    suppressHydrationWarning
                    className="min-h-screen py-8 w-full"
                >
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold tracking-tight text-pretty text-primary">
                                Checkout
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Fill out the given details and proceed to pay
                            </p>
                        </div>

                        {/* Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Checkout Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Delivery Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-4"
                                        >
                                            {/* Full Name + Phone */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullname">
                                                        Full Name
                                                    </Label>
                                                    <Input
                                                        {...register(
                                                            "fullName"
                                                        )}
                                                        id="fullname"
                                                        type="text"
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.fullName && (
                                                        <Alert
                                                            variant="destructive"
                                                            className="bg-destructive/20 border-none"
                                                        >
                                                            <AlertTitle>
                                                                Invalid Name
                                                            </AlertTitle>
                                                            <AlertDescription>
                                                                Full Name should
                                                                be at least 6
                                                                characters long
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        {...register("phone")}
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="+91 9056X XXXXX"
                                                    />
                                                    {errors.phone && (
                                                        <Alert
                                                            variant="destructive"
                                                            className="bg-destructive/20 border-none"
                                                        >
                                                            <AlertTitle>
                                                                Invalid Phone
                                                            </AlertTitle>
                                                            <AlertDescription>
                                                                Phone Number
                                                                should have 10
                                                                digits
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Street Address */}
                                            <div className="space-y-2">
                                                <Label htmlFor="address">
                                                    Street Address
                                                </Label>
                                                <Input
                                                    {...register(
                                                        "streetAddress"
                                                    )}
                                                    id="address"
                                                    type="text"
                                                    placeholder="12, Indra Vihar"
                                                />
                                                {errors.streetAddress && (
                                                    <Alert
                                                        variant="destructive"
                                                        className="bg-destructive/20 border-none"
                                                    >
                                                        <AlertTitle>
                                                            Invalid Street
                                                        </AlertTitle>
                                                        <AlertDescription>
                                                            Street Address
                                                            should be at least 6
                                                            characters long
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            {/* State + City */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2 w-full">
                                                    <Label>State</Label>
                                                    <Controller
                                                        control={control}
                                                        name="state"
                                                        render={({ field }) => (
                                                            <Select
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select State" />
                                                                </SelectTrigger>
                                                                <SelectContent className="w-full">
                                                                    {states.map(
                                                                        (s) => (
                                                                            <SelectItem
                                                                                key={
                                                                                    s.isoCode
                                                                                }
                                                                                value={
                                                                                    s.isoCode
                                                                                }
                                                                            >
                                                                                {
                                                                                    s.name
                                                                                }
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                    {errors.state && (
                                                        <Alert
                                                            variant="destructive"
                                                            className="bg-destructive/20 border-none"
                                                        >
                                                            <AlertTitle>
                                                                Invalid State
                                                            </AlertTitle>
                                                            <AlertDescription>
                                                                You need to
                                                                select a state
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-2 w-full">
                                                <Label>City</Label>
                                                <Controller
                                                    control={control}
                                                    name="city"
                                                    render={({ field }) => (
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}
                                                            disabled={
                                                                !selectedState
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select City" />
                                                            </SelectTrigger>
                                                            <SelectContent className="w-full">
                                                                {cities.map(
                                                                    (c) => (
                                                                        <SelectItem
                                                                            key={
                                                                                c.name
                                                                            }
                                                                            value={
                                                                                c.name
                                                                            }
                                                                        >
                                                                            {
                                                                                c.name
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.city && (
                                                    <Alert
                                                        variant="destructive"
                                                        className="bg-destructive/20 border-none"
                                                    >
                                                        <AlertTitle>
                                                            Invalid City
                                                        </AlertTitle>
                                                        <AlertDescription>
                                                            You need to select a
                                                            city
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            {/* Submit */}

                                            <Button
                                                className="w-full"
                                                size="lg"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        Processing...{" "}
                                                        <Loader2 className="animate-spin" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Proceed to Pay{" "}
                                                        <ArrowRight />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm sticky top-6">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <Package className="h-5 w-5 text-primary" />
                                            Order Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            {Object.keys(cart).map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-sm truncate">
                                                                {
                                                                    cart[item]
                                                                        .productName
                                                                }
                                                            </h4>
                                                            <p className="text-xs text-muted-foreground">
                                                                $
                                                                {cart[
                                                                    item
                                                                ].price.toFixed(
                                                                    2
                                                                )}{" "}
                                                                each
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium w-6 text-center">
                                                                {cart[item].qty}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Separator />

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Subtotal
                                                </span>
                                                <span>
                                                    ${subtotal.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground flex items-center gap-1">
                                                    <Truck className="h-3 w-3" />
                                                    Shipping
                                                </span>
                                                <span>$9.99</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span>Total</span>
                                                <span>
                                                    ${amountToPay.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Elements>
        </main>
    );
};

export default Checkout;
