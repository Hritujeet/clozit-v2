import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/lib/auth";
import { MenuIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import CartBar from "./CartBar";
import SignOutButton from "./SignOutButton";
import { buttonVariants } from "./ui/button";

const handleSignOut = async () => {
    "use server";
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (session) {
            await auth.api.signOut({
                headers: await headers(),
            });
        }
        redirect("/auth/sign-in");
    } catch (error) {
        console.error("Sign Out Error:", error);
        redirect("/auth/sign-in");
    }
};

const Navbar = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <header className="sticky top-0 z-50">
            <nav className="flex justify-between items-center px-6 sm:px-10 py-2 sm:py-3 border-b w-full bg-white/80 backdrop-blur-lg">
                <div className="logo flex items-center gap-2">
                    <Link
                        href={"/"}
                        className="text-2xl font-bold tracking-tight text-accent-foreground"
                    >
                        Clozit
                    </Link>
                </div>
                <div className="nav flex items-center gap-4 text-sm font-medium">
                    <ul className="hidden min-[700px]:flex gap-3 items-center border-r pr-5">
                        <li className="hover:text-primary duration-50 transition-colors">
                            <Link href="/t-shirts">T-Shirts</Link>
                        </li>
                        <li className="hover:text-primary duration-50 transition-colors">
                            <Link href="/hoodies">Hoodies</Link>
                        </li>
                        <li className="hover:text-primary duration-50 transition-colors">
                            <Link href="/bottoms">Bottoms</Link>
                        </li>
                        <li className="hover:text-primary duration-50 transition-colors">
                            <Link href="/winter-wear">Winter Wear</Link>
                        </li>
                        {session ? (
                            <>
                                <li>
                                    <form action={handleSignOut}>
                                        <SignOutButton />
                                    </form>
                                </li>
                                <li>
                                    <Link
                                        href={"/orders"}
                                        className={buttonVariants({
                                            variant: "default",
                                            size: "sm",
                                        })}
                                    >
                                        Orders
                                    </Link>
                                </li>
                                {session.user?.email === process.env.ADMIN && (
                                    <li>
                                        <Link
                                            href={"/dashboard"}
                                            className={buttonVariants({
                                                variant: "outline",
                                                size: "sm",
                                            })}
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                )}
                            </>
                        ) : (
                            <li>
                                <Link
                                    href={"/auth/sign-in"}
                                    className={buttonVariants({
                                        variant: "default",
                                        size: "sm",
                                    })}
                                >
                                    Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                    <CartBar session={session?.session} />
                    <div className="block min-[700px]:hidden">
                        <Sheet>
                            <SheetTrigger
                                className={buttonVariants({
                                    variant: "outline",
                                    size: "icon",
                                })}
                            >
                                <MenuIcon className="text-primary" />
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle className="text-2xl font-bold tracking-tight">
                                        Clozit
                                    </SheetTitle>
                                </SheetHeader>
                                <ul className="flex flex-col my-4 gap-2 text-slate-900 font-medium text-base px-4">
                                    <li className="hover:text-primary duration-50 transition-colors">
                                        <Link href="/t-shirts">T-Shirts</Link>
                                    </li>
                                    <li className="hover:text-primary duration-50 transition-colors">
                                        <Link href="/hoodies">Hoodies</Link>
                                    </li>
                                    <li className="hover:text-primary duration-50 transition-colors">
                                        <Link href="/bottoms">Bottoms</Link>
                                    </li>
                                    <li className="hover:text-primary duration-50 transition-colors">
                                        <Link href="/winter-wear">
                                            Winter Wear
                                        </Link>
                                    </li>
                                </ul>
                                <SheetFooter>
                                    {!session && (
                                        <Link
                                            href={"/auth/sign-in"}
                                            className={buttonVariants({
                                                variant: "default",
                                                size: "sm",
                                            })}
                                        >
                                            Sign In
                                        </Link>
                                    )}

                                    {session && (
                                        <>
                                            <Link
                                                href={"/orders"}
                                                className={buttonVariants({
                                                    variant: "default",
                                                    size: "sm",
                                                })}
                                            >
                                                Orders
                                            </Link>

                                            <form action={handleSignOut}>
                                                <SignOutButton />
                                            </form>
                                            {session.user?.email ===
                                                process.env.ADMIN && (
                                                <li>
                                                    <Link
                                                        href={"/dashboard"}
                                                        className={buttonVariants(
                                                            {
                                                                variant:
                                                                    "outline",
                                                                size: "sm",
                                                            }
                                                        )}
                                                    >
                                                        Admin
                                                    </Link>
                                                </li>
                                            )}
                                        </>
                                    )}
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
