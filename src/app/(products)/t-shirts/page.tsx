import React from 'react';
import ProductGrid from "@/components/ProductGrid";
import { Category } from '@/client/prisma';

const Page = () => {
    return (
        <div>
            <ProductGrid title={"Shop Stunning T-Shirts"} category={Category.T_SHIRTS} />
        </div>
    );
};

export default Page;