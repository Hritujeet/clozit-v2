import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface ProductCardType {
    name: string;
    price: number;
    category: string;
    img: string;
    slug: string;
    avlSizes: string[];
    colors: string[];
}

const ProductCard = (props: ProductCardType) => {
    const { name, price, img, slug, avlSizes, colors } = props;

    return (
        <Link href={`/product/${slug}`} className="block w-full">
            <Card className="group rounded-lg overflow-hidden border-none shadow-none h-full flex flex-col">
                <CardHeader className="p-2 flex-shrink-0">
                    <div className="relative w-full aspect-square sm:aspect-[4/5] bg-muted rounded-md transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                        <Image
                            src={img}
                            alt={name}
                            fill
                            className="object-cover object-top"
                            priority={false}
                        />
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col justify-start gap-2 p-2 sm:p-3 pt-0 flex-grow min-h-0">
                    <CardTitle className="text-sm sm:text-base md:text-lg tracking-tight font-semibold line-clamp-2 leading-tight">
                        {name}
                    </CardTitle>

                    <CardDescription className="text-primary font-medium text-sm sm:text-base">
                        ${price.toFixed(2)}
                    </CardDescription>

                    {avlSizes?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {avlSizes
                                .slice(0, 4)
                                .map((size: string, index: number) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs px-2 py-0.5 h-auto"
                                    >
                                        {size}
                                    </Badge>
                                ))}
                            {avlSizes.length > 4 && (
                                <Badge
                                    variant="outline"
                                    className="text-xs px-2 py-0.5 h-auto"
                                >
                                    +{avlSizes.length - 4}
                                </Badge>
                            )}
                        </div>
                    )}

                    {colors?.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                            {colors.slice(0, 6).map((color, i) => (
                                <span
                                    key={i}
                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 dark:border-gray-700 flex-shrink-0"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                            {colors.length > 6 && (
                                <span className="text-xs text-muted-foreground ml-1">
                                    +{colors.length - 6}
                                </span>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCard;