"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const AdminHome = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/dashboard/v1");
            return (await response.json()).data;
        },
        queryKey: ["dashboard-stats"],
    });

    if (query.isPending) {
        return (
            <section>
                <h1 className="text-4xl font-bold tracking-tight my-2">
                    <Skeleton className="h-10 w-64" />
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="px-4">
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24" />
                        </CardContent>
                    </Card>

                    <Card className="px-4">
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24" />
                        </CardContent>
                    </Card>

                    <Card className="px-4">
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24" />
                        </CardContent>
                    </Card>

                    <Card className="px-4">
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24" />
                        </CardContent>
                    </Card>

                    <Card className="px-4">
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24" />
                        </CardContent>
                    </Card>

                    <Card className="px-4">
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24" />
                        </CardContent>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section>
            <h1 className="text-4xl font-bold tracking-tight mb-10 text-center">
                Hello, Admin!
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card className="px-4">
                    <CardHeader>
                        <CardTitle>Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {query.data?.totalOrders ?? (
                                <Loader2 className="animate-spin" />
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="px-4">
                    <CardHeader>
                        <CardTitle>Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {query.data?.totalProducts ?? (
                                <Loader2 className="animate-spin" />
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="px-4">
                    <CardHeader>
                        <CardTitle>Total Contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {query.data?.totalContacts ?? (
                                <Loader2 className="animate-spin" />
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="px-4">
                    <CardHeader>
                        <CardTitle>Total Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {query.data?.totalSessions ?? (
                                <Loader2 className="animate-spin" />
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="px-4">
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {query.data?.totalUsers ?? (
                                <Loader2 className="animate-spin" />
                            )}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default AdminHome;
