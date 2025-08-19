import { Color, Size } from "@/client/prisma";
import z from "zod";

export interface ValidatedProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  variant: {
    colors: Color[];
    sizes: Size[];
  };
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export const productVariantSchema = z.object({
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
});

export const orderProductsSchema = z.object({
  productId: z.string(),
  variant: z.object({
    color: z.string(),
    size: z.string(),
  }),
  quantity: z.int(),
});

export function validateProducts(rawProducts: any[]): ValidatedProduct[] {
  return rawProducts.map((product) => {
    try {
      const validatedVariant = productVariantSchema.parse(product.variant);

      return {
        ...product,
        variant: validatedVariant,
      };
    } catch (error) {
      console.error(`Invalid variant for product ${product.id}:`, error);

      return {
        ...product,
        variant: {
          colors: [] as Color[],
          sizes: [] as Size[],
        },
      };
    }
  });
}

export function validateAndFilterProducts(
  rawProducts: any[]
): ValidatedProduct[] {
  return rawProducts
    .map((product) => {
      try {
        const validatedVariant = productVariantSchema.parse(product.variant);

        return {
          ...product,
          variant: validatedVariant,
        };
      } catch (error) {
        console.error(`Skipping invalid product ${product.id}:`, error);
        return null;
      }
    })
    .filter((product): product is ValidatedProduct => product !== null);
}
