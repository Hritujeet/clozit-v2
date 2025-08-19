import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Truck, Sparkles, Shield, Heart, Loader2 } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  {
    title: "T-Shirts",
    url: "/t-shirts",
    image:
      "https://assets.ajio.com/medias/sys_master/root/20240902/0l5d/66d5d1291d763220fab8a48b/-473Wx593H-465914828-multi-MODEL.jpg",
  },
  {
    title: "Hoodies",
    url: "/hoodies",
    image:
      "https://thalasiknitfab.com/cdn/shop/files/luffyhoodie-1_WHITEBG_490x.progressive.jpg?v=1731753749",
  },
  {
    title: "Bottoms",
    url: "/bottoms",
    image:
      "https://thestreetsofseoul.com/cdn/shop/files/Padded-Winter-Cargo-Pants-thestreetsofseoul-korean-street-style-minimal-streetwear-k-style-kstyle-mens-affordable-clothing.webp?v=1732635531&width=1280",
  },
  {
    title: "Winter Wear",
    url: "/winter-wear",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMipDdqb7HU_wKzhPqeDfHZQ0vN8OBBgAsg&s",
  },
];

const heroSlides = [
  {
    title: "New Winter Collection",
    subtitle: "Stay warm, look cool",
    description:
      "Discover our latest winter essentials designed for comfort and style",
    image: "./carousel/Winter.webp",
    cta: "Shop Winter",
    badge: "New Arrival",
    href: "/winter-wear",
  },
  {
    title: "Trending Now",
    subtitle: "Street style essentials",
    description:
      "Elevate your everyday look with our curated streetwear collection",
    image: "./carousel/trending-now.webp",
    cta: "Explore Trends",
    badge: "Trending",
  },
  {
    title: "Premium Quality",
    subtitle: "Crafted for you",
    description:
      "Experience the perfect blend of comfort, durability, and style",
    image: "./carousel/premium-quality.webp",
    cta: "Shop Premium",
    badge: "Premium",
  },
];

const perks = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Enjoy swift and hassle-free delivery to your doorstep, ensuring a smooth shopping experience.",
  },
  {
    icon: Sparkles,
    title: "Trendy Outfits of the Season",
    description:
      "Shop from the latest trends of the season, ensuring you stay ahead of the fashion curve.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description:
      "Every piece is carefully selected and quality-checked to ensure you get the best value.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "Our dedicated support team ensures your shopping experience is nothing short of exceptional.",
  },
];

const GridSkeleton = ({ itemCount = 4, showAnimation = true }) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div key={index} className="flex flex-col space-y-3">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ));

  return (
    <div className="
      container mx-auto 
      py-8 px-4 sm:px-6 lg:px-8
      max-w-7xl
    ">
      <div className="
        grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4
      ">
        {skeletonItems}
      </div>
    </div>
  );
};

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        <Carousel
          opts={{
            loop: true,
            watchDrag: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 text-center text-white max-w-4xl px-4">
                    <Badge variant="secondary" className="mb-4">
                      {slide.badge}
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-2 font-medium">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                      {slide.description}
                    </p>
                    {slide.href && (
                      <Link
                        href={slide.href}
                        className={buttonVariants({ variant: "default" })}
                      >
                        {slide.cta}
                      </Link>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Product Grid Section */}
      <section className="py-16">
        <Suspense fallback={<GridSkeleton />}>
          <ProductGrid showFilters={false} title={"Trendy Outfits | Clozit"} />
        </Suspense>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Collections
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our carefully curated collections designed for every
              style and occasion
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 transition-all duration-300 shadow-none p-0 rounded-md"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {category.title}
                    </h3>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      <Link href={category.url}>Explore Collection</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Clozit?
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Experience the difference with our commitment to quality, style,
              and exceptional service
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <perk.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{perk.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {perk.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-lg opacity-90">
            Join thousands of satisfied customers who trust Clozit for their
            fashion needs
          </p>
        </div>
      </section>
    </main>
  );
}
