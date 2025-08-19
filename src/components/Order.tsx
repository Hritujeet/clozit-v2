"use client";
import { CheckCircle, HouseIcon, StoreIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const statusSteps = [
  "Order Placed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

// Placeholder data simulating an order
const placeholderOrder = {
  orderItems: [
    {
      product: {
        image: "https://via.placeholder.com/96",
        productName: "Sample Product 1",
        slug: "sample-product-1",
        description: "This is a sample description.",
        price: 2999,
      },
      color: "Red",
      size: "M",
      quantity: 1,
    },
    {
      product: {
        image: "https://via.placeholder.com/96",
        productName: "Sample Product 2",
        slug: "sample-product-2",
        description: "Another sample description.",
        price: 1599,
      },
      color: "Blue",
      size: "L",
      quantity: 2,
    },
  ],
  total: 2999 + 1599 * 2,
  status: "Out for Delivery",
  deliveryDate: new Date().toISOString(),
};

const Order = ({ orderId }: { orderId: string }) => {
  // Determine current status index for progress bar
  const statusIndex = statusSteps.indexOf(placeholderOrder.status);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 2xl:px-0">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          Order Tracking
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-300 mb-8">
          Order{" "}
          <span className="text-green-600 font-semibold">
            #{orderId?.slice(-8) || "N/A"}
          </span>
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product List */}
          <div className="w-full lg:max-w-2xl space-y-6">
            {placeholderOrder.orderItems.length > 0 ? (
              placeholderOrder.orderItems.map((element, index) => (
                <div
                  key={index}
                  className="flex gap-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 items-center"
                >
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
                    {element.product.image ? (
                      <img
                        src={element.product.image}
                        alt={element.product.productName}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/products/${element.product?.slug || "#"}`}
                      className="block text-lg font-semibold text-gray-900 hover:underline dark:text-white mb-1"
                    >
                      {element.product?.productName || "Product Name"}
                    </Link>
                    <p className="text-sm text-neutral-400 mb-2">
                      {element.product?.description || "No description available"}
                    </p>
                    <div className="flex gap-3 items-center mb-2">
                      <span className="border rounded-md px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700">
                        {element.color || "N/A"}
                      </span>
                      <span className="border rounded-md px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700">
                        {element.size || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Qty:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {element.quantity || 0}
                        </span>
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white ml-auto">
                        ${" "}
                        {new Intl.NumberFormat("en-US").format(
                          element.product?.price || 0
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No products in order.</p>
            )}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow p-6 flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                $ {new Intl.NumberFormat("en-US").format(placeholderOrder.total || 0)}
              </span>
            </div>
          </div>

          {/* Order Status */}
          <div className="grow flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Status
              </h3>
              {/* Progress Bar */}
              <div className="flex items-center mb-8">
                {statusSteps.map((status, idx) => (
                  <React.Fragment key={status}>
                    <div
                      className={`flex flex-col items-center ${
                        idx < statusIndex
                          ? "text-green-600"
                          : idx === statusIndex
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          idx <= statusIndex
                            ? "border-green-500 bg-green-100 dark:bg-green-700"
                            : "border-gray-300 bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {status === "Order Placed" && <HouseIcon size={20} />}
                        {status === "Shipped" && <StoreIcon size={20} />}
                        {status === "Out for Delivery" && <TruckIcon size={20} />}
                        {status === "Delivered" && <CheckCircle size={20} />}
                      </span>
                      <span className="mt-2 text-xs font-medium text-center w-20">
                        {status}
                      </span>
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${
                          idx < statusIndex
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-700"
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Status Details */}
              <ol className="space-y-6">
                {statusSteps.map((status, index) => (
                  <li
                    key={status}
                    className={`flex items-start gap-4 ${
                      index <= statusIndex ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`mt-1 flex items-center justify-center w-6 h-6 rounded-full ${
                        index <= statusIndex
                          ? "bg-green-100 dark:bg-green-700"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {status === "Order Placed" && <HouseIcon size={16} />}
                      {status === "Shipped" && <StoreIcon size={16} />}
                      {status === "Out for Delivery" && <TruckIcon size={16} />}
                      {status === "Delivered" && <CheckCircle size={16} />}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold mb-1">{status}</h4>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {status === "Order Placed" &&
                          "Your order has been placed successfully."}
                        {status === "Shipped" &&
                          "The item has been shipped to your nearest hub."}
                        {status === "Out for Delivery" &&
                          "The item is out for delivery."}
                        {status === "Delivered" && (
                          <span className="font-semibold text-green-600">
                            {placeholderOrder.status === "Delivered"
                              ? `Your order was delivered on ${
                                  placeholderOrder.deliveryDate
                                    ? new Date(
                                        placeholderOrder.deliveryDate
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : "N/A"
                                }`
                              : `Delivery Estimated by ${
                                  placeholderOrder.deliveryDate
                                    ? new Date(
                                        placeholderOrder.deliveryDate
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : "N/A"
                                }`}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
