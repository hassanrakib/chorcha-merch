"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";

const PRODUCTS_API = "https://zia.chorcha.net/api/products";

export default function ProductListPage() {
  const { data, error, isLoading } = useSWR(PRODUCTS_API, fetcher);

  console.log(data, error, isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-lg">
        Failed to load products.
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Chorcha Merch Store
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product: any) => (
          <Link
            key={product.id}
            href={`/products/${product._id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <div className="h-48 w-full flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="object-contain h-full"
              />
            </div>

            <h2 className="text-lg font-semibold truncate">{product.name}</h2>

            <p className="text-blue-600 font-bold mt-2">
              ৳ {product.price}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
