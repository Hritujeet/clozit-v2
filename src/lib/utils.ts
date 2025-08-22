import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export interface cartItem {
    productName: string;
    variant: {
        color: string;
        size: string;
    };
    qty: number;
    price: number;
}

export const colorMap: Record<string, string> = {
    red: "border-red-400 bg-red-400",
    redLight: "border-red-200 bg-red-200",
    redDark: "border-red-600 bg-red-600",
    blue: "border-blue-400 bg-blue-400",
    blueLight: "border-blue-200 bg-blue-200",
    blueDark: "border-blue-600 bg-blue-600",
    green: "border-green-400 bg-green-400",
    greenLight: "border-green-200 bg-green-200",
    greenDark: "border-green-600 bg-green-600",
    yellow: "border-yellow-400 bg-yellow-400",
    yellowLight: "border-yellow-200 bg-yellow-200",
    yellowDark: "border-yellow-600 bg-yellow-600",
    pink: "border-pink-400 bg-pink-400",
    pinkLight: "border-pink-200 bg-pink-200",
    pinkDark: "border-pink-600 bg-pink-600",
    orange: "border-orange-400 bg-orange-400",
    orangeLight: "border-orange-200 bg-orange-200",
    orangeDark: "border-orange-600 bg-orange-600",
    purple: "border-purple-400 bg-purple-400",
    purpleLight: "border-purple-200 bg-purple-200",
    purpleDark: "border-purple-600 bg-purple-600",
    teal: "border-teal-400 bg-teal-400",
    tealLight: "border-teal-200 bg-teal-200",
    tealDark: "border-teal-600 bg-teal-600",
    indigo: "border-indigo-400 bg-indigo-400",
    indigoLight: "border-indigo-200 bg-indigo-200",
    indigoDark: "border-indigo-600 bg-indigo-600",
    gray: "border-gray-400 bg-gray-400",
    grayLight: "border-gray-200 bg-gray-200",
    grayDark: "border-gray-600 bg-gray-600",
    black: "border-black bg-black",
    white: "border-gray-300 bg-white",
    amber: "border-amber-400 bg-amber-400",
    lime: "border-lime-400 bg-lime-400",
    cyan: "border-cyan-400 bg-cyan-400",
    rose: "border-rose-400 bg-rose-400",
    fuchsia: "border-fuchsia-400 bg-fuchsia-400",
    violet: "border-violet-400 bg-violet-400",
};

export type cartType = Record<string, cartItem>;

export const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
});

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const checkoutSchema = z.object({
    fullName: z.string().min(6),
    phone: z.string().min(10).max(10),
    streetAddress: z.string().min(6),
    city: z.string().min(1),
    state: z.string().min(1),
});

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatText = (str: string) => {
    const text = str.replace("_", "-");
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const saveCart = (cart: cartType) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const loadCart = () => {
    return JSON.parse(localStorage.getItem("cart"));
};

export const convertToSubcurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor);
};
