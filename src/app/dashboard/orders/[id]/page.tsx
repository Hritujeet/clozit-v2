"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Package,
    User,
    MapPin,
    CreditCard,
    Phone,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle,
    Loader2,
    RefreshCw,
} from "lucide-react";
import { useParams } from "next/navigation";

const ViewOrder = () => {
    const params = useParams();
    const orderId = params?.id;

    // Fetch order data using TanStack Query
    const {
        data: orderResponse,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
            if (!orderId) throw new Error("Order ID is required");

            const response = await fetch(
                `/api/dashboard/v1/orders/fetch/${orderId}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch order");
            }

            return response.json();
        },
        enabled: !!orderId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const order = orderResponse?.data;

    const getStatusColor = (status) => {
        const colors = {
            PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
            ORDERED: "bg-blue-100 text-blue-800 border-blue-200",
            SHIPPING: "bg-purple-100 text-purple-800 border-purple-200",
            OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800 border-orange-200",
            DELIVERED: "bg-green-100 text-green-800 border-green-200",
        };
        return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    const getStatusIcon = (status) => {
        const icons = {
            PENDING: <Clock className="h-4 w-4" />,
            ORDERED: <Package className="h-4 w-4" />,
            SHIPPING: <Truck className="h-4 w-4" />,
            OUT_FOR_DELIVERY: <Truck className="h-4 w-4" />,
            DELIVERED: <CheckCircle className="h-4 w-4" />,
        };
        return icons[status] || <AlertCircle className="h-4 w-4" />;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    if (!orderId) {
        return (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    Order ID is required to view order details.
                </AlertDescription>
            </Alert>
        );
    }

    if (isError) {
        return (
            <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                    {error?.message ||
                        "Failed to load order details. Please try again."}
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 ml-2"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCw
                            className={`h-4 w-4 mr-2 ${
                                isFetching ? "animate-spin" : ""
                            }`}
                        />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>

                {/* Cards Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center space-x-4"
                                    >
                                        <Skeleton className="h-16 w-16 rounded" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-48" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-24" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    Order not found or no data available.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Order #{order.id.slice(-8)}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Created on {formatDate(order.createdAt)}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {isFetching && (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    )}
                    <Badge
                        className={`${getStatusColor(order.status)} px-3 py-1`}
                    >
                        {getStatusIcon(order.status)}
                        <span className="ml-1 font-medium">
                            {order.status.replace("_", " ")}
                        </span>
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Order Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.keys(order.products).map(
                                    (product, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-4 p-4 border rounded-lg"
                                        >
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                {order.products[product]
                                                    .image ? (
                                                    <img
                                                        src={
                                                            order.products[
                                                                product
                                                            ].img
                                                        }
                                                        alt={
                                                            order.products[
                                                                product
                                                            ].title
                                                        }
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <Package className="h-8 w-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {
                                                        order.products[product]
                                                            .productName
                                                    }
                                                </h3>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                    <span>
                                                        Qty:{" "}
                                                        {order.products[product]
                                                            .qty || 1}
                                                    </span>
                                                    {order.products[product]
                                                        .variant.color && (
                                                        <span>
                                                            Color:{" "}
                                                            {
                                                                order.products[
                                                                    product
                                                                ].variant.color
                                                            }
                                                        </span>
                                                    )}
                                                    {order.products[product]
                                                        .variant.size && (
                                                        <span>
                                                            Size:{" "}
                                                            {
                                                                order.products[
                                                                    product
                                                                ].variant.size
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">
                                                    {formatCurrency(
                                                        order.products[product]
                                                            .price *
                                                            (order.products[
                                                                product
                                                            ].qty || 1)
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatCurrency(
                                                        order.products[product]
                                                            .price
                                                    )}{" "}
                                                    each
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}

                                <Separator />

                                <div className="flex justify-between items-center font-semibold text-lg">
                                    <span>Total Amount:</span>
                                    <span>{formatCurrency(order.amount)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Display */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Order Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge
                                    className={`${getStatusColor(
                                        order.status
                                    )} px-3 py-1`}
                                >
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1 font-medium">
                                        {order.status.replace("_", " ")}
                                    </span>
                                </Badge>
                            </div>

                            <div className="text-sm text-gray-600">
                                <p>
                                    Expected delivery: {order.daysToDeliver}{" "}
                                    days
                                </p>
                                <p className="text-xs mt-1">
                                    Last updated: {formatDate(order.updatedAt)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Customer Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {order.fullname}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {order.user?.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>{order.phone}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm space-y-1">
                                <p className="font-medium">{order.fullname}</p>
                                <p>{order.streetAddress}</p>
                                <p>
                                    {order.city}, {order.state}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Payment Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Payment ID
                                </p>
                                <p className="font-mono text-sm break-all">
                                    {order.stripePaymentId}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Amount Paid
                                </p>
                                <p className="font-semibold text-lg">
                                    {formatCurrency(order.amount)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
