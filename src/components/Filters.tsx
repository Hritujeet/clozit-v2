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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "./ui/button";

const Filters = () => {
  const [filters, setFilters] = useState({
    size: "",
    color: "",
    price: "option-one",
  });

  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTempFilterChange = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    const defaultFilters = {
      size: "",
      color: "",
      price: "option-one",
    };
    setFilters(defaultFilters);
    setTempFilters(defaultFilters);
  };

  const applyTempFilters = () => {
    setFilters(tempFilters);
  };

  const FilterContent = ({
    currentFilters,
    onFilterChange,
    isMobile = false,
  }) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-2">
        <Label className="text-sm font-medium">Size</Label>
        <Select
          value={currentFilters.size}
          onValueChange={(value) => onFilterChange("size", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
            <SelectItem value="2XL">2XL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label className="text-sm font-medium">Color</Label>
        <Select
          value={currentFilters.color}
          onValueChange={(value) => onFilterChange("color", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="yellow">Yellow</SelectItem>
            <SelectItem value="pink">Pink</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label className="text-sm font-medium">Price Range</Label>
        <RadioGroup
          value={currentFilters.price}
          onValueChange={(value) => onFilterChange("price", value)}
          className="gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-one"
              id={isMobile ? "mobile-option-one" : "option-one"}
            />
            <Label
              htmlFor={isMobile ? "mobile-option-one" : "option-one"}
              className="text-sm font-normal cursor-pointer"
            >
              Below $50
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-two"
              id={isMobile ? "mobile-option-two" : "option-two"}
            />
            <Label
              htmlFor={isMobile ? "mobile-option-two" : "option-two"}
              className="text-sm font-normal cursor-pointer"
            >
              $50 - $100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-three"
              id={isMobile ? "mobile-option-three" : "option-three"}
            />
            <Label
              htmlFor={isMobile ? "mobile-option-three" : "option-three"}
              className="text-sm font-normal cursor-pointer"
            >
              $100 - $200
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-four"
              id={isMobile ? "mobile-option-four" : "option-four"}
            />
            <Label
              htmlFor={isMobile ? "mobile-option-four" : "option-four"}
              className="text-sm font-normal cursor-pointer"
            >
              $200 - $300
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-five"
              id={isMobile ? "mobile-option-five" : "option-five"}
            />
            <Label
              htmlFor={isMobile ? "mobile-option-five" : "option-five"}
              className="text-sm font-normal cursor-pointer"
            >
              $300+
            </Label>
          </div>
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
          {(filters.size ||
            filters.color ||
            filters.price !== "option-one") && (
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

        {/* Active Filters Display */}
        {(filters.size || filters.color || filters.price !== "option-one") && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {filters.size && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
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
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Color: {filters.color}
                  <button
                    onClick={() => handleFilterChange("color", "")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.price !== "option-one" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  Price:{" "}
                  {filters.price === "option-two"
                    ? "$50-$100"
                    : filters.price === "option-three"
                    ? "$100-$200"
                    : filters.price === "option-four"
                    ? "$200-$300"
                    : filters.price === "option-five"
                    ? "$300+"
                    : "Below $50"}
                  <button
                    onClick={() => handleFilterChange("price", "option-one")}
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
      <div className="fixed bottom-0 left-0 right-0 sm:hidden flex justify-between items-center min-h-16 bg-white z-50 px-4 py-3 border-t shadow-lg">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex-1 mr-2 relative"
              onClick={() => setTempFilters(filters)}
            >
              Filters
              {(filters.size ||
                filters.color ||
                filters.price !== "option-one") && (
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {
                    [
                      filters.size,
                      filters.color,
                      filters.price !== "option-one" ? "price" : null,
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
                    price: "option-one",
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
            !filters.size && !filters.color && filters.price === "option-one"
          }
        >
          Reset All
        </Button>
      </div>
    </div>
  );
};

export default Filters;
