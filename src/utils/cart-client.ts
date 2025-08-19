// Deal with local storage transactions here for unauthenticatd users here

import {CartDataClient} from "@/utils/types";

type CartElement = {
    product: CartDataClient,
    qty: number
}

export const addToCartClient = (data: CartDataClient) => {
    const localCart: CartElement[] = JSON.parse(localStorage.getItem("Cart") || "[]");

    const existingItem: CartElement = localCart.find((element: CartElement) =>
        element.product.name === data.name &&
        element.product.size === data.size &&
        element.product.color === data.color
    ) as CartElement;

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        localCart.push({
            product: data,
            qty: 1
        });
    }

    localStorage.setItem("Cart", JSON.stringify(localCart));
    console.log("Updated Cart:", localCart);
};

export const removeFromCartClient = (data: CartDataClient) => {
    const localCart: CartElement[] = JSON.parse(localStorage.getItem("Cart") || "[]");
    const existingItemIndex = localCart.findIndex((element: CartElement) =>
        element.product.name === data.name &&
        element.product.size === data.size &&
        element.product.color === data.color
    );

    if (existingItemIndex !== -1) {
        const existingItem = localCart[existingItemIndex];
        if (existingItem.qty > 1) {
            existingItem.qty -= 1;
        } else {
            // Remove the item completely using splice
            localCart.splice(existingItemIndex, 1);
        }
        localStorage.setItem("Cart", JSON.stringify(localCart));
    }
}
export const clearCartClient = () => {
    localStorage.removeItem("Cart")
}