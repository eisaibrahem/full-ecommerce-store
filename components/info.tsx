"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import Rating from "./ui/ratings";
import Image from "next/image";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [checker, setChecker] = useState({ share: false, copy: false });
  const [URL, setURL] = useState<string>("");
  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setURL(window.location.href);
    }
  }, []);

  const onAddToCart = () => cart.addItem(data);
  const onRemoveFromCart = () => cart.removeItem(data.id);
  const toggleWishlist = () => {
    if (wishlist.items.some((item) => item.id === data.id)) {
      wishlist.removeItem(data.id);
    } else {
      wishlist.addItem(data);
    }
  };

  const isInCart = cart.items.some((item) => item.id === data.id);
  const isInWishlist = wishlist.items.some((item) => item.id === data.id);

  const onShare = () => {
    setChecker((prev) => ({ ...prev, share: !prev.share }));
    if (navigator.share) {
      navigator
        .share({
          title: data.name,
          text: `Check out this product: ${data.name}`,
          url: URL,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };

  const handleWhatsApp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(URL)}`, "_blank");
  const handleFaceBook = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`,
      "_blank"
    );
  const handleInstagram = () =>
    window.open(
      `https://www.instagram.com/create/story/?url=${encodeURIComponent(URL)}`,
      "_blank"
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(URL);
    setChecker((prev) => ({ ...prev, copy: true }));
    setTimeout(() => setChecker((prev) => ({ ...prev, copy: false })), 2000);
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
        <Button onClick={onShare} className="flex items-center gap-x-2">
          Share
        </Button>
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
      {checker.share && (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-[16rem] shadow-lg p-6 w-[85%] bg-white m-auto">
          <Image
            width={50}
            height={50}
            src="https://cdn-icons-png.flaticon.com/128/2732/2732657.png"
            className="absolute top-[1%] right-[3%] h-6 w-6 cursor-pointer"
            alt="close"
            onClick={() => setChecker((prev) => ({ ...prev, share: false }))}
          />
          <div className="flex justify-center items-center gap-8">
            <input readOnly value={URL} className="border p-2 w-[60%]" />
            <Image
              width={50}
              height={50}
              src={
                checker.copy
                  ? "https://cdn-icons-png.flaticon.com/128/5291/5291043.png"
                  : "https://cdn-icons-png.flaticon.com/128/126/126498.png"
              }
              alt="copy"
              className={`h-6 w-6 cursor-pointer ${
                checker.copy ? "cursor-not-allowed" : ""
              }`}
              onClick={handleCopy}
            />
          </div>
          <hr className="mt-4 border-black" />
          <p className="text-center p-4">Share To</p>
          <div className="flex justify-center items-center gap-4">
            <Image
              width={50}
              height={50}
              src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
              alt="facebook"
              onClick={handleFaceBook}
              className="h-12 w-12 cursor-pointer"
            />
            <Image
              width={50}
              height={50}
              src="https://cdn-icons-png.flaticon.com/128/15713/15713420.png"
              alt="Instagram"
              onClick={handleInstagram}
              className="h-12 w-12 cursor-pointer"
            />
            <Image
              width={50}
              height={50}
              src="https://cdn-icons-png.flaticon.com/128/15713/15713434.png"
              alt="WhatsApp"
              onClick={handleWhatsApp}
              className="h-12 w-12 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
