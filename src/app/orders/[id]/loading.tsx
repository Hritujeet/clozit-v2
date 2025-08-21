import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loading = () => {
    return (
        <section className="text-gray-600 body-font px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="container px-5 py-12 mx-auto">
                {/* Order Header skeleton */}
                <div className="mb-6">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-6 w-64" />
                </div>

                {/* Flex container for desktop layout */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Order Details - Main Content */}
                    <div className="flex-1">
                        {/* Order Summary Card skeleton */}
                        <Card className="mb-4">
                            <CardHeader className="pb-3">
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Products Grid skeleton */}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {Array.from({ length: 4 }, (_, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-3 w-12" />
                                                <Skeleton className="h-4 w-14" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Order Tracking Sidebar skeleton */}
                    <div className="w-full lg:w-80">
                        <Card className="lg:sticky lg:top-6">
                            <CardHeader className="pb-3">
                                <Skeleton className="h-6 w-28" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Status Badge skeleton */}
                                <Skeleton className="h-5 w-20 rounded-full" />

                                {/* Tracking Timeline skeleton */}
                                <div className="space-y-3">
                                    {Array.from({ length: 4 }, (_, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <Skeleton className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" />
                                            <div className="flex-1 space-y-1">
                                                <Skeleton className="h-4 w-32" />
                                                {index === 0 && <Skeleton className="h-3 w-20" />}
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
    );
};

export default Loading;