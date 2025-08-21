import ProductDetails from "@/components/ProductDetails";
import {db} from "@/utils/db/db";
import {notFound} from "next/navigation";

const Page = async ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;
    const product = await db.product.findUnique({
        where: {slug},
    });

    if (!product) return notFound()
    return <ProductDetails product={product}/>;
};

export default Page;
