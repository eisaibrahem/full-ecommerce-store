import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`, {
    cache: "no-store", // هذا يلغي التخزين المؤقت
  });

  return res.json();
};

export default getCategory;
