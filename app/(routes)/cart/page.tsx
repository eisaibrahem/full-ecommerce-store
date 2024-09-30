"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import { Product } from "@/types";

interface QuantityDetail {
  id: string;
  quantity: number;
  price: number; // Ensure price is of type number
}

const CartPage = () => {
  const cartItems = useCart((state) => state.items);

  const [quantity, setQuantity] = useState<QuantityDetail[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize quantities based on cartItems
  useEffect(() => {
    if (cartItems.length > 0) {
      const initialQuantities: QuantityDetail[] = cartItems.map((item) => ({
        id: item.id,
        quantity: 1,
        price: Number(item.price),
      }));
      setQuantity(initialQuantities);
    }
  }, [cartItems]);

  // Mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle incrementing the quantity
  const handleAddQuantity = (data: Product) => {
    const updatedQuantity = quantity.map((item) =>
      item.id === data.id
        ? {
            ...item,
            quantity: item.quantity + 1,
            price: Number(data.price) * (item.quantity + 1),
          }
        : item
    );
    setQuantity(updatedQuantity);
  };

  // Handle decrementing the quantity
  const handleDecQuantity = (data: Product) => {
    const updatedQuantity = quantity.map((item) =>
      item.id === data.id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            price: Number(data.price) * (item.quantity - 1),
          }
        : item
    );
    setQuantity(updatedQuantity);
  };

  // Handle removing the item from the cart
  const handleRemoves = (data: Product) => {
    const filtered = quantity.filter((item) => item.id !== data.id);
    setQuantity(filtered);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-background pt-10">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <ul>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    data={item}
                    quantity={quantity}
                    handleAdd={handleAddQuantity}
                    handleDec={handleDecQuantity}
                    remove={handleRemoves}
                  />
                ))}
              </ul>
            </div>
            <Summary quantity={quantity} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
