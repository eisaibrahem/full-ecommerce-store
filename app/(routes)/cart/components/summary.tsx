"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

interface SummaryProps {
  quantity: { id: string; price: number }[]; // Adjust type according to your data structure
}

const Summary: React.FC<SummaryProps> = ({ quantity }) => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isPaid, setIsPaid] = useState(false); // حالة جديدة لتحديد إذا تم الدفع

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll(); // هذه الوظيفة تقوم بتصفير السلة
      setIsPaid(true); // تحديد أن الدفع تم بنجاح
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalQuantityPrice = quantity.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );

      window.location = response.data.url; // Redirect to the checkout URL
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again later.");
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-background border shadow-sm shadow-secondary px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-primary">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-primary">Order total</div>
          <Currency value={isPaid ? 0 : totalQuantityPrice} />{" "}
          {/* إذا تم الدفع، يتم عرض 0 */}
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
