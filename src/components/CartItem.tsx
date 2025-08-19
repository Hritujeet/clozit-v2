"use client";
import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/lib/redux/cart/cartSlice";
import { PlusCircle, Trash } from "lucide-react";
import { useDispatch } from "react-redux";

type CartItemProps = {
  name: string;
  color: string;
  size: string;
  price: number;
  qty: number;
  id: string;
};

const CartItem = (props: CartItemProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between aspect-auto w-full items-center space-x-1 sm:space-x-2 border p-3 mb-2 rounded-md">
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between w-full pb-2 space-x-2">
          <div className="space-y-6">
            <h3 className="font-semibold leading-snug sm:pr-8">{props.name}</h3>
            <div className="flex text-sm gap-3 items-center">
              <Button
                size={"icon"}
                className="flex justify-center items-center px-2 py-1"
                onClick={() => {
                  dispatch(
                    addToCart({
                      productId: props.id,
                      productName: props.name,
                      variant: {
                        color: props.color,
                        size: props.size,
                      },
                      qty: 1,
                      price: props.price,
                    })
                  );
                }}
              >
                <PlusCircle />
              </Button>
              <span className={"font-semibold text-sm"}>{props.qty}</span>
              <Button
                size={"icon"}
                className="flex justify-center items-center px-2 py-1"
                onClick={() => {
                  dispatch(
                    removeFromCart({
                      productId: props.id,
                      productName: props.name,
                      variant: {
                        color: props.color,
                        size: props.size,
                      },
                      qty: 1,
                      price: props.price,
                    })
                  );
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
          <div className="text-right space-y-6">
            <p className="text font-semibold">
              $ {new Intl.NumberFormat("en-US").format(props.price)}
            </p>
            <div className={"flex gap-3 items-center text-sm"}>
              <span className={"border rounded-md cursor-default px-2 py-1"}>
                {props.color}
              </span>
              <span className={"border rounded-md cursor-default px-2 py-1"}>
                {props.size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
