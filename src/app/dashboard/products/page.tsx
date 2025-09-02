"use client";
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@/client/prisma";
import { PlusIcon } from "lucide-react";

const products = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/dashboard/v1/products/fetch");
            const data = await response.json();
            return data;
        },
        queryKey: ["products"],
    });

    if (query.isPending) {
        return (
            <div className="container mx-auto mt-10">
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-bold mb-4">
                        <Skeleton className="w-64 h-6" />
                    </h1>
                    <Skeleton className="w-32 h-12" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                <Skeleton className="w-[50px] h-6" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-[50px] h-6" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-[50px] h-6" />
                            </TableHead>
                            <TableHead className="text-right">
                                <Skeleton className="w-[50px] h-6" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between w-full">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <Link href="/dashboard/products/addProduct" className={buttonVariants({variant: "default"})}>
                    Add New Product <PlusIcon />
                </Link>
            </div>
            <Table>
                <TableCaption>A list of all the products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {query.data?.data.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">
                                {product.id}
                            </TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell className="text-right">
                                ${product.price}
                            </TableCell>
                            <TableCell className="flex gap-2 items-center justify-center">
                                <Link
                                    href={`/product/${product.slug}`}
                                    className={buttonVariants({
                                        variant: "default",
                                    })}
                                >
                                    View Product
                                </Link>
                                <Button variant="outline">
                                    Update Product
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default products;
