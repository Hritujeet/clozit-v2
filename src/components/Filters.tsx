"use client";

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
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "./ui/button";
import {Color, Size} from "@/client/prisma/client";

// Fallback arrays in case Prisma enums are undefined
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_COLORS = ['RED', 'BLUE', 'GREEN', 'BLACK', 'WHITE', 'GRAY'];

const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getInitialFilters = () => ({
        size: (searchParams.get("size") as Size) || "",
        color: (searchParams.get("color") as Color) || "",
        price: searchParams.get("price") || "none",
    });

    const [filters, setFilters] = useState(getInitialFilters);
    const [tempFilters, setTempFilters] = useState(filters);

    const updateURLParams = (newFilters: typeof filters) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && (key !== "price" || value !== "none")) {
                params.set(key, value as string);
            } else {
                params.delete(key);
            }
        });
        const newUrl = `${window.location.pathname}${
            params.toString() ? `?${params.toString()}` : ""
        }`;
        router.replace(newUrl, {scroll: false});
    };

    useEffect(() => {
        const newFilters = getInitialFilters();
        setFilters(newFilters);
        setTempFilters(newFilters);
    }, [searchParams]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        const newFilters = {...filters, [key]: value};
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const handleTempFilterChange = (key: keyof typeof filters, value: string) => {
        setTempFilters((prev) => ({...prev, [key]: value}));
    };

    const resetFilters = () => {
        const defaultFilters = {size: "", color: "", price: "none"};
        setFilters(defaultFilters);
        setTempFilters(defaultFilters);
        updateURLParams(defaultFilters);
    };

    const applyTempFilters = () => {
        setFilters(tempFilters);
        updateURLParams(tempFilters);
    };

    const getPriceLabel = (priceOption: string) => {
        switch (priceOption) {
            case "none":
                return "None";
            case "below20":
                return "Below $20";
            case "20to40":
                return "$20–40";
            case "40to60":
                return "$40–60";
            case "60to80":
                return "$60–80";
            case "80plus":
                return "$80+";
            default:
                return "None";
        }
    };

    // Safe function to get enum values with fallback
    const getSizeOptions = () => {
        try {
            return Size && typeof Size === 'object' ? Object.values(Size) : DEFAULT_SIZES;
        } catch (error) {
            console.warn('Size enum not available, using fallback values');
            return DEFAULT_SIZES;
        }
    };

    const getColorOptions = () => {
        try {
            return Color && typeof Color === 'object' ? Object.values(Color) : DEFAULT_COLORS;
        } catch (error) {
            console.warn('Color enum not available, using fallback values');
            return DEFAULT_COLORS;
        }
    };

    const FilterContent = ({
                               currentFilters,
                               onFilterChange,
                               isMobile = false,
                           }: {
        currentFilters: typeof filters;
        onFilterChange: (key: keyof typeof filters, value: string) => void;
        isMobile?: boolean;
    }) => (
        <div className="flex flex-col gap-4">
            {/* Size */}
            <div className="flex flex-col w-full gap-2">
                <Label className="text-sm font-medium">Size</Label>
                <Select
                    value={currentFilters.size}
                    onValueChange={(value) => onFilterChange("size", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Size"/>
                    </SelectTrigger>
                    <SelectContent>
                        {getSizeOptions().map((size) => (
                            <SelectItem key={size} value={size}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Color */}
            <div className="flex flex-col w-full gap-2">
                <Label className="text-sm font-medium">Color</Label>
                <Select
                    value={currentFilters.color}
                    onValueChange={(value) => onFilterChange("color", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Color"/>
                    </SelectTrigger>
                    <SelectContent>
                        {getColorOptions().map((color) => (
                            <SelectItem key={color} value={color}>
                                {color.charAt(0) + color.slice(1).toLowerCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Price */}
            <div className="flex flex-col w-full gap-2">
                <Label className="text-sm font-medium">Price Range</Label>
                <RadioGroup
                    value={currentFilters.price}
                    onValueChange={(value) => onFilterChange("price", value)}
                    className="gap-3"
                >
                    {[
                        {value: "none", label: "None"},
                        {value: "below20", label: "Below $20"},
                        {value: "20to40", label: "$20–40"},
                        {value: "40to60", label: "$40–60"},
                        {value: "60to80", label: "$60–80"},
                        {value: "80plus", label: "$80+"},
                    ].map(({value, label}) => (
                        <div key={value} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={value}
                                id={isMobile ? `mobile-${value}` : value}
                            />
                            <Label
                                htmlFor={isMobile ? `mobile-${value}` : value}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );

    return (
        <div>
            {/* Desktop Filters */}
            <div className="col-span-1 hidden sm:block mt-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Filters</h1>
                    {(filters.size || filters.color || filters.price !== "none") && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={resetFilters}
                            className="text-sm"
                        >
                            Clear All
                        </Button>
                    )}
                </div>

                <FilterContent
                    currentFilters={filters}
                    onFilterChange={handleFilterChange}
                />

                {(filters.size || filters.color || filters.price !== "none") && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
                        <div className="flex flex-wrap gap-2">
                            {filters.size && (
                                <span
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Size: {filters.size}
                                    <button
                                        onClick={() => handleFilterChange("size", "")}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                    >
                    ×
                  </button>
                </span>
                            )}
                            {filters.color && (
                                <span
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Color: {filters.color}
                                    <button
                                        onClick={() => handleFilterChange("color", "")}
                                        className="ml-1 text-green-600 hover:text-green-800"
                                    >
                    ×
                  </button>
                </span>
                            )}
                            {filters.price !== "none" && (
                                <span
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  Price: {getPriceLabel(filters.price)}
                                    <button
                                        onClick={() => handleFilterChange("price", "none")}
                                        className="ml-1 text-purple-600 hover:text-purple-800"
                                    >
                    ×
                  </button>
                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Filters */}
            <div
                className="fixed bottom-0 left-0 right-0 sm:hidden flex justify-between items-center min-h-16 bg-white z-50 px-4 py-3 border-t shadow-lg">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className="flex-1 mr-2 relative"
                            onClick={() => setTempFilters(filters)}
                        >
                            Filters
                            {(filters.size || filters.color || filters.price !== "none") && (
                                <span
                                    className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {
                      [
                          filters.size,
                          filters.color,
                          filters.price !== "none" ? "price" : null,
                      ].filter(Boolean).length
                  }
                </span>
                            )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Filter Products</DialogTitle>
                            <DialogDescription>
                                Narrow down your search with these filters
                            </DialogDescription>
                        </DialogHeader>

                        <FilterContent
                            currentFilters={tempFilters}
                            onFilterChange={handleTempFilterChange}
                            isMobile={true}
                        />

                        <DialogFooter className="grid grid-cols-2 gap-2 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setTempFilters({
                                        size: "",
                                        color: "",
                                        price: "none",
                                    });
                                }}
                                className="w-full"
                            >
                                Reset
                            </Button>
                            <DialogClose asChild>
                                <Button onClick={applyTempFilters} className="w-full">
                                    Apply Filters
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="flex-1 ml-2"
                    disabled={
                        !filters.size && !filters.color && filters.price === "none"
                    }
                >
                    Reset All
                </Button>
            </div>
        </div>
    );
};

export default Filters;