import ProductCard from "@/components/ProductCard";
import Filters from "./Filters";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db/db";
import { validateProducts } from "@/utils/db/zod-schemas";
import { Category } from "@/client/prisma";

interface ProductGridProps {
  title: string;
  showFilters?: boolean;
  category?: Category;
}

const ProductGrid = async ({
  title,
  showFilters = true,
  category,
}: ProductGridProps) => {
  let rawProducts;
  if (category && typeof category === "string") {
    rawProducts = await db.product.findMany({
      where: { category: category as Category },
      orderBy: {updatedAt: "desc"}
    });
  } else {
    rawProducts = await db.product.findMany({
      orderBy: {updatedAt: "desc"}
    });
  }

  const products = validateProducts(rawProducts);

  return (
    <section className="py-6 px-3 sm:py-10 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "grid gap-4",
          showFilters 
            ? "grid-cols-1 sm:grid-cols-4 xl:grid-cols-5" 
            : "grid-cols-1"
        )}>
          {showFilters && (
            <div className="sm:col-span-1">
              <Filters />
            </div>
          )}
          
          <div className={cn(
            showFilters 
              ? "sm:col-span-3 xl:col-span-4" 
              : "col-span-1"
          )}>
            <h2 className="text-3xl font-bold text-center tracking-tight mb-6 sm:mb-8 md:mb-12 text-balance px-2">
              {title}
            </h2>
            
            <div className={cn(
              "grid gap-3 sm:gap-4 mx-auto max-w-sm sm:max-w-4xl lg:max-w-7xl",
              showFilters
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            )}>
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  name={item.title}
                  img={item.image}
                  category={item.category}
                  price={item.price}
                  slug={item.slug}
                  avlSizes={item.variant.sizes}
                  colors={item.variant.colors}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;