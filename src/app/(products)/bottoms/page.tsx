import React from 'react';
import ProductGrid from "@/components/ProductGrid";
import { Category } from '@/client/prisma';

const Page = () => {
    return (
        <div>
            <ProductGrid title={"Shop Premium Bottoms"} category={Category.BOTTOMS} />
        </div>
    );
};

export default Page;