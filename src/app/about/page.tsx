import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Leaf, Award, Users, Star, ShoppingBag, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Page = () => {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-background flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Fashion store background"
                    fill
                    className="object-cover"
                />
                <div className="relative z-20 text-center text-primary-foreground px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Welcome to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Clozit
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                        Where fashion meets passion. Discover premium clothing
                        that defines your unique style.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p className="text-lg">
                                    Founded with a vision to democratize
                                    fashion, Clozit began as a dream to create
                                    clothing that speaks to every individual's
                                    unique personality. What started as a small
                                    boutique has evolved into a beloved
                                    destination for fashion enthusiasts
                                    worldwide.
                                </p>
                                <p>
                                    We believe that great style shouldn't be
                                    exclusive. Every piece in our collection is
                                    carefully curated to blend contemporary
                                    trends with timeless elegance, ensuring you
                                    always look and feel your best.
                                </p>
                                <p>
                                    From casual everyday wear to statement
                                    pieces for special occasions, Clozit is your
                                    trusted partner in building a wardrobe that
                                    truly represents you.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Fashion designer working"
                                width={500}
                                height={400}
                                className="rounded-2xl shadow-xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90vw] mx-auto" />

            {/* Values Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-card-foreground mb-4">
                        What We Stand For
                    </h2>
                    <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
                        Our values guide everything we do, from the fabrics we
                        choose to the relationships we build with our community.
                    </p>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Leaf className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-4">
                                Sustainability
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We're committed to ethical fashion practices,
                                using eco-friendly materials and supporting
                                sustainable manufacturing processes that respect
                                our planet.
                            </p>
                        </div>

                        <div className="group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-4">
                                Quality
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Every garment undergoes rigorous quality checks.
                                We believe in creating pieces that last,
                                combining premium materials with expert
                                craftsmanship.
                            </p>
                        </div>

                        <div className="group">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-4">
                                Community
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Fashion is about connection. We foster a
                                community where style enthusiasts share
                                inspiration, support each other, and celebrate
                                individuality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90vw] mx-auto" />
            {/* Statistics Section */}
            <section className="py-20 px-4 text-primary-foreground">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Numbers that reflect our commitment to excellence
                            and customer satisfaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Heart className="w-6 h-6 text-blue-400 mr-2" />
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    50K+
                                </div>
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Happy Customers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <ShoppingBag className="w-6 h-6 text-green-400 mr-2" />
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                    1000+
                                </div>
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Products
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-6 h-6 text-purple-400 mr-2" />
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    25+
                                </div>
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Countries
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Star className="w-6 h-6 text-pink-400 mr-2" />
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                                    4.8
                                </div>
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Average Rating
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90vw] mx-auto" />
            {/* Featured Collections */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Our Collections
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Discover our carefully curated collections designed
                            for every occasion and style preference.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group cursor-pointer">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                    alt="Casual Wear Collection"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    Casual Wear
                                </h3>
                                <p className="text-muted-foreground">
                                    Comfortable and stylish pieces for everyday
                                    wear
                                </p>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                    alt="Formal Wear Collection"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    Formal Wear
                                </h3>
                                <p className="text-muted-foreground">
                                    Elegant attire for professional and special
                                    occasions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90vw] mx-auto" />
            {/* CTA Section */}
            <section className="py-20 px-4 bg-background text-primary-foreground relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Fashion background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Discover Your Style?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of fashion enthusiasts who trust Clozit
                        for their wardrobe essentials. Your perfect outfit is
                        just a click away.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/"
                            className={buttonVariants({
                                variant: "default",
                                size: "lg",
                            })}
                        >
                            Shop Collection
                        </Link>
                        <Link
                            href="/contact"
                            className={buttonVariants({
                                variant: "default",
                                size: "lg",
                            })}
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;
