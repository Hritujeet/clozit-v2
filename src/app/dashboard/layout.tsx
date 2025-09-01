import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/header";

export const metadata: Metadata = {
    title: "Clozit | Elevate Your Style, Define Your Story",
    description:
        "Shop the latest fashion trends at Clozit – your go-to online clothing store for stylish, high-quality apparel. Discover trendy outfits, exclusive collections, and effortless shopping with fast delivery. Upgrade your wardrobe today!",
};

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session.user.email == process.env.ADMIN)
        return (
            <main>
                <AdminHeader />
                <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 my-10">
                    {children}
                </div>
            </main>
        );
    else return notFound();
}
