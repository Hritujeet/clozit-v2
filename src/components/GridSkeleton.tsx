import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GridSkeletonProps {
    title?: string;
    showFilters?: boolean;
    itemCount?: number;
    showAnimation?: boolean;
    className?: string;
}

export const GridSkeleton = ({
    title = "Loading Products...",
    showFilters = false,
    itemCount = 12,
    showAnimation = true,
    className,
}: GridSkeletonProps) => {
    // Create skeleton items with enhanced modern design
    const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
        <div
            key={index}
            className={cn(
                "group relative  rounded-2xl border overflow-hidden transition-all duration-300",
                showAnimation && "hover:shadow-lg hover:scale-[1.02]"
            )}
        >
            {/* Image skeleton */}
            <div className="relative">
                <Skeleton className="aspect-square w-full" />
                {/* Favorite button skeleton */}
                <div className="absolute top-3 right-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                {/* Category badge */}
                <Skeleton className="h-5 w-16 rounded-full" />

                {/* Product title */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                </div>

                {/* Color options */}
                <div className="flex gap-2 py-1">
                    {Array.from({ length: 3 }, (_, i) => (
                        <Skeleton key={i} className="w-5 h-5 rounded-full" />
                    ))}
                </div>

                {/* Size options */}
                <div className="flex gap-2">
                    {Array.from({ length: 4 }, (_, i) => (
                        <Skeleton key={i} className="w-8 h-6" />
                    ))}
                </div>

                {/* Price and button */}
                <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-9 w-20 rounded-lg" />
                </div>
            </div>
        </div>
    ));

    // Filter skeleton component
    const FilterSkeleton = () => (
        <div className="space-y-6 p-4 rounded-xl border ">
            {/* Filter title */}
            <Skeleton className="h-6 w-16" />

            {/* Categories */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-20" />
                <div className="space-y-3">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4" />
                            <Skeleton className="h-4 flex-1" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-2">
                    <Skeleton className="h-2 w-full" />
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-16" />
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 8 }, (_, i) => (
                        <Skeleton key={i} className="w-8 h-8 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-12" />
                <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }, (_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
            </div>

            {/* Apply button */}
            <Skeleton className="h-10 w-full rounded-lg" />
        </div>
    );

    return (
        <section
            className={cn(
                "py-6 px-3 sm:py-10 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16",
                className
            )}
        >
            <div className="max-w-7xl mx-auto">
                <div
                    className={cn(
                        "grid gap-4",
                        showFilters
                            ? "grid-cols-1 sm:grid-cols-4 xl:grid-cols-5"
                            : "grid-cols-1"
                    )}
                >
                    {/* Filters skeleton */}
                    {showFilters && (
                        <div className="sm:col-span-1">
                            <FilterSkeleton />
                        </div>
                    )}

                    {/* Main content area */}
                    <div
                        className={cn(
                            showFilters
                                ? "sm:col-span-3 xl:col-span-4"
                                : "col-span-1"
                        )}
                    >
                        {/* Title skeleton */}
                        <div className="text-center mb-6 sm:mb-8 md:mb-12 px-2">
                            <Skeleton className="h-9 w-64 mx-auto" />
                        </div>

                        {/* Products grid skeleton */}
                        <div
                            className={cn(
                                "grid gap-3 sm:gap-4 mx-auto max-w-sm sm:max-w-4xl lg:max-w-7xl",
                                showFilters
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    : "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                            )}
                        >
                            {skeletonItems}
                        </div>

                        {/* Load more button skeleton */}
                        <div className="flex justify-center mt-8">
                            <Skeleton className="h-12 w-32 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GridSkeleton;
