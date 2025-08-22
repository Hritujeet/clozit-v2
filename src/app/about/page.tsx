
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
    return (
        <main className="min-h-[80vh] bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-4 py-20">
            <section className="max-w-3xl w-full rounded-xl shadow-lg bg-white p-8 md:p-12 flex flex-col items-center text-center">
                <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">About Clozit Ecommerce</h1>
                    <p className="text-lg text-gray-600 font-medium">Modern Clothing Store Prototype</p>
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed">
                    Clozit Ecommerce is a modern, full-stack prototype for a clothing store, built to showcase best practices in web development. This project leverages <span className="font-semibold text-gray-900">Next.js</span>, <span className="font-semibold text-gray-900">TypeScript</span>, <span className="font-semibold text-gray-900">PostgreSQL</span> (with Prisma), <span className="font-semibold text-gray-900">Tailwind CSS</span>, and <span className="font-semibold text-gray-900">TanStack Query</span> for a seamless developer and user experience.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4 shadow text-sm font-semibold">Next.js</div>
                    <div className="bg-gray-50 rounded-lg p-4 shadow text-sm font-semibold">TypeScript</div>
                    <div className="bg-gray-50 rounded-lg p-4 shadow text-sm font-semibold">PostgreSQL</div>
                    <div className="bg-gray-50 rounded-lg p-4 shadow text-sm font-semibold">Tailwind CSS</div>
                </div>
                <p className="text-gray-600 mb-8">
                    <span className="font-semibold text-gray-900">Note:</span> This site is a demo and does not represent a real store. Orders are for demonstration only; no real products or payments are involved. Stripe Payments are a mock of the real flow of payemnt using the card <strong>4242 4242 4242 4242</strong>. Your feedback and suggestions are welcome!
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
                    <Link href="/" className={buttonVariants({ variant: "default" }) + " w-full md:w-auto"}>
                        Home
                    </Link>
                    <Link href="https://github.com/hritujeet" target="_blank" rel="noopener" className={buttonVariants({ variant: "ghost" }) + " w-full md:w-auto"}>
                        @Hritjeet Sharma
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Page;
