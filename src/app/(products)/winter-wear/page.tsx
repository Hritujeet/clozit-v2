import React from 'react';
import ProductGrid from "@/components/ProductGrid";
import { Category } from '@/client/prisma';

const Page = () => {
    return (
        <div>
            <ProductGrid title={"Shop Winter Wear"} category={Category.WINTER_WEAR} />
        </div>
    );
};

export default Page;