import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {db} from "@/utils/db/db";
import {Order} from "@/client/prisma";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

async function page() {
    const {user: {id}} = await auth.api.getSession({
        headers: await headers()
    })
    const allOrders = await db.order.findMany({
        where: {
            userId: id
        }
    })
    console.log(allOrders)

    if (allOrders.length <= 0) {
        return <div className="h-96 flex flex-col justify-center items-center w-full gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-balance">
                Looks Like you haven't placed any orders yet
            </h1>
        </div>
    }

    return (
        <main className={"container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 mt-5 mb-10 min-h-[60vh]"}>
            <h1 className="text-3xl font-bold mt-10 mb-6 tracking-tight text-center">
                My Orders
            </h1>
            <div className="grid gap-3 md:gap-4">
                {allOrders.length === 0 ? (
                    <Card className="text-center py-6">
                        <CardContent className="p-4">
                            <p className="text-muted-foreground">No orders found</p>
                        </CardContent>
                    </Card>
                ) : (
                    allOrders.map((order: Order) => (
                        <Card key={order.id} className="hover:shadow-md transition-shadow p-0">
                            <CardHeader className="pb-2 p-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">Order #{order.id}</CardTitle>
                                    <Badge className="text-xs">
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-xs text-muted-foreground">
                                            Items: <span
                                            className="font-medium text-foreground">{Object.keys(order.products).length}</span>
                                        </p>
                                        <p className="text-base font-semibold">
                                            ${order.amount}
                                        </p>
                                    </div>
                                    <Link
                                        href={`orders/${order.id}`}
                                        className={buttonVariants({variant: "outline", size: "sm"})}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </main>
    )
}

export default page;