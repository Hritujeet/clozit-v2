import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <main className="max-w-md sm:max-w-7xl px-8 mx-auto">
            <div className="grid sm:grid-cols-2 mt-10 sm:mb-20 sm:gap-10 gap-2">
                {/* Product image skeleton */}
                <div className="w-full min-h-[50vh] max-h-[60vh] lg:max-h-[70vh] rounded-md shadow-lg mb-10">
                    <Skeleton className="w-full h-full rounded-md" />
                </div>

                {/* Product details skeleton */}
                <div className="sm:px-4 sm:py-10 space-y-8">
                    {/* Title and category */}
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-9 w-3/4" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>

                    <div className="flex flex-col justify-center gap-4 sm:justify-between">
                        {/* Color selection */}
                        <div className="flex gap-2 items-center">
                            <Skeleton className="h-4 w-12 mr-1" />
                            <div className="flex items-center gap-2 mt-2">
                                {Array.from({ length: 4 }, (_, i) => (
                                    <Skeleton key={i} className="w-6 h-6 rounded-full" />
                                ))}
                            </div>
                        </div>

                        {/* Size selection */}
                        <div className="flex gap-2 flex-col sm:flex-row">
                            <Skeleton className="h-4 w-8 mr-1" />
                            <Skeleton className="h-10 w-full sm:max-w-[180px] rounded-md" />
                        </div>

                        {/* Mobile price */}
                        <Skeleton className="h-8 w-24 sm:hidden" />
                    </div>

                    {/* Bottom section with price and cart actions */}
                    <div className="flex justify-center sm:justify-between items-center fixed bottom-0 left-0 w-full px-8 py-4 border-t sm:relative sm:bottom-auto sm:left-auto sm:px-0 sm:py-0 sm:border-none">
                        <Skeleton className="h-8 w-24 hidden sm:block" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-32 rounded-md" />
                            <Skeleton className="h-10 w-24 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Loading;