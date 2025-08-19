import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 flex flex-col">
                        <span>Clozit Ecommerce - Ecommerce Site Prototype By</span> <Link className="hover:underline" href={"https://github.com/hritujeet"}>@Hritjeet Sharma</Link>
                    </h1>
                    <p className="mb-8 leading-relaxed">
                       Clozit | Ecommerce is a basic ecommerce clothing store website as a prototype of an ecommerce store. This site is created using NextJS, Typescript, MongoDB with Mongoose and Tanstack Query. This website is not a real ecommerce clothing store and as such doesn't incoporate any real stock of products displayed and payment gateways. You can freelly place order without having to pay as this is a demo (prototype) pf a bigger idea. Feel Free to Contact me for any suggestions about this project. This is a part of my learnings.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href={"/"} className={`${buttonVariants({variant: "default"})}`}>
                            Home
                        </Link>
                        <Link href={"/products"} className={`${buttonVariants({variant: "default"})}`}>
                            Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
