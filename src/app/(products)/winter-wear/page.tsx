import React, {Suspense} from 'react';
import ProductGrid from "@/components/ProductGrid";
import {GridSkeleton} from "@/components/GridSkeleton";
import {Category} from "@/client/prisma";

const Page = ({searchParams} : {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
    return (
        <Suspense fallback={<GridSkeleton/>}>
            <ProductGrid searchParams={searchParams} title={"Shop Exclusive Winter Collection"} category={Category.WINTER_WEAR}/>
        </Suspense>
    );
};

export default Page;