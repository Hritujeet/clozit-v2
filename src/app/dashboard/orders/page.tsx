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
import { Order, Product } from "@/client/prisma";
import { PlusIcon } from "lucide-react";

const products = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/dashboard/v1/orders/fetch");
            const data = await response.json();
            return data;
        },
        queryKey: ["orders"],
    });

    if (query.isPending) {
        return (
            <div className="container mx-auto mt-10">
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-bold mb-4">
                        <Skeleton className="w-64 h-6" />
                    </h1>
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
                            <TableHead className="text-right">
                                <Skeleton className="w-[50px] h-6" />
                            </TableHead>
                            <TableHead className="text-right">
                                <Skeleton className="w-[50px] h-6" />
                            </TableHead>
                            <TableHead className="text-right">
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
                                <TableCell className="text-right">
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="w-[50px] h-6" />
                                </TableCell>
                                <TableCell className="text-right">
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
            <div>
                <h1 className="text-2xl font-bold mb-4">Orders</h1>
            </div>
            <Table>
                <TableCaption>A list of all the orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Ordered By</TableHead>
                        <TableHead>User Id</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {query.data?.data.map((order: Order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">
                                {order.id}
                            </TableCell>
                            <TableCell>{order.fullname}</TableCell>
                            <TableCell>{order.userId}</TableCell>
                            <TableCell>{order.streetAddress}</TableCell>
                            <TableCell>{order.city}</TableCell>
                            <TableCell>{order.state}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell className="text-right">
                                ${order.amount}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Link href={`/dashboard/orders/${order.id}`} className={buttonVariants({variant: "outline"})}>View Details</Link>
                                <Button>Update Status</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default products;
