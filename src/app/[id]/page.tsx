"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: product, error, isLoading } = useSWR(
    `https://zia.chorcha.net/api/products/${id}`,
    fetcher
  );

  if (isLoading) return <div>Loading product...</div>;
  if (error) return <div>Failed to load product.</div>;

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    // addToCart(product, 1); // default quantity = 1
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    // addToCart(product, 1);
    // router.push("/checkout");
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">Price: ৳ {product.price}</p>
      <p className="mb-6">{product.description}</p>

      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Buy Now
      </button>
    </div>
  );
}
