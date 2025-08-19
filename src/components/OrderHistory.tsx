"use client";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const OrderHistory = () => {
  // Mock data for orders
  const mockOrders = [
    {
      _id: "order_12345678",
      orderItems: [1, 2, 3],
      total: 2499,
      status: "Delivered",
      date: "2023-05-15",
    },
    {
      _id: "order_87654321",
      orderItems: [1],
      total: 1299,
      status: "Shipped",
      date: "2023-06-20",
    },
    {
      _id: "order_13579246",
      orderItems: [1, 2],
      total: 1799,
      status: "Processing",
      date: "2023-07-05",
    },
  ];

  // Mock loading state (you can remove this if not needed)
  const isLoading = false;
  const isError = false;

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>

        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          {isLoading && (
            <>
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </>
          )}

          {isError && (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">
                Failed to load orders. Please try again.
              </p>
            </div>
          )}

          {!isLoading && !isError && mockOrders.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No orders found.</p>
            </div>
          )}

          {!isLoading &&
            mockOrders.map((element, index) => {
              return (
                <Link
                  href={`/profile/orders/order/${element._id}`}
                  key={element._id || index}
                  className="border rounded-md px-6 py-4 border-gray-200 hover:bg-neutral-100 duration-150"
                >
                  <div className="flex max-sm:flex-col items-center justify-between mb-3">
                    <h3 className="font-manrope font-bold text-2xl leading-9 text-black flex justify-center items-center gap-2">
                      Purchase Items{" "}
                      <span className="font-normal">
                        {element.orderItems?.length || 0}
                      </span>
                    </h3>
                    <p className="font-medium text-lg leading-8 text-gray-500">
                      Order #{element._id?.slice(-8) || "N/A"}
                    </p>
                  </div>
                  <div className="flex max-sm:flex-col items-center justify-between">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                      Rs.{" "}
                      {new Intl.NumberFormat("en-US").format(
                        element.total || 0
                      )}
                    </h2>
                    <p className="font-medium text-lg leading-8 text-gray-500">
                      {element.status || "Pending"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Ordered on: {element.date}
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
