import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id?: string): Promise<Billboard | Billboard[]> => {
  const res = await fetch(id ? `${URL}/${id}` : URL, {
    cache: "no-store",
  });

  const data = await res.json();

  if (id) {
    return data as Billboard; // إذا كان هناك ID نرجع صورة واحدة
  } else {
    return data as Billboard[]; // إذا لم يكن هناك ID نرجع قائمة صور
  }
};

export default getBillboard;
