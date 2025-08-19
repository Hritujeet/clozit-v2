import React from 'react';
import SignUpComponent from "@/components/SignUpComponent";
import { Metadata } from 'next';

const Page = () => {
    return (
        <div>
            <SignUpComponent></SignUpComponent>
        </div>
    );
};

export default Page;

export const metadata: Metadata = {
    title: "Sign Up | Clozit",
    description: "Shop the latest fashion trends at Clozit – your go-to online clothing store for stylish, high-quality apparel. Discover trendy outfits, exclusive collections, and effortless shopping with fast delivery. Upgrade your wardrobe today!",
  };
  