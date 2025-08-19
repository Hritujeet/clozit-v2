"use client";
import { addToCart, removeFromCart } from "@/lib/redux/cart/cartSlice";
import { PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface cartItemProps {
    productId: string;
    productName: string;
    variant: {
        color: string;
        size: string;
    };
    qty: number;
    price: number;
}

const NotInCartComponent = ({
    item,
    handleAddToCart,
}: {
    item: cartItemProps;
    handleAddToCart: () => void;
}) => {
    return (
        <Button
            disabled={item.variant.color == "" || item.variant.size == ""}
            className="w-full sm:w-fit"
            onClick={handleAddToCart}
        >
            Add To Cart
        </Button>
    );
};

const InCartComponent = ({
    item,
    handleAddToCart,
    handleRemoveFromCart,
    qty,
}: {
    item: cartItemProps;
    handleAddToCart: () => void;
    handleRemoveFromCart: () => void;
    qty: number;
}) => {
    return (
        <div className="flex gap-2 items-center justify-between w-full sm:w-auto">
            <Button onClick={handleAddToCart}>
                <PlusIcon />
            </Button>
            <span className="mx-1 text-base font-semibold">{qty}</span>
            <Button onClick={handleRemoveFromCart}>
                <Trash />
            </Button>
        </div>
    );
};

const CartActions = ({ item }: { item: cartItemProps }) => {
    const cart = useSelector((state: any) => state.cart.items);
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleAddToCart = () => {
        toast.success("Item added to cart");
        dispatch(addToCart(item));
    };

    const handleRemoveFromCart = () => {
        toast.success("Item removed from cart");
        dispatch(removeFromCart(item));
    };

    if (!isClient) {
        return (
            <Button
                disabled={item.variant.color == "" || item.variant.size == ""}
                className="w-full sm:w-fit"
            >
                Add To Cart
            </Button>
        );
    }

    if (cart && cart[item.productId]) {
        return (
            <InCartComponent
                item={item}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                qty={cart[item.productId].qty}
            />
        );
    }

    return <NotInCartComponent item={item} handleAddToCart={handleAddToCart} />;
};

export default CartActions;
