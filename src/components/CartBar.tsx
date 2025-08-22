"use client";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet";
import {ShoppingBag, ShoppingCart} from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./CartItem";
import {Button, buttonVariants} from "./ui/button";
import Link from "next/link";
import {clearCart} from "@/lib/redux/cart/cartSlice";
import {toast} from "sonner";
import {cartType, cn} from "@/lib/utils";
import {Session} from "better-auth/types";

const CartBar = ({session}: { session: Session }) => {
    const cart = useSelector((state: { cart: {items: cartType} }) => state.cart.items);
    const dispatch = useDispatch();
    const [subtotal, setsubtotal] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [checkoutRedirect, setCheckoutRedirect] = useState("");

    const calculateSubtotal = () => {
        let total = 0;
        Object.keys(cart).forEach((item: string) => {
            total += cart[item].price * cart[item].qty;
        });
        setsubtotal(total);
    };

    const manageCheckout = () => {
        if (session) {
            setCheckoutRedirect("/checkout");
        } else {
            setCheckoutRedirect("/auth/sign-in");
        }
    };

    useEffect(() => {
        calculateSubtotal();
        manageCheckout();
    }, [cart, session]);

    return (
        <Sheet open={toggle} onOpenChange={setToggle}>
            <SheetTrigger
                className={buttonVariants({variant: "outline", size: "icon"})}
            >
                <ShoppingCart className="text-primary"/>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle className="flex gap-2">
                        <ShoppingBag className="text-primary"/> Cart
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col px-4 h-[calc(100vh-15rem)]">
                    {Object.keys(cart).length <= 0 && (
                        <h1 className="text-lg text-pretty text-primary font-semibold text-center">
                            Your Cart is Empty
                        </h1>
                    )}
                    {Object.keys(cart).length > 0 &&
                        Object.keys(cart).map((item: string) => (
                            <CartItem
                                key={item}
                                name={cart[item].productName}
                                color={cart[item].variant.color}
                                size={cart[item].variant.size}
                                price={cart[item].price}
                                qty={cart[item].qty}
                                id={item}
                            />
                        ))}
                </ScrollArea>
                <SheetFooter>
                    <div className="flex justify-between">
                        <p className="font-semibold">Total:</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2 items-center justify-between">
                        <Button
                            variant="destructive"
                            disabled={Object.keys(cart).length <= 0}
                            onClick={() => {
                                dispatch(clearCart());
                                toast.success("The Cart has been cleared", {
                                    duration: 2000,
                                });
                                setToggle(false);
                            }}
                        >
                            Clear Cart
                        </Button>
                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: "default",
                                }),
                                Object.keys(cart).length <= 0 && "pointer-events-none opacity-75"
                            )}
                            href={checkoutRedirect}
                            onClick={() => setToggle(false)}
                        >
                            Checkout
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CartBar;
