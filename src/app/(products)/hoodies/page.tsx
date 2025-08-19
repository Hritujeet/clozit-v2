import React from 'react';
import ProductGrid from "@/components/ProductGrid";
import { Category } from '@/client/prisma';

const Page = () => {
    return (
        <div>
            <ProductGrid title={"Shop Modish Hoodies"} category={Category.HOODIES} />
        </div>
    );
};

export default Page;