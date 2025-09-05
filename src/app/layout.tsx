import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/Footer";
import QueryProvider from "@/lib/Providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/lib/Providers/StoreProvider";
import { ThemeProvider } from "@/lib/Providers/theme-provider";

export const metadata: Metadata = {
    title: "Clozit | Elevate Your Style, Define Your Story",
    description:
        "Shop the latest fashion trends at Clozit – your go-to online clothing store for stylish, high-quality apparel. Discover trendy outfits, exclusive collections, and effortless shopping with fast delivery. Upgrade your wardrobe today!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <StoreProvider>
                        <QueryProvider>
                            <NextTopLoader
                                showSpinner={false}
                                height={2}
                                shadow={false}
                                color="red"
                            />
                            <Navbar />
                            <Toaster position={"bottom-left"} />
                            {children}
                            <Footer></Footer>
                        </QueryProvider>
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
