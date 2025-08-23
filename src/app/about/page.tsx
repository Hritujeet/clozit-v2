import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Clozit</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
                        Where fashion meets passion. Discover premium clothing that defines your unique style.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p className="text-lg">
                                    Founded with a vision to democratize fashion, Clozit began as a dream to create clothing that speaks to every individual's unique personality. What started as a small boutique has evolved into a beloved destination for fashion enthusiasts worldwide.
                                </p>
                                <p>
                                    We believe that great style shouldn't be exclusive. Every piece in our collection is carefully curated to blend contemporary trends with timeless elegance, ensuring you always look and feel your best.
                                </p>
                                <p>
                                    From casual everyday wear to statement pieces for special occasions, Clozit is your trusted partner in building a wardrobe that truly represents you.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-xl">
                                <div className="aspect-square bg-white rounded-xl flex items-center justify-center shadow-lg">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-white text-3xl font-bold">C</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Since 2020</h3>
                                        <p className="text-gray-600">Crafting Style Stories</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
                    <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
                        Our values guide everything we do, from the fabrics we choose to the relationships we build with our community.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We're committed to ethical fashion practices, using eco-friendly materials and supporting sustainable manufacturing processes that respect our planet.
                            </p>
                        </div>
                        
                        <div className="group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every garment undergoes rigorous quality checks. We believe in creating pieces that last, combining premium materials with expert craftsmanship.
                            </p>
                        </div>
                        
                        <div className="group">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Fashion is about connection. We foster a community where style enthusiasts share inspiration, support each other, and celebrate individuality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Numbers that reflect our commitment to excellence and customer satisfaction.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">50K+</div>
                            <div className="text-gray-300 font-medium">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">1000+</div>
                            <div className="text-gray-300 font-medium">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">25+</div>
                            <div className="text-gray-300 font-medium">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">4.8★</div>
                            <div className="text-gray-300 font-medium">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate individuals behind Clozit, working tirelessly to bring you the best in fashion.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">SJ</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
                            <p className="text-purple-600 font-medium mb-3">Creative Director</p>
                            <p className="text-gray-600 leading-relaxed">
                                With 15+ years in fashion design, Sarah leads our creative vision and ensures every piece tells a story.
                            </p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">MC</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Michael Chen</h3>
                            <p className="text-blue-600 font-medium mb-3">Head of Operations</p>
                            <p className="text-gray-600 leading-relaxed">
                                Michael ensures seamless operations from design to delivery, maintaining our high standards at every step.
                            </p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <div className="w-28 h-28 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">EP</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Emma Parker</h3>
                            <p className="text-pink-600 font-medium mb-3">Customer Experience Lead</p>
                            <p className="text-gray-600 leading-relaxed">
                                Emma is dedicated to ensuring every customer has an exceptional experience with Clozit from start to finish.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Discover Your Style?</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of fashion enthusiasts who trust Clozit for their wardrobe essentials. Your perfect outfit is just a click away.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link 
                            href="/products" 
                            className={buttonVariants({ variant: "default", size: "lg" }) + " text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}
                        >
                            Shop Collection
                        </Link>
                        <Link 
                            href="/contact" 
                            className={buttonVariants({ variant: "outline", size: "lg" }) + " text-lg px-8 py-4"}
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