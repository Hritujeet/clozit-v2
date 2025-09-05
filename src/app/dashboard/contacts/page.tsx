"use client";
import React from "react";
import { Contact } from "@/client/prisma";
import { Button } from "@/components/ui/button";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog";

// DeleteContactDialog component
function DeleteContactDialog({ contactId }: { contactId: string }) {
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/dashboard/v1/contact/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    id: contactId,
                },
            });
            if (!res.ok) throw new Error("Failed to delete contact");
            return res.json();
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["contacts"] });
            setOpen(false);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Contact</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this contact? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Deleting..." : "Yes, Delete"}
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
            const response = await fetch("/api/dashboard/v1/contact/fetch");
            const data = await response.json();
            return data;
        },
        queryKey: ["contacts"],
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
                <h1 className="text-2xl font-bold mb-4">Contacts</h1>
            </div>
            <Table>
                <TableCaption>A list of all the contacts.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {query.data?.data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No contacts found.
                            </TableCell>
                        </TableRow>
                    )}

                    {query.data?.data.length > 0 &&
                        query.data?.data.map((contact: Contact) => (
                            <TableRow key={contact.id}>
                                <TableCell className="font-medium">
                                    {contact.id}
                                </TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell className="w-2/3">
                                    {contact.message}
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <DeleteContactDialog
                                        contactId={contact.id}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default products;
