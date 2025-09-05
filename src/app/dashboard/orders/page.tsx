"use client";
import { Order } from "@/client/prisma";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

// OrderStatusDialog component and helpers moved above main component for correct reference
const statusOptions = [
    "PENDING",
    "ORDERED",
    "SHIPPING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
];

function getNextStatuses(current: string) {
    const idx = statusOptions.indexOf(current);
    if (idx === -1) return [];
    // Only allow moving forward in status
    return statusOptions.slice(idx + 1);
}

function OrderStatusDialog({ order }: { order: Order }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [error, setError] = useState("");
    const queryClient = useQueryClient();
    const nextStatuses = getNextStatuses(order.status);

    const mutation = useMutation({
        mutationFn: async (status: string) => {
            const res = await fetch("/api/dashboard/v1/orders/update-status", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    id: order.id,
                },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error("Failed to update status");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.refetchQueries({ queryKey: ["orders", order.id] });
            setOpen(false);
        },
        onError: (err: any) => {
            setError(err.message || "Error");
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Update Status</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Order Status</DialogTitle>
                    <DialogDescription>
                        Current status: <b>{order.status}</b>
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <label htmlFor="status-select" className="block mb-2">
                        Select new status
                    </label>
                    <Select value={selected} onValueChange={setSelected}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Select --" />
                        </SelectTrigger>
                        <SelectContent>
                            {nextStatuses.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s.replace(/_/g, " ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {error && (
                    <div className="text-red-600 text-sm mb-2">{error}</div>
                )}
                <DialogFooter>
                    <Button
                        onClick={() => mutation.mutate(selected)}
                        disabled={!selected || mutation.isPending}
                    >
                        {mutation.isPending ? "Updating..." : "Update"}
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

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
                        <TableHead>Created At</TableHead>
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
                            <TableCell>
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                                ${order.amount}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Link
                                    href={`/dashboard/orders/${order.id}`}
                                    className={buttonVariants({
                                        variant: "outline",
                                    })}
                                >
                                    View Details
                                </Link>
                                <OrderStatusDialog order={order} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default products;
