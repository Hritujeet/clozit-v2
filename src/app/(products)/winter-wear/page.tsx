import React, {Suspense} from 'react';
import ProductGrid from "@/components/ProductGrid";
import {GridSkeleton} from "@/components/GridSkeleton";
import {Category} from "@/client/prisma";

const Page = () => {
    return (
        <Suspense fallback={<GridSkeleton/>}>
            <ProductGrid title={"Shop Exclusive Winter Collection"} category={Category.WINTER_WEAR}/>
        </Suspense>
    );
};

export default Page;