"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ColorEnum = z.enum([
    "BLACK",
    "WHITE",
    "RED",
    "BLUE",
    "GREEN",
    "YELLOW",
    "PINK",
    "ORANGE",
    "PURPLE",
]);
const SizeEnum = z.enum(["S", "M", "L", "XL", "XXL"]);
const CategoryEnum = z.enum(["T_SHIRTS", "HOODIES", "BOTTOMS", "WINTER_WEAR"]);

const productSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z
        .string()
        .min(2, "Slug must be at least 2 characters")
        .regex(
            /^[a-z0-9-]+$/,
            "Slug must contain only lowercase letters, numbers, and hyphens"
        ),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    image: z.string().url("Please provide a valid URL"),
    variant: z.object({
        colors: z.array(ColorEnum).min(1, "At least one color is required"),
        sizes: z.array(SizeEnum).min(1, "At least one size is required"),
    }),
    price: z.coerce.number().positive("Price must be positive"),
    category: CategoryEnum,
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

interface FormData {
    title: string;
    slug: string;
    description: string;
    image: string;
    colors: string[];
    sizes: string[];
    price: string;
    category: string;
    stock: string;
}

const AddProduct: React.FC = () => {
    const [form, setForm] = useState<FormData>({
        title: "",
        slug: "",
        description: "",
        image: "",
        colors: [],
        sizes: [],
        price: "",
        category: "T_SHIRTS",
        stock: "1",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/dashboard/v1/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add product");
            }

            return res.json();
        },
        onSuccess: () => {
            setForm({
                title: "",
                slug: "",
                description: "",
                image: "",
                colors: [],
                sizes: [],
                price: "",
                category: "T_SHIRTS",
                stock: "1",
            });
            setErrors({});

            toast.success("Product added successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to add product");
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleMultiSelectChange = (
        field: "colors" | "sizes",
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((item) => item !== value)
                : [...prev[field], value],
        }));

        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setForm((prev) => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Prepare payload
        const payload = {
            title: form.title.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            image: form.image.trim(),
            variant: {
                colors: form.colors,
                sizes: form.sizes,
            },
            price: Number(form.price),
            category: form.category,
            stock: Number(form.stock),
        };

        // Validate with Zod
        const result = productSchema.safeParse(payload);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path.join(".");
                fieldErrors[path] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        mutation.mutate(payload);
    };

    const availableColors = [
        "BLACK",
        "WHITE",
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW",
        "PINK",
        "ORANGE",
        "PURPLE",
    ];
    const availableSizes = ["S", "M", "L", "XL", "XXL"];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-2xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Add New Product
                    </h2>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Product Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleTitleChange}
                            placeholder="Enter product title"
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug *</Label>
                        <Input
                            id="slug"
                            name="slug"
                            value={form.slug}
                            onChange={handleInputChange}
                            placeholder="product-url-slug"
                            className={errors.slug ? "border-red-500" : ""}
                        />
                        {errors.slug && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            placeholder="Detailed product description"
                            rows={3}
                            className={
                                errors.description ? "border-red-500" : ""
                            }
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL *</Label>
                        <Input
                            id="image"
                            name="image"
                            type="url"
                            value={form.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className={errors.image ? "border-red-500" : ""}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Colors */}
                    <div className="space-y-2">
                        <Label>Available Colors *</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {availableColors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() =>
                                        handleMultiSelectChange("colors", color)
                                    }
                                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                                        form.colors.includes(color)
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                        {errors["variant.colors"] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors["variant.colors"]}
                            </p>
                        )}
                    </div>

                    {/* Sizes */}
                    <div className="space-y-2">
                        <Label>Available Sizes *</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {availableSizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() =>
                                        handleMultiSelectChange("sizes", size)
                                    }
                                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                                        form.sizes.includes(size)
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {errors["variant.sizes"] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors["variant.sizes"]}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($) *</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={handleInputChange}
                                placeholder="29.99"
                                className={errors.price ? "border-red-500" : ""}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleInputChange}
                                className={`w-full border rounded-md px-3 py-2 text-sm ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            >
                                <option value="T_SHIRTS">T-Shirts</option>
                                <option value="HOODIES">Hoodies</option>
                                <option value="BOTTOMS">Bottoms</option>
                                <option value="WINTER_WEAR">Winter Wear</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock Quantity *</Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                value={form.stock}
                                onChange={handleInputChange}
                                placeholder="100"
                                className={errors.stock ? "border-red-500" : ""}
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.stock}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? (
                            <>
                                Adding Product...{" "}
                                <Loader2 className="animate-spin" />
                            </>
                        ) : (
                            "Add Product"
                        )}
                    </Button>

                    {mutation.isSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            Product added successfully!
                        </div>
                    )}

                    {mutation.isError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            Error:{" "}
                            {mutation.error?.message || "Failed to add product"}
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
};

export default AddProduct;
