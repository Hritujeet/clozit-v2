"use client";
import { Product } from "@/client/prisma";
import React, { useState } from "react";
import { productVariantSchema } from "@/utils/db/zod-schemas";
import { cn, formatText } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CartActions from "./CartActions";
import { colorMap } from "@/lib/utils";

const ProductDetails = ({ product }: { product: Product }) => {
    const variants = productVariantSchema.parse(product.variant);

    const [selectedColor, setSelectedColor] = useState(
        variants.colors[0] || ""
    );
    const [selectedSize, setSelectedSize] = useState(variants.sizes[0] || "");

    return (
        <main className="max-w-md sm:max-w-7xl px-8 mx-auto">
            <div className="grid sm:grid-cols-2 mt-10 sm:mb-20 sm:gap-10 gap-2">
                <div className="w-full min-h-[50vh] max-h-[60vh] lg:max-h-[70vh] rounded-md shadow-lg mb-10">
                    <img
                        className="object-contain w-full h-full"
                        src={product?.image}
                        alt={product?.title}
                    />
                </div>

                <div className="sm:px-4 sm:py-10 space-y-8">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {product?.title}
                        </h1>
                        <p className="text-sm text-primary font-medium">
                            {formatText(product?.category)}
                        </p>
                    </div>
                    <p className="text-muted-foreground text-pretty">
                        {product.description}
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:justify-between">
                        <div className="flex gap-2 items-center">
                            <Label className="mr-3">Color</Label>
                            <div className="flex items-center gap-2 mt-2">
                                {variants.colors.map((color, i) => (
                                    <span
                                        key={i}
                                        onClick={() => setSelectedColor(color)}
                                        aria-label={color}
                                        className={cn(
                                            "w-6 h-6 rounded-full border-2 cursor-pointer duration-150 transition-all",
                                            selectedColor === color &&
                                                "ring-2 ring-primary ring-offset-1"
                                        )}
                                        style={{
                                            backgroundColor:
                                                color.toLowerCase(),
                                            borderColor:"#ccc",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 flex-col sm:flex-row">
                            <Label className="mr-3">Size</Label>
                            <Select
                                value={selectedSize}
                                onValueChange={(value) =>
                                    setSelectedSize(value)
                                }
                            >
                                <SelectTrigger className="w-full sm:max-w-[180px]">
                                    <SelectValue placeholder="Select Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {variants.sizes.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <p className="text-2xl font-bold sm:hidden">
                            ${product.price}
                        </p>
                    </div>

                    <div className="flex justify-center sm:justify-between items-center fixed bottom-0 left-0 w-full px-8 py-4 border-t sm:relative sm:bottom-auto sm:left-auto sm:px-0 sm:py-0 sm:border-none bg-background/70 backdrop-blur-md">
                        <p className="text-2xl font-bold hidden sm:block">
                            ${product.price}
                        </p>
                        <CartActions
                            item={{
                                productId: product.id,
                                productName: product.title,
                                variant: {
                                    color: selectedColor,
                                    size: selectedSize,
                                },
                                qty: 1,
                                price: product.price,
                            }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
