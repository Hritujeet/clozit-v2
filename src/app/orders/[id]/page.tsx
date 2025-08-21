import React from 'react'
import {db} from "@/utils/db/db";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {$Enums} from "@/client/prisma";
import {notFound} from "next/navigation";
import Status = $Enums.Status;

const Order = async ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params
    const order = await db.order.findFirst({
        where: {
            id: id
        }
    })

    if (!order) {
        return notFound();
    }
    const trackingSteps = [
        {step: "Order Placed", date: order?.createdAt || new Date(), completed: true},
        {
            step: "Shipping",
            date: null,
            completed: order?.status === Status.SHIPPING || order?.status === Status.OUT_FOR_DELIVERY || order?.status === Status.DELIVERED
        },
        {
            step: "Out for Delivery",
            date: null,
            completed: order?.status === Status.OUT_FOR_DELIVERY || order?.status === Status.DELIVERED
        },
        {step: "Delivered", date: null, completed: order?.status === Status.DELIVERED}
    ];

    return (
        <section className="text-gray-600 body-font px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="container px-5 py-12 mx-auto">
                {/* Order Header */}
                <div className="mb-6">
                    <h2 className="text-2xl text-gray-900 font-bold mb-2">
                        Order Details
                    </h2>
                    <p className="text-indigo-600 text-lg font-medium">#{id}</p>
                </div>

                {/* Flex container for desktop layout */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Order Details - Main Content */}
                    <div className="flex-1">
                        {/* Order Summary Card */}
                        <Card className="mb-4">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Total Amount</span>
                                    <span className="font-semibold text-lg">${order?.amount}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Products Grid */}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {Object.keys(order?.products || {}).map((item: string) => {
                                const product = order.products[item];
                                const total = (product.qty * product.price).toFixed(2);

                                return (
                                    <Card key={item} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-sm">{product.productName}</h4>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">Qty: {product.qty}</span>
                                                    <span className="text-muted-foreground">${product.price} each</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-muted-foreground">Total:</span>
                                                    <span className="font-semibold">${total}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Tracking Sidebar */}
                    <div className="w-full lg:w-80">
                        <Card className="lg:sticky lg:top-6">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Order Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Status Badge */}
                                <Badge variant={
                                    order?.status === Status.DELIVERED ? 'default' :
                                        order?.status === Status.OUT_FOR_DELIVERY ? 'secondary' :
                                            order?.status === Status.SHIPPING ? 'outline' : 'secondary'
                                } className="text-xs">
                                    {order?.status || 'Processing'}
                                </Badge>

                                {/* Tracking Timeline */}
                                <div className="space-y-3">
                                    {trackingSteps.map((step, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className={`flex-shrink-0 w-3 h-3 rounded-full border-2 mt-1.5 ${
                                                step.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                            }`}>
                                                {step.completed && (
                                                    <svg className="w-1.5 h-1.5 text-white ml-0.5 mt-0.5"
                                                         fill="currentColor"
                                                         viewBox="0 0 20 20">
                                                        <path fillRule="evenodd"
                                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {step.step}
                                                </p>
                                                {step.date && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(step.date).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Order