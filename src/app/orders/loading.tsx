import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loading = () => {
    return (
        <main className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 mt-5 mb-10 min-h-[60vh]">
            {/* Page title skeleton */}
            <div className="text-center mt-10 mb-6">
                <Skeleton className="h-9 w-48 mx-auto" />
            </div>

            {/* Orders grid skeleton */}
            <div className="grid gap-3 md:gap-4">
                {Array.from({ length: 6 }, (_, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow p-0">
                        <CardHeader className="pb-2 p-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                                <Skeleton className="h-8 w-24 rounded-md" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
};

export default Loading;