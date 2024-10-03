"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import Rating from "./ui/ratings";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const wishlist = useWishlist();

  const onAddToCart = () => cart.addItem(data);
  const onRemoveFromCart = () => cart.removeItem(data.id);

  const isInCart = cart.items.some((item) => item.id === data.id);
  const isInWishlist = wishlist.items.some((item) => item.id === data.id);

  const toggleWishlist = () => {
    if (wishlist.items.some((item) => item.id === data.id)) {
      wishlist.removeItem(data.id);
    } else {
      wishlist.addItem(data);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-primary">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-primary">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-primary">Rating:</h3>
          <Rating value={4} />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3 flex-wrap gap-y-2">
        {isInCart ? (
          <Button
            onClick={onRemoveFromCart}
            className="flex items-center gap-x-2"
          >
            Remove Item
            <Trash2 size={20} className="text-red-600" />
          </Button>
        ) : (
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        )}

        <Button
          className={`flex items-center gap-x-2 ${
            isInWishlist ? "text-red-600" : "text-background"
          }`}
          onClick={toggleWishlist}
        >
          Wishlist
          <Heart className={isInWishlist ? "fill-red-600" : ""} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
