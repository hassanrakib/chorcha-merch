"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { addToCart } from "@/lib/cart";
import { useState } from "react";

export default function ProductDetailsPage() {
    const { id } = useParams();

    const [added, setAdded] = useState(false);

    const { data: product, error, isLoading } = useSWR(
        `https://zia.chorcha.net/api/products/${id}`,
        fetcher
    );

    if (isLoading) return <div>Loading product...</div>;
    if (error) return <div>Failed to load product.</div>;

    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product, 1);
        setAdded(true);

        setTimeout(() => setAdded(false), 1500); // show temporary message
    };
    const handleBuyNow = () => {
    };

    console.log(product);

    return (

        <div className="min-h-screen p-6 bg-gray-50 flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2 flex justify-center items-center bg-white rounded-xl shadow p-4">
                <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="object-contain h-80 w-full rounded-lg"
                />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl text-blue-600 font-semibold mb-4">
                        ৳ {product.price}
                    </p>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                    >
                        Buy Now
                    </button>
                </div>
                {added && (
                    <p className="text-green-600 font-semibold mt-2">
                        Added to cart!
                    </p>
                )}
            </div>
        </div>

    );
}
