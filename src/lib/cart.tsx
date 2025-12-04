// /lib/cart.ts

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []; // safety for SSR
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Add product to cart
export const addToCart = (product: any, quantity: number = 1) => {
  const cart = getCart();

  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    // If already in cart, increase quantity
    existingItem.quantity += quantity;
  } else {
    // Else, add new item
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
  }

  saveCart(cart);
};

// Clear cart (for checkout success)
export const clearCart = () => {
  localStorage.removeItem("cart");
};
