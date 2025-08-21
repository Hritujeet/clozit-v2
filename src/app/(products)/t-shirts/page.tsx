import React, {Suspense} from 'react';
import ProductGrid from "@/components/ProductGrid";
import { Category } from '@/client/prisma';
import {GridSkeleton} from "@/components/GridSkeleton";

const Page = () => {
    return (
        <Suspense fallback={<GridSkeleton/>}>
            <ProductGrid title={"Shop Trendy T-Shirts"} category={Category.T_SHIRTS}/>
        </Suspense>
    );
};

export default Page;